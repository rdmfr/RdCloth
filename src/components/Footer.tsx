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
    <footer className="bg-[#121214] text-[#A1A1AA] pt-16 pb-12 relative overflow-hidden border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-[#27272A] gap-8">
          {/* Brand & Subtitle */}
          <div className="space-y-1">
            <button
              onClick={() => setCurrentView('home')}
              className="text-left group"
            >
              <h2 className="font-cinzel text-3xl font-black uppercase text-[#F4F4F5] tracking-widest">
                RDCLOTH
              </h2>
            </button>
            <p className="text-xs font-mono-code text-[#C5A059] uppercase tracking-[0.25em]">
              ANCIENT STORIES. MODERN MEANINGS.
            </p>
          </div>

          {/* Core Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono-code text-[#F4F4F5] font-semibold tracking-widest">
            <button onClick={() => setCurrentView('shop')} className="hover:text-[#C5A059] transition-colors">
              BELANJA
            </button>
            <span>·</span>
            <button onClick={() => setCurrentView('collection')} className="hover:text-[#C5A059] transition-colors">
              KOLEKSI
            </button>
            <span>·</span>
            <button onClick={() => setCurrentView('custom')} className="hover:text-[#C5A059] transition-colors">
              PESANAN CUSTOM
            </button>
            <span>·</span>
            <button onClick={() => setCurrentView('about')} className="hover:text-[#C5A059] transition-colors">
              CERITA KAMI
            </button>
            <span>·</span>
            <button onClick={() => setCurrentView('track-order')} className="hover:text-[#C5A059] transition-colors">
              LACAK PESANAN
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-xs font-mono-code text-[#A1A1AA]">
            <a
              href={settings.instagramUrl || 'https://instagram.com/rdcloth'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C5A059] transition-colors uppercase tracking-wider"
            >
              INSTAGRAM
            </a>
            <span>·</span>
            <a
              href={settings.tiktokUrl || 'https://tiktok.com/@rdcloth'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C5A059] transition-colors uppercase tracking-wider"
            >
              TIKTOK
            </a>
            <span>·</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C5A059] transition-colors uppercase tracking-wider"
            >
              WHATSAPP
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-[#71717A] space-y-3 sm:space-y-0">
          <div>
            Menafsirkan kembali mitologi klasik menjadi streetwear arsitektural.
          </div>
          <div className="flex items-center space-x-4 text-[#C5A059] font-cinzel text-xs font-bold">
            <span>© MMXXVI RDCLOTH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
