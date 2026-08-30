import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, ShieldCheck, Layers, Cpu } from 'lucide-react';
import { TiltedCard } from '../components/reactbits/TiltedCard';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { ShinyText } from '../components/reactbits/ShinyText';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { Magnet } from '../components/reactbits/Magnet';
import { BlurText } from '../components/reactbits/BlurText';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Brand Manifesto Title */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs font-cinzel uppercase tracking-[0.3em] text-[#C5A059] font-bold">
            <ShinyText text="THE STORYTELLING APPAREL PHILOSOPHY" speed={5.5} />
          </span>
          <div className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#141414] leading-none">
            <BlurText
              text="EVERY DROP TELLS A STORY."
              delay={50}
              animateBy="words"
              direction="top"
            />
          </div>
          <p className="text-base sm:text-lg font-mono-code text-[#706E6B] leading-relaxed pt-2">
            RdCloth adalah brand pakaian yang percaya bahwa setiap desain memiliki jiwa dan kisah tersendiri yang berkaitan erat dengan perjalanan hidup manusia.
          </p>
        </div>

        {/* Visual Banner - Classical Thinker Statue with 3D Tilt */}
        <TiltedCard maxAngle={8} scale={1.01} className="mb-20">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#121214] border-2 border-[#C5A059]/40 overflow-hidden shadow-2xl">
            <img
              src="/thinker-bg.png"
              alt="RdCloth Storytelling Workshop"
              className="w-full h-full object-cover object-center opacity-85 saturate-90 contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-[#18181B]/95 backdrop-blur-md p-4 sm:p-5 border border-[#C5A059]/50 text-xs font-mono-code space-y-1.5 shadow-2xl">
              <p className="text-[#C5A059] font-cinzel font-bold tracking-wider text-sm sm:text-base">
                <ShinyText text="THE RDCLOTH STORYTELLING WORKSHOP" speed={5.5} />
              </p>
              <p className="text-[#A1A1AA]">
                <DecryptedText
                  text="Human Life Metaphors • Heavyweight 235 GSM Combed Cotton • Bandung, Indonesia"
                  speed={25}
                  maxIterations={10}
                  animateOn="view"
                />
              </p>
            </div>
          </div>
        </TiltedCard>

        {/* Manifesto Grid - 01: Concept */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#E0DFD8]">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              01 / CONCEPT
            </span>
            <h2 className="font-cinzel text-3xl font-black uppercase text-[#141414]">
              STORIES WORTH WEARING
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm font-mono-code text-[#706E6B] leading-relaxed">
            <p>
              Di <strong className="text-[#141414]">RdCloth</strong>, kami tidak sekadar membuat desain grafis acak. Setiap Drop dirancang dengan satu tema dan konsep khusus yang mengangkat refleksi kehidupan manusia:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] space-y-1.5 shadow-xs">
                <span className="text-[10px] font-cinzel text-[#C5A059] font-bold block">DROP 01 // RELEASED</span>
                <h4 className="font-cinzel font-bold text-sm text-[#141414]">MYTHOLOGY</h4>
                <p className="text-[11px] text-[#706E6B] leading-normal">
                  Kisah Yunani Kuno & epik klasik tentang ketabahan, luka masa lalu, dan keberanian melangkah maju (*Moving On*).
                </p>
              </div>
              <div className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] space-y-1.5 shadow-xs">
                <span className="text-[10px] font-cinzel text-[#C5A059] font-bold block">DROP 02 // COMING SOON</span>
                <h4 className="font-cinzel font-bold text-sm text-[#141414]">GAMES</h4>
                <p className="text-[11px] text-[#706E6B] leading-normal">
                  Metafora dunia game: tentang bangkit setelah kegagalan (*Respawn*), mencari arti dalam *Side Quests*, dan mengalahkan tantangan hidup.
                </p>
              </div>
              <div className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] space-y-1.5 shadow-xs">
                <span className="text-[10px] font-cinzel text-[#C5A059] font-bold block">DROP 03 // UPCOMING</span>
                <h4 className="font-cinzel font-bold text-sm text-[#141414]">ANIME</h4>
                <p className="text-[11px] text-[#706E6B] leading-normal">
                  Arsip filosofi anime: tekad melampaui batasan diri (*Limit Break*), menjadi tokoh utama takdir sendiri, dan ikatan persahabatan abadi.
                </p>
              </div>
            </div>
            <p className="pt-2 text-xs">
              Tema-tema pada drop berikutnya akan terus berkembang mengeksplorasi spektrum kehidupan manusia, kultur, dan emosi yang relevan dengan realitas kita.
            </p>
          </div>
        </div>

        {/* Manifesto Grid - 02: Garment Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-b border-[#E0DFD8]">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              02 / CRAFTSMANSHIP
            </span>
            <h2 className="font-cinzel text-3xl font-black uppercase text-[#141414]">
              ARCHITECTURAL POSTURE
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm font-mono-code text-[#706E6B] leading-relaxed">
            <p>
              Pakaian yang membawa cerita mendalam membutuhkan material berbobot kuat. Kami menggunakan bahan **Heavyweight Combed Cotton 16s (235 GSM)** dan katun combed 24s pilihan, dipadukan dengan rib kerah 2.5cm dan jahitan rantai ganda agar bentuk siluetnya tetap kokoh dan tidak jatuh lemas saat dipakai.
            </p>
            <div className="pt-4">
              <Magnet strength={0.25}>
                <button
                  onClick={() => setCurrentView('collection')}
                  className="px-6 py-3 bg-[#121214] text-[#F5F5F0] border border-[#C5A059] font-cinzel font-bold text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#121214] transition-all inline-flex items-center space-x-2 shadow-md cursor-pointer"
                >
                  <span>JELAJAHI KOLEKSI DROP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnet>
            </div>
          </div>
        </div>

        {/* Garment Specifications with SpotlightCards */}
        <div className="pt-20">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
              CRAFTSMANSHIP
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase text-[#141414]">
              GARMENT ARCHITECTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.15)"
              borderColor="#C5A059"
              className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs hover:shadow-xl transition-all"
            >
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">01 / FABRIC</span>
              <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">235 GSM COTTON 16S</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Dense yarn density gives structural silhouette that doesn't cling to the body. Pre-shrunk to minimize shrinkage under 2%.
              </p>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.15)"
              borderColor="#C5A059"
              className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs hover:shadow-xl transition-all"
            >
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">02 / COLLAR</span>
              <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">2.5CM HIGH RIB COLLAR</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Tightly knitted spandex-cotton blend rib with inner shoulder-to-shoulder tape to prevent collar baconing or loosening.
              </p>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.15)"
              borderColor="#C5A059"
              className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs hover:shadow-xl transition-all"
            >
              <span className="font-cinzel text-xs text-[#C5A059] font-bold">03 / PRINT</span>
              <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">JAPANESE DTF & PLASTISOL</h3>
              <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
                Micro-pigment inks with hot-melt poly adhesive ensure high breathability, razor sharp edges, and zero peeling.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

