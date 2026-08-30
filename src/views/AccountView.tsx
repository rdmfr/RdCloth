import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR, formatDate } from '../utils/formatters';
import { User, Package, MapPin, LogOut, CheckCircle2, ArrowRight } from 'lucide-react';

export const AccountView: React.FC = () => {
  const { user, setUser, orders, setCurrentView, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'address'>('orders');
  const [name, setName] = useState(user?.name || 'Raditya Pratama');
  const [email, setEmail] = useState(user?.email || 'raditya@streetwear.id');
  const [phone, setPhone] = useState(user?.phone || '081298765432');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, name, email, phone });
    } else {
      setUser({
        id: 'cust-1',
        name,
        email,
        phone,
        addresses: [],
        createdAt: new Date().toISOString()
      });
    }
    showToast('Profile updated successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="border-b border-[#E0DFD8] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
              MEMBER PORTAL
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase text-[#141414] mt-1">
              ACCOUNT & ORDERS
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('track-order')}
              className="px-4 py-2 bg-[#FFFFFF] border border-[#E0DFD8] hover:border-[#141414] text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414] transition-colors shadow-xs"
            >
              TRACK RESI
            </button>
            <button
              onClick={() => {
                setUser(null);
                showToast('Logged out of member session.', 'info');
              }}
              className="p-2 text-[#706E6B] hover:text-red-600"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex space-x-2 border-b border-[#E0DFD8] mb-8 pb-3 text-xs font-mono-code">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 uppercase font-bold border transition-all ${
              activeTab === 'orders'
                ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414]'
            }`}
          >
            ORDER HISTORY ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 uppercase font-bold border transition-all ${
              activeTab === 'profile'
                ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414]'
            }`}
          >
            PROFILE DETAILS
          </button>
          <button
            onClick={() => setActiveTab('address')}
            className={`px-4 py-2 uppercase font-bold border transition-all ${
              activeTab === 'address'
                ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414]'
            }`}
          >
            SAVED ADDRESS
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs">
                <Package className="w-8 h-8 text-[#706E6B] mx-auto" />
                <p className="font-heading text-lg font-bold uppercase text-[#141414]">NO ORDERS YET</p>
                <p className="text-xs font-mono-code text-[#706E6B]">
                  Browse our catalog or create a custom streetwear piece.
                </p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-[#141414] text-[#F5F5F0] text-xs font-mono-code font-bold uppercase hover:bg-[#C5A059]"
                >
                  SHOP CATALOG
                </button>
              </div>
            ) : (
              orders.map(ord => (
                <div key={ord.id} className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E0DFD8] pb-3 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-[#141414] text-sm">#{ord.id}</span>
                        <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 bg-[#F5F5F0] text-[#C5A059] border border-[#E0DFD8] uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono-code text-[#706E6B] mt-0.5">
                        Placed on {formatDate(ord.createdAt)} • Courier: {ord.shippingMethod.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono-code text-sm font-bold text-[#141414]">
                        {formatIDR(ord.total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-mono-code text-[#706E6B]">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-9 h-11 object-cover bg-[#F5F5F0] border border-[#E0DFD8]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="text-[#141414] font-bold uppercase">{item.productName}</p>
                            <p className="text-[10px] text-[#706E6B]">
                              Size {item.size} • {item.colorName} • Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-[#141414] font-bold">{formatIDR(item.subtotal)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setCurrentView('track-order')}
                      className="text-xs font-mono-code text-[#141414] hover:text-[#C5A059] font-bold underline underline-offset-2 flex items-center space-x-1"
                    >
                      <span>TRACK LOGISTICS TIMELINE</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-xl bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono-code">
              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">NAME</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">EMAIL</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="text-[#706E6B] block mb-1 uppercase font-bold">PHONE / WHATSAPP</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#141414] text-[#F5F5F0] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-colors shadow-xs"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Saved Address */}
        {activeTab === 'address' && (
          <div className="max-w-xl bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 space-y-4 text-xs font-mono-code shadow-xs">
            <div className="flex items-center space-x-2 text-[#141414] font-bold uppercase">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>DEFAULT SHIPPING ADDRESS</span>
            </div>
            <div className="p-4 bg-[#F5F5F0] border border-[#E0DFD8] space-y-1 text-[#706E6B]">
              <p className="text-[#141414] font-bold">{name} ({phone})</p>
              <p>Jl. Tebet Barat Raya No. 45B</p>
              <p>Kota Jakarta Selatan, DKI Jakarta 12810</p>
            </div>
            <p className="text-[11px] text-[#706E6B]">
              Address will be automatically filled during checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
