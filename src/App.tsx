import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer } from './components/ToastContainer';

// Page Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomOrderView } from './views/CustomOrderView';
import { CollectionView } from './views/CollectionView';
import { CheckoutView } from './views/CheckoutView';
import { TrackOrderView } from './views/TrackOrderView';
import { AboutView } from './views/AboutView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';
import { AdminLoginView } from './views/AdminLoginView';

const MainContent: React.FC = () => {
  const { currentView, isAdmin } = useStore();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F0] text-[#141414] selection:bg-[#141414] selection:text-[#F5F5F0]">
      {/* Global Toast System */}
      <ToastContainer />

      {/* Persistent Sticky Modern Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'custom' && <CustomOrderView />}
        {currentView === 'collection' && <CollectionView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'track-order' && <TrackOrderView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'admin' && (isAdmin ? <AdminView /> : <AdminLoginView />)}
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <SizeGuideModal />

      {/* Editorial Footer (hidden in admin view for cleaner workspace) */}
      {currentView !== 'admin' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
