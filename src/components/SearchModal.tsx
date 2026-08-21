import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR } from '../utils/formatters';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setCurrentView } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products.slice(0, 4);

  const quickTags = ['tees', 'accessories', 'hoodies', 'Stay Lowkey', 'Canvas Tote'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-black/40 backdrop-blur-xs flex items-start justify-center">
      <div 
        id="search-modal-backdrop"
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0"
      />

      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E0DFD8] shadow-2xl p-6 z-10">
        {/* Search input header */}
        <div className="relative flex items-center border-b border-[#E0DFD8] pb-4">
          <Search className="w-5 h-5 text-[#706E6B] mr-3" />
          <input
            type="text"
            placeholder="Cari produk, SKU, bahan, koleksi..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base font-mono-code text-[#141414] placeholder-[#8C8984] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#706E6B] hover:text-[#141414] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 text-xs font-mono-code text-[#706E6B] hover:text-[#141414] bg-[#ECECE7] border border-[#E0DFD8] px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Quick Tags */}
        <div className="flex items-center space-x-2 pt-3 pb-4 overflow-x-auto text-[11px] font-mono-code text-[#706E6B]">
            <span className="flex items-center text-[#8C8984]">
            <Tag className="w-3 h-3 mr-1" /> CEPAT:
          </span>
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="bg-[#ECECE7] hover:bg-[#141414] text-[#141414] hover:text-[#F5F5F0] px-2 py-0.5 border border-[#E0DFD8] hover:border-[#141414] uppercase transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto divide-y divide-[#E0DFD8] pt-2">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono-code text-[#706E6B]">
              Tidak ada produk yang cocok dengan "{searchTerm}".
            </div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  setCurrentView('product-detail', product.slug);
                }}
                className="pt-3 first:pt-0 flex items-center justify-between group cursor-pointer hover:bg-[#F5F5F0] p-2 -mx-2 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-14 bg-[#F5F5F0] border border-[#E0DFD8] overflow-hidden flex-shrink-0">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono-code text-[#706E6B] uppercase">
                        {product.sku}
                      </span>
                      {product.badge && (
                        <span className="text-[9px] font-mono-code font-bold bg-[#141414] text-[#F5F5F0] px-1">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-heading font-bold uppercase text-[#141414] group-hover:text-[#F27D26] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] font-mono-code text-[#706E6B]">
                      {formatIDR(product.price)}
                    </p>
                  </div>
                </div>

                <div className="text-[#706E6B] group-hover:text-[#141414] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
