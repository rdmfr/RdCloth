import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR, generateWhatsAppUrl } from '../utils/formatters';
import { ShippingMethod, ShippingAddress, Order } from '../types';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Lock, 
  Copy, 
  CheckCircle2,
  Tag
} from 'lucide-react';

const COURIER_OPTIONS: ShippingMethod[] = [
  {
    id: 'sicepat-best',
    name: 'SiCepat BEST (Next Day)',
    description: 'Estimasi 1-2 hari kerja sampai',
    cost: 18000,
    estimatedDays: '1-2 Days'
  },
  {
    id: 'jne-reg',
    name: 'JNE Reguler',
    description: 'Estimasi 2-3 hari kerja sampai',
    cost: 15000,
    estimatedDays: '2-3 Days'
  },
  {
    id: 'jnt-express',
    name: 'J&T Express Standard',
    description: 'Estimasi 2-3 hari kerja sampai',
    cost: 16000,
    estimatedDays: '2-3 Days'
  },
  {
    id: 'gosend-instant',
    name: 'GoSend Instant (Bandung & Sekitarnya)',
    description: 'Pengiriman instan sampai hari yang sama',
    cost: 30000,
    estimatedDays: 'Same Day'
  }
];

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    settings, 
    createOrder, 
    setCurrentView, 
    showToast 
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bandung');
  const [province, setProvince] = useState('Jawa Barat');
  const [postalCode, setPostalCode] = useState('40115');
  const [notes, setNotes] = useState('');

  const [selectedCourier, setSelectedCourier] = useState<ShippingMethod>(COURIER_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'BANK_TRANSFER' | 'QRIS' | 'EWALLET'>('QRIS');
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);

  // Free shipping check
  const isFreeShipping = cartSubtotal >= (settings.freeShippingThreshold || 250000);
  const effectiveShippingCost = isFreeShipping ? 0 : selectedCourier.cost;
  const grandTotal = Math.max(0, cartSubtotal + effectiveShippingCost - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'RDCLOTH10' || promoCode.trim().toUpperCase() === 'FIRSTDROP') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(disc);
      setPromoApplied(true);
      showToast('Promo code applied! 10% discount added.', 'success');
    } else {
      showToast('Invalid promo code. Try "RDCLOTH10"', 'error');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim() || !address.trim()) {
      showToast('Please fill in your name, WhatsApp number, and address.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your bag is empty.', 'error');
      setCurrentView('shop');
      return;
    }

    setIsProcessing(true);
    try {
      const shippingDetails: ShippingAddress = {
        fullName,
        whatsapp,
        email,
        address,
        city,
        province,
        postalCode,
        notes
      };

      const orderItems = cart.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productSlug: item.productSlug,
        sku: `RDC-${item.productId.slice(0, 4).toUpperCase()}`,
        size: item.size,
        colorName: item.colorName,
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal: item.price * item.quantity,
        image: item.image,
        isCustom: item.isCustom
      }));

      const newOrder = await createOrder({
        customer: shippingDetails,
        items: orderItems,
        subtotal: cartSubtotal,
        shippingMethod: selectedCourier,
        shippingCost: effectiveShippingCost,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod,
        notes
      });

      setCompletedOrder(newOrder);
      showToast(`Order ${newOrder.id} placed successfully!`, 'success');
    } catch (err: any) {
      showToast('Failed to process checkout. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyBankNumber = () => {
    navigator.clipboard.writeText(settings.bankAccount.accountNumber || '8910234567');
    setCopiedBank(true);
    showToast('Bank Account Number copied.', 'success');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // If order is completed, show Order Success Screen
  if (completedOrder) {
    const waConfirmationMsg = `*KONFIRMASI PEMBAYARAN ORDER RDCLOTH* 📦
*Order ID:* ${completedOrder.id}
*Nama Customer:* ${completedOrder.customer.fullName}
*Total Belanja:* ${formatIDR(completedOrder.total)}
*Metode Bayar:* ${completedOrder.paymentMethod}
*Kurir Pengiriman:* ${completedOrder.shippingMethod.name}

Mohon konfirmasi pesanan dan proses pengiriman ya min. Terima kasih!`;

    const waConfirmUrl = generateWhatsAppUrl(settings.adminWhatsapp || '6281234567890', waConfirmationMsg);

    return (
      <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-10 shadow-xs space-y-8 text-center sm:text-left">
            {/* Header Success */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 border-b border-[#E0DFD8] pb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono-code uppercase text-emerald-700 font-bold">
                  CHECKOUT COMPLETED
                </span>
                <h1 className="font-heading text-3xl font-black uppercase text-[#141414] mt-0.5">
                  ORDER {completedOrder.id}
                </h1>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                  Thank you for wearing RdCloth! We have received your order details.
                </p>
              </div>
            </div>

            {/* Payment instructions */}
            {completedOrder.paymentMethod === 'BANK_TRANSFER' ? (
              <div className="p-6 bg-[#F5F5F0] border border-[#E0DFD8] space-y-4">
                <div className="flex items-center space-x-2 text-[#141414] font-heading font-bold uppercase text-sm">
                  <Building2 className="w-4 h-4 text-[#F27D26]" />
                  <span>TRANSFER MANUAL KE REKENING RESMI RDCLOTH:</span>
                </div>
                <div className="p-4 bg-[#FFFFFF] border border-[#E0DFD8] flex items-center justify-between">
                  <div className="text-left font-mono-code">
                    <p className="text-xs text-[#706E6B] uppercase">{settings.bankAccount.bankName}</p>
                    <p className="text-lg font-bold text-[#141414] tracking-wider">{settings.bankAccount.accountNumber}</p>
                    <p className="text-xs text-[#F27D26]">A/N: {settings.bankAccount.accountHolder}</p>
                  </div>
                  <button
                    onClick={copyBankNumber}
                    className="p-2.5 bg-[#F5F5F0] hover:bg-[#141414] hover:text-[#F5F5F0] transition-colors border border-[#E0DFD8] text-xs font-mono-code flex items-center space-x-1"
                  >
                    {copiedBank ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedBank ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <div className="flex justify-between text-xs font-mono-code text-[#706E6B]">
                  <span>JUMLAH TRANSFER PERSIS:</span>
                  <span className="text-[#141414] font-bold text-sm">{formatIDR(completedOrder.total)}</span>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#F5F5F0] border border-[#E0DFD8] text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-[#141414] font-heading font-bold uppercase text-sm">
                  <QrCode className="w-5 h-5 text-emerald-700" />
                  <span>PEMBAYARAN QRIS OTOMATIS (BCA / MANDIRI / GOPAY / OVO)</span>
                </div>
                <div className="w-44 h-44 mx-auto bg-white p-3 rounded shadow-xs border border-[#E0DFD8] flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://rdcloth.com/pay/qris-dummy"
                    alt="QRIS Payment Code"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-xs font-mono-code text-emerald-700 font-bold">
                  Status: <strong>PAID / VERIFIED INSTANTLY</strong>
                </p>
              </div>
            )}

            {/* Shipping Address Summary */}
            <div className="p-4 bg-[#F5F5F0] border border-[#E0DFD8] text-xs font-mono-code text-left space-y-1.5 text-[#706E6B]">
              <p className="text-[#141414] font-bold uppercase">ALAMAT PENGIRIMAN:</p>
              <p className="text-[#141414]">{completedOrder.customer.fullName} ({completedOrder.customer.whatsapp})</p>
              <p>{completedOrder.customer.address}, {completedOrder.customer.city}, {completedOrder.customer.province} {completedOrder.customer.postalCode}</p>
              <p className="text-[#706E6B]">Kurir: {completedOrder.shippingMethod.name} ({completedOrder.shippingMethod.estimatedDays})</p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={waConfirmUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>KONFIRMASI VIA WHATSAPP RESMI</span>
              </a>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setCurrentView('track-order')}
                  className="px-6 py-2.5 bg-[#FFFFFF] border border-[#E0DFD8] text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414]"
                >
                  TRACK ORDER STATUS
                </button>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-[#141414] text-[#F5F5F0] text-xs font-heading font-bold uppercase hover:bg-[#F27D26]"
                >
                  CONTINUE BROWSING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="border-b border-[#E0DFD8] pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#706E6B]">
              CHECKOUT
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#141414] mt-1">
              SECURE CHECKOUT
            </h1>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center space-x-1.5 text-xs font-mono-code text-[#706E6B] hover:text-[#141414]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SHOP</span>
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Customer & Shipping & Payment info */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Details */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
              <h2 className="font-heading text-lg font-bold uppercase text-[#141414] flex items-center space-x-2">
                <span>1. CUSTOMER INFORMATION</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code">
                <div className="sm:col-span-2">
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rian Pratama"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">WHATSAPP NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 081298765432"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    placeholder="e.g. rian@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
              <h2 className="font-heading text-lg font-bold uppercase text-[#141414]">
                2. SHIPPING DESTINATION
              </h2>

              <div className="space-y-4 text-xs font-mono-code">
                <div>
                  <label className="text-[#706E6B] block mb-1 uppercase font-bold">STREET ADDRESS & HOUSE NO. *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Jl. Tebet Barat Raya No. 45B, RT 04 / RW 02"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3.5 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[#706E6B] block mb-1 uppercase font-bold">KOTA / KABUPATEN *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                  </div>
                  <div>
                    <label className="text-[#706E6B] block mb-1 uppercase font-bold">PROVINSI *</label>
                    <input
                      type="text"
                      required
                      value={province}
                      onChange={e => setProvince(e.target.value)}
                      className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                  </div>
                  <div>
                    <label className="text-[#706E6B] block mb-1 uppercase font-bold">KODE POS *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Courier Selection */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold uppercase text-[#141414] flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span>3. SHIPPING METHOD</span>
                </h2>
                {isFreeShipping && (
                  <span className="text-[10px] font-mono-code font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 uppercase">
                    FREE SHIPPING ACTIVE
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs font-mono-code">
                {COURIER_OPTIONS.map(courier => {
                  const isSelected = selectedCourier.id === courier.id;
                  return (
                    <div
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier)}
                      className={`cursor-pointer p-4 border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F5F5F0] border-[#141414] ring-1 ring-[#141414]'
                          : 'bg-[#FFFFFF] border-[#E0DFD8] hover:border-[#141414]'
                      }`}
                    >
                      <div>
                        <p className="font-heading text-sm font-bold uppercase text-[#141414]">
                          {courier.name}
                        </p>
                        <p className="text-[11px] text-[#706E6B]">{courier.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#141414]">
                          {isFreeShipping ? 'FREE' : formatIDR(courier.cost)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-4 shadow-xs">
              <h2 className="font-heading text-lg font-bold uppercase text-[#141414] flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-[#F27D26]" />
                <span>4. PAYMENT METHOD</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-code">
                {[
                  { id: 'QRIS', label: 'QRIS INSTANT', sub: 'BCA/Mandiri/GoPay/OVO' },
                  { id: 'BANK_TRANSFER', label: 'MANUAL TRANSFER', sub: 'BCA Official Account' },
                  { id: 'EWALLET', label: 'E-WALLET', sub: 'Direct Settlement' }
                ].map(pm => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-4 border text-left transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-[#F5F5F0] border-[#141414] ring-1 ring-[#141414]'
                        : 'bg-[#FFFFFF] border-[#E0DFD8] text-[#706E6B] hover:text-[#141414]'
                    }`}
                  >
                    <p className="font-heading text-xs font-bold uppercase text-[#141414]">{pm.label}</p>
                    <p className="text-[10px] text-[#706E6B] mt-1">{pm.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#FFFFFF] border border-[#E0DFD8] space-y-6 sticky top-28 shadow-xs">
              <h2 className="font-heading text-lg font-bold uppercase text-[#141414] pb-4 border-b border-[#E0DFD8]">
                ORDER SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>

              {/* Items preview list */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#E0DFD8] pr-1 text-xs font-mono-code">
                {cart.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-14 object-cover bg-[#F5F5F0] border border-[#E0DFD8]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-heading text-xs font-bold uppercase text-[#141414] truncate max-w-[170px]">
                          {item.productName}
                        </p>
                        <p className="text-[10px] text-[#706E6B]">
                          {item.size} • {item.colorName} • {item.quantity}x
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#141414]">
                      {formatIDR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-[#E0DFD8]">
                <div className="flex space-x-2 text-xs font-mono-code">
                  <input
                    type="text"
                    placeholder="PROMO CODE (e.g. RDCLOTH10)"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1 bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] uppercase focus:outline-none focus:border-[#141414] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-4 bg-[#141414] hover:bg-[#F27D26] text-[#F5F5F0] font-bold text-xs uppercase transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[10px] font-mono-code text-emerald-700 mt-1 flex items-center space-x-1 font-bold">
                    <Check className="w-3 h-3" />
                    <span>Promo code RDCLOTH10 applied!</span>
                  </p>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-xs font-mono-code pt-4 border-t border-[#E0DFD8]">
                <div className="flex justify-between text-[#706E6B]">
                  <span>SUBTOTAL</span>
                  <span>{formatIDR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#706E6B]">
                  <span>SHIPPING ({selectedCourier.name.split(' ')[0]})</span>
                  <span>{effectiveShippingCost === 0 ? 'FREE' : formatIDR(effectiveShippingCost)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>DISCOUNT</span>
                    <span>-{formatIDR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#141414] pt-2 border-t border-[#E0DFD8]">
                  <span>TOTAL</span>
                  <span className="text-[#F27D26]">{formatIDR(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                id="place-order-btn"
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'CREATING ORDER...' : `PAY ${formatIDR(grandTotal)}`}</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono-code text-[#706E6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ENCRYPTED CHECKOUT • FAST DISPATCH</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
