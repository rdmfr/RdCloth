import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Brand Manifesto Title */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs font-cinzel uppercase tracking-[0.3em] text-[#C5A059] font-bold">
            THE STORY
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#141414] leading-none">
            WHY ANCIENT STORIES?
          </h1>
          <p className="text-base sm:text-lg font-mono-code text-[#706E6B] leading-relaxed">
            Thousands of years ago, people told stories about love, loss, ambition, failure, and hope. We still live through the same things today. The names changed. The world changed. But the stories didn't.
          </p>
        </div>

        {/* Visual Banner - Classical Thinker Statue */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#121214] border border-[#27272A] overflow-hidden mb-20 shadow-xl">
          <img
            src="/thinker-bg.png"
            alt="RdCloth Thinker Statue"
            className="w-full h-full object-cover object-center opacity-85 saturate-90 contrast-125 scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-[#18181B]/95 backdrop-blur-md p-4 sm:p-5 border border-[#C5A059]/40 text-xs font-mono-code space-y-1 shadow-2xl">
            <p className="text-[#C5A059] font-cinzel font-bold tracking-wider text-sm sm:text-base">THE THINKER APPAREL WORKSHOP</p>
            <p className="text-[#A1A1AA]">Reinterpreting Human Endurance • 235 GSM Combed Cotton • Bandung, Indonesia</p>
          </div>
        </div>

        {/* Manifesto Grid - Chapter I */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#E0DFD8]">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              01 / REINTERPRETATION
            </span>
            <h2 className="font-cinzel text-3xl font-black uppercase text-[#141414]">
              CLOTHING WITH INTENT
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm font-mono-code text-[#706E6B] leading-relaxed">
            <p>
              RdCloth reinterprets those timeless human stories into something you can wear every day. Baju bukan sekadar kain, tapi bagian dari fase kehidupan yang sedang kamu jalani.
            </p>
            <p>
              At <strong className="text-[#141414]">RdCloth</strong>, we design exclusively on heavyweight combed cotton (235 GSM 16s and premium 24s). Collars feature 2.5cm heavy ribbing and double-needle chain stitching so they retain their crisp architectural posture year after year.
            </p>
          </div>
        </div>

        {/* Manifesto Grid - Chapter II */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-b border-[#E0DFD8]">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              02 / EVERY DROP HAS A VOICE
            </span>
            <h2 className="font-cinzel text-3xl font-black uppercase text-[#141414]">
              STORIES WORTH WEARING
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm font-mono-code text-[#706E6B] leading-relaxed">
            <p>
              Setiap drop RdCloth adalah bagian dari satu cerita yang terus berkembang. Kami mengekspresikan tema, emosi, dan perjalanan manusia ke dalam bahan, potongan, serta detail yang dibuat untuk dipakai setiap hari.
            </p>
            <p>
              Bukan sekadar pakaian, tapi pengingat bahwa setiap momen bisa dibawa ke dalam gaya hidup. Koleksi kami hadir untuk menyampaikan rasa, makna, dan karakter yang terasa dekat dengan cara orang memakai dan memahami fashion.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setCurrentView('collection')}
                className="px-6 py-3 bg-[#121214] text-[#F5F5F0] border border-[#C5A059] font-cinzel font-bold text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#121214] transition-all inline-flex items-center space-x-2 shadow-md"
              >
                <span>EXPLORE THE DROP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="pt-20">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              CRAFTSMANSHIP
            </span>
            <h2 className="font-cinzel text-3xl font-black uppercase text-[#141414]">
              GARMENT ARCHITECTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FFFFFF] border-l-2 border-l-[#C5A059] border-y border-r border-[#E0DFD8] space-y-3 shadow-xs">
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">01 / FABRIC</span>
              <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">235 GSM COTTON 16S</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Dense yarn density gives structural silhouette that doesn't cling to the body. Pre-shrunk to minimize shrinkage under 2%.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border-l-2 border-l-[#C5A059] border-y border-r border-[#E0DFD8] space-y-3 shadow-xs">
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">02 / COLLAR</span>
              <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">2.5CM HIGH RIB COLLAR</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Tightly knitted spandex-cotton blend rib with inner shoulder-to-shoulder tape to prevent collar baconing or loosening.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border-l-2 border-l-[#C5A059] border-y border-r border-[#E0DFD8] space-y-3 shadow-xs">
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">03 / PRINT</span>
              <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">JAPANESE DTF & PLASTISOL</h3>
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
