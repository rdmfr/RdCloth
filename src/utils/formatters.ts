export const formatIDR = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

export const formatDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const generateWhatsAppUrl = (
  phone: string,
  message: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '').replace(/^0/, '62');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
};

export const buildCustomOrderWhatsAppMsg = (order: {
  id?: string;
  customerName: string;
  apparelType: string;
  color: string;
  size: string;
  quantity: number;
  placement: string;
  printTechnique: string;
  estimatedPrice: number;
  notes?: string;
}): string => {
  return `*HALO RDCLOTH APPAREL STUDIO* 👋
Saya ingin konfirmasi request *Custom Order* berikut:

*Order ID:* ${order.id || 'Draft Request'}
*Nama:* ${order.customerName}
*Produk:* ${order.apparelType}
*Warna:* ${order.color}
*Ukuran:* ${order.size}
*Jumlah:* ${order.quantity} pcs
*Posisi Sablon/Bordir:* ${order.placement}
*Teknik Cetak:* ${order.printTechnique}
*Estimasi Total:* ${formatIDR(order.estimatedPrice)}
${order.notes ? `*Catatan Khusus:* ${order.notes}` : ''}

Mohon info untuk kelanjutan proofing desain dan jadwal produksinya. Terima kasih!`;
};
