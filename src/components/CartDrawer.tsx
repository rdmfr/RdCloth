import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR } from '../utils/formatters';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Tag, Check, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    settings,
    setCurrentView,
    showToast
  } = useStore();

  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  const freeShippingThreshold = settings.freeShippingThreshold || 250000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const availableVouchers = [
    { code: 'CHAPTER1', label: 'Diskon 10%', desc: 'Drop perdana' },
    { code: 'FREESHIP', label: 'Free Ongkir', desc: 'Min. 2 item' }
  ];

  const handleApplyVoucher = (code: string) => {
    setAppliedVoucher(code);
    showToast(`Voucher ${code} berhasil diaplikasikan!`, 'success');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="w-screen max-w-md bg-[#F5F5F0] border-l-2 border-[#C5A059]/40 shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="p-6 border-b border-[#E0DFD8] bg-[#FFFFFF]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-cinzel font-bold uppercase tracking-widest text-[#141414]">
                  TAS BELANJA ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h2>
                <p className="text-[10px] font-mono-code text-[#706E6B] uppercase mt-0.5">
                  <ShinyText text="RDCLOTH · SMALL BATCH CAPSULE" speed={5.5} />
                </p>
              </div>
              <button
                id="close-cart-drawer-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#706E6B] hover:text-[#C5A059] transition-colors cursor-pointer"
                aria-label="Tutup keranjang"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Free Shipping Progress Bar */}
            <div className="mt-4 pt-3 border-t border-[#E0DFD8]">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#706E6B] mb-1.5">
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className={remainingForFreeShipping === 0 ? 'text-[#C5A059] font-bold' : ''}>
                    {remainingForFreeShipping > 0
                      ? `Tambah ${formatIDR(remainingForFreeShipping)} untuk GRATIS ONGKIR`
                      : '✨ GRATIS ONGKIR SELURUH JAWA AKTIF!'}
                  </span>
                </span>
                <span className="text-[#141414] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E0DFD8] h-2 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-[#C5A059] to-[#D4AF37] h-full rounded-full transition-all duration-500 ease-out shadow-xs"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* 1-Click Voucher Chips */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pt-1 pb-0.5">
              <span className="text-[9px] font-mono-code text-[#706E6B] flex items-center gap-1 uppercase font-bold flex-shrink-0">
                <Tag className="w-3 h-3 text-[#C5A059]" />
                Kupon:
              </span>
              {availableVouchers.map(v => (
                <button
                  key={v.code}
                  onClick={() => handleApplyVoucher(v.code)}
                  className={`px-2.5 py-1 text-[10px] font-mono-code uppercase font-bold border transition-all flex items-center space-x-1 flex-shrink-0 cursor-pointer ${
                    appliedVoucher === v.code
                      ? 'bg-[#121214] text-[#C5A059] border-[#121214]'
                      : 'bg-[#F5F5F0] text-[#141414] border-[#D8D6CE] hover:border-[#C5A059]'
                  }`}
                >
                  <span>{v.code}</span>
                  {appliedVoucher === v.code ? <Check className="w-3 h-3 text-[#C5A059]" /> : <span className="text-[#706E6B]">({v.label})</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E0DFD8]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#ECECE7] border border-[#E0DFD8] flex items-center justify-center text-[#C5A059] mb-4">
                  <Truck className="w-7 h-7" />
                </div>
                <p className="font-cinzel text-lg font-bold uppercase text-[#141414] tracking-wide">
                  Tas Anda Masih Kosong
                </p>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1 max-w-[220px]">
                  Jelajahi koleksi streetwear & artifak terbaru kami.
                </p>
                <Magnet strength={0.2}>
                  <button
                    id="cart-empty-shop-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('shop');
                    }}
                    className="mt-6 px-6 py-3 bg-[#121214] text-[#F5F5F0] hover:bg-[#C5A059] hover:text-[#121214] font-cinzel font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
                  >
                    MULAI BELANJA
                  </button>
                </Magnet>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-4 group">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#FFFFFF] border border-[#E0DFD8] overflow-hidden flex-shrink-0 relative shadow-xs">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {item.isCustom && (
                      <span className="absolute top-1 left-1 bg-[#121214] text-[#C5A059] text-[8px] font-mono-code font-black px-1 uppercase">
                        CUSTOM
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xs font-cinzel font-bold uppercase text-[#141414] tracking-wide leading-snug">
                          {item.productName}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#706E6B] hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Hapus produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 mt-1 text-[11px] font-mono-code text-[#706E6B]">
                        <span>UKURAN: {item.size}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-[#E0DFD8]"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span>{item.colorName}</span>
                        </span>
                      </div>

                      {item.isCustom && item.customDetails && (
                        <p className="text-[10px] font-mono-code text-[#C5A059] mt-1 font-bold">
                          ↳ {item.customDetails.printPlacement} ({item.customDetails.printTechnique || 'DTF'})
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E0DFD8]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E0DFD8] bg-[#FFFFFF]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#706E6B] hover:text-[#141414] transition-colors cursor-pointer"
                          aria-label="Kurang kuantitas"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-code font-bold text-[#141414] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#706E6B] hover:text-[#141414] transition-colors cursor-pointer"
                          aria-label="Tambah kuantitas"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono-code font-bold text-[#141414]">
                        {formatIDR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FFFFFF] border-t border-[#E0DFD8] space-y-4 shadow-xl">
              <div className="space-y-1.5 text-xs font-mono-code">
                <div className="flex justify-between text-[#706E6B]">
                  <span>SUBTOTAL</span>
                  <span className="text-[#141414] font-bold">{formatIDR(cartSubtotal)}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-[#C5A059] text-[11px] font-bold">
                    <span>VOUCHER ({appliedVoucher})</span>
                    <span>- {formatIDR(cartSubtotal * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#706E6B] text-[11px]">
                  <span>PENGIRIMAN</span>
                  <span className="text-[#141414] font-bold">
                    {cartSubtotal >= freeShippingThreshold ? 'GRATIS (JAWA)' : 'Dihitung saat pembayaran'}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-[#706E6B] pt-1">
                  <Clock className="w-3 h-3 text-[#C5A059]" />
                  <span>Estimasi Pengiriman: 2-3 Hari Kerja (Bandung Workshop)</span>
                </div>
              </div>

              <Magnet strength={0.15} className="w-full">
                <button
                  id="cart-drawer-checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('checkout');
                  }}
                  className="w-full py-3.5 bg-[#121214] text-[#F5F5F0] hover:bg-[#C5A059] hover:text-[#121214] transition-all font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <span>LANJUT KE PEMBAYARAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnet>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono-code text-[#706E6B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>PEMBAYARAN RESMI & TERENKRIPSI</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
