import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatIDR } from '../utils/formatters';
import { Heart, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setCurrentView, addToCart, wishlist, toggleWishlist } = useStore();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'L');
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false);
  const [addedTemp, setAddedTemp] = useState<boolean>(false);

  const isFav = wishlist.includes(product.id);
  const primaryImage = product.images[0]?.url;
  const secondaryImage = product.images[1]?.url || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors[0] || { name: 'Black', hex: '#121212' };
    addToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      price: product.price,
      image: primaryImage,
      size: selectedSize,
      colorName: defaultColor.name,
      colorHex: defaultColor.hex,
      quantity: 1
    });
    setAddedTemp(true);
    setTimeout(() => {
      setAddedTemp(false);
      setShowQuickAdd(false);
    }, 1200);
  };

  return (
    <div
      id={`product-card-${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
      onClick={() => setCurrentView('product-detail', product.slug)}
      className="group relative cursor-pointer flex flex-col justify-between bg-[#FFFFFF] border border-[#E0DFD8] p-2.5 shadow-sm hover:shadow-md hover:border-[#C5A059] transition-all"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#F5F5F0] border border-[#E0DFD8]/60 overflow-hidden">
        {/* Primary & Secondary Image Flip */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
            isHovered && secondaryImage !== primaryImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
          referrerPolicy="no-referrer"
        />
        {secondaryImage && secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate angle`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#121214] text-[#C5A059] border border-[#C5A059]/40 text-[9px] font-cinzel font-bold px-2 py-0.5 uppercase tracking-widest shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 transition-all shadow-sm ${
            isFav
              ? 'text-[#F27D26] bg-white border border-[#E0DFD8]'
              : 'text-[#706E6B] hover:text-[#141414] bg-white/85 hover:bg-white border border-[#E0DFD8]'
          } backdrop-blur-sm`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#F27D26]' : ''}`} />
        </button>

        {/* Quick Add Popover Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E0DFD8] p-3 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {!showQuickAdd ? (
            <button
              onClick={() => setShowQuickAdd(true)}
              className="w-full py-2 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading text-[11px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>QUICK ADD</span>
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono-code text-[#706E6B]">
                <span>SELECT SIZE:</span>
                <span className="text-[#141414] font-bold">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1 text-[10px] font-mono-code uppercase font-bold border transition-colors ${
                      selectedSize === s
                        ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                        : 'bg-[#ECECE7] text-[#141414] border-[#E0DFD8] hover:border-[#141414]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={handleQuickAdd}
                className="w-full py-1.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] font-heading text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-1 transition-all"
              >
                {addedTemp ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>ADD • {formatIDR(product.price)}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Block - Museum Label Concept */}
      <div className="pt-3.5 pb-1 space-y-1.5 border-t border-[#E0DFD8] mt-2">
        <div className="flex items-center justify-between text-[10px] font-mono-code text-[#706E6B] tracking-wider">
          <span>{product.artifactCode || `RDC / 00${product.id.replace('prod-', '')}`}</span>
          <span>{product.chapter || 'CHAPTER I'}</span>
        </div>

        <h3 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#141414] group-hover:text-[#C5A059] transition-colors leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center justify-between pt-1 border-t border-[#E0DFD8]/40">
          <span className="text-xs font-mono-code font-bold text-[#141414]">
            {formatIDR(product.price)}
          </span>
          <span className="text-[10px] font-cinzel text-[#C5A059] font-bold tracking-wider group-hover:translate-x-0.5 transition-transform">
            VIEW ARTIFACT →
          </span>
        </div>
      </div>
    </div>
  );
};
