import React from 'react';
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
  PackageCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC = () => {
  const { products, collections, cms, setCurrentView, settings } = useStore();

  // Featured 4 products for latest drop
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="w-full bg-[#F5F5F0] text-[#141414] overflow-hidden">
      {/* 1. HERO SECTION (Ancient Greek Thinker & Neoclassical Streetwear Campaign) */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#C5A059] bg-[#121214] text-[#F5F5F0]">
        {/* Background Editorial Visual - Classical Thinker Statue */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/thinker-bg.png"
            alt="Ancient Greek Philosopher Thinker Statue"
            className="w-full h-full object-cover object-left-top sm:object-center opacity-65 saturate-90 contrast-125 scale-[1.02] filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Moody dark vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214]/95 via-[#121214]/70 to-[#121214]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/60" />
        </div>

        {/* Top Tagline / Capsule Release Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#18181B]/90 border border-[#C5A059]/40 backdrop-blur-md px-3.5 py-1.5 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              {cms.heroTagline || 'DROP MMXXIV // PHILOSOPHER\'S EDITION'}
            </span>
          </motion.div>
        </div>

        {/* Center Editorial Headlines */}
        <div className="relative z-10 max-w-7xl mx-auto w-full py-12 md:py-16">
          <div className="max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2"
            >
              <span className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.3em] text-[#C5A059] block uppercase">
                🏛️ ΓΝΩΘΙ ΣΕΑΥΤΟΝ — KNOW THYSELF
              </span>
              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[#F5F5F0] leading-[0.88] drop-shadow-md">
                {cms.heroHeadline || 'WEAR YOUR IDEA.'}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl font-mono-code text-[#D4D4D8] max-w-xl leading-relaxed backdrop-blur-xs bg-black/20 p-2 border-l-2 border-[#C5A059]"
            >
              {cms.heroSubheadline || 'Crafted for modern thinkers. Heavyweight streetwear infused with timeless Stoic philosophy.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md"
            >
              <button
                id="hero-shop-cta"
                onClick={() => setCurrentView('shop')}
                className="px-8 py-4 bg-[#C5A059] text-[#121214] hover:bg-[#D4AF37] transition-all font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 group shadow-lg"
              >
                <span>{cms.heroCtaText || 'EXPLORE COLLECTION'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-custom-cta"
                onClick={() => setCurrentView('custom')}
                className="px-8 py-4 bg-[#18181B]/80 hover:bg-[#27272A] text-[#F5F5F0] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-sm backdrop-blur-md"
              >
                <span>{cms.heroSecondaryCtaText || 'CUSTOM STUDIO'}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Specs Badges */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#A1A1AA]">
          <div className="flex items-center space-x-2">
            <span className="text-[#C5A059] font-cinzel font-bold">235 GSM</span>
            <span>HEAVYWEIGHT COMBED COTTON 16S</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[#C5A059] font-cinzel font-bold">CLASSICAL CUT</span>
            <span>BOXY DROP SHOULDER SILHOUETTE</span>
          </div>
          <div className="flex items-center space-x-2 text-[#C5A059] font-cinzel">
            <span>BANDUNG, ID</span>
            <span>•</span>
            <span>MMXXIV</span>
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL ROLLING MARQUEE TICKER WITH GREEK MEANDER MOTIF */}
      <section className="bg-[#121214] text-[#C5A059] py-3.5 overflow-hidden border-y-2 border-[#C5A059] select-none shadow-md">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
          <span>🏛️ {cms.marqueeText} 🏛️</span>
          <span>🏛️ {cms.marqueeText} 🏛️</span>
          <span>🏛️ {cms.marqueeText} 🏛️</span>
        </div>
      </section>

      {/* 3. FEATURED COLLECTION: LATEST DROP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0DFD8]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-[#706E6B] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>DROP 001 CAPSULE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#141414]">
              LATEST DROP
            </h2>
          </div>
          <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end space-x-6">
            <p className="text-xs font-mono-code text-[#706E6B]">
              {cms.featuredDropSubtitle || 'Small batch. Big personality.'}
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-heading font-black uppercase tracking-wider text-[#141414] hover:text-[#F27D26] flex items-center space-x-1 transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. "MAKE IT YOURS" CUSTOM APPAREL TEASER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-y border-[#E0DFD8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Preview */}
          <div className="lg:col-span-6 relative group">
            <div className="aspect-[4/3] bg-[#F5F5F0] border border-[#E0DFD8] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"
                alt="Custom apparel preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Graphic Mockup Badge Overlay */}
              <div className="absolute inset-0 bg-black/25 flex flex-col justify-between p-6">
                <span className="bg-[#141414] text-[#F5F5F0] font-mono-code text-[10px] font-black uppercase px-2.5 py-1 self-start shadow-sm">
                  CUSTOM STUDIO // NO MINIMUM ORDER
                </span>
                <div className="bg-[#FFFFFF]/95 border border-[#E0DFD8] backdrop-blur-md p-4 text-xs font-mono-code space-y-1 shadow-sm">
                  <p className="text-[#F27D26] font-bold">1. CHOOSE APPAREL & COLOR</p>
                  <p className="text-[#706E6B]">2. UPLOAD ARTWORK (PNG/PDF)</p>
                  <p className="text-[#141414] font-bold">3. HIGH-DENSITY PRINTING BY RDCLOTH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
              01 / PERSONAL APPAREL
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#141414] leading-none">
              MAKE IT YOURS.
            </h2>
            <div className="space-y-3 text-sm font-mono-code text-[#706E6B] leading-relaxed">
              <p>
                Turn your sketch, band artwork, studio logo, or custom statement into heavy streetwear you can actually wear every day.
              </p>
              <p>
                No rigid minimum order. Printed on our signature 235 GSM combed cotton blanks using industrial Japanese DTF & plastisol technology.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] text-center">
                <span className="text-[10px] font-mono-code uppercase text-[#706E6B] block">MINIMUM</span>
                <span className="font-heading text-sm font-bold text-[#141414]">1 PIECE</span>
              </div>
              <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] text-center">
                <span className="text-[10px] font-mono-code uppercase text-[#706E6B] block">ESTIMATION</span>
                <span className="font-heading text-sm font-bold text-[#141414]">2-4 DAYS</span>
              </div>
              <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono-code uppercase text-[#706E6B] block">STARTING FROM</span>
                <span className="font-heading text-sm font-bold text-[#F27D26]">Rp 89.000</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="home-make-custom-btn"
                onClick={() => setCurrentView('custom')}
                className="w-full sm:w-auto px-8 py-4 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>OPEN CUSTOM STUDIO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY: "MORE THAN A T-SHIRT." */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
        <span className="text-xs font-mono-code uppercase tracking-[0.3em] text-[#706E6B]">
          MANIFESTO
        </span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#141414]">
          {cms.brandStoryTitle || 'MORE THAN A T-SHIRT.'}
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto text-sm sm:text-base font-mono-code text-[#54524F] leading-relaxed">
          <p>
            {cms.brandStoryText1 ||
              'RdCloth started with a simple idea: You should be able to wear something that actually feels like you.'}
          </p>
          <p>
            {cms.brandStoryText2 ||
              'We make apparel that gives your ideas a place to exist. Simple. Personal. Yours.'}
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => setCurrentView('about')}
            className="inline-flex items-center space-x-2 text-xs font-heading font-black uppercase tracking-widest text-[#141414] border-b-2 border-[#141414] pb-1 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors"
          >
            <span>READ OUR WORKSHOP STORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 6. VISUAL BREAK SECTION (Neoclassical Dark Marble Typography Statement) */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-dark-marble text-[#F5F5F0] border-y-2 border-[#C5A059] overflow-hidden text-center flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-cinzel text-8xl sm:text-[12rem] font-black text-[#C5A059] tracking-widest">
            🏛️
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          <span className="inline-block px-3 py-1 bg-[#18181B] border border-[#C5A059]/40 text-[#C5A059] text-[11px] font-cinzel font-bold tracking-[0.3em] uppercase">
            STATEMENT MMXXIV // PHILOSOPHIA
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#F5F5F0] leading-[0.9]">
            {cms.visualBreakQuote || "YOU DON'T NEED EVERYONE TO GET IT."}
          </h2>
          <div className="flex items-center justify-center space-x-3 text-xs font-serif-greek font-bold text-[#C5A059] pt-3">
            <span>ΓΝΩΘΙ ΣΕΑΥΤΟΝ</span>
            <span>—</span>
            <span className="font-mono-code uppercase tracking-widest text-[#A1A1AA]">WEAR YOUR IDEA. // RDCLOTH APPAREL STUDIO</span>
          </div>
        </div>
      </section>

      {/* 7. WHY RDCLOTH (4 Minimalist Pillars) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
            THE FOUNDATION
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-[#141414] tracking-tight">
            WHY RDCLOTH
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 group hover:border-[#141414] transition-colors shadow-xs">
            <div className="w-10 h-10 bg-[#F5F5F0] flex items-center justify-center text-[#141414] border border-[#E0DFD8]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold uppercase text-[#141414] tracking-wide">
              QUALITY
            </h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Made with attention to detail. 235 GSM combed cotton with high shape retention ribbed collars.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 group hover:border-[#141414] transition-colors shadow-xs">
            <div className="w-10 h-10 bg-[#F5F5F0] flex items-center justify-center text-[#141414] border border-[#E0DFD8]">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold uppercase text-[#141414] tracking-wide">
              CUSTOM
            </h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Your idea, your way. From 1-piece custom printing to full community drop production.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 group hover:border-[#141414] transition-colors shadow-xs">
            <div className="w-10 h-10 bg-[#F5F5F0] flex items-center justify-center text-[#141414] border border-[#E0DFD8]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold uppercase text-[#141414] tracking-wide">
              SMALL BATCH
            </h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Less mass-produced. More personal. Numbered release drops that won't flood every street corner.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 group hover:border-[#141414] transition-colors shadow-xs">
            <div className="w-10 h-10 bg-[#F5F5F0] flex items-center justify-center text-[#141414] border border-[#E0DFD8]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold uppercase text-[#141414] tracking-wide">
              QC
            </h3>
            <p className="text-xs font-mono-code text-[#706E6B] leading-relaxed">
              Every single order is thoroughly inspected for stitch density and print adhesion before shipping.
            </p>
          </div>
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
