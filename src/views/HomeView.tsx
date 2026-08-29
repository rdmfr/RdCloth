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
  X
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC = () => {
  const { products, collections, cms, setCurrentView, settings } = useStore();
  const [showMarketplaceSelector, setShowMarketplaceSelector] = useState(false);

  const marketplaceOptions = [
    { key: 'shopee', label: 'Shopee', href: settings.shopeeUrl || '#' },
    { key: 'tokopedia', label: 'Tokopedia', href: settings.tokopediaUrl || '#' },
    { key: 'tiktokshop', label: 'TikTok Shop', href: settings.tiktokshopUrl || '#' }
  ];

  // Featured 4 products for latest drop
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="w-full bg-[#F5F5F0] text-[#141414] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#27272A] bg-[#121214] text-[#F5F5F0]">
        {/* Background Visual - Thinker Statue */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/thinker-bg.png"
            alt="Thinker Statue"
            className="w-full h-full object-cover object-left-top sm:object-center opacity-65 saturate-90 contrast-125 scale-[1.02] filter brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214]/95 via-[#121214]/70 to-[#121214]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/60" />
        </div>

        <div
          aria-hidden="true"
          className="greek-watermark-text absolute right-[-1.5rem] bottom-24 z-[1] hidden select-none text-[clamp(3rem,9vw,8rem)] font-black leading-none sm:block"
        >
          ΓΝΩΘΙ ΣΕΑΥΤΟΝ
        </div>

        {/* Top Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#18181B]/90 border border-[#C5A059]/40 backdrop-blur-md px-3.5 py-1.5 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              {cms.heroTagline || 'DROP 01 // CHAPTER I: MOVING ON'}
            </span>
            <span className="hidden border-l border-[#C5A059]/40 pl-2 text-[10px] font-cormorant normal-case tracking-[0.12em] text-[#D4AF37] sm:inline">
              ΓΝΩΘΙ ΣΕΑΥΤΟΝ
            </span>
          </motion.div>
        </div>

        {/* Center Headlines */}
        <div className="relative z-10 max-w-7xl mx-auto w-full py-12 md:py-16">
          <div className="max-w-[980px] space-y-5 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2 md:space-y-3"
            >
              <span className="text-[10px] sm:text-xs md:text-sm font-cinzel font-bold tracking-[0.22em] text-[#C5A059] block uppercase">
                STORIES WORTH WEARING.
              </span>
              <h1 className="font-cinzel text-[2.9rem] sm:text-[4.5rem] md:text-[5.8rem] lg:text-[6.8rem] font-black uppercase tracking-[-0.06em] text-[#F5F5F0] leading-[0.82] max-w-[660px]">
                EVERY DROP
                <span className="block">TELLS A</span>
                <span className="block">STORY.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base font-mono-code text-[#D4D4D8] max-w-xl leading-relaxed backdrop-blur-xs bg-black/20 p-3 md:p-4 border-l-2 border-[#C5A059]"
            >
              {cms.heroSubheadline || 'Setiap drop membawa cerita yang berbeda. Streetwear premium dengan rasa yang kuat, ringan, dan mudah dibawa dalam keseharian.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-row flex-wrap items-center gap-3 max-w-[520px]"
            >
              <button
                id="hero-shop-cta"
                onClick={() => setCurrentView('shop')}
                className="px-4 py-3 bg-[#C5A059] text-[#121214] hover:bg-[#D4AF37] transition-all font-cinzel font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2 group shadow-lg w-fit min-w-[150px]"
              >
                <span>Jelajahi Drop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setShowMarketplaceSelector(true)}
                className="px-4 py-3 bg-[#121214]/90 hover:bg-[#17171A] text-[#F5F5F0] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all font-cinzel font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.18em] flex items-center justify-center shadow-sm backdrop-blur-md w-fit min-w-[150px]"
              >
                Beli di Marketplace
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hero Specs Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#A1A1AA]">
          <div className="flex items-center space-x-2">
            <span className="text-[#C5A059] font-cinzel font-bold">235 GSM</span>
            <span>HEAVYWEIGHT COMBED COTTON</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[#C5A059] font-cinzel font-bold">CHAPTER I</span>
            <span>ODYSSEUS NARRATIVE</span>
          </div>
          <div className="flex items-center space-x-2 text-[#C5A059] font-cinzel">
            <span>BANDUNG, ID</span>
            <span>•</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </section>

      {showMarketplaceSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/55 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[640px] bg-[#F1EFEA] border border-[#D8D3C6] shadow-[0_30px_80px_rgba(0,0,0,0.28)] p-5 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                Pilih Marketplace
              </span>
              <button
                type="button"
                onClick={() => setShowMarketplaceSelector(false)}
                className="p-1 text-[#141414] hover:text-[#C5A059] transition-colors"
                aria-label="Tutup marketplace selector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-cinzel text-[2.2rem] sm:text-[3rem] font-black uppercase leading-none tracking-[-0.07em] text-[#141414] mb-5">
              RdCloth Studio
            </h3>

            <div className="space-y-3">
              {marketplaceOptions.map(option => (
                <a
                  key={option.key}
                  href={option.href}
                  target={option.href !== '#' ? '_blank' : undefined}
                  rel={option.href !== '#' ? 'noreferrer' : undefined}
                  onClick={() => setShowMarketplaceSelector(false)}
                  className="flex items-center justify-between w-full border border-[#D9D3C8] bg-[#F6F3EE] px-4 py-4 text-left transition-colors hover:border-[#141414] hover:bg-[#FFFDF9]"
                >
                  <span className="font-cinzel text-base sm:text-lg font-bold uppercase tracking-[0.18em] text-[#141414]">
                    {option.label}
                  </span>
                  <span className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-[#706E6B]">
                    {option.href !== '#' ? 'Buka' : 'Segera'}
                  </span>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMarketplaceSelector(false)}
              className="mt-5 w-full border border-[#D9D3C8] bg-[#ECE7DF] px-4 py-3 text-[10px] font-cinzel font-bold uppercase tracking-[0.3em] text-[#141414] hover:bg-[#E1D9CB] transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* 2. MARQUEE TICKER */}
      <section className="bg-[#121214] text-[#C5A059] py-3.5 overflow-hidden border-y border-[#27272A] select-none">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
          <span>{cms.marqueeText}</span>
          <span>{cms.marqueeText}</span>
          <span>{cms.marqueeText}</span>
        </div>
      </section>

      {/* 3. WHY RDCLOTH */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E0DFD8]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-cinzel text-[#C5A059] font-bold tracking-[0.3em] uppercase">
            WHY RDCLOTH
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#141414]">
            STORIES THAT FEEL REAL.
          </h2>
          <p className="text-xs font-mono-code text-[#706E6B] pt-1">
            Streetwear premium untuk orang yang hidup dengan cerita, bukan sekadar tren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 relative group hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold">01</span>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">STORY-LED</h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Setiap drop punya ide, mood, dan makna yang berbeda. Bukan sekadar desain acak.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 relative group hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold">02</span>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">PREMIUM FEEL</h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Kualitas bahan dan potongan dibuat supaya terasa premium di hari-hari biasa.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 relative group hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold">03</span>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#141414]">EASY TO BUY</h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Cukup pilih ukuran, lalu lanjut ke marketplace favorit Anda untuk checkout.
            </p>
          </div>

          <div className="p-6 bg-[#121214] border-2 border-[#C5A059] text-[#F5F5F0] space-y-3 relative group shadow-md">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold">04</span>
            <h3 className="font-cinzel text-lg font-bold uppercase text-[#F5F5F0]">WEAR IT</h3>
            <p className="text-xs font-mono-code text-[#A1A1AA] leading-relaxed">
              Pakai dengan percaya diri, semua formatnya siap untuk dinikmati dalam keseharian.
            </p>
          </div>
        </div>
      </section>

      {/* 4. RECENT ARTIFACTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0DFD8]">
          <div>
            <span className="text-xs font-cinzel font-bold text-[#C5A059] uppercase tracking-[0.2em] block mb-1">
              CURATED COLLECTION
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#141414]">
              RECENT ARTIFACTS
            </h2>
          </div>
          <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end space-x-6">
            <p className="text-xs font-mono-code text-[#706E6B]">
              {cms.featuredDropSubtitle || 'Stories that have already been told.'}
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#141414] hover:text-[#C5A059] flex items-center space-x-1 transition-colors"
            >
              <span>LIHAT SEMUA PRODUK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. THE ARCHIVE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#121214] text-[#F5F5F0] border-y border-[#27272A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold tracking-[0.3em] uppercase">
              CHAPTER CHRONICLES
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase text-[#F5F5F0]">
              THE ARCHIVE
            </h2>
            <p className="text-xs font-mono-code text-[#A1A1AA]">
              Stories that have already been told and chapters yet to unfold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chapter I */}
            <div className="p-6 bg-[#18181B] border border-[#C5A059]/40 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#C5A059]">
                <span>CHAPTER I</span>
                <span className="px-2 py-0.5 border border-[#C5A059]/40 bg-[#C5A059]/10 text-[10px] uppercase font-bold">RELEASED</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#F5F5F0]">MOVING ON</h3>
              <p className="text-xs font-mono-code text-[#A1A1AA] leading-relaxed">
                The Odyssey narrative. Accepting past loss and moving forward toward new horizons.
              </p>
            </div>

            {/* Chapter II */}
            <div className="p-6 bg-[#18181B]/50 border border-[#27272A] space-y-4 opacity-75">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#71717A]">
                <span>CHAPTER II</span>
                <span className="px-2 py-0.5 border border-[#27272A] text-[10px] uppercase font-bold text-[#71717A]">COMING SOON</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#D4D4D8]">THE FALL</h3>
              <p className="text-xs font-mono-code text-[#71717A] leading-relaxed">
                The Icarus tragedy. Ambition, daring flight, and the beauty of reaching too high.
              </p>
            </div>

            {/* Chapter III */}
            <div className="p-6 bg-[#18181B]/30 border border-[#27272A] space-y-4 opacity-60">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#71717A]">
                <span>CHAPTER III</span>
                <span className="px-2 py-0.5 border border-[#27272A] text-[10px] uppercase font-bold text-[#71717A]">UPCOMING</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#A1A1AA]">ENDURE</h3>
              <p className="text-xs font-mono-code text-[#71717A] leading-relaxed">
                The Atlas weight. Quiet strength, carrying your universe without complaints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SHOPPING FLOW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[#E0DFD8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold uppercase tracking-widest">
              CARA BELI
            </span>
            <h2 className="font-cinzel text-4xl sm:text-5xl font-black uppercase text-[#141414] leading-none">
              MUDAH, CEPAT, DAN JELAS.
            </h2>
            <p className="text-sm font-mono-code text-[#706E6B] leading-relaxed">
              Dari katalog sampai checkout, prosesnya dibuat agar pelanggan bisa memilih produk dengan cepat lalu melanjutkan pembelian di marketplace yang paling nyaman untuk mereka.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 border border-[#E0DFD8] bg-[#F5F5F0]">
                <div className="text-xs font-cinzel text-[#C5A059] font-bold">01</div>
                <p className="mt-2 text-xs font-mono-code text-[#141414] uppercase">Browse drop</p>
              </div>
              <div className="p-4 border border-[#E0DFD8] bg-[#F5F5F0]">
                <div className="text-xs font-cinzel text-[#C5A059] font-bold">02</div>
                <p className="mt-2 text-xs font-mono-code text-[#141414] uppercase">Pilih ukuran</p>
              </div>
              <div className="p-4 border border-[#E0DFD8] bg-[#F5F5F0]">
                <div className="text-xs font-cinzel text-[#C5A059] font-bold">03</div>
                <p className="mt-2 text-xs font-mono-code text-[#141414] uppercase">Checkout</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] bg-[#F5F5F0] border border-[#E0DFD8] overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"
              alt="Community streetwear fashion"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 7. MARKETPLACE TRUST */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E0DFD8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[16/10] bg-[#ECECE7] border border-[#E0DFD8] overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"
              alt="Packaging and streetwear delivery"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-cinzel text-[#C5A059] font-bold uppercase tracking-widest">
              MARKETPLACE READY
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase text-[#141414]">
              BELI DI TEMPAT YANG KAMU PERCAYA.
            </h2>
            <p className="text-sm font-mono-code text-[#706E6B] leading-relaxed">
              Kami menjaga pengalaman belanja tetap sederhana: pilih produk, lihat detail, lalu lanjut ke Shopee, Tokopedia, atau TikTok Shop sesuai preferensi Anda.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={settings.shopeeUrl || '#'} target="_blank" rel="noreferrer" className="px-4 py-2 border border-[#E0DFD8] bg-[#FFFFFF] text-[#141414] text-[10px] font-cinzel uppercase tracking-widest hover:border-[#141414]">
                Shopee
              </a>
              <a href={settings.tokopediaUrl || '#'} target="_blank" rel="noreferrer" className="px-4 py-2 border border-[#E0DFD8] bg-[#FFFFFF] text-[#141414] text-[10px] font-cinzel uppercase tracking-widest hover:border-[#141414]">
                Tokopedia
              </a>
              <a href={settings.tiktokshopUrl || '#'} target="_blank" rel="noreferrer" className="px-4 py-2 border border-[#E0DFD8] bg-[#FFFFFF] text-[#141414] text-[10px] font-cinzel uppercase tracking-widest hover:border-[#141414]">
                TikTok Shop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY ANCIENT STORIES? (BRAND MANIFESTO) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-cinzel text-[#C5A059] font-bold uppercase tracking-[0.3em]">
          MANIFESTO
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl font-black uppercase text-[#141414]">
          {cms.brandStoryTitle || 'WHY ANCIENT STORIES?'}
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-mono-code text-[#54524F] leading-relaxed">
          <p>
            {cms.brandStoryText1 ||
              'Thousands of years ago, people told stories about love, loss, ambition, failure, and hope. We still live through the same things today. The names changed. The world changed. But the stories didn\'t.'}
          </p>
          <p>
            {cms.brandStoryText2 ||
              'RdCloth reinterprets those timeless human stories into architectural garments you can wear.'}
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => setCurrentView('about')}
            className="inline-flex items-center space-x-2 text-xs font-cinzel font-bold uppercase tracking-widest text-[#141414] border-b border-[#141414] pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
          >
            <span>READ THE FULL STORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 8. SOCIAL PROOF & COMMUNITY LOOKBOOK: "PEOPLE WEAR RDCLOTH" */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ECECE7] border-t border-[#E0DFD8]">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 pb-6 border-b border-[#E0DFD8]">
      <div>
        <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
          COMMUNITY GALLERY
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#141414] mt-1">
          PEOPLE WEAR RDCLOTH.
        </h2>
      </div>
      <a
        href={settings.instagramUrl || 'https://instagram.com/rdcloth'}
        target="_blank"
        rel="noreferrer"
        className="mt-3 sm:mt-0 inline-flex items-center space-x-2 text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414] transition-colors"
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
          className="group relative aspect-square bg-[#FFFFFF] border border-[#E0DFD8] overflow-hidden shadow-xs"
        >
          <img
            src={imgUrl}
            alt={`Community wearing RdCloth drop ${idx + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white" />
          </div>
        </a>
      ))}
    </div>

    <div className="mt-8 text-center">
      <p className="text-xs font-mono-code text-[#706E6B]">
        Tag <span className="text-[#141414] font-bold">@rdcloth</span> on Instagram to be featured on our lookbook capsule.
      </p>
    </div>
  </div>
</section>
    </div>
  );
};
