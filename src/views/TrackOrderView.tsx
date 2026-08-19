import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR, formatDate, generateWhatsAppUrl } from '../utils/formatters';
import { Order, OrderStatus } from '../types';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  MessageCircle, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

const TIMELINE_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'PENDING', label: 'ORDER PLACED', desc: 'Waiting for payment confirmation' },
  { status: 'PAID', label: 'PAYMENT VERIFIED', desc: 'Payment received by RdCloth' },
  { status: 'PRODUCTION', label: 'IN WORKSHOP PRODUCTION', desc: 'Garments cutting, high-density print & curing' },
  { status: 'QC', label: 'QUALITY CONTROL', desc: 'Inspection of stitches, hem tags & packaging' },
  { status: 'SHIPPED', label: 'DISPATCHED VIA COURIER', desc: 'Package handed over to delivery courier' },
  { status: 'DELIVERED', label: 'DELIVERED', desc: 'Package arrived at destination' }
];

export const TrackOrderView: React.FC = () => {
  const { orders, showToast, settings } = useStore();
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedResi, setCopiedResi] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const term = searchId.trim().toUpperCase();
    const found = orders.find(
      o => o.id.toUpperCase() === term || (o.trackingNumber && o.trackingNumber.toUpperCase() === term)
    );

    setSearchedOrder(found || null);
    setHasSearched(true);

    if (!found) {
      showToast('No order found with that ID. Try "RDC-8921" or "RDC-8922".', 'error');
    }
  };

  const getStatusIndex = (current: OrderStatus) => {
    const orderRank: Record<OrderStatus, number> = {
      PENDING: 0,
      PAID: 1,
      PROCESSING: 2,
      PRODUCTION: 2,
      QC: 3,
      READY_TO_SHIP: 3,
      SHIPPED: 4,
      DELIVERED: 5,
      CANCELLED: -1
    };
    return orderRank[current] ?? 0;
  };

  const copyResi = (resi: string) => {
    navigator.clipboard.writeText(resi);
    setCopiedResi(true);
    showToast('Tracking number copied to clipboard.', 'success');
    setTimeout(() => setCopiedResi(false), 2000);
  };

  const currentIdx = searchedOrder ? getStatusIndex(searchedOrder.status) : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono-code uppercase tracking-[0.3em] text-[#706E6B]">
            LOGISTICS & DISPATCH
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#141414]">
            TRACK YOUR ORDER
          </h1>
          <p className="text-xs font-mono-code text-[#706E6B]">
            Enter your RdCloth Order ID (e.g. RDC-8921) to check live workshop status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-[#FFFFFF] border border-[#E0DFD8] p-6 mb-10 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#706E6B]" />
              <input
                type="text"
                placeholder="ENTER ORDER ID (e.g. RDC-8921 or RDC-8922)"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                className="w-full bg-[#F5F5F0] border border-[#E0DFD8] pl-10 pr-4 py-3 text-xs font-mono-code uppercase text-[#141414] placeholder-[#706E6B] focus:outline-none focus:border-[#141414]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#141414] text-[#F5F5F0] font-heading font-black text-xs uppercase tracking-widest hover:bg-[#F27D26] transition-all flex items-center justify-center space-x-2 shadow-xs"
            >
              <span>TRACK STATUS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="mt-3 flex items-center space-x-2 text-[11px] font-mono-code text-[#706E6B]">
            <span>Try sample order:</span>
            <button
              type="button"
              onClick={() => {
                setSearchId('RDC-8921');
                setSearchedOrder(orders.find(o => o.id === 'RDC-8921') || null);
              }}
              className="text-[#F27D26] font-bold underline underline-offset-2"
            >
              RDC-8921 (Shipped)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setSearchId('RDC-8922');
                setSearchedOrder(orders.find(o => o.id === 'RDC-8922') || null);
              }}
              className="text-[#F27D26] font-bold underline underline-offset-2"
            >
              RDC-8922 (Production)
            </button>
          </div>
        </div>

        {/* Order Details & Visual Timeline */}
        {searchedOrder ? (
          <div className="bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-8 space-y-8 shadow-xs">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E0DFD8] pb-6 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono-code uppercase text-[#706E6B]">
                    ORDER
                  </span>
                  <span className="font-heading text-xl font-black text-[#141414]">
                    #{searchedOrder.id}
                  </span>
                  <span className="text-[10px] font-mono-code font-bold bg-[#F5F5F0] text-[#F27D26] border border-[#E0DFD8] px-2 py-0.5 uppercase">
                    {searchedOrder.status}
                  </span>
                </div>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                  Ordered on {formatDate(searchedOrder.createdAt)} • Customer: {searchedOrder.customer.fullName}
                </p>
              </div>

              {searchedOrder.trackingNumber && (
                <div className="bg-[#F5F5F0] border border-[#E0DFD8] p-3 text-right">
                  <p className="text-[10px] font-mono-code text-[#706E6B] uppercase">NO. RESI ({searchedOrder.shippingMethod.name})</p>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="font-mono-code font-bold text-[#141414] text-xs">{searchedOrder.trackingNumber}</span>
                    <button
                      onClick={() => copyResi(searchedOrder.trackingNumber!)}
                      className="p-1 hover:text-[#141414] text-[#706E6B]"
                      title="Copy Resi"
                    >
                      {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical/Horizontal Visual Timeline */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase text-[#141414] tracking-wider">
                PRODUCTION & SHIPPING PROGRESS
              </h3>

              <div className="relative border-l border-[#E0DFD8] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 py-2">
                {TIMELINE_STEPS.map((step, idx) => {
                  const isDone = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;

                  return (
                    <div key={step.status} className="relative">
                      {/* Node circle */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                          isDone
                            ? 'bg-[#141414] text-[#F5F5F0] border-[#141414] ring-4 ring-[#141414]/10'
                            : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8]'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h4
                            className={`font-heading text-xs sm:text-sm font-bold uppercase ${
                              isDone ? 'text-[#141414]' : 'text-[#706E6B]'
                            }`}
                          >
                            {step.label}
                          </h4>
                          {isCurrent && (
                            <span className="text-[9px] font-mono-code text-[#F27D26] bg-[#F5F5F0] border border-[#E0DFD8] px-1.5 py-0.2 uppercase font-bold">
                              CURRENT STEP
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono-code text-[#706E6B] mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items inside this order */}
            <div className="border-t border-[#E0DFD8] pt-6 space-y-4">
              <h3 className="font-heading text-xs font-bold uppercase text-[#141414] tracking-wider">
                ITEMS IN THIS PACKAGE
              </h3>
              <div className="space-y-3">
                {searchedOrder.items.map((item, i) => (
                  <div key={i} className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] flex items-center justify-between text-xs font-mono-code">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-10 h-12 object-cover bg-[#FFFFFF] border border-[#E0DFD8]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-[#141414] uppercase">{item.productName}</p>
                        <p className="text-[10px] text-[#706E6B]">
                          Size {item.size} • {item.colorName} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#141414]">{formatIDR(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xs font-mono-code pt-2 text-[#706E6B]">
                <span>TOTAL AMOUNT PAID</span>
                <span className="font-bold text-[#141414] text-sm">{formatIDR(searchedOrder.total)}</span>
              </div>
            </div>

            {/* Support CTA */}
            <div className="border-t border-[#E0DFD8] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-mono-code text-[#706E6B]">
                Need changes to shipping address or expedited delivery?
              </p>
              <a
                href={generateWhatsAppUrl(
                  settings.adminWhatsapp || '6281234567890',
                  `Halo Admin RdCloth, saya ingin menanyakan perkembangan paket order #${searchedOrder.id}.`
                )}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#FFFFFF] border border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-xs font-mono-code uppercase font-bold flex items-center space-x-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ADMIN VIA WA</span>
              </a>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="p-12 text-center bg-[#FFFFFF] border border-[#E0DFD8] space-y-3 shadow-xs">
            <AlertCircle className="w-8 h-8 text-[#F27D26] mx-auto" />
            <p className="font-heading text-lg font-bold uppercase text-[#141414]">
              ORDER NOT FOUND
            </p>
            <p className="text-xs font-mono-code text-[#706E6B]">
              Please verify your Order ID from your receipt or WhatsApp confirmation.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
