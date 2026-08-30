import React, { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await loginAdmin(email.trim(), password);
      showToast('Welcome back to the admin studio.', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to sign in.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#121214] text-[#F5F5F0] pt-28 pb-20 flex items-center">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_440px] gap-14 items-center">
        <section className="hidden lg:block">
          <p className="text-xs font-mono-code uppercase tracking-[0.28em] text-[#C5A059] mb-5">
            RDCLOTH / PRIVATE WORKSPACE
          </p>
          <h1 className="font-heading text-6xl xl:text-7xl font-black uppercase leading-[0.95] max-w-xl">
            Shape the next drop.
          </h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#B9B7B0] font-mono-code">
            Product, order, and content operations in one focused studio.
          </p>
          <div className="mt-12 flex items-center gap-3 text-xs font-mono-code uppercase text-[#B9B7B0]">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            Secure server session
          </div>
        </section>

        <section className="bg-[#F5F5F0] text-[#141414] border-t-4 border-[#C5A059] p-7 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#141414] text-[#C5A059] flex items-center justify-center">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">Backstage access</p>
              <h2 className="font-heading text-2xl font-black uppercase">Admin login</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-xs font-mono-code uppercase font-bold">
              Email admin
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="mt-2 w-full bg-white border border-[#D8D6CE] px-4 py-3 font-mono-code text-sm focus:outline-none focus:border-[#141414]"
                placeholder="admin@rdcloth.id"
              />
            </label>
            <label className="block text-xs font-mono-code uppercase font-bold">
              Password
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="mt-2 w-full bg-white border border-[#D8D6CE] px-4 py-3 font-mono-code text-sm focus:outline-none focus:border-[#141414]"
                placeholder="••••••••••••"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 px-5 py-3.5 bg-[#141414] text-[#F5F5F0] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#C5A059] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'CHECKING SESSION...' : 'ENTER ADMIN STUDIO'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-7 pt-5 border-t border-[#D8D6CE] text-[10px] leading-5 font-mono-code text-[#706E6B]">
            Credentials are controlled by the server environment variables ADMIN_EMAIL and ADMIN_PASSWORD.
          </p>
        </section>
      </div>
    </main>
  );
};
