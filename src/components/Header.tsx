import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Menu, X, PackageCheck, User as UserIcon } from 'lucide-react';
import { Magnet } from './reactbits/Magnet';


export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsSizeGuideOpen,
    wishlist,
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
    { label: 'BERANDA', view: 'home' },
    { label: 'DROP', view: 'collection' },
    { label: 'ARSIP', view: 'shop' },
    { label: 'CERITA', view: 'about' },
    { label: 'BELANJA', view: 'shop' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || currentView !== 'home'
          ? 'bg-[#F5F5F0]/90 backdrop-blur-xl border-b border-[#D8D6CE] py-3.5 shadow-sm'
          : 'bg-[#F5F5F0]/85 backdrop-blur-md border-b border-[#D8D6CE]/80 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-[#141414] hover:text-[#C5A059] transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#706E6B] hover:text-[#141414] transition-colors"
              aria-label="Cari produk"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Left / Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-self-start gap-5 lg:gap-7">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  id={`nav-${link.view}`}
                  onClick={() => setCurrentView(link.view)}
                  className={`text-xs uppercase tracking-[0.2em] font-cinzel font-bold transition-all duration-200 relative py-1 ${isActive
                    ? 'text-[#141414]'
                    : 'text-[#5F5D58] hover:text-[#C5A059]'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] transform translate-y-1" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logo Center */}
          <div className="text-center md:justify-self-center">
            <button
              id="brand-logo-btn"
              onClick={() => setCurrentView('home')}
              className="group inline-flex flex-col items-center md:items-start cursor-pointer"
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
                STORIES WORTH WEARING · EVERY DROP TELLS A STORY
              </span>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center justify-self-end space-x-3 sm:space-x-4">
            {/* Desktop Search trigger */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center space-x-2 text-xs tracking-wider uppercase text-[#706E6B] hover:text-[#141414] transition-colors py-1.5 px-3 border border-[#E0DFD8] bg-[#FFFFFF] shadow-xs hover:border-[#C5A059]"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono-code text-[#706E6B]">CARI</span>
              <kbd className="text-[9px] bg-[#ECECE7] px-1.5 py-0.5 rounded-xs text-[#706E6B] font-mono-code border border-[#E0DFD8]">⌘K</kbd>
            </button>

            {/* Track Order quick link */}
            <button
              id="header-track-btn"
              onClick={() => setCurrentView('track-order')}
              title="Lacak pesanan"
              className={`text-xs uppercase tracking-wider font-cinzel font-bold transition-colors hidden sm:flex items-center space-x-1.5 ${currentView === 'track-order' ? 'text-[#141414]' : 'text-[#706E6B] hover:text-[#C5A059]'
                }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span className="hidden lg:inline text-[10px] tracking-widest">LACAK</span>
            </button>

            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={() => setCurrentView('shop', 'wishlist')}
              title="Produk tersimpan"
              className="relative p-1.5 text-[#706E6B] hover:text-[#C5A059] transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              )}
            </button>

            {/* Account / Admin switch */}
            <button
              id="header-account-btn"
              onClick={() => setCurrentView('account')}
              title="Akun saya"
              className={`p-1.5 transition-colors ${currentView === 'account' ? 'text-[#141414]' : 'text-[#706E6B] hover:text-[#C5A059]'
                }`}
            >
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Button */}
            <Magnet strength={0.2}>
              <button
                id="header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-2 py-1.5 px-3.5 bg-[#121214] text-[#F5F5F0] hover:bg-[#C5A059] hover:text-[#121214] transition-all font-cinzel font-bold rounded-none shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                <span className="text-xs font-mono-code font-bold tracking-tight">
                  {cartCount}
                </span>
              </button>
            </Magnet>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#F5F5F0]/98 backdrop-blur-xl flex flex-col justify-between p-6 text-[#141414]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#E0DFD8]">
              <div>
                <span className="font-cinzel text-2xl font-black uppercase text-[#141414] tracking-tight">
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
                  className={`text-left text-xl font-cinzel font-extrabold tracking-wider uppercase transition-colors ${currentView === link.view ? 'text-[#141414] pl-3 border-l-2 border-[#C5A059]' : 'text-[#706E6B] hover:text-[#141414]'
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
                LACAK PESANAN →
              </button>
              <button
                onClick={() => {
                  setIsSizeGuideOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-mono-code tracking-widest uppercase text-[#706E6B] hover:text-[#141414]"
              >
                PANDUAN UKURAN & SPESIFIKASI →
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

