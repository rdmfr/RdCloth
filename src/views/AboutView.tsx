import React from 'react';
import { useStore } from '../context/StoreContext';
import { Layers, Scissors, ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-cinzel uppercase tracking-[0.3em] text-[#C5A059] font-bold">
              🏛️ PHILOSOPHIA & APPAREL
            </span>
            <span className="text-xs font-serif-greek text-[#706E6B] font-bold italic">
              // Γνῶθι σεαυτόν
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#141414] leading-none">
            WEAR YOUR IDEA.
          </h1>
          <p className="text-base sm:text-lg font-mono-code text-[#706E6B] leading-relaxed">
            Independent streetwear and apparel studio founded with a sharp conviction: clothing is an armor of conviction, crafted for thinkers and built to endure time.
          </p>
        </div>

        {/* Editorial Visual Banner - Classical Thinker Statue */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#121214] border-2 border-[#C5A059] overflow-hidden mb-20 shadow-xl">
          <img
            src="/thinker-bg.png"
            alt="RdCloth Thinker Philosopher Statue"
            className="w-full h-full object-cover object-center opacity-85 saturate-90 contrast-125 scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-[#18181B]/95 backdrop-blur-md p-4 sm:p-5 border border-[#C5A059]/50 text-xs font-mono-code space-y-1 shadow-2xl">
            <p className="text-[#C5A059] font-cinzel font-bold tracking-wider text-sm sm:text-base">🏛️ THE THINKER APPAREL WORKSHOP</p>
            <p className="text-[#A1A1AA]">Stoic Craftsmanship • 235 GSM Combed Cotton • Neoclassical Precision</p>
          </div>
        </div>

        {/* Narrative Grid - Chapter I */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#E0DFD8]">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              CHAPTER I
            </span>
            <h2 className="font-heading text-3xl font-black uppercase text-[#141414]">
              THE REJECTION OF THIN DISPOSABLE TEES
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm font-mono-code text-[#706E6B] leading-relaxed">
            <p>
              Like ancient monuments built from solid marble, clothing should possess weight, posture, and lasting character. Too much modern apparel feels disposable: paper-thin fabric that warps after two washes and necklines that sag.
            </p>
            <p>
              At <strong className="text-[#141414]">RdCloth</strong>, we design exclusively on heavyweight combed cotton (235 GSM 16s and premium 24s). Our collars feature 2.5cm heavy ribbing and double-needle chain stitching so they retain their crisp architectural posture year after year.
            </p>
          </div>
        </div>

        {/* Chapter II: Custom Freedom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-b border-[#E0DFD8]">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              CHAPTER II
            </span>
            <h2 className="font-heading text-3xl font-black uppercase text-[#141414]">
              YOUR IDEA, NO COMPROMISE
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm font-mono-code text-[#706E6B] leading-relaxed">
            <p>
              Ancient Greek philosophy began with the imperative *"Know Thyself"* (*Γνῶθι σεαυτόν*). Whether it’s a single bespoke piece for your portfolio, a tribute to a philosophical idea, or 50 pieces for your creative crew, RdCloth treats every garment as a personal canvas.
            </p>
            <p>
              We eliminate traditional sablon barriers: no absurd 50-piece minimums, no muddy colors. You get industrial-grade printing, premium heavy blanks, and instant proofing.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setCurrentView('custom')}
                className="px-6 py-3 bg-[#121214] text-[#F5F5F0] border border-[#C5A059] font-cinzel font-bold text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#121214] transition-all inline-flex items-center space-x-2 shadow-md"
              >
                <span>OPEN CUSTOM STUDIO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Pillar Row */}
        <div className="pt-20">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              CRAFTSMANSHIP & ARCHITECTURE
            </span>
            <h2 className="font-heading text-3xl font-black uppercase text-[#141414]">
              GARMENT SPECIFICATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FFFFFF] border-l-4 border-l-[#C5A059] border-y border-r border-[#E0DFD8] space-y-3 shadow-xs">
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">01 / FABRIC</span>
              <h3 className="font-heading text-lg font-bold uppercase text-[#141414]">235 GSM COTTON 16S</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Dense yarn density gives structural silhouette that doesn't cling to the body. Pre-shrunk to minimize shrinkage under 2%.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border-l-4 border-l-[#C5A059] border-y border-r border-[#E0DFD8] space-y-3 shadow-xs">
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">02 / COLLAR</span>
              <h3 className="font-heading text-lg font-bold uppercase text-[#141414]">2.5CM HIGH RIB COLLAR</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Tightly knitted spandex-cotton blend rib with inner shoulder-to-shoulder tape to prevent collar baconing or loosening.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border-l-4 border-l-[#C5A059] border-y border-r border-[#E0DFD8] space-y-3 shadow-xs">
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">03 / PRINT</span>
              <h3 className="font-heading text-lg font-bold uppercase text-[#141414]">JAPANESE DTF & PLASTISOL</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Micro-pigment inks with hot-melt poly adhesive ensure high breathability, razor sharp edges, and zero peeling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
