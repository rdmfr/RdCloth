import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_COLLECTIONS, 
  INITIAL_REVIEWS, 
  INITIAL_CMS, 
  INITIAL_SETTINGS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOM_ORDERS 
} from './src/data/initialData';
import { Product, Collection, Review, HomepageCMS, StoreSettings, Order, CustomOrder, OrderStatus } from './src/types';

// In-memory data store with fallback
let products: Product[] = [...INITIAL_PRODUCTS];
let collections: Collection[] = [...INITIAL_COLLECTIONS];
let reviews: Review[] = [...INITIAL_REVIEWS];
let cmsData: HomepageCMS = { ...INITIAL_CMS };
let settingsData: StoreSettings = { ...INITIAL_SETTINGS };
let orders: Order[] = [...INITIAL_ORDERS];
let customOrders: CustomOrder[] = [...INITIAL_CUSTOM_ORDERS];
let subscribers: { email: string; date: string }[] = [];
const adminSessions = new Map<string, { email: string; expiresAt: number }>();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rdcloth.id';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rdcloth-admin-2026';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const getSession = (req: express.Request) => {
  const cookieHeader = req.headers.cookie || '';
  const sessionToken = cookieHeader
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('rdcloth_admin_session='))
    ?.split('=')[1];
  const session = sessionToken ? adminSessions.get(sessionToken) : undefined;

  if (!session || session.expiresAt < Date.now()) {
    if (sessionToken) adminSessions.delete(sessionToken);
    return null;
  }

  return session;
};

const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!getSession(req)) {
    return res.status(401).json({ success: false, error: 'Admin authentication required' });
  }
  next();
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON bodies with large payload for base64 design uploads
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // ==========================================
  // API ROUTES
  // ==========================================

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', store: 'RdCloth Apparel Studio' });
  });

  // ==========================================
  // ADMIN AUTHENTICATION
  // ==========================================

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string' || email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, error: 'Email atau password admin salah' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    adminSessions.set(token, { email, expiresAt: Date.now() + SESSION_TTL_MS });
    res.setHeader('Set-Cookie', `rdcloth_admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_MS / 1000}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    res.json({ success: true, data: { email, role: 'ADMIN' } });
  });

  app.get('/api/auth/me', (req, res) => {
    const session = getSession(req);
    if (!session) return res.status(401).json({ success: false, error: 'Not authenticated' });
    res.json({ success: true, data: { email: session.email, role: 'ADMIN' } });
  });

  app.post('/api/auth/logout', (req, res) => {
    const cookieHeader = req.headers.cookie || '';
    const sessionToken = cookieHeader
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith('rdcloth_admin_session='))
      ?.split('=')[1];
    if (sessionToken) adminSessions.delete(sessionToken);
    res.setHeader('Set-Cookie', 'rdcloth_admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
    res.json({ success: true });
  });

  // 1. PRODUCTS API
  app.get('/api/products', (req, res) => {
    const { category, collection, search, sort, includeUnpublished } = req.query;
    let list = [...products];

    if (includeUnpublished !== 'true' || !getSession(req)) {
      list = list.filter(p => p.isPublished);
    }

    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    if (collection && collection !== 'all') {
      list = list.filter(p => p.collectionId === collection);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // newest default
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    res.json({ success: true, count: list.length, data: list });
  });

  app.get('/api/products/:idOrSlug', (req, res) => {
    const { idOrSlug } = req.params;
    const product = products.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  });

  app.post('/api/products', requireAdmin, (req, res) => {
    try {
      const newProduct: Product = {
        ...req.body,
        id: `prod-${Date.now()}`,
        slug: req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        createdAt: new Date().toISOString(),
        rating: 5.0,
        reviewCount: 0
      };
      products.unshift(newProduct);
      res.status(201).json({ success: true, data: newProduct });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  app.put('/api/products/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    products[index] = { ...products[index], ...req.body, id };
    res.json({ success: true, data: products[index] });
  });

  app.delete('/api/products/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const initialLen = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // 2. COLLECTIONS API
  app.get('/api/collections', (req, res) => {
    res.json({ success: true, data: collections });
  });

  app.post('/api/collections', requireAdmin, (req, res) => {
    const newCol: Collection = {
      ...req.body,
      id: `col-${Date.now()}`,
      slug: req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    collections.push(newCol);
    res.status(201).json({ success: true, data: newCol });
  });

  app.put('/api/collections/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const index = collections.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Collection not found' });
    }
    collections[index] = { ...collections[index], ...req.body, id };
    res.json({ success: true, data: collections[index] });
  });

  // 3. ORDERS API
  app.get('/api/orders', requireAdmin, (req, res) => {
    res.json({ success: true, count: orders.length, data: orders });
  });

  app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id.toLowerCase() === id.toLowerCase());
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  });

  app.post('/api/orders', (req, res) => {
    try {
      const orderNum = Math.floor(10000 + Math.random() * 90000);
      const newOrder: Order = {
        ...req.body,
        id: `RDC-${orderNum}`,
        orderStatus: 'PENDING',
        paymentStatus: req.body.paymentMethod === 'QRIS' ? 'PAID' : 'UNPAID',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            status: 'PENDING',
            timestamp: new Date().toLocaleString('id-ID'),
            description: 'Pesanan dibuat. Menunggu konfirmasi pembayaran.'
          }
        ]
      };

      if (newOrder.paymentStatus === 'PAID') {
        newOrder.timeline.push({
          status: 'PAID',
          timestamp: new Date().toLocaleString('id-ID'),
          description: 'Pembayaran QRIS instan terverifikasi otomatis.'
        });
      }

      orders.unshift(newOrder);
      res.status(201).json({ success: true, data: newOrder });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/orders/:id/status', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status, note, trackingNumber, courier } = req.body;
    const order = orders.find(o => o.id.toLowerCase() === id.toLowerCase());

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.orderStatus = status;
    order.updatedAt = new Date().toISOString();
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (courier) order.courier = courier;
    if (status === 'PAID' || status === 'PROCESSING' || status === 'SHIPPED') {
      order.paymentStatus = 'PAID';
    }

    order.timeline.push({
      status: status as OrderStatus,
      timestamp: new Date().toLocaleString('id-ID'),
      description: note || `Status diperbarui menjadi ${status}`
    });

    res.json({ success: true, data: order });
  });

  // 4. CUSTOM ORDERS API
  app.get('/api/custom-orders', requireAdmin, (req, res) => {
    res.json({ success: true, count: customOrders.length, data: customOrders });
  });

  app.post('/api/custom-orders', (req, res) => {
    try {
      const customNum = Math.floor(10000 + Math.random() * 90000);
      const newCustomOrder: CustomOrder = {
        ...req.body,
        id: `CUST-${customNum}`,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      customOrders.unshift(newCustomOrder);
      res.status(201).json({ success: true, data: newCustomOrder });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/custom-orders/:id/status', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const item = customOrders.find(c => c.id === id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Custom order not found' });
    }
    if (status) item.status = status;
    if (adminNotes !== undefined) item.adminNotes = adminNotes;
    item.updatedAt = new Date().toISOString();
    res.json({ success: true, data: item });
  });

  // 5. REVIEWS API
  app.get('/api/reviews', (req, res) => {
    const { productId, approvedOnly } = req.query;
    let list = [...reviews];
    if (approvedOnly === 'true') {
      list = list.filter(r => r.isApproved);
    }
    if (productId) {
      list = list.filter(r => r.productId === productId);
    }
    res.json({ success: true, data: list });
  });

  app.post('/api/reviews', (req, res) => {
    const newRev: Review = {
      ...req.body,
      id: `rev-${Date.now()}`,
      isApproved: true, // Auto-approve demo reviews or switchable in admin
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newRev);

    // Update product rating average
    const prod = products.find(p => p.id === newRev.productId);
    if (prod) {
      const prodRevs = reviews.filter(r => r.productId === prod.id && r.isApproved);
      const avg = prodRevs.reduce((acc, curr) => acc + curr.rating, 0) / prodRevs.length;
      prod.rating = Number(avg.toFixed(1));
      prod.reviewCount = prodRevs.length;
    }

    res.status(201).json({ success: true, data: newRev });
  });

  app.patch('/api/reviews/:id/approve', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { isApproved } = req.body;
    const rev = reviews.find(r => r.id === id);
    if (!rev) return res.status(404).json({ success: false, error: 'Review not found' });
    rev.isApproved = isApproved;
    res.json({ success: true, data: rev });
  });

  app.delete('/api/reviews/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    reviews = reviews.filter(r => r.id !== id);
    res.json({ success: true, message: 'Review deleted' });
  });

  // 6. HOMEPAGE CMS API
  app.get('/api/cms', (req, res) => {
    res.json({ success: true, data: cmsData });
  });

  app.put('/api/cms', requireAdmin, (req, res) => {
    cmsData = { ...cmsData, ...req.body };
    res.json({ success: true, data: cmsData });
  });

  // 7. SETTINGS API
  app.get('/api/settings', (req, res) => {
    res.json({ success: true, data: settingsData });
  });

  app.put('/api/settings', requireAdmin, (req, res) => {
    settingsData = { ...settingsData, ...req.body };
    res.json({ success: true, data: settingsData });
  });

  // 8. NEWSLETTER SUBSCRIBERS
  app.post('/api/subscribers', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email required' });
    }
    if (!subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())) {
      subscribers.push({ email, date: new Date().toISOString() });
    }
    res.json({ success: true, message: 'Welcome to the inner circle of RdCloth.' });
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RdCloth Server running on http://localhost:${PORT}`);
  });
}

startServer();
