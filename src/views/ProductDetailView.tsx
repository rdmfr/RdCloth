import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR, formatDate } from '../utils/formatters';
import { 
  Ruler, 
  Heart, 
  Minus, 
  Plus, 
  Check, 
  ShieldCheck, 
  Truck, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Share2, 
  Sparkles,
  ArrowLeft,
  MessageSquarePlus,
  Compass,
  Layers,
  Flame,
  Info,
  Maximize2
} from 'lucide-react';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { ShinyText } from '../components/reactbits/ShinyText';
import { Magnet } from '../components/reactbits/Magnet';
import { TiltedCard } from '../components/reactbits/TiltedCard';
import { AnimatedCounter } from '../components/reactbits/AnimatedCounter';

export const ProductDetailView: React.FC = () => {
  const { 
    products, 
    viewParam, 
    setCurrentView, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    setIsSizeGuideOpen,
    reviews,
    submitReview,
    showToast,
    setIsCartOpen,
    settings
  } = useStore();

  // Find product by slug or id
  const product = products.find(p => p.slug === viewParam || p.id === viewParam) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: 'Black', hex: '#121212' });
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'L');
  const [quantity, setQuantity] = useState<number>(1);
  const [showMarketplaceSelector, setShowMarketplaceSelector] = useState<boolean>(false);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  
  // Accordion states
  const [openSection, setOpenSection] = useState<'material' | 'care' | 'shipping' | null>('material');
  
  // Review Modal state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState<number>(5);
  const [revFit, setRevFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [revComment, setRevComment] = useState('');

  const buyButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for Sticky Quick-Buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        if (rect.bottom < 0) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-32 text-center">
        <p className="font-cinzel text-xl uppercase">Artifak Tidak Ditemukan</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-6 py-2.5 bg-[#121214] text-[#F5F5F0] text-xs font-cinzel uppercase font-bold hover:bg-[#C5A059] hover:text-[#121214]"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const isFav = wishlist.includes(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id && r.isApproved);
  const currentVariant = product.variants.find(
    v => v.size === selectedSize && v.colorName.toLowerCase() === selectedColor.name.toLowerCase()
  ) || product.variants[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      price: product.price,
      image: product.images[0]?.url || '',
      size: selectedSize,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      quantity
    });
  };

  const marketplaceOptions = [
    { key: 'shopee' as const, label: 'Shopee Official', href: product.marketplaceLinks?.shopee || settings.shopeeUrl },
    { key: 'tokopedia' as const, label: 'Tokopedia Store', href: product.marketplaceLinks?.tokopedia || settings.tokopediaUrl },
    { key: 'tiktokshop' as const, label: 'TikTok Shop', href: product.marketplaceLinks?.tiktokshop || settings.tiktokshopUrl }
  ];

  const handleMarketplacePurchase = (channel: 'shopee' | 'tokopedia' | 'tiktokshop') => {
    const selected = marketplaceOptions.find(option => option.key === channel);
    const targetUrl = selected?.href;

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      showToast(`Membuka toko resmi di ${selected?.label}...`, 'success');
      setShowMarketplaceSelector(false);
      return;
    }

    showToast('Marketplace belum dikonfigurasi untuk produk ini.', 'info');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) {
      showToast('Mohon isi nama dan ulasan Anda.', 'error');
      return;
    }
    await submitReview({
      productId: product.id,
      productName: product.name,
      userName: revName,
      rating: revRating,
      fitFeedback: revFit,
      sizePurchased: selectedSize,
      comment: revComment,
      isApproved: true
    });
    setShowReviewModal(false);
    setRevName('');
    setRevComment('');
  };

  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-24 pb-28">
      {/* Breadcrumb Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center space-x-2 text-xs font-cinzel uppercase font-bold text-[#706E6B] hover:text-[#C5A059] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>KEMBALI KE KATALOG</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT: Large Interactive Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image with Interactive Lens Zoom */}
            <div
              className="relative aspect-[3/4] sm:aspect-[4/5] bg-[#FFFFFF] border-2 border-[#E0DFD8] overflow-hidden group shadow-lg cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMoveZoom}
            >
              <img
                src={product.images[activeImageIndex]?.url || product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-200"
                style={
                  isZoomed
                    ? {
                        transform: 'scale(1.8)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                      }
                    : { transform: 'scale(1)' }
                }
                referrerPolicy="no-referrer"
              />

              {/* Badge Overlay */}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#121214]/95 text-[#C5A059] border border-[#C5A059]/50 text-[10px] font-cinzel font-bold px-3 py-1 uppercase tracking-widest shadow-md backdrop-blur-sm pointer-events-none">
                  {product.badge}
                </span>
              )}

              {/* Zoom Indicator Icon */}
              <div className="absolute bottom-4 right-4 bg-[#121214]/80 text-[#C5A059] p-2 backdrop-blur-md border border-[#C5A059]/30 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute top-4 right-4 p-2.5 border border-[#E0DFD8] backdrop-blur-md transition-all shadow-sm ${
                  isFav ? 'bg-[#121214] text-[#C5A059] border-[#C5A059]' : 'bg-white/90 text-[#706E6B] hover:text-[#141414]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-[#C5A059]' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] bg-[#FFFFFF] border-2 overflow-hidden transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#C5A059] shadow-md scale-[1.02]'
                        : 'border-[#E0DFD8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Model Fit Drape & Spec Card */}
            <div className="p-4 bg-[#ECECE7] border border-[#E0DFD8] flex items-center justify-between text-xs font-mono-code text-[#706E6B]">
              <div className="flex items-center space-x-2 text-[#141414]">
                <Info className="w-4 h-4 text-[#C5A059]" />
                <span className="font-bold">FIT & DRAPE:</span>
                <span>Model 182 cm / 74 kg mengenakan ukuran <strong>L (Boxy Drop Shoulder)</strong></span>
              </div>
              <span className="text-[10px] text-[#C5A059] font-cinzel font-bold hidden sm:inline">TRUE TO SIZE</span>
            </div>
          </div>

          {/* RIGHT: Product Information & Purchase Studio */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-[#E0DFD8] pb-6">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#706E6B]">
                <DecryptedText
                  text={product.artifactCode || `RDC / 00${product.id.replace('prod-', '')}`}
                  speed={30}
                  maxIterations={8}
                  className="font-cinzel text-[#C5A059] font-bold"
                  encryptedClassName="text-[#C5A059]"
                />
                <span className="font-cinzel text-[#141414] font-bold">{product.chapter || 'CHAPTER I'}</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider text-[#141414] leading-tight pt-1">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs font-mono-code uppercase text-[#706E6B]">
                  <ShinyText text={product.tagline} speed={4} />
                </p>
              )}

              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-2xl font-mono-code font-bold text-[#141414]">
                  {formatIDR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono-code text-[#706E6B] line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] font-mono-code text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 uppercase font-bold">
                  TERSEDIA ({currentVariant?.stock ?? 12} PCS)
                </span>
              </div>
            </div>

            {/* Narrative Story Block */}
            <SpotlightCard
              spotlightColor="rgba(197, 160, 89, 0.12)"
              borderColor="rgba(197, 160, 89, 0.4)"
              className="p-5 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs"
            >
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                <span className="text-xs font-cinzel text-[#C5A059] font-bold tracking-widest uppercase block">
                  THE NARRATIVE & CONCEPT
                </span>
              </div>
              <p className="text-xs font-mono-code text-[#54524F] leading-relaxed italic">
                "{product.storyDescription || 'Setiap drop membawa narasi dan makna tersendiri tentang fase kehidupan manusia.'}"
              </p>

              {/* Symbolism Breakdown (if available) */}
              {product.symbolism && product.symbolism.length > 0 && (
                <div className="pt-3 border-t border-[#E0DFD8] space-y-2">
                  <span className="text-[10px] font-cinzel font-bold text-[#141414] uppercase tracking-wider block">
                    MAKNA SIMBOLIK PADA DESAIN:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {product.symbolism.map((sym, i) => (
                      <div key={i} className="p-2.5 bg-[#F5F5F0] border border-[#E0DFD8] space-y-0.5">
                        <span className="text-[10px] font-cinzel font-bold text-[#C5A059] block">
                          {sym.label}
                        </span>
                        <span className="text-[11px] font-mono-code text-[#706E6B] leading-tight block">
                          {sym.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SpotlightCard>

            {/* Garment Fabric Anatomy Badges */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-[#FFFFFF] border border-[#E0DFD8] text-center space-y-0.5">
                <span className="text-[10px] font-mono-code text-[#706E6B] block">DENSITY</span>
                <span className="text-xs font-cinzel font-bold text-[#C5A059]">235 GSM 16S</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E0DFD8] text-center space-y-0.5">
                <span className="text-[10px] font-mono-code text-[#706E6B] block">COLLAR</span>
                <span className="text-xs font-cinzel font-bold text-[#C5A059]">2.5 CM RIB</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E0DFD8] text-center space-y-0.5">
                <span className="text-[10px] font-mono-code text-[#706E6B] block">PRINTING</span>
                <span className="text-xs font-cinzel font-bold text-[#C5A059]">JAPANESE DTF</span>
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-[#706E6B] uppercase font-bold">WARNA:</span>
                <span className="text-[#141414] font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-[#C5A059] scale-110 shadow-md'
                        : 'border-[#E0DFD8] hover:border-[#706E6B]'
                    }`}
                  >
                    <span
                      className="w-full h-full rounded-full block"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Link */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-[#706E6B] uppercase font-bold">PILIH UKURAN:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#141414] hover:text-[#C5A059] flex items-center space-x-1 underline underline-offset-2 transition-colors font-bold cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>PANDUAN UKURAN</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono-code uppercase font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#121214] text-[#C5A059] border-[#121214] shadow-sm'
                          : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414] hover:border-[#C5A059]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Bag CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-[#E0DFD8] bg-[#FFFFFF] h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-[#706E6B] hover:text-[#141414] transition-colors cursor-pointer"
                    aria-label="Kurang"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-mono-code font-bold text-sm text-[#141414] min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-[#706E6B] hover:text-[#141414] transition-colors cursor-pointer"
                    aria-label="Tambah"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  ref={buyButtonRef}
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#121214] text-[#F5F5F0] hover:bg-[#C5A059] hover:text-[#121214] transition-all font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <span>TAMBAH KE BAG</span>
                  <span>•</span>
                  <span>{formatIDR(product.price * quantity)}</span>
                </button>
              </div>

              <button
                id="pdp-buy-now-btn"
                onClick={() => setShowMarketplaceSelector(true)}
                className="w-full h-12 bg-[#FFFFFF] hover:bg-[#ECECE7] text-[#141414] border-2 border-[#C5A059] hover:border-[#141414] transition-all font-cinzel font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center shadow-xs cursor-pointer"
              >
                BELI DI OFFICIAL MARKETPLACE →
              </button>
            </div>

            {/* Delivery & Assurance Badges */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] space-y-2 text-xs font-mono-code text-[#706E6B]">
              <div className="flex items-center space-x-2 text-[#141414]">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                <span>GRATIS ONGKIR DENGAN PEMBELIAN MINIMAL RP 250.000</span>
              </div>
              <div className="flex items-center space-x-2 text-[#706E6B]">
                <ShieldCheck className="w-4 h-4 text-[#141414]" />
                <span>Garansi tukar ukuran 3 hari jika belum pernah dicuci/dipakai</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#E0DFD8] divide-y divide-[#E0DFD8] pt-2">
              {/* Material & Specs */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'material' ? null : 'material')}
                  className="w-full py-4 flex items-center justify-between text-xs font-cinzel uppercase font-bold text-[#141414] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span>MATERIAL & ARSITEKTUR KAIN</span>
                  {openSection === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'material' && (
                  <div className="pb-4 space-y-2 text-xs font-mono-code text-[#706E6B]">
                    <p><strong>FABRIC:</strong> {product.material}</p>
                    <p><strong>FIT:</strong> {product.fit}</p>
                    <ul className="list-disc list-inside space-y-1 pt-1 text-[#706E6B]">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
                  className="w-full py-4 flex items-center justify-between text-xs font-cinzel uppercase font-bold text-[#141414] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span>PETUNJUK PERAWATAN</span>
                  {openSection === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'care' && (
                  <div className="pb-4 space-y-1.5 text-xs font-mono-code text-[#706E6B]">
                    {product.care.map((c, i) => (
                      <p key={i}>• {c}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'shipping' ? null : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-xs font-cinzel uppercase font-bold text-[#141414] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span>PENGIRIMAN & PENUKARAN</span>
                  {openSection === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'shipping' && (
                  <div className="pb-4 space-y-2 text-xs font-mono-code text-[#706E6B]">
                    <p>• Pesanan dikirim dalam 24 jam kerja dari workshop Bandung.</p>
                    <p>• Kurir tersedia: JNE, SiCepat, J&T, dan GoSend Instant.</p>
                    <p>• Layanan retur tukar size tersedia selama hangtag masih terpasang rapi.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-24 pt-12 border-t border-[#E0DFD8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
                VERIFIED FEEDBACK
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#141414] mt-1">
                CUSTOMER REVIEWS ({productReviews.length})
              </h2>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] hover:border-[#C5A059] text-xs font-cinzel uppercase font-bold flex items-center space-x-2 transition-all self-start sm:self-auto shadow-xs cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#C5A059]" />
              <span>TULIS ULASAN</span>
            </button>
          </div>

          {productReviews.length === 0 ? (
            <div className="p-8 text-center bg-[#FFFFFF] border border-[#E0DFD8] text-xs font-mono-code text-[#706E6B]">
              Belum ada ulasan untuk artifak ini. Jadilah yang pertama memberikan testimoni!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productReviews.map(rev => (
                <div key={rev.id} className="p-5 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono-code text-[#706E6B]">
                      {formatDate(rev.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs font-mono-code text-[#141414] leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="pt-2 border-t border-[#E0DFD8] flex items-center justify-between text-[11px] font-mono-code text-[#706E6B]">
                    <span className="text-[#141414] font-bold">{rev.userName}</span>
                    {rev.sizePurchased && <span>Size: {rev.sizePurchased}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Quick-Buy Bar (Mobile & Desktop) */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121214]/95 backdrop-blur-xl border-t border-[#C5A059]/40 p-3 sm:p-4 shadow-2xl transition-all animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-12 h-12 object-cover border border-[#C5A059]/40"
              />
              <div>
                <p className="font-cinzel text-xs font-bold text-[#F5F5F0] uppercase truncate max-w-[160px] sm:max-w-xs">
                  {product.name}
                </p>
                <p className="text-xs font-mono-code text-[#C5A059] font-bold">
                  {formatIDR(product.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToCart}
                className="px-5 py-2.5 bg-[#C5A059] text-[#121214] hover:bg-[#D4AF37] font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                + BAG ({selectedSize})
              </button>
              <button
                onClick={() => setShowMarketplaceSelector(true)}
                className="hidden sm:inline-flex px-4 py-2.5 bg-[#18181B] text-[#F5F5F0] border border-[#C5A059]/40 hover:border-[#C5A059] font-cinzel font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                MARKETPLACE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marketplace Selector Modal */}
      {showMarketplaceSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#F5F5F0] border-2 border-[#C5A059] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] font-mono-code uppercase tracking-[0.22em] text-[#C5A059]">PILIH OFFICIAL STORE</p>
                <h3 className="font-cinzel text-2xl font-black uppercase text-[#141414] mt-1">{product.name}</h3>
              </div>
              <button
                onClick={() => setShowMarketplaceSelector(false)}
                className="text-[#706E6B] hover:text-[#141414] text-xl leading-none cursor-pointer"
                aria-label="Tutup selector"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {marketplaceOptions.map(option => (
                <button
                  key={option.key}
                  onClick={() => handleMarketplacePurchase(option.key)}
                  disabled={!option.href}
                  className="w-full flex items-center justify-between gap-3 border border-[#E0DFD8] bg-[#FFFFFF] px-4 py-3.5 text-left transition-all hover:border-[#C5A059] hover:bg-[#FFFDF9] hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="font-cinzel text-sm font-bold uppercase tracking-[0.16em] text-[#141414]">{option.label}</span>
                  <span className="text-[10px] font-mono-code uppercase text-[#706E6B]">
                    {option.href ? 'Buka Toko →' : 'Belum tersedia'}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMarketplaceSelector(false)}
              className="mt-5 w-full border border-[#D9D3C8] bg-[#ECE7DF] text-[#141414] px-4 py-2.5 text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] hover:bg-[#E1D9CB] cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/50 backdrop-blur-xs flex items-center justify-center">
          <div className="relative w-full max-w-md bg-[#FFFFFF] border-2 border-[#C5A059]/60 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-xl font-bold uppercase text-[#141414]">
              ULASAN: {product.name}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-mono-code">
              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">NAMA ANDA</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Aris Setiawan"
                  value={revName}
                  onChange={e => setRevName(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">RATING (1-5)</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRevRating(star)}
                      className="p-1 text-[#C5A059] cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${revRating >= star ? 'fill-[#C5A059]' : 'text-[#E0DFD8]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">FEEDBACK UKURAN</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Runs Small', 'True to Size', 'Runs Large'] as const).map(fit => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setRevFit(fit)}
                      className={`py-2 text-[10px] uppercase font-bold border cursor-pointer ${
                        revFit === fit ? 'bg-[#121214] text-[#C5A059] border-[#121214]' : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8]'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">ULASAN & PENGALAMAN BAHAN</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ceritakan tentang ketebalan kain 235 GSM, fitting kerah, atau kenyamanan..."
                  value={revComment}
                  onChange={e => setRevComment(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 bg-[#FFFFFF] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] uppercase font-bold cursor-pointer"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#121214] text-[#C5A059] font-cinzel font-bold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#121214] transition-colors shadow-xs cursor-pointer"
                >
                  KIRIM ULASAN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
