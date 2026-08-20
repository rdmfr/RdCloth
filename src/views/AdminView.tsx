import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR, formatDate, generateWhatsAppUrl } from '../utils/formatters';
import { Product, OrderStatus, CustomOrderStatus, Collection } from '../types';
import { 
  Package, 
  ShoppingBag, 
  Layers, 
  Sliders, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  MessageCircle, 
  ExternalLink, 
  Search, 
  Star, 
  Save, 
  X,
  TrendingUp,
  Clock,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    updateOrderTracking,
    customOrders,
    updateCustomOrderStatus,
    collections,
    reviews,
    updateReviewStatus,
    cms,
    updateCms,
    settings,
    updateSettings,
    logoutAdmin,
    showToast,
    setCurrentView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'custom' | 'reviews' | 'cms' | 'settings'>('dashboard');

  // Product Edit/Add Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState<boolean>(false);

  // Local CMS state
  const [localCms, setLocalCms] = useState(cms);
  const [localSettings, setLocalSettings] = useState(settings);

  // Tracking number input state map
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const pendingCustomCount = customOrders.filter(c => c.status === 'NEW').length;

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) {
      showToast('Name and price are required.', 'error');
      return;
    }

    if (isNewProduct) {
      const slug = editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newP: Product = {
        id: `prod-${Date.now()}`,
        name: editingProduct.name,
        slug,
        tagline: editingProduct.tagline || 'Heavyweight Streetwear',
        sku: editingProduct.sku || `RDC-${Math.floor(1000 + Math.random() * 9000)}`,
        price: Number(editingProduct.price),
        originalPrice: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
        category: (editingProduct.category as any) || 'tees',
        collectionId: editingProduct.collectionId || 'drop-001',
        description: editingProduct.description || 'Premium heavyweight garment.',
        material: editingProduct.material || '100% Combed Cotton 16s (235 GSM)',
        fit: editingProduct.fit || 'Boxy Drop Shoulder Streetwear Fit',
        details: editingProduct.details || ['2.5cm ribbed collar', 'Double needle chain stitching'],
        care: editingProduct.care || ['Machine wash cold', 'Do not iron on print'],
        colors: editingProduct.colors || [{ name: 'Black', hex: '#121212' }],
        sizes: editingProduct.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
        images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [
          {
            id: 'img-1',
            url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
            alt: editingProduct.name,
            isPrimary: true
          }
        ],
        variants: [
          { id: 'v1', size: 'M', colorName: 'Black', colorHex: '#121212', stock: 15, sku: 'RDC-M' },
          { id: 'v2', size: 'L', colorName: 'Black', colorHex: '#121212', stock: 15, sku: 'RDC-L' },
          { id: 'v3', size: 'XL', colorName: 'Black', colorHex: '#121212', stock: 10, sku: 'RDC-XL' }
        ],
        isFeatured: editingProduct.isFeatured ?? true,
        isNewDrop: editingProduct.isNewDrop ?? true,
        isCustomizable: editingProduct.isCustomizable ?? false,
        isPublished: editingProduct.isPublished ?? true,
        badge: editingProduct.badge || 'NEW DROP',
        rating: 5.0,
        reviewCount: 0,
        createdAt: new Date().toISOString()
      };
      await addProduct(newP);
    } else {
      await updateProduct(editingProduct as Product);
    }
    setEditingProduct(null);
  };

  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCms(localCms);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(localSettings);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="border-b border-[#E0DFD8] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-[#F27D26] font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>RDCLOTH BACKSTAGE / ADMIN STUDIO</span>
            </div>
            <h1 className="font-heading text-3xl font-black uppercase text-[#141414] mt-1">
              STORE MANAGEMENT
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] text-xs font-mono-code uppercase transition-colors shadow-xs"
            >
              SIGN OUT
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-[#FFFFFF] border border-[#E0DFD8] hover:border-[#141414] text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414] transition-colors shadow-xs"
            >
              VIEW LIVE STORE ↗
            </button>
          </div>
        </div>

        {/* Admin Nav Tabs */}
        <div className="flex space-x-2 border-b border-[#E0DFD8] mb-8 pb-3 overflow-x-auto text-xs font-mono-code">
          {[
            { id: 'dashboard', label: 'DASHBOARD' },
            { id: 'products', label: `PRODUCTS (${products.length})` },
            { id: 'orders', label: `ORDERS (${orders.length})` },
            { id: 'custom', label: `CUSTOM REQUESTS (${customOrders.length})` },
            { id: 'reviews', label: `REVIEWS (${reviews.length})` },
            { id: 'cms', label: 'HOMEPAGE CMS' },
            { id: 'settings', label: 'PAYMENT & WA' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 uppercase font-bold border transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                  : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ==================================================== */}
        {/* TAB 1: DASHBOARD METRICS */}
        {/* ==================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-2 shadow-xs">
                <span className="text-[10px] font-mono-code text-[#706E6B] uppercase font-bold">TOTAL GROSS SALES</span>
                <p className="font-heading text-2xl sm:text-3xl font-black text-[#F27D26]">
                  {formatIDR(totalRevenue)}
                </p>
                <p className="text-[11px] font-mono-code text-[#706E6B]">{totalOrdersCount} processed orders</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-2 shadow-xs">
                <span className="text-[10px] font-mono-code text-[#706E6B] uppercase font-bold">LIVE CATALOG SKUS</span>
                <p className="font-heading text-2xl sm:text-3xl font-black text-[#141414]">
                  {products.length} APPAREL
                </p>
                <p className="text-[11px] font-mono-code text-[#706E6B]">{products.filter(p => p.isFeatured).length} featured on homepage</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-2 shadow-xs">
                <span className="text-[10px] font-mono-code text-[#706E6B] uppercase font-bold">PENDING CUSTOM QUOTES</span>
                <p className="font-heading text-2xl sm:text-3xl font-black text-emerald-700">
                  {pendingCustomCount} REQUESTS
                </p>
                <p className="text-[11px] font-mono-code text-[#706E6B]">Requires WhatsApp follow up</p>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-[#FFFFFF] border border-[#E0DFD8] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E0DFD8]">
                <h3 className="font-heading text-sm font-bold uppercase text-[#141414]">RECENT STORE ORDERS</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-mono-code text-[#F27D26] font-bold hover:underline"
                >
                  VIEW ALL ORDERS →
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 4).map(ord => (
                  <div key={ord.id} className="p-3.5 bg-[#F5F5F0] border border-[#E0DFD8] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono-code gap-2">
                    <div>
                      <span className="font-bold text-[#141414] uppercase">{ord.id}</span>
                      <span className="text-[#706E6B]"> • {ord.customer.fullName} ({ord.customer.whatsapp})</span>
                      <p className="text-[11px] text-[#706E6B] mt-0.5">
                        {ord.items.length} items • {formatIDR(ord.total)} • {ord.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FFFFFF] text-[#F27D26] border border-[#E0DFD8] uppercase">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PRODUCTS MANAGER */}
        {/* ==================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono-code text-[#706E6B]">
                Manage apparel items, pricing, inventory stock, and badges.
              </p>
              <button
                onClick={() => {
                  setIsNewProduct(true);
                  setEditingProduct({
                    name: '',
                    price: 135000,
                    category: 'tees',
                    collectionId: 'drop-001',
                    badge: 'NEW DROP',
                    material: '100% Combed Cotton 16s (235 GSM)',
                    fit: 'Boxy Drop Shoulder Fit',
                    description: 'Small batch heavyweight streetwear garment.',
                    isPublished: true,
                    isFeatured: true,
                    images: [
                      {
                        id: '1',
                        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
                        alt: 'Apparel Front',
                        isPrimary: true
                      }
                    ]
                  });
                }}
                className="px-4 py-2.5 bg-[#141414] text-[#F5F5F0] font-heading font-black text-xs uppercase flex items-center space-x-1.5 hover:bg-[#F27D26] transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW APPAREL</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {products.map(prod => (
                <div key={prod.id} className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center space-x-4">
                    <img
                      src={prod.images[0]?.url}
                      alt={prod.name}
                      className="w-14 h-16 object-cover bg-[#F5F5F0] border border-[#E0DFD8]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-heading text-sm font-bold uppercase text-[#141414]">{prod.name}</h4>
                        {prod.badge && (
                          <span className="text-[9px] font-mono-code bg-[#F5F5F0] border border-[#E0DFD8] px-1.5 py-0.5 text-[#141414] uppercase font-bold">
                            {prod.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono-code text-[#706E6B]">
                        SKU: {prod.sku} • Category: {prod.category} • Price: {formatIDR(prod.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setIsNewProduct(false);
                        setEditingProduct(prod);
                      }}
                      className="px-3 py-1.5 bg-[#F5F5F0] border border-[#E0DFD8] hover:border-[#141414] text-xs font-mono-code text-[#141414] flex items-center space-x-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>EDIT</span>
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 bg-[#F5F5F0] border border-[#E0DFD8] hover:text-red-600 text-[#706E6B]"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: ORDERS & SHIPPING LOGISTICS */}
        {/* ==================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <p className="text-xs font-mono-code text-[#706E6B]">
              Update order status (PENDING, PAID, PRODUCTION, QC, SHIPPED, DELIVERED) and input courier tracking numbers.
            </p>

            <div className="space-y-4">
              {orders.map(ord => (
                <div key={ord.id} className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E0DFD8] pb-4 gap-2">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-heading text-lg font-bold uppercase text-[#141414]">#{ord.id}</h4>
                        <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 bg-[#F5F5F0] text-[#F27D26] border border-[#E0DFD8] uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs font-mono-code text-[#706E6B] mt-0.5">
                        {ord.customer.fullName} • {ord.customer.whatsapp} • {ord.customer.city}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono-code text-base font-bold text-[#141414]">{formatIDR(ord.total)}</span>
                      <p className="text-[10px] font-mono-code text-[#706E6B]">{ord.paymentMethod} • {ord.shippingMethod.name}</p>
                    </div>
                  </div>

                  {/* Status & Resi Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code pt-2">
                    {/* Status Changer */}
                    <div className="space-y-1.5">
                      <label className="text-[#706E6B] uppercase font-bold">CHANGE ORDER STATUS:</label>
                      <select
                        value={ord.status}
                        onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="w-full bg-[#F5F5F0] border border-[#E0DFD8] text-[#141414] px-3 py-2 focus:outline-none focus:border-[#141414]"
                      >
                        <option value="PENDING">PENDING PAYMENT</option>
                        <option value="PAID">PAID</option>
                        <option value="PRODUCTION">IN WORKSHOP PRODUCTION</option>
                        <option value="QC">QUALITY CONTROL (QC)</option>
                        <option value="SHIPPED">SHIPPED VIA COURIER</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>

                    {/* Resi Tracking Input */}
                    <div className="space-y-1.5">
                      <label className="text-[#706E6B] uppercase font-bold">COURIER RESI (NO. TRACKING):</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="e.g. SCP-882910399"
                          value={trackingInputs[ord.id] !== undefined ? trackingInputs[ord.id] : (ord.trackingNumber || '')}
                          onChange={e => setTrackingInputs({ ...trackingInputs, [ord.id]: e.target.value })}
                          className="flex-1 bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] uppercase focus:outline-none focus:border-[#141414]"
                        />
                        <button
                          onClick={() => {
                            const val = trackingInputs[ord.id] || ord.trackingNumber || '';
                            updateOrderTracking(ord.id, val);
                          }}
                          className="px-4 bg-[#141414] text-[#F5F5F0] font-bold text-xs uppercase hover:bg-[#F27D26] transition-colors"
                        >
                          SAVE RESI
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="pt-2 border-t border-[#E0DFD8] space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs font-mono-code text-[#706E6B]">
                        <span>{it.quantity}x {it.productName} ({it.size}, {it.colorName})</span>
                        <span className="text-[#141414] font-bold">{formatIDR(it.subtotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: CUSTOM APPAREL REQUESTS */}
        {/* ==================================================== */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            <p className="text-xs font-mono-code text-[#706E6B]">
              Review custom design uploads and chat directly with customers via WhatsApp.
            </p>

            <div className="space-y-4">
              {customOrders.map(cust => {
                const waUrl = generateWhatsAppUrl(
                  cust.whatsapp,
                  `Halo Kak ${cust.customerName}, kami dari Studio RdCloth terkait custom order #${cust.id} (${cust.apparelType} - ${cust.quantity} pcs). Desain sudah kami tinjau.`
                );

                return (
                  <div key={cust.id} className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E0DFD8] pb-4 gap-2">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="font-heading text-base font-bold uppercase text-[#141414]">
                            CUSTOM #{cust.id}
                          </h4>
                          <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                            {cust.status}
                          </span>
                        </div>
                        <p className="text-xs font-mono-code text-[#706E6B] mt-0.5">
                          Customer: <strong className="text-[#141414]">{cust.customerName}</strong> ({cust.whatsapp})
                        </p>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono-code text-xs uppercase font-bold flex items-center space-x-1.5 self-start sm:self-auto shadow-xs transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>CHAT CUSTOMER VIA WA</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-code">
                      <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] space-y-1">
                        <span className="text-[10px] text-[#706E6B] uppercase block">GARMENT SPECS</span>
                        <p className="text-[#141414] font-bold">{cust.apparelType}</p>
                        <p className="text-[#706E6B]">Color: {cust.color} • Size: {cust.size}</p>
                        <p className="text-[#706E6B]">Qty: {cust.quantity} pcs</p>
                      </div>

                      <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] space-y-1">
                        <span className="text-[10px] text-[#706E6B] uppercase block">APPLICATION</span>
                        <p className="text-[#141414] font-bold">{cust.placement}</p>
                        <p className="text-[#706E6B]">Technique: {cust.printTechnique}</p>
                        <p className="text-[#F27D26] font-bold">Est: {formatIDR(cust.estimatedPrice)}</p>
                      </div>

                      <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] space-y-1">
                        <span className="text-[10px] text-[#706E6B] uppercase block">UPLOADED DESIGN</span>
                        <p className="text-[#141414] truncate">{cust.designFileName}</p>
                        {cust.designFileUrl && (
                          <div className="w-16 h-16 bg-[#FFFFFF] border border-[#E0DFD8] overflow-hidden mt-1">
                            <img src={cust.designFileUrl} alt="Design" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>
                    </div>

                    {cust.notes && (
                      <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] text-xs font-mono-code text-[#706E6B]">
                        <span className="text-[#141414] uppercase font-bold block mb-1">CUSTOMER NOTES:</span>
                        "{cust.notes}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: REVIEWS MODERATION */}
        {/* ==================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <p className="text-xs font-mono-code text-[#706E6B]">
              Moderate verified customer ratings and reviews.
            </p>

            <div className="space-y-4">
              {reviews.map(rev => (
                <div key={rev.id} className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] flex items-center justify-between gap-4 text-xs font-mono-code shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#141414] font-bold uppercase">{rev.userName}</span>
                      <div className="flex items-center text-[#F27D26]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#F27D26]" />
                        ))}
                      </div>
                      <span className="text-[#706E6B]">for {rev.productName}</span>
                    </div>
                    <p className="text-[#706E6B]">"{rev.comment}"</p>
                  </div>

                  <button
                    onClick={() => updateReviewStatus(rev.id, !rev.isApproved)}
                    className={`px-3 py-1.5 uppercase font-bold border transition-colors ${
                      rev.isApproved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-[#F5F5F0] text-[#706E6B] border-[#E0DFD8]'
                    }`}
                  >
                    {rev.isApproved ? 'APPROVED' : 'PENDING'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: HOMEPAGE CMS */}
        {/* ==================================================== */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCms} className="max-w-2xl bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 space-y-6 text-xs font-mono-code shadow-xs">
            <h3 className="font-heading text-lg font-bold uppercase text-[#141414]">HOMEPAGE CONTENT CMS</h3>

            <div className="space-y-4">
              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">HERO HEADLINE</label>
                <input
                  type="text"
                  value={localCms.heroHeadline}
                  onChange={e => setLocalCms({ ...localCms, heroHeadline: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414] font-heading text-sm"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">HERO SUBHEADLINE</label>
                <input
                  type="text"
                  value={localCms.heroSubheadline}
                  onChange={e => setLocalCms({ ...localCms, heroSubheadline: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">MARQUEE TICKER TEXT</label>
                <input
                  type="text"
                  value={localCms.marqueeText}
                  onChange={e => setLocalCms({ ...localCms, marqueeText: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">VISUAL BREAK QUOTE</label>
                <input
                  type="text"
                  value={localCms.visualBreakQuote}
                  onChange={e => setLocalCms({ ...localCms, visualBreakQuote: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#141414] text-[#F5F5F0] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#F27D26] flex items-center space-x-2 shadow-xs transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>SAVE HOMEPAGE CMS</span>
              </button>
            </div>
          </form>
        )}

        {/* ==================================================== */}
        {/* TAB 7: SETTINGS & PAYMENT */}
        {/* ==================================================== */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="max-w-2xl bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 space-y-6 text-xs font-mono-code shadow-xs">
            <h3 className="font-heading text-lg font-bold uppercase text-[#141414]">PAYMENT & WHATSAPP CONFIG</h3>

            <div className="space-y-4">
              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">OFFICIAL WHATSAPP NUMBER</label>
                <input
                  type="text"
                  value={localSettings.adminWhatsapp}
                  onChange={e => setLocalSettings({ ...localSettings, adminWhatsapp: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
                <span className="text-[10px] text-[#706E6B] mt-1 block">Format with country code (e.g. 6281234567890)</span>
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">BANK NAME</label>
                <input
                  type="text"
                  value={localSettings.bankAccount.bankName}
                  onChange={e => setLocalSettings({
                    ...localSettings,
                    bankAccount: { ...localSettings.bankAccount, bankName: e.target.value }
                  })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">ACCOUNT NUMBER (NO. REKENING)</label>
                <input
                  type="text"
                  value={localSettings.bankAccount.accountNumber}
                  onChange={e => setLocalSettings({
                    ...localSettings,
                    bankAccount: { ...localSettings.bankAccount, accountNumber: e.target.value }
                  })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">ACCOUNT HOLDER (ATAS NAMA)</label>
                <input
                  type="text"
                  value={localSettings.bankAccount.accountHolder}
                  onChange={e => setLocalSettings({
                    ...localSettings,
                    bankAccount: { ...localSettings.bankAccount, accountHolder: e.target.value }
                  })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#141414] text-[#F5F5F0] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#F27D26] flex items-center space-x-2 shadow-xs transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>SAVE SETTINGS</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Edit/Create Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/60 backdrop-blur-xs flex items-center justify-center">
          <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E0DFD8] pb-4">
              <h3 className="font-heading text-xl font-bold uppercase text-[#141414]">
                {isNewProduct ? 'ADD NEW APPAREL ITEM' : `EDIT: ${editingProduct.name}`}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-[#706E6B] hover:text-[#141414]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono-code">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">PRODUCT NAME *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">PRICE (IDR) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">CATEGORY</label>
                  <select
                    value={editingProduct.category || 'tees'}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                  >
                    <option value="tees">TEES</option>
                    <option value="hoodies">HOODIES</option>
                    <option value="accessories">ACCESSORIES</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">BADGE (e.g. NEW DROP / BEST SELLER)</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414] uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-[#E0DFD8]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 bg-[#F5F5F0] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#141414] text-[#F5F5F0] font-heading font-black uppercase tracking-wider hover:bg-[#F27D26] transition-colors"
                >
                  SAVE APPAREL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
