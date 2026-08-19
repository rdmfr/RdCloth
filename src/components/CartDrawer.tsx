import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR } from '../utils/formatters';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    settings,
    setCurrentView 
  } = useStore();

  const freeShippingThreshold = settings.freeShippingThreshold || 250000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#F5F5F0] border-l border-[#E0DFD8] shadow-2xl flex flex-col justify-between"
        >
          {/* Top bar */}
          <div className="p-6 border-b border-[#E0DFD8] bg-[#FFFFFF]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-heading font-extrabold uppercase tracking-widest text-[#141414]">
                  BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h2>
                <p className="text-[11px] font-mono-code text-[#706E6B] uppercase mt-0.5">
                  RdCloth Small Batch Apparel
                </p>
              </div>
              <button
                id="close-cart-drawer-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#706E6B] hover:text-[#141414] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            <div className="mt-4 pt-3 border-t border-[#E0DFD8]">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#706E6B] mb-1.5">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-[#F27D26]" />
                  <span>
                    {remainingForFreeShipping > 0
                      ? `Add ${formatIDR(remainingForFreeShipping)} for FREE Shipping`
                      : 'FREE SHIPPING UNLOCKED! 🎉'}
                  </span>
                </span>
                <span className="text-[#141414] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E0DFD8] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#F27D26] h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E0DFD8]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#ECECE7] flex items-center justify-center text-[#706E6B] mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <p className="font-heading text-lg font-bold uppercase text-[#141414] tracking-wide">
                  Your bag is empty
                </p>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1 max-w-[200px]">
                  Explore our latest streetwear drop and blanks.
                </p>
                <button
                  id="cart-empty-shop-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#141414] text-[#F5F5F0] font-semibold text-xs uppercase tracking-wider hover:bg-[#F27D26] transition-all"
                >
                  START BROWSING
                </button>
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
                      <span className="absolute top-1 left-1 bg-[#141414] text-[#F5F5F0] text-[8px] font-mono-code font-black px-1 uppercase">
                        CUSTOM
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xs font-heading font-bold uppercase text-[#141414] tracking-wide leading-snug">
                          {item.productName}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#706E6B] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 mt-1 text-[11px] font-mono-code text-[#706E6B]">
                        <span>SIZE: {item.size}</span>
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
                        <p className="text-[10px] font-mono-code text-[#F27D26] mt-1 font-bold">
                          ↳ {item.customDetails.printPlacement} ({item.customDetails.printTechnique || 'DTF'})
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E0DFD8]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E0DFD8] bg-[#FFFFFF]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#706E6B] hover:text-[#141414] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-code font-bold text-[#141414] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#706E6B] hover:text-[#141414] transition-colors"
                          aria-label="Increase quantity"
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
            <div className="p-6 bg-[#FFFFFF] border-t border-[#E0DFD8] space-y-4">
              <div className="space-y-1.5 text-xs font-mono-code">
                <div className="flex justify-between text-[#706E6B]">
                  <span>SUBTOTAL</span>
                  <span className="text-[#141414] font-bold">{formatIDR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#706E6B] text-[11px]">
                  <span>SHIPPING</span>
                  <span className="text-[#141414] font-bold">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <button
                id="cart-drawer-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('checkout');
                }}
                className="w-full py-3.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono-code text-[#706E6B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% SECURE CHECKOUT • SATISFACTION GUARANTEED</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
