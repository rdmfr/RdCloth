import React, { useState } from 'react';
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
  MessageSquarePlus
} from 'lucide-react';

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
    setIsCartOpen
  } = useStore();

  // Find product by slug or id
  const product = products.find(p => p.slug === viewParam || p.id === viewParam) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: 'Black', hex: '#121212' });
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'L');
  const [quantity, setQuantity] = useState<number>(1);
  
  // Accordion states
  const [openSection, setOpenSection] = useState<'material' | 'care' | 'shipping' | null>('material');
  
  // Review Modal state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState<number>(5);
  const [revFit, setRevFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [revComment, setRevComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-32 text-center">
        <p className="font-heading text-xl uppercase">Product Not Found</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-6 py-2.5 bg-[#141414] text-[#F5F5F0] text-xs font-mono-code uppercase font-bold hover:bg-[#F27D26]"
        >
          Back to Shop
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

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) {
      showToast('Please fill in your name and comment.', 'error');
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-24 pb-24">
      {/* Breadcrumb back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CATALOG</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT: Large Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-[#FFFFFF] border border-[#E0DFD8] overflow-hidden">
              <img
                src={product.images[activeImageIndex]?.url || product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#141414] text-[#F5F5F0] text-[10px] font-mono-code font-black px-2.5 py-1 uppercase tracking-widest">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 border border-[#E0DFD8] backdrop-blur-md transition-colors ${
                  isFav ? 'bg-[#141414] text-white' : 'bg-white/80 text-[#706E6B] hover:text-[#141414]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] bg-[#FFFFFF] border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#141414] ring-1 ring-[#141414]'
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
          </div>

          {/* RIGHT: Product Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-[#E0DFD8] pb-6">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#706E6B]">
                <span className="uppercase">{product.sku}</span>
                <div className="flex items-center space-x-1 text-[#F27D26]">
                  <Star className="w-3.5 h-3.5 fill-[#F27D26]" />
                  <span className="font-bold text-[#141414]">{product.rating}</span>
                  <span className="text-[#706E6B]">({product.reviewCount || productReviews.length})</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#141414] leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs font-mono-code uppercase text-[#706E6B]">
                  {product.tagline}
                </p>
              )}

              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-xl font-mono-code font-bold text-[#141414]">
                  {formatIDR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono-code text-[#706E6B] line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] font-mono-code text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 uppercase font-bold">
                  IN STOCK ({currentVariant?.stock ?? 12} LEFT)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-mono-code text-[#54524F] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-[#706E6B] uppercase font-bold">COLOR:</span>
                <span className="text-[#141414] font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor.name === color.name
                        ? 'border-[#141414] scale-110'
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

            {/* Size Selector + Size Guide link */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-[#706E6B] uppercase font-bold">SELECT SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#141414] hover:text-[#F27D26] flex items-center space-x-1 underline underline-offset-2 transition-colors font-bold"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#F27D26]" />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono-code uppercase font-bold border transition-all ${
                        isSelected
                          ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                          : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414] hover:border-[#141414]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart + Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-[#E0DFD8] bg-[#FFFFFF] h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-[#706E6B] hover:text-[#141414] transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-mono-code font-bold text-sm text-[#141414] min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-[#706E6B] hover:text-[#141414] transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xs"
                >
                  <span>ADD TO BAG</span>
                  <span>•</span>
                  <span>{formatIDR(product.price * quantity)}</span>
                </button>
              </div>

              {/* Buy Now direct button */}
              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full h-12 bg-[#FFFFFF] hover:bg-[#ECECE7] text-[#141414] border border-[#E0DFD8] hover:border-[#141414] transition-all font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>INSTANT CHECKOUT</span>
              </button>
            </div>

            {/* Guarantee badges */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] space-y-2 text-xs font-mono-code text-[#706E6B]">
              <div className="flex items-center space-x-2 text-[#141414]">
                <Truck className="w-4 h-4 text-[#F27D26]" />
                <span>FREE SHIPPING ON ORDERS OVER RP 250.000</span>
              </div>
              <div className="flex items-center space-x-2 text-[#706E6B]">
                <ShieldCheck className="w-4 h-4 text-[#141414]" />
                <span>100% Cotton 16s • Ribbed 2.5cm Non-sagging collar</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#E0DFD8] divide-y divide-[#E0DFD8] pt-2">
              {/* Material & Specs */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'material' ? null : 'material')}
                  className="w-full py-4 flex items-center justify-between text-xs font-mono-code uppercase font-bold text-[#141414] hover:text-[#F27D26] transition-colors"
                >
                  <span>MATERIAL & SPECIFICATIONS</span>
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
                  className="w-full py-4 flex items-center justify-between text-xs font-mono-code uppercase font-bold text-[#141414] hover:text-[#F27D26] transition-colors"
                >
                  <span>CARE INSTRUCTIONS</span>
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
                  className="w-full py-4 flex items-center justify-between text-xs font-mono-code uppercase font-bold text-[#141414] hover:text-[#F27D26] transition-colors"
                >
                  <span>SHIPPING & RETURNS</span>
                  {openSection === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'shipping' && (
                  <div className="pb-4 space-y-2 text-xs font-mono-code text-[#706E6B]">
                    <p>• Ready stock orders dispatched within 24 hours (Monday-Saturday).</p>
                    <p>• Available couriers: JNE Regular, SiCepat BEST, J&T Express, GoSend Instant.</p>
                    <p>• Size exchange available within 3 days after arrival (garment must be unworn with tags intact).</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-24 pt-12 border-t border-[#E0DFD8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
                VERIFIED FEEDBACK
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#141414] mt-1">
                CUSTOMER REVIEWS ({productReviews.length})
              </h2>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] hover:border-[#141414] text-xs font-mono-code uppercase font-bold flex items-center space-x-2 transition-all self-start sm:self-auto shadow-xs"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#F27D26]" />
              <span>WRITE A REVIEW</span>
            </button>
          </div>

          {productReviews.length === 0 ? (
            <div className="p-8 text-center bg-[#FFFFFF] border border-[#E0DFD8] text-xs font-mono-code text-[#706E6B]">
              No reviews yet for this drop. Be the first to review!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productReviews.map(rev => (
                <div key={rev.id} className="p-5 bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-[#F27D26]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F27D26]" />
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

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/40 backdrop-blur-xs flex items-center justify-center">
          <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-heading text-xl font-bold uppercase text-[#141414]">
              REVIEW: {product.name}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-mono-code">
              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aris Setiawan"
                  value={revName}
                  onChange={e => setRevName(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
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
                      className="p-1 text-[#F27D26]"
                    >
                      <Star className={`w-6 h-6 ${revRating >= star ? 'fill-[#F27D26]' : 'text-[#E0DFD8]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">FIT FEEDBACK</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Runs Small', 'True to Size', 'Runs Large'] as const).map(fit => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setRevFit(fit)}
                      className={`py-2 text-[10px] uppercase font-bold border ${
                        revFit === fit ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]' : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8]'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">YOUR THOUGHTS</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the fabric density, collar fit, and styling..."
                  value={revComment}
                  onChange={e => setRevComment(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 bg-[#FFFFFF] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#141414] text-[#F5F5F0] font-heading font-bold uppercase tracking-wider hover:bg-[#F27D26] shadow-xs"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
