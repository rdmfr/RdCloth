import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export const CollectionView: React.FC = () => {
  const { collections, products, setCurrentView } = useStore();
  const [activeColId, setActiveColId] = useState<string>(collections[0]?.id || 'drop-001');

  const activeCollection = collections.find(c => c.id === activeColId) || collections[0];
  const collectionProducts = products.filter(p => p.collectionId === activeColId && p.isPublished);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono-code uppercase tracking-[0.3em] text-[#71717a]">
            EDITORIAL LOOKBOOK
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            COLLECTIONS
          </h1>
          <p className="text-xs font-mono-code text-[#a1a1aa]">
            Curated capsules, small-batch releases, and permanent blank foundations.
          </p>
        </div>

        {/* Collection Tab Switchers */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-12 border-b border-[#27272a] pb-4 overflow-x-auto">
          {collections.map(col => {
            const isSelected = activeColId === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setActiveColId(col.id)}
                className={`px-5 py-2.5 text-xs font-mono-code uppercase font-bold transition-all border ${
                  isSelected
                    ? 'bg-white text-black border-white'
                    : 'bg-[#141417] text-[#a1a1aa] border-[#27272a] hover:text-white hover:border-[#52525b]'
                }`}
              >
                {col.name} ({col.subtitle})
              </button>
            );
          })}
        </div>

        {/* Active Collection Showcase Banner */}
        {activeCollection && (
          <div className="space-y-12">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#141417] border border-[#27272a] overflow-hidden">
              <img
                src={activeCollection.bannerImage}
                alt={activeCollection.name}
                className="w-full h-full object-cover brightness-[0.45] contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent" />
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-2xl space-y-2">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-amber-300 font-bold">
                  {activeCollection.releaseDate || 'CAPSULE SERIES'}
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                  {activeCollection.name} — {activeCollection.subtitle}
                </h2>
                <p className="text-xs sm:text-sm font-mono-code text-[#d4d4d8] leading-relaxed">
                  {activeCollection.description}
                </p>
              </div>
            </div>

            {/* Products in Collection */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <span className="text-xs font-mono-code uppercase font-bold text-[#a1a1aa]">
                  PIECES IN THIS DROP ({collectionProducts.length})
                </span>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="text-xs font-mono-code uppercase text-white hover:text-amber-300 flex items-center space-x-1"
                >
                  <span>SEE ALL APPAREL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {collectionProducts.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono-code text-[#71717a] border border-[#27272a]">
                  No products currently in this collection.
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
