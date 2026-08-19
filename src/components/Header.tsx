import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Menu, X, Shield, PackageCheck, User as UserIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    setIsCartOpen, 
    setIsSearchOpen, 
    wishlist, 
    isAdmin, 
    setIsAdmin,
    cms
  } = useStore();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', view: 'shop' },
    { label: 'ARCHIVE', view: 'collection' },
    { label: 'CUSTOM', view: 'custom' },
    { label: 'STORY', view: 'about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || currentView !== 'home'
            ? 'bg-[#F5F5F0]/90 backdrop-blur-md border-b border-[#E0DFD8] py-3.5 shadow-sm'
            : 'bg-transparent py-5 border-b border-[#141414]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-[#141414] hover:text-[#C5A059] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#706E6B] hover:text-[#141414] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Left / Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  id={`nav-${link.view}`}
                  onClick={() => setCurrentView(link.view)}
                  className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#141414]'
                      : 'text-[#706E6B] hover:text-[#141414]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#141414] transform translate-y-1" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logo Center */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <button
              id="brand-logo-btn"
              onClick={() => setCurrentView('home')}
              className="group inline-flex flex-col items-center md:items-start"
            >
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-xl sm:text-2xl font-black tracking-widest uppercase text-[#141414] transition-transform group-hover:scale-[1.01]">
                  RDCLOTH
                </span>
                <span className="text-[10px] font-cinzel text-[#C5A059] font-bold tracking-widest hidden sm:inline-block">
                  · MMXXVI
                </span>
              </div>
              <span className="text-[9px] tracking-[0.24em] uppercase text-[#706E6B] font-mono-code -mt-0.5 hidden sm:block">
                ANCIENT STORIES. MODERN MEANINGS.
              </span>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Desktop Search trigger */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center space-x-2 text-xs tracking-wider uppercase text-[#706E6B] hover:text-[#141414] transition-colors py-1.5 px-3 rounded border border-[#E0DFD8] bg-[#FFFFFF] shadow-sm hover:border-[#141414]"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono-code text-[#706E6B]">SEARCH</span>
              <kbd className="text-[9px] bg-[#ECECE7] px-1.5 py-0.5 rounded text-[#706E6B] font-mono-code border border-[#E0DFD8]">⌘K</kbd>
            </button>

            {/* Track Order quick link */}
            <button
              id="header-track-btn"
              onClick={() => setCurrentView('track-order')}
              title="Track Order"
              className={`text-xs uppercase tracking-wider font-semibold transition-colors hidden sm:flex items-center space-x-1.5 ${
                currentView === 'track-order' ? 'text-[#141414]' : 'text-[#706E6B] hover:text-[#141414]'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">TRACK</span>
            </button>

            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={() => setCurrentView('shop', 'wishlist')}
              title="Wishlist"
              className="relative p-1.5 text-[#706E6B] hover:text-[#141414] transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#F27D26] animate-pulse" />
              )}
            </button>

            {/* Account / Admin switch */}
            <button
              id="header-account-btn"
              onClick={() => setCurrentView('account')}
              title="Customer Account"
              className={`p-1.5 transition-colors ${
                currentView === 'account' ? 'text-[#141414]' : 'text-[#706E6B] hover:text-[#141414]'
              }`}
            >
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 py-1.5 px-3 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-semibold rounded-none shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span className="text-xs font-mono-code font-bold tracking-tight">
                {cartCount}
              </span>
            </button>

            {/* Admin shortcut button */}
            <button
              id="header-admin-btn"
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) setCurrentView('admin');
              }}
              title="Store Management & CMS"
              className={`p-1.5 rounded transition-all text-xs flex items-center space-x-1 border ${
                isAdmin 
                  ? 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26]/40' 
                  : 'bg-transparent text-[#706E6B] hover:text-[#141414] border-transparent hover:border-[#E0DFD8]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px] uppercase font-mono-code font-medium">
                {isAdmin ? 'ADMIN ACTIVE' : 'ADMIN'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#F5F5F0]/98 backdrop-blur-xl flex flex-col justify-between p-6 text-[#141414]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#E0DFD8]">
              <div>
                <span className="font-heading text-2xl font-black uppercase text-[#141414] tracking-tight">
                  RdCloth
                </span>
                <p className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">
                  WEAR YOUR IDEA.
                </p>
              </div>
              <button
                id="close-mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#706E6B] hover:text-[#141414]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-5 pt-8">
              {navLinks.map(link => (
                <button
                  key={link.view}
                  onClick={() => {
                    setCurrentView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-xl font-heading font-extrabold tracking-wider uppercase transition-colors ${
                    currentView === link.view ? 'text-[#141414] pl-3 border-l-2 border-[#141414]' : 'text-[#706E6B] hover:text-[#141414]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentView('track-order');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-mono-code tracking-widest uppercase text-[#706E6B] hover:text-[#141414] pt-4 border-t border-[#E0DFD8]"
              >
                TRACK YOUR ORDER →
              </button>
              <button
                onClick={() => {
                  setCurrentView('size-guide');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-mono-code tracking-widest uppercase text-[#706E6B] hover:text-[#141414]"
              >
                SIZE GUIDE & SPECS →
              </button>
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-mono-code tracking-widest uppercase text-[#F27D26] hover:underline pt-2"
              >
                ADMIN DASHBOARD & CMS
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#E0DFD8] text-xs font-mono-code text-[#706E6B] flex flex-col space-y-2">
            <p>INSTAGRAM: @rdcloth</p>
            <p>WHATSAPP: {cms.instagramHandle || '+62 812-3456-7890'}</p>
            <p className="text-[10px] pt-2 text-[#8C8984]">© 2026 RDCLOTH APPAREL. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      )}
    </>
  );
};
