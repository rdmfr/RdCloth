import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  Collection, 
  Review, 
  HomepageCMS, 
  StoreSettings, 
  CartItem, 
  Order, 
  CustomOrder,
  User,
  OrderStatus,
  CustomOrderStatus
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_COLLECTIONS, 
  INITIAL_REVIEWS, 
  INITIAL_CMS, 
  INITIAL_SETTINGS,
  INITIAL_ORDERS,
  INITIAL_CUSTOM_ORDERS
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation / Active View
  currentView: string;
  setCurrentView: (view: string, param?: string) => void;
  viewParam: string | null;
  
  // Data
  products: Product[];
  collections: Collection[];
  reviews: Review[];
  orders: Order[];
  customOrders: CustomOrder[];
  cms: HomepageCMS;
  settings: StoreSettings;
  isLoading: boolean;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Wishlist
  wishlist: string[]; // product ids
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  
  // User & Admin Auth
  user: User | null;
  setUser: (user: User | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Mutators
  refreshData: () => Promise<void>;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  submitCustomOrder: (customData: Partial<CustomOrder>) => Promise<CustomOrder>;
  submitReview: (reviewData: Partial<Review>) => Promise<Review>;
  updateProduct: (productOrId: Product | string, data?: Partial<Product>) => Promise<Product>;
  addProduct: (product: Product | Partial<Product>) => Promise<Product>;
  createProduct: (data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
  updateOrderStatus: (id: string, status: OrderStatus | string, note?: string, trackingNumber?: string, courier?: string) => Promise<Order>;
  updateOrderTracking: (id: string, trackingNumber: string, courier?: string) => Promise<Order>;
  updateCustomOrderStatus: (id: string, status: CustomOrderStatus | string, adminNotes?: string) => Promise<CustomOrder>;
  updateReviewStatus: (id: string, isApproved: boolean) => Promise<Review>;
  updateCms: (data: Partial<HomepageCMS>) => Promise<HomepageCMS>;
  updateCMS: (data: Partial<HomepageCMS>) => Promise<HomepageCMS>;
  updateSettings: (data: Partial<StoreSettings>) => Promise<StoreSettings>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rdcloth_cart_v1';
const WISHLIST_STORAGE_KEY = 'rdcloth_wishlist_v1';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewInternal] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(INITIAL_CUSTOM_ORDERS);
  const [cms, setCms] = useState<HomepageCMS>(INITIAL_CMS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Auth / Admin state
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'user-demo',
    name: 'Raditya Pratama',
    email: 'raditya@streetwear.id',
    phone: '081298765432',
    addresses: [],
    createdAt: new Date().toISOString()
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Navigation helper
  const setCurrentView = (view: string, param?: string) => {
    setCurrentViewInternal(view);
    setViewParam(param || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Fetch initial API data with fallback
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, colRes, revRes, ordRes, custRes, cmsRes, setRes] = await Promise.all([
        fetch('/api/products?includeUnpublished=true').then(r => r.json()).catch(() => null),
        fetch('/api/collections').then(r => r.json()).catch(() => null),
        fetch('/api/reviews').then(r => r.json()).catch(() => null),
        fetch('/api/orders').then(r => r.json()).catch(() => null),
        fetch('/api/custom-orders').then(r => r.json()).catch(() => null),
        fetch('/api/cms').then(r => r.json()).catch(() => null),
        fetch('/api/settings').then(r => r.json()).catch(() => null)
      ]);

      if (prodRes?.success && Array.isArray(prodRes.data)) {
        setProducts(prodRes.data);
      }
      if (colRes?.success && Array.isArray(colRes.data)) {
        setCollections(colRes.data);
      }
      if (revRes?.success && Array.isArray(revRes.data)) {
        setReviews(revRes.data);
      }
      if (ordRes?.success && Array.isArray(ordRes.data)) {
        setOrders(ordRes.data);
      }
      if (custRes?.success && Array.isArray(custRes.data)) {
        setCustomOrders(custRes.data);
      }
      if (cmsRes?.success && cmsRes.data) {
        setCms(cmsRes.data);
      }
      if (setRes?.success && setRes.data) {
        setSettings(setRes.data);
      }
    } catch (err) {
      console.warn('Using local fallback state', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const existingIndex = cart.findIndex(
      ci => ci.productId === item.productId && 
            ci.size === item.size && 
            ci.colorName === item.colorName &&
            !item.isCustom
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += item.quantity;
      setCart(updated);
    } else {
      const newCartItem: CartItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      };
      setCart(prev => [newCartItem, ...prev]);
    }

    setIsCartOpen(true);
    showToast(`Added "${item.productName}" (${item.size} / ${item.colorName}) to cart.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Saved to wishlist', 'success');
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Order actions
  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to create order');
      setOrders(prev => [json.data, ...prev]);
      clearCart();
      return json.data;
    } catch (err: any) {
      const fallbackOrder: Order = {
        id: `RDC-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: orderData.customer!,
        items: orderData.items!,
        subtotal: orderData.subtotal!,
        shippingMethod: orderData.shippingMethod!,
        shippingCost: orderData.shippingCost!,
        discount: orderData.discount || 0,
        total: orderData.total!,
        paymentMethod: orderData.paymentMethod || 'BANK_TRANSFER',
        paymentStatus: orderData.paymentMethod === 'QRIS' ? 'PAID' : 'UNPAID',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          { status: 'PENDING', timestamp: new Date().toLocaleString('id-ID'), description: 'Order created.' }
        ]
      };
      setOrders(prev => [fallbackOrder, ...prev]);
      clearCart();
      return fallbackOrder;
    }
  };

  const submitCustomOrder = async (customData: Partial<CustomOrder>): Promise<CustomOrder> => {
    try {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customData)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to submit custom order');
      setCustomOrders(prev => [json.data, ...prev]);
      showToast('Custom apparel request submitted successfully!', 'success');
      return json.data;
    } catch (err: any) {
      const fallbackCustom: CustomOrder = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customData.customerName || 'Customer',
        whatsapp: customData.whatsapp || '',
        email: customData.email || '',
        apparelType: customData.apparelType || 'Heavyweight Boxy Tee',
        color: customData.color || 'Black',
        colorHex: customData.colorHex || '#121212',
        size: customData.size || 'L',
        quantity: customData.quantity || 1,
        placement: customData.placement || 'Front Center',
        printTechnique: customData.printTechnique || 'DTF',
        designFileUrl: customData.designFileUrl,
        designFileName: customData.designFileName,
        notes: customData.notes,
        estimatedPrice: customData.estimatedPrice || 89000,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCustomOrders(prev => [fallbackCustom, ...prev]);
      showToast('Custom apparel request submitted successfully!', 'success');
      return fallbackCustom;
    }
  };

  const submitReview = async (reviewData: Partial<Review>): Promise<Review> => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to submit review');
      setReviews(prev => [json.data, ...prev]);
      showToast('Thank you! Your review has been submitted.', 'success');
      return json.data;
    } catch {
      const fallbackRev: Review = {
        id: `rev-${Date.now()}`,
        productId: reviewData.productId || '1',
        productName: reviewData.productName || 'RdCloth Apparel',
        userName: reviewData.userName || 'Anonymous',
        rating: reviewData.rating || 5,
        fitFeedback: reviewData.fitFeedback || 'True to Size',
        sizePurchased: reviewData.sizePurchased || 'L',
        comment: reviewData.comment || 'Great quality!',
        isApproved: true,
        createdAt: new Date().toISOString()
      };
      setReviews(prev => [fallbackRev, ...prev]);
      showToast('Thank you! Your review has been submitted.', 'success');
      return fallbackRev;
    }
  };

  const updateProduct = async (productOrId: Product | string, data?: Partial<Product>): Promise<Product> => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    const payload = typeof productOrId === 'object' ? productOrId : data || {};
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to update product');
      setProducts(prev => prev.map(p => (p.id === id ? json.data : p)));
      showToast('Product updated successfully.', 'success');
      return json.data;
    } catch {
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...payload } : p)));
      showToast('Product updated locally.', 'success');
      return { ...products.find(p => p.id === id)!, ...payload };
    }
  };

  const createProduct = async (data: Partial<Product>): Promise<Product> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to create product');
      setProducts(prev => [json.data, ...prev]);
      showToast('New product created.', 'success');
      return json.data;
    } catch {
      const fallbackP = { ...INITIAL_PRODUCTS[0], ...data, id: `prod-${Date.now()}` } as Product;
      setProducts(prev => [fallbackP, ...prev]);
      showToast('New product created.', 'success');
      return fallbackP;
    }
  };

  const addProduct = createProduct;

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {}
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted.', 'info');
    return true;
  };

  const updateOrderStatus = async (
    id: string, 
    status: OrderStatus | string, 
    note?: string, 
    trackingNumber?: string, 
    courier?: string
  ): Promise<Order> => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note, trackingNumber, courier })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to update order');
      setOrders(prev => prev.map(o => (o.id === id ? json.data : o)));
      showToast(`Order status updated to ${status}.`, 'success');
      return json.data;
    } catch {
      setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: status as OrderStatus, trackingNumber: trackingNumber || o.trackingNumber } : o)));
      showToast(`Order status updated to ${status}.`, 'success');
      return orders.find(o => o.id === id)!;
    }
  };

  const updateOrderTracking = async (id: string, trackingNumber: string, courier?: string): Promise<Order> => {
    return updateOrderStatus(id, 'SHIPPED', 'Package dispatched', trackingNumber, courier);
  };

  const updateCustomOrderStatus = async (
    id: string, 
    status: CustomOrderStatus | string, 
    adminNotes?: string
  ): Promise<CustomOrder> => {
    try {
      const res = await fetch(`/api/custom-orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to update custom order');
      setCustomOrders(prev => prev.map(c => (c.id === id ? json.data : c)));
      showToast(`Custom order status updated to ${status}.`, 'success');
      return json.data;
    } catch {
      setCustomOrders(prev => prev.map(c => (c.id === id ? { ...c, status: status as CustomOrderStatus } : c)));
      showToast(`Custom order status updated to ${status}.`, 'success');
      return customOrders.find(c => c.id === id)!;
    }
  };

  const updateReviewStatus = async (id: string, isApproved: boolean): Promise<Review> => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, isApproved } : r)));
    showToast(`Review ${isApproved ? 'approved' : 'hidden'}.`, 'success');
    return reviews.find(r => r.id === id)!;
  };

  const updateCMS = async (data: Partial<HomepageCMS>): Promise<HomepageCMS> => {
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to update CMS');
      setCms(json.data);
      showToast('Homepage CMS updated.', 'success');
      return json.data;
    } catch {
      setCms(prev => ({ ...prev, ...data }));
      showToast('Homepage CMS updated.', 'success');
      return { ...cms, ...data };
    }
  };

  const updateCms = updateCMS;

  const updateSettings = async (data: Partial<StoreSettings>): Promise<StoreSettings> => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to update settings');
      setSettings(json.data);
      showToast('Store settings updated.', 'success');
      return json.data;
    } catch {
      setSettings(prev => ({ ...prev, ...data }));
      showToast('Store settings updated.', 'success');
      return { ...settings, ...data };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        viewParam,
        products,
        collections,
        reviews,
        orders,
        customOrders,
        cms,
        settings,
        isLoading,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        user: currentUser,
        setUser: setCurrentUser,
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        toasts,
        showToast,
        removeToast,
        refreshData,
        createOrder,
        submitCustomOrder,
        submitReview,
        updateProduct,
        addProduct,
        createProduct,
        deleteProduct,
        updateOrderStatus,
        updateOrderTracking,
        updateCustomOrderStatus,
        updateReviewStatus,
        updateCms,
        updateCMS,
        updateSettings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
