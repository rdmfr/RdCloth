import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Layers,
  Scissors,
  CheckCircle2,
  Instagram,
  Star,
  TrendingUp,
  PackageCheck,
  X,
  Compass,
  Flame,
  Globe,
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import { Squares } from '../components/reactbits/Squares';
import { BlurText } from '../components/reactbits/BlurText';
import { ShinyText } from '../components/reactbits/ShinyText';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { Magnet } from '../components/reactbits/Magnet';
import { AnimatedCounter } from '../components/reactbits/AnimatedCounter';

export const HomeView: React.FC = () => {
  const { products, collections, cms, setCurrentView, settings } = useStore();
  const [showMarketplaceSelector, setShowMarketplaceSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const marketplaceOptions = [
    { key: 'shopee', label: 'Shopee', href: settings.shopeeUrl || '#' },
    { key: 'tokopedia', label: 'Tokopedia', href: settings.tokopediaUrl || '#' },
    { key: 'tiktokshop', label: 'TikTok Shop', href: settings.tiktokshopUrl || '#' }
  ];

  // Filter products for the curated drop section
  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'featured') return p.isFeatured;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  }).slice(0, 4);

  return (
    <div className="w-full bg-[#F5F5F0] text-[#141414] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[94vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#27272A] bg-[#121214] text-[#F5F5F0]">
        {/* React Bits Squares Interactive Grid Background */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <Squares
            direction="diagonal"
            speed={0.35}
            squareSize={56}
            borderColor="rgba(197, 160, 89, 0.14)"
            hoverFillColor="rgba(197, 160, 89, 0.28)"
          />
        </div>

        {/* Background Visual - Thinker Statue Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/thinker-bg.png"
            alt="Thinker Statue"
            className="w-full h-full object-cover object-left-top sm:object-center opacity-55 saturate-90 contrast-125 scale-[1.02] filter brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214]/98 via-[#121214]/75 to-[#121214]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/70" />
        </div>

        {/* Large Greek Watermark */}
        <div
          aria-hidden="true"
          className="greek-watermark-text absolute right-[-1.5rem] bottom-20 z-[1] hidden select-none text-[clamp(3.5rem,10vw,9rem)] font-black leading-none sm:block opacity-30"
        >
          ΓΝΩΘΙ ΣΕΑΥΤΟΝ
        </div>

        {/* Top Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 bg-[#18181B]/90 border border-[#C5A059]/50 backdrop-blur-md px-4 py-1.5 shadow-xl glow-gold-subtle"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              <ShinyText text={cms.heroTagline || 'DROP 01 // CHAPTER I: MOVING ON'} speed={4} />
            </span>
            <span className="hidden border-l border-[#C5A059]/40 pl-2.5 text-[10px] font-cormorant normal-case tracking-[0.14em] text-[#D4AF37] sm:inline">
              <DecryptedText text="ΓΝΩΘΙ ΣΕΑΥΤΟΝ" speed={45} maxIterations={12} animateOn="hover" />
            </span>
          </motion.div>
        </div>

        {/* Center Headlines */}
        <div className="relative z-10 max-w-7xl mx-auto w-full py-10 md:py-16">
          <div className="max-w-[980px] space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <span className="h-[1px] w-6 bg-[#C5A059]" />
                <span className="text-[10px] sm:text-xs md:text-sm font-cinzel font-bold tracking-[0.26em] text-[#C5A059] block uppercase">
                  STORIES WORTH WEARING
                </span>
              </div>

              {/* Kinetic Blur Text for Hero Headline */}
              <div className="font-cinzel text-[2.9rem] sm:text-[4.5rem] md:text-[5.8rem] lg:text-[6.8rem] font-black uppercase tracking-[-0.05em] text-[#F5F5F0] leading-[0.85] max-w-[720px]">
                <BlurText
                  text="EVERY DROP TELLS A STORY."
                  delay={60}
                  animateBy="words"
                  direction="top"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base font-mono-code text-[#D4D4D8] max-w-xl leading-relaxed backdrop-blur-md bg-black/30 p-4 border-l-2 border-[#C5A059] shadow-lg"
            >
              {cms.heroSubheadline || 'Setiap drop membawa narasi filosofis yang mendalam. Heavyweight combed cotton streetwear dengan konstruksi presisi, rasa kokoh, dan kenyamanan tanpa kompromi.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-3 flex flex-row flex-wrap items-center gap-3.5 max-w-[560px]"
            >
              <Magnet strength={0.25}>
                <button
                  id="hero-shop-cta"
                  onClick={() => setCurrentView('shop')}
                  className="px-5 py-3.5 bg-[#C5A059] text-[#121214] hover:bg-[#D4AF37] transition-all font-cinzel font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2.5 group shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] cursor-pointer"
                >
                  <span>Jelajahi Drop</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Magnet>

              <Magnet strength={0.15}>
                <button
                  type="button"
                  onClick={() => setShowMarketplaceSelector(true)}
                  className="px-5 py-3.5 bg-[#121214]/90 hover:bg-[#1C1C20] text-[#F5F5F0] border border-[#C5A059]/50 hover:border-[#C5A059] transition-all font-cinzel font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.18em] flex items-center justify-center shadow-md backdrop-blur-md cursor-pointer"
                >
                  <span>Beli di Marketplace</span>
                </button>
              </Magnet>
            </motion.div>
          </div>
        </div>

        {/* Hero Specs Bar with Animated Counters */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#A1A1AA]">
          <div className="flex items-center space-x-2.5">
            <span className="text-[#C5A059] font-cinzel font-bold text-sm">
              <AnimatedCounter value={235} suffix=" GSM" duration={1.8} />
            </span>
            <span className="text-[11px]">HEAVYWEIGHT COMBED COTTON</span>
          </div>

          <div className="hidden sm:flex items-center space-x-2.5">
            <span className="text-[#C5A059] font-cinzel font-bold text-sm">
              <DecryptedText text="CHAPTER I" speed={35} maxIterations={8} animateOn="view" />
            </span>
            <span className="text-[11px]">ODYSSEUS NARRATIVE</span>
          </div>

          <div className="flex items-center space-x-2 text-[#C5A059] font-cinzel text-[11px] font-bold tracking-widest">
            <span>BANDUNG, ID</span>
            <span>•</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </section>

      {/* Marketplace Selector Modal */}
      {showMarketplaceSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/75 px-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[600px] bg-[#F1EFEA] border-2 border-[#C5A059]/60 shadow-[0_30px_90px_rgba(0,0,0,0.4)] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                PILIH OFFICIAL STORE
              </span>
              <button
                type="button"
                onClick={() => setShowMarketplaceSelector(false)}
                className="p-1 text-[#141414] hover:text-[#C5A059] transition-colors cursor-pointer"
                aria-label="Tutup marketplace selector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-cinzel text-[2.2rem] sm:text-[2.8rem] font-black uppercase leading-none tracking-[-0.05em] text-[#141414] mb-2">
              RdCloth Studio
            </h3>
            <p className="text-xs font-mono-code text-[#706E6B] mb-6">
              Pilih platform checkout yang paling nyaman dengan gratis ongkir dan promo voucher Anda.
            </p>

            <div className="space-y-3">
              {marketplaceOptions.map(option => (
                <a
                  key={option.key}
                  href={option.href}
                  target={option.href !== '#' ? '_blank' : undefined}
                  rel={option.href !== '#' ? 'noreferrer' : undefined}
                  onClick={() => setShowMarketplaceSelector(false)}
                  className="flex items-center justify-between w-full border border-[#D9D3C8] bg-[#FFFDF9] px-5 py-4 text-left transition-all hover:border-[#C5A059] hover:bg-[#FFFFFF] hover:shadow-md group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] group-hover:scale-125 transition-transform" />
                    <span className="font-cinzel text-base sm:text-lg font-bold uppercase tracking-[0.18em] text-[#141414] group-hover:text-[#C5A059] transition-colors">
                      {option.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#706E6B] flex items-center group-hover:text-[#141414]">
                    {option.href !== '#' ? 'Buka Toko →' : 'Segera'}
                  </span>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMarketplaceSelector(false)}
              className="mt-6 w-full border border-[#D9D3C8] bg-[#ECE7DF] px-4 py-3 text-[10px] font-cinzel font-bold uppercase tracking-[0.3em] text-[#141414] hover:bg-[#E1D9CB] transition-colors cursor-pointer"
            >
              Kembali ke Web
            </button>
          </div>
        </div>
      )}

      {/* 2. MARQUEE TICKER */}
      <section className="bg-[#121214] text-[#C5A059] py-3.5 overflow-hidden border-y border-[#27272A] select-none">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
          <span>{cms.marqueeText}</span>
          <span className="text-white/30">•</span>
          <span>{cms.marqueeText}</span>
          <span className="text-white/30">•</span>
          <span>{cms.marqueeText}</span>
          <span className="text-white/30">•</span>
        </div>
      </section>

      {/* 3. WHY RDCLOTH (ELEVATED SPOTLIGHT GRID) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E0DFD8]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-cinzel text-[#C5A059] font-bold tracking-[0.3em] uppercase">
            CRAFTED WITH PHILOSOPHY
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#141414]">
            STORIES THAT FEEL REAL.
          </h2>
          <p className="text-xs sm:text-sm font-mono-code text-[#706E6B] pt-1">
            Streetwear premium untuk orang yang hidup dengan cerita, bukan sekadar tren sesaat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <SpotlightCard
            spotlightColor="rgba(197, 160, 89, 0.15)"
            borderColor="rgba(197, 160, 89, 0.5)"
            className="p-7 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3.5 shadow-xs hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel text-[#C5A059] font-bold">01 / CONCEPT</span>
              <Compass className="w-4 h-4 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">STORY-LED</h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Setiap drop punya ide, mood, dan pesan filosofis Yunani Kuno yang relevan untuk generasi modern.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(197, 160, 89, 0.15)"
            borderColor="rgba(197, 160, 89, 0.5)"
            className="p-7 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3.5 shadow-xs hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel text-[#C5A059] font-bold">02 / ARCHITECTURE</span>
              <Layers className="w-4 h-4 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">PREMIUM 235 GSM</h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Kain combed cotton 16s berbobot tebal dengan rib collar 2.5cm yang tidak mudah melar setelah dicuci berkali-kali.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(197, 160, 89, 0.15)"
            borderColor="rgba(197, 160, 89, 0.5)"
            className="p-7 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3.5 shadow-xs hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel text-[#C5A059] font-bold">03 / CHECKOUT</span>
              <Globe className="w-4 h-4 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">EASY SHOPPING</h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Pilih produk dan ukuran di katalog, lalu checkout langsung di web atau marketplace resmi pilihanmu.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(197, 160, 89, 0.25)"
            borderColor="#C5A059"
            className="p-7 bg-[#121214] border-2 border-[#C5A059] text-[#F5F5F0] space-y-3.5 shadow-xl glow-gold-subtle"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel text-[#C5A059] font-bold">04 / IDENTITY</span>
              <Flame className="w-4 h-4 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#F5F5F0]">WEAR YOUR IDEA</h3>
            <p className="text-xs font-mono-code text-[#A1A1AA] leading-relaxed">
              Kenakan pakaian yang memiliki jiwa dan makna. Bukan sekadar kain kosong tanpa identitas.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* 4. RECENT ARTIFACTS / PRODUCT SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E0DFD8] gap-4">
          <div>
            <span className="text-xs font-cinzel font-bold text-[#C5A059] uppercase tracking-[0.2em] block mb-1">
              CURATED COLLECTION
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#141414]">
              RECENT ARTIFACTS
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 bg-[#ECECE7] p-1 border border-[#E0DFD8]">
              {[
                { key: 'all', label: 'SEMUA' },
                { key: 'featured', label: 'UNGGULAN' },
                { key: 't-shirts', label: 'TEES' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-3 py-1 text-[10px] font-cinzel font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    selectedCategory === tab.key
                      ? 'bg-[#121214] text-[#C5A059]'
                      : 'text-[#706E6B] hover:text-[#141414]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#141414] hover:text-[#C5A059] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>LIHAT SEMUA ARTIFAK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Grid with React Bits Upgrades */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. THE ARCHIVE (CHAPTER CHRONICLES) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121214] text-[#F5F5F0] border-y border-[#27272A] relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Squares
            direction="left"
            speed={0.2}
            squareSize={60}
            borderColor="rgba(197, 160, 89, 0.15)"
            hoverFillColor="rgba(197, 160, 89, 0.3)"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold tracking-[0.3em] uppercase">
              CHAPTER CHRONICLES
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#F5F5F0]">
              THE ARCHIVE
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-[#A1A1AA]">
              Setiap drop membawa narasi dan universe berbeda yang terikat pada fase kehidupan manusia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chapter I: Mythology */}
            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.2)"
              borderColor="#C5A059"
              className="p-7 bg-[#18181B] border border-[#C5A059]/50 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#C5A059]">
                  <DecryptedText text="CHAPTER I // MYTHOLOGY" speed={30} maxIterations={8} animateOn="hover" />
                  <span className="px-2.5 py-0.5 border border-[#C5A059]/50 bg-[#C5A059]/15 text-[10px] uppercase font-bold text-[#C5A059]">
                    RELEASED
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl font-black text-[#F5F5F0] tracking-wide">
                  <ShinyText text="MOVING ON" speed={5.5} />
                </h3>
                <p className="text-xs font-mono-code text-[#A1A1AA] leading-relaxed">
                  Narasi mitologi Yunani kuno. Metafora manusia yang berani menerima kehilangan masa lalu dan melangkah maju menghadapi cakrawala baru dengan kepala tegak.
                </p>
              </div>
              <div className="pt-3 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono-code text-[#71717A]">
                <span>235 GSM COMBED 16S</span>
                <span className="text-[#C5A059] font-cinzel font-bold">AVAILABLE NOW</span>
              </div>
            </SpotlightCard>

            {/* Chapter II: Games */}
            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.15)"
              borderColor="rgba(197, 160, 89, 0.4)"
              className="p-7 bg-[#18181B]/80 border border-[#27272A] space-y-4 opacity-95 hover:opacity-100 transition-opacity flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#71717A]">
                  <DecryptedText text="CHAPTER II // GAMES" speed={30} maxIterations={8} animateOn="hover" />
                  <span className="px-2.5 py-0.5 border border-[#C5A059]/40 bg-[#C5A059]/10 text-[10px] uppercase font-bold text-[#C5A059]">
                    COMING SOON
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl font-black text-[#D4D4D8] tracking-wide">
                  RESPAWN & QUESTS
                </h3>
                <p className="text-xs font-mono-code text-[#A1A1AA] leading-relaxed">
                  Dunia game sebagai cermin realitas: kegagalan hanyalah checkpoint sementara, arti hidup dalam side quests, dan keberanian untuk menekan tombol Respawn.
                </p>
              </div>
              <div className="pt-3 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono-code text-[#52525B]">
                <span>DROP Q3 2026</span>
                <span className="text-[#C5A059] font-mono-code text-[10px]">IN PRODUCTION</span>
              </div>
            </SpotlightCard>

            {/* Chapter III: Anime */}
            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.12)"
              borderColor="rgba(197, 160, 89, 0.3)"
              className="p-7 bg-[#18181B]/60 border border-[#27272A] space-y-4 opacity-85 hover:opacity-100 transition-opacity flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#71717A]">
                  <DecryptedText text="CHAPTER III // ANIME" speed={30} maxIterations={8} animateOn="hover" />
                  <span className="px-2.5 py-0.5 border border-[#27272A] text-[10px] uppercase font-bold text-[#71717A]">
                    UPCOMING
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl font-black text-[#A1A1AA] tracking-wide">
                  LIMIT BREAK
                </h3>
                <p className="text-xs font-mono-code text-[#71717A] leading-relaxed">
                  Filosofi anime shonen: tekad melampaui batasan diri, menjadi tokoh utama dalam takdir sendiri, dan kekuatan ikatan emosional yang tak tergoyahkan.
                </p>
              </div>
              <div className="pt-3 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono-code text-[#52525B]">
                <span>DROP Q4 2026</span>
                <span>CONCEPT ARCHIVE</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 6. GARMENT ARCHITECTURE & FABRIC SPECS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[#E0DFD8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold uppercase tracking-widest">
              GARMENT ANATOMY
            </span>
            <h2 className="font-cinzel text-4xl sm:text-5xl font-black uppercase text-[#141414] leading-tight">
              KUALITAS YANG DAPAT KAMU RASAKAN.
            </h2>
            <p className="text-sm font-mono-code text-[#706E6B] leading-relaxed">
              Setiap tema drop dieksekusi di atas kanvas pakaian berbobot tebal. Kami menggunakan katun combed 16s 235 GSM presisi dengan kerah 2.5cm yang tahan terhadap siklus pencucian jangka panjang.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 border border-[#E0DFD8] bg-[#F5F5F0] space-y-1">
                <div className="text-lg sm:text-xl font-cinzel text-[#C5A059] font-black">
                  <AnimatedCounter value={235} suffix=" GSM" />
                </div>
                <p className="text-[10px] font-mono-code text-[#141414] uppercase font-bold">16s Heavyweight</p>
              </div>

              <div className="p-4 border border-[#E0DFD8] bg-[#F5F5F0] space-y-1">
                <div className="text-lg sm:text-xl font-cinzel text-[#C5A059] font-black">
                  <AnimatedCounter value={2.5} suffix=" cm" decimals={1} />
                </div>
                <p className="text-[10px] font-mono-code text-[#141414] uppercase font-bold">High Rib Collar</p>
              </div>

              <div className="p-4 border border-[#E0DFD8] bg-[#F5F5F0] space-y-1">
                <div className="text-lg sm:text-xl font-cinzel text-[#C5A059] font-black">
                  <AnimatedCounter value={100} suffix="%" />
                </div>
                <p className="text-[10px] font-mono-code text-[#141414] uppercase font-bold">Pure Combed</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] bg-[#F5F5F0] border border-[#E0DFD8] overflow-hidden relative shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"
              alt="Community streetwear fashion"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-[#121214]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#C5A059]/40 text-[10px] font-mono-code text-[#F5F5F0]">
              PRE-SHRUNK FABRIC MINIMIZING SHRINKAGE UNDER 2%
            </div>
          </div>
        </div>
      </section>

      {/* 7. MARKETPLACE TRUST & ORDER FLOW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E0DFD8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[16/10] bg-[#ECECE7] border border-[#E0DFD8] overflow-hidden relative shadow-md">
            <img
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"
              alt="Packaging and streetwear delivery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold uppercase tracking-widest">
              DIRECT & MARKETPLACE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase text-[#141414]">
              BELI DI TEMPAT YANG KAMU PERCAYA.
            </h2>
            <p className="text-sm font-mono-code text-[#706E6B] leading-relaxed">
              Kami menjaga pengalaman belanja tetap sederhana dan transparan: pilih artikel di katalog ini, lalu lanjut checkout di website langsung atau melalui marketplace resmi kami.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={settings.shopeeUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-[#E0DFD8] bg-[#FFFFFF] text-[#141414] text-[10px] font-cinzel font-bold uppercase tracking-widest hover:border-[#C5A059] hover:shadow-sm transition-all"
              >
                Shopee Official
              </a>
              <a
                href={settings.tokopediaUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-[#E0DFD8] bg-[#FFFFFF] text-[#141414] text-[10px] font-cinzel font-bold uppercase tracking-widest hover:border-[#C5A059] hover:shadow-sm transition-all"
              >
                Tokopedia Store
              </a>
              <a
                href={settings.tiktokshopUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-[#E0DFD8] bg-[#FFFFFF] text-[#141414] text-[10px] font-cinzel font-bold uppercase tracking-widest hover:border-[#C5A059] hover:shadow-sm transition-all"
              >
                TikTok Shop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BRAND MANIFESTO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-cinzel text-[#C5A059] font-bold uppercase tracking-[0.3em]">
          MANIFESTO
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl font-black uppercase text-[#141414]">
          {cms.brandStoryTitle || 'EVERY DROP TELLS A STORY'}
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-mono-code text-[#54524F] leading-relaxed">
          <p>
            {cms.brandStoryText1 ||
              'RdCloth adalah brand apparel storytelling. Kami percaya bahwa setiap pakaian dapat membawa makna mendalam dari berbagai fase dan kultur perjalanan hidup manusia.'}
          </p>
          <p>
            {cms.brandStoryText2 ||
              'Dari kisah Mitologi Kuno, dunia Games & Realitas Virtual, hingga Filosofi Anime—setiap drop kami rancang dengan riset narasi dan arsitektur pakaian berkualitas tinggi.'}
          </p>
        </div>
        <div className="pt-4">
          <Magnet strength={0.2}>
            <button
              onClick={() => setCurrentView('about')}
              className="inline-flex items-center space-x-2 text-xs font-cinzel font-bold uppercase tracking-widest text-[#141414] border-b-2 border-[#141414] pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors cursor-pointer"
            >
              <span>BACA CERITA LENGKAP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Magnet>
        </div>
      </section>

      {/* 9. SOCIAL PROOF & COMMUNITY LOOKBOOK */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ECECE7] border-t border-[#E0DFD8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 pb-6 border-b border-[#E0DFD8]">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
                COMMUNITY GALLERY
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#141414] mt-1">
                PEOPLE WEAR RDCLOTH.
              </h2>
            </div>
            <a
              href={settings.instagramUrl || 'https://instagram.com/rdcloth'}
              target="_blank"
              rel="noreferrer"
              className="mt-3 sm:mt-0 inline-flex items-center space-x-2 text-xs font-cinzel font-bold uppercase tracking-wider text-[#706E6B] hover:text-[#C5A059] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>{cms.instagramHandle || '@rdcloth.studio'}</span>
            </a>
          </div>

          {/* 6-image Community Instagram Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(cms.instagramImages && cms.instagramImages.length > 0
              ? cms.instagramImages
              : [
                'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop'
              ]
            ).map((imgUrl, idx) => (
              <a
                key={idx}
                href={settings.instagramUrl || 'https://instagram.com/rdcloth'}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square bg-[#FFFFFF] border border-[#E0DFD8] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                <img
                  src={imgUrl}
                  alt={`Community wearing RdCloth drop ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#121214]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#C5A059]" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-mono-code text-[#706E6B]">
              Tag <span className="text-[#141414] font-bold">@rdcloth</span> di Instagram untuk dimasukkan ke lookbook capsule resmi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
