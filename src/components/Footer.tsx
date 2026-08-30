import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { generateWhatsAppUrl } from '../utils/formatters';
import { ArrowRight, Instagram, MessageCircle, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';
import { DecryptedText } from './reactbits/DecryptedText';

export const Footer: React.FC = () => {
  const { setCurrentView, settings, showToast, setIsSizeGuideOpen } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Mohon masukkan alamat email yang valid.', 'error');
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
      showToast('Selamat bergabung! Token member drop perdana Anda telah terdaftar.', 'success');
    } catch {
      setIsSubscribed(true);
      showToast('Terdaftar untuk notifikasi drop berikutnya.', 'success');
    }
  };

  const waUrl = generateWhatsAppUrl(
    settings.adminWhatsapp || '6281234567890',
    'Halo Admin RdCloth! Saya ingin bertanya mengenai katalog produk atau drop terbaru.'
  );

  return (
    <footer className="bg-[#121214] text-[#A1A1AA] pt-16 pb-12 relative overflow-hidden border-t-2 border-[#C5A059]/30">
      {/* Background Subtle Watermark */}
      <div
        aria-hidden="true"
        className="greek-watermark-text absolute right-4 -bottom-10 z-0 text-[10rem] font-black opacity-10 pointer-events-none select-none"
      >
        RDCLOTH
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Newsletter & Member Token Capsule */}
        <div className="p-6 sm:p-8 bg-[#18181B] border border-[#C5A059]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-cinzel text-[#C5A059] font-bold uppercase tracking-[0.25em] block">
              ARCHIVAL SOCIETY
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-[#F5F5F0]">
              <ShinyText text="DAPATKAN AKSES DROP EKSKLUSIF" speed={5.5} />
            </h3>
            <p className="text-xs font-mono-code text-[#A1A1AA]">
              Jadilah yang pertama menerima kabar drop rilis terbatas dan token diskon chapter.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center max-w-md">
            {isSubscribed ? (
              <div className="px-5 py-3 bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] text-xs font-cinzel font-bold uppercase flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>TOKEN TERDAFTAR • CHAPTER I MEMBER</span>
              </div>
            ) : (
              <div className="flex w-full">
                <input
                  type="email"
                  required
                  placeholder="Masukkan email Anda..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-[#121214] border border-[#3F3F46] px-4 py-3 text-xs font-mono-code text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] flex-1 min-w-[200px]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#C5A059] text-[#121214] hover:bg-[#D4AF37] font-cinzel font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  GABUNG
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-[#27272A] gap-8">
          {/* Brand & Subtitle */}
          <div className="space-y-1">
            <button
              onClick={() => setCurrentView('home')}
              className="text-left group cursor-pointer"
            >
              <h2 className="font-cinzel text-3xl font-black uppercase text-[#F4F4F5] tracking-widest">
                RDCLOTH
              </h2>
            </button>
            <p className="text-xs font-mono-code text-[#C5A059] uppercase tracking-[0.25em]">
              STORIES WORTH WEARING.
            </p>
          </div>

          {/* Core Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-cinzel text-[#F4F4F5] font-bold tracking-widest">
            <button onClick={() => setCurrentView('home')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              BERANDA
            </button>
            <span className="text-[#C5A059]">·</span>
            <button onClick={() => setCurrentView('collection')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              DROP
            </button>
            <span className="text-[#C5A059]">·</span>
            <button onClick={() => setCurrentView('shop')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              ARSIP
            </button>
            <span className="text-[#C5A059]">·</span>
            <button onClick={() => setCurrentView('about')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              CERITA
            </button>
            <span className="text-[#C5A059]">·</span>
            <button onClick={() => setCurrentView('shop')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              BELANJA
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-xs font-cinzel text-[#A1A1AA] font-bold">
            <a
              href={settings.instagramUrl || 'https://instagram.com/rdcloth'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C5A059] transition-colors uppercase tracking-wider"
            >
              INSTAGRAM
            </a>
            <span className="text-[#C5A059]">·</span>
            <a
              href={settings.tiktokUrl || 'https://tiktok.com/@rdcloth'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C5A059] transition-colors uppercase tracking-wider"
            >
              TIKTOK
            </a>
            <span className="text-[#C5A059]">·</span>
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
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-[#71717A] space-y-3 sm:space-y-0">
          <div>
            Menafsirkan kembali mitologi klasik menjadi streetwear arsitektural. Heavyweight Combed Cotton.
          </div>
          <div className="flex items-center space-x-4 text-[#C5A059] font-cinzel text-xs font-bold">
            <DecryptedText text="© MMXXVI RDCLOTH STUDIO" speed={35} maxIterations={8} animateOn="hover" />
          </div>
        </div>
      </div>
    </footer>
  );
};
