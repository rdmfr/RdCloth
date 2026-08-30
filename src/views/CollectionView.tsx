import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { ShinyText } from '../components/reactbits/ShinyText';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { Squares } from '../components/reactbits/Squares';

export const CollectionView: React.FC = () => {
  const { collections, products, setCurrentView } = useStore();
  const [activeColId, setActiveColId] = useState<string>(collections[0]?.id || 'drop-001');

  const activeCollection = collections.find(c => c.id === activeColId) || collections[0];
  const collectionProducts = products.filter(p => p.collectionId === activeColId && p.isPublished);

  return (
    <div className="min-h-screen bg-[#121214] text-[#F5F5F0] pt-28 pb-24 relative">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Squares
          direction="diagonal"
          speed={0.2}
          squareSize={50}
          borderColor="rgba(197, 160, 89, 0.15)"
          hoverFillColor="rgba(197, 160, 89, 0.25)"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-cinzel uppercase tracking-[0.3em] text-[#C5A059] font-bold">
            <ShinyText text="EDITORIAL CAPSULES & CHAPTERS" speed={5.5} />
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F5F5F0]">
            COLLECTIONS
          </h1>
          <p className="text-xs sm:text-sm font-mono-code text-[#A1A1AA]">
            Arsip rilisan limited-batch, drop bertema, dan fondasi pakaian esensial.
          </p>
        </div>

        {/* Collection Tab Switchers */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-12 border-b border-[#27272A] pb-4 overflow-x-auto">
          {collections.map(col => {
            const isSelected = activeColId === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setActiveColId(col.id)}
                className={`px-5 py-2.5 text-xs font-cinzel uppercase font-bold tracking-wider transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#121214] border-[#C5A059] shadow-md'
                    : 'bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-[#F5F5F0] hover:border-[#C5A059]/50'
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>

        {/* Active Collection Showcase Banner */}
        {activeCollection && (
          <div className="space-y-12">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#18181B] border-2 border-[#C5A059]/40 overflow-hidden shadow-2xl">
              <img
                src={activeCollection.bannerImage}
                alt={activeCollection.name}
                className="w-full h-full object-cover brightness-[0.55] contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-2xl space-y-2.5">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#C5A059] font-bold bg-[#121214]/80 px-2.5 py-1 border border-[#C5A059]/40 inline-block backdrop-blur-xs">
                  {activeCollection.releaseDate || 'CAPSULE SERIES'}
                </span>
                <h2 className="font-cinzel text-3xl sm:text-5xl font-black uppercase text-[#F5F5F0] tracking-tight">
                  {activeCollection.name} — {activeCollection.subtitle}
                </h2>
                <p className="text-xs sm:text-sm font-mono-code text-[#D4D4D8] leading-relaxed max-w-xl">
                  {activeCollection.description}
                </p>
              </div>
            </div>

            {/* Products in Collection */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
                <span className="text-xs font-cinzel uppercase font-bold text-[#C5A059] tracking-wider">
                  ARTIKEL DALAM DROP INI ({collectionProducts.length})
                </span>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="text-xs font-cinzel uppercase font-bold text-[#F5F5F0] hover:text-[#C5A059] flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>LIHAT SEMUA ARTIFAK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {collectionProducts.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono-code text-[#71717A] border border-[#27272A]">
                  Belum ada produk dalam koleksi ini.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {collectionProducts.map(prod => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

