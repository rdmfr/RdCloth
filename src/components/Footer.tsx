import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { generateWhatsAppUrl } from '../utils/formatters';
import { ArrowRight, Instagram, MessageCircle, Check, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, settings, showToast, setIsSizeGuideOpen } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    try {
      await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setIsSubscribed(true);
      setEmail('');
      showToast('Welcome to the next drop notification list.', 'success');
    } catch {
      setIsSubscribed(true);
      showToast('Subscribed to drop alerts.', 'success');
    }
  };

  const waUrl = generateWhatsAppUrl(
    settings.adminWhatsapp || '6281234567890',
    'Halo Admin RdCloth! Saya ingin bertanya mengenai katalog produk atau custom order.'
  );

  return (
    <footer className="bg-[#121214] text-[#A1A1AA] pt-16 pb-12 relative overflow-hidden border-t-2 border-[#C5A059]">
      {/* Background Greek Quote Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <span className="text-7xl sm:text-9xl font-cinzel font-black tracking-[0.3em] text-[#C5A059] whitespace-nowrap">
          ΓΝΩΘΙ ΣΕΑΥΤΟΝ
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#27272A]">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => setCurrentView('home')}
              className="text-left group inline-block"
            >
              <div className="flex items-center space-x-2">
                <h2 className="font-heading text-2xl font-black uppercase text-[#F4F4F5] tracking-tight">
                  RdCloth
                </h2>
                <span className="font-cinzel text-xs text-[#C5A059] font-bold border border-[#C5A059]/40 px-2 py-0.5 rounded-xs">
                  🏛️ STOIC SERIES
                </span>
              </div>
              <p className="text-xs font-mono-code uppercase tracking-[0.25em] text-[#C5A059] mt-1 font-semibold">
                WEAR YOUR IDEA <span className="font-serif-greek font-italic">// PHILOSOPHIA & APPAREL</span>
              </p>
            </button>
            <p className="text-xs font-mono-code text-[#A1A1AA] max-w-sm leading-relaxed">
              Neoclassical apparel studio crafting heavyweight tees, contemporary streetwear drops, and personal custom apparel inspired by timeless philosophy and quiet strength.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <a
                href={settings.instagramUrl || 'https://instagram.com/rdcloth'}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#18181B] border border-[#27272A] text-[#F4F4F5] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#18181B] border border-[#27272A] text-[#F4F4F5] hover:text-emerald-400 hover:border-emerald-500 transition-colors flex items-center space-x-1.5 text-xs font-mono-code shadow-sm"
                aria-label="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline font-bold">CHAT WA</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
                EXPLORE
              </h3>
              <ul className="space-y-2 text-xs font-mono-code">
                <li>
                  <button onClick={() => setCurrentView('shop')} className="hover:text-[#F4F4F5] transition-colors">
                    SHOP ALL
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('custom')} className="hover:text-[#F4F4F5] transition-colors">
                    CUSTOM APPAREL
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('collection')} className="hover:text-[#F4F4F5] transition-colors">
                    OLYMPIAN DROP
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('about')} className="hover:text-[#F4F4F5] transition-colors">
                    OUR PHILOSOPHY
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold">
                SUPPORT
              </h3>
              <ul className="space-y-2 text-xs font-mono-code">
                <li>
                  <button onClick={() => setCurrentView('track-order')} className="hover:text-[#F4F4F5] transition-colors">
                    TRACK ORDER
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#F4F4F5] transition-colors">
                    SIZE GUIDE
                  </button>
                </li>
                <li>
                  <a href={waUrl} target="_blank" rel="noreferrer" className="hover:text-[#F4F4F5] transition-colors">
                    CONTACT WA
                  </a>
                </li>
                <li>
                  <button onClick={() => setCurrentView('admin')} className="text-[#71717A] hover:text-[#C5A059] transition-colors">
                    ADMIN CMS ⚙
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-bold flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>JOIN THE PHILOSOPHER'S CLUB</span>
            </h3>
            <p className="text-xs font-mono-code text-[#A1A1AA] leading-relaxed">
              Be the first to access limited neoclassical small-batch apparel drops, private discounts, and custom release windows.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-[#18181B] border border-emerald-500/40 text-emerald-400 text-xs font-mono-code flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>You're on the VIP list. Stay tuned.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-[#18181B] border border-[#27272A] px-3.5 py-2.5 text-xs font-mono-code text-[#F4F4F5] placeholder-[#71717A] focus:outline-none focus:border-[#C5A059] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#C5A059] text-[#121214] px-4 font-heading text-xs font-black uppercase tracking-wider hover:bg-[#D4AF37] transition-all flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-[#71717A] space-y-3 sm:space-y-0">
          <div>
            © 2026 RDCLOTH APPAREL STUDIO. BANDUNG, INDONESIA.
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-[#C5A059]">
            <span className="font-cinzel">ΓΝΩΘΙ ΣΕΑΥΤΟΝ</span>
            <span>•</span>
            <span>HEAVYWEIGHT COTTON</span>
            <span>•</span>
            <span className="font-cinzel">MMXXIV</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
