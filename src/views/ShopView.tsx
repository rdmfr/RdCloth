import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, Check } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { products, collections, viewParam, setCurrentView, wishlist } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    viewParam && viewParam !== 'wishlist' ? viewParam : 'all'
  );
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showOnlyWishlist, setShowOnlyWishlist] = useState<boolean>(viewParam === 'wishlist');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'SEMUA PRODUK' },
    { id: 'tees', label: 'KAUS GRAFIS & POLOS' },
    { id: 'hoodies', label: 'HOODIE & FLEECE' },
    { id: 'accessories', label: 'TAS & TOPI' },
  ];

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const availableColors = [
    { name: 'Black', hex: '#121212' },
    { name: 'Off-White', hex: '#f4f4f0' },
    { name: 'Charcoal', hex: '#2d2d30' },
    { name: 'Olive', hex: '#4a5340' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products].filter(p => p.isPublished);

    if (showOnlyWishlist) {
      result = result.filter(p => wishlist.includes(p.id));
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedCollection !== 'all') {
      result = result.filter(p => p.collectionId === selectedCollection);
    }

    if (selectedSize !== 'all') {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    if (selectedColor !== 'all') {
      result = result.filter(p => 
        p.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'best-selling') {
      result.sort((a, b) => (b.badge === 'BEST SELLER' ? 1 : 0) - (a.badge === 'BEST SELLER' ? 1 : 0));
    } else {
      // Newest default
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [products, selectedCategory, selectedCollection, selectedSize, selectedColor, sortBy, showOnlyWishlist, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setShowOnlyWishlist(false);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedCollection !== 'all' || 
    selectedSize !== 'all' || 
    selectedColor !== 'all' || 
    showOnlyWishlist;

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Block */}
        <div className="pb-8 border-b border-[#E0DFD8]">
          <div className="flex items-center space-x-2 text-xs font-mono-code text-[#706E6B] uppercase mb-1">
            <span>KATALOG // 2026</span>
            {showOnlyWishlist && <span className="text-[#C5A059] font-bold">• PRODUK TERSIMPAN</span>}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#141414]">
                {showOnlyWishlist ? 'PRODUK TERSIMPAN' : 'KATALOG'}
              </h1>
              <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                Menampilkan {filteredProducts.length} produk • Pakaian produksi terbatas
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="sm:hidden flex items-center justify-center space-x-2 py-2 px-4 bg-[#FFFFFF] border border-[#E0DFD8] text-xs font-mono-code uppercase font-bold text-[#141414]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{showFiltersMobile ? 'SEMBUNYIKAN FILTER' : 'FILTER & URUTKAN'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Sorting */}
        <div className={`mt-6 ${showFiltersMobile ? 'block' : 'hidden sm:block'} space-y-6 pb-8 border-b border-[#E0DFD8]`}>
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowOnlyWishlist(false);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono-code uppercase font-semibold transition-all border ${
                  selectedCategory === cat.id && !showOnlyWishlist
                    ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                    : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414] hover:border-[#141414]'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Wishlist quick filter */}
            {wishlist.length > 0 && (
              <button
                onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
                className={`px-3.5 py-1.5 text-xs font-mono-code uppercase font-semibold transition-all border ${
                  showOnlyWishlist
                    ? 'bg-[#C5A059] text-white border-[#C5A059]'
                    : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414]'
                }`}
              >
                TERSIMPAN ({wishlist.length})
              </button>
            )}
          </div>

          {/* Secondary Filters row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono-code">
            {/* Collection Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#706E6B] uppercase font-bold tracking-wider">
                KOLEKSI
              </label>
              <select
                value={selectedCollection}
                onChange={e => setSelectedCollection(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] px-3 py-2 text-xs font-mono-code focus:outline-none focus:border-[#141414]"
              >
                <option value="all">SEMUA KOLEKSI</option>
                {collections.map(col => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.subtitle})
                  </option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#706E6B] uppercase font-bold tracking-wider">
                UKURAN
              </label>
              <select
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] px-3 py-2 text-xs font-mono-code focus:outline-none focus:border-[#141414]"
              >
                <option value="all">SEMUA UKURAN</option>
                {availableSizes.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#706E6B] uppercase font-bold tracking-wider">
                WARNA
              </label>
              <select
                value={selectedColor}
                onChange={e => setSelectedColor(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] px-3 py-2 text-xs font-mono-code focus:outline-none focus:border-[#141414]"
              >
                <option value="all">SEMUA WARNA</option>
                {availableColors.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#706E6B] uppercase font-bold tracking-wider">
                URUTKAN
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] px-3 py-2 text-xs font-mono-code focus:outline-none focus:border-[#141414]"
              >
                <option value="newest">TERBARU</option>
                <option value="best-selling">PALING LARIS</option>
                <option value="price-low">HARGA: TERMURAH</option>
                <option value="price-high">HARGA: TERMAHAL</option>
              </select>
            </div>
          </div>

          {/* Reset Filters chip */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2 text-[11px] font-mono-code text-[#706E6B]">
                <span>Filter aktif diterapkan.</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414] flex items-center space-x-1 underline underline-offset-4"
              >
                <X className="w-3.5 h-3.5" />
                <span>CLEAR ALL FILTERS</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile */}
        <div className="mt-10">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 border border-[#E0DFD8] bg-[#FFFFFF]">
              <p className="font-heading text-xl font-bold uppercase text-[#141414]">
                NO APPAREL MATCHED YOUR FILTER
              </p>
              <p className="text-xs font-mono-code text-[#706E6B]">
                Try adjusting the size, color, or category filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#141414] text-[#F5F5F0] text-xs font-heading font-black uppercase tracking-wider hover:bg-[#C5A059] transition-all shadow-xs"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
