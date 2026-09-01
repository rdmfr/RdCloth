import { Product, Collection, Review, HomepageCMS, StoreSettings, CustomOrder, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'moving-on-tee',
    sku: 'RDC-001',
    artifactCode: 'RDC / 001',
    chapter: 'CHAPTER I',
    name: 'Moving On Tee',
    tagline: 'Heavyweight Boxy 235 GSM — Drop 01: Mythology',
    price: 89000,
    originalPrice: 119000,
    marketplaceLinks: {
      shopee: 'https://shopee.co.id/search?keyword=RDCLOTH%20Moving%20On%20Tee',
      tokopedia: 'https://www.tokopedia.com/search?st=product&q=RDCLOTH%20Moving%20On%20Tee',
      tiktokshop: 'https://www.tiktok.com/search?lang=id-ID&keyword=RDCLOTH%20Moving%20On%20Tee'
    },
    category: 'tees',
    collectionId: 'drop-001',
    badge: 'NEW',
    description: 'Dirancang untuk keberanian yang tenang dan ketahanan jangka panjang. Dibuat dari katun combed 16s 235 GSM dengan siluet boxy arsitektural yang gagah. Sablon high-density di dada dan tipografi halus di bagian belakang.',
    storyDescription: 'Odysseus menghabiskan bertahun-tahun berusaha pulang ke rumah. Tapi terkadang, melangkah maju berarti menerima bahwa tempat yang dulu disebut rumah sudah tidak ada lagi. Kaos ini merepresentasikan momen ketika kamu berhenti menoleh ke belakang — dan memeluk cakrawala baru dengan penuh keberanian.',
    symbolism: [
      { label: 'THE SEA', meaning: 'Perjalanan panjang yang penuh ketidakpastian di hadapanmu.' },
      { label: 'THE SHIP', meaning: 'Dirimu sendiri — kendaraan ketahanan dan pilihan hidup.' },
      { label: 'THE HORIZON', meaning: 'Apa yang menantimu ketika nostalgia sudah berakhir.' },
      { label: 'THE BROKEN MARBLE', meaning: 'Sisa kenangan dari masa yang telah berlalu.' }
    ],
    details: [
      '100% Ring-Spun Combed Cotton 16s (235 GSM)',
      'Siluet boxy drop-shoulder streetwear modern',
      'Kerah ribbed 2.5cm yang tetap tegak setelah berkali-kali dicuci',
      'Sablon Plastisol dual-pass untuk tekstur yang awet dan tahan lama',
      'Pre-shrunk untuk mencegah penyusutan setelah dicuci',
      'Dibuat di Bandung, Indonesia dalam batch terbatas'
    ],
    material: '100% Heavyweight Combed Cotton 16s (235 GSM)',
    fit: 'Boxy Streetwear Fit (True to size untuk tampilan relaxed, size down untuk fitted)',
    care: [
      'Cuci mesin dengan air dingin, pisahkan dari warna cerah',
      'Balikkan kaos sebelum dicuci untuk menjaga warna',
      'Jangan setrika langsung di atas sablon',
      'Keringkan dengan cara digantung di tempat teduh'
    ],
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        alt: 'Moving On Tee — Model view, black oversized streetwear',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Moving On Tee — Detail tampilan belakang',
        angle: 'back'
      },
      {
        id: 'img-1-3',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Moving On Tee — Detail tekstur kain dan kerah ribbed',
        angle: 'detail'
      }
    ],
    variants: [
      { id: 'var-1-s-blk', size: 'S', colorName: 'Washed Black', colorHex: '#18181b', stock: 12, sku: 'RDC-001-BLK-S' },
      { id: 'var-1-m-blk', size: 'M', colorName: 'Washed Black', colorHex: '#18181b', stock: 20, sku: 'RDC-001-BLK-M' },
      { id: 'var-1-l-blk', size: 'L', colorName: 'Washed Black', colorHex: '#18181b', stock: 18, sku: 'RDC-001-BLK-L' },
      { id: 'var-1-xl-blk', size: 'XL', colorName: 'Washed Black', colorHex: '#18181b', stock: 10, sku: 'RDC-001-BLK-XL' },
      { id: 'var-1-xxl-blk', size: 'XXL', colorName: 'Washed Black', colorHex: '#18181b', stock: 6, sku: 'RDC-001-BLK-XXL' },
      { id: 'var-1-s-wht', size: 'S', colorName: 'Off-White Chalk', colorHex: '#f4f4f0', stock: 8, sku: 'RDC-001-WHT-S' },
      { id: 'var-1-m-wht', size: 'M', colorName: 'Off-White Chalk', colorHex: '#f4f4f0', stock: 15, sku: 'RDC-001-WHT-M' },
      { id: 'var-1-l-wht', size: 'L', colorName: 'Off-White Chalk', colorHex: '#f4f4f0', stock: 14, sku: 'RDC-001-WHT-L' },
      { id: 'var-1-xl-wht', size: 'XL', colorName: 'Off-White Chalk', colorHex: '#f4f4f0', stock: 7, sku: 'RDC-001-WHT-XL' }
    ],
    colors: [
      { name: 'Washed Black', hex: '#18181b' },
      { name: 'Off-White Chalk', hex: '#f4f4f0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-03-01T10:00:00Z',
    rating: 4.9,
    reviewCount: 28,
    seoTitle: 'Moving On Tee — Artifact 001 | RdCloth',
    seoDescription: 'Kaos heavyweight streetwear 235 GSM boxy oleh RdCloth. Drop 01: Mythology — Moving On.'
  },
  {
    id: 'prod-2',
    slug: 'rdc-essential-tee',
    sku: 'RDC-002',
    artifactCode: 'RDC / 002',
    chapter: 'ESSENTIALS',
    name: 'RDC Essential Blank Tee',
    tagline: 'Katun Combed 24s 210 GSM — Blank Canvas Harian',
    price: 79000,
    originalPrice: 99000,
    marketplaceLinks: {
      shopee: 'https://shopee.co.id/search?keyword=RDCLOTH%20Essential%20Blank%20Tee',
      tokopedia: 'https://www.tokopedia.com/search?st=product&q=RDCLOTH%20Essential%20Blank%20Tee',
      tiktokshop: 'https://www.tiktok.com/search?lang=id-ID&keyword=RDCLOTH%20Essential%20Blank%20Tee'
    },
    category: 'tees',
    collectionId: 'essentials',
    badge: 'BEST SELLER',
    description: 'Fondasi pemakaian harian yang tidak pernah ketinggalan. Dibuat untuk dipakai setiap hari sebagai blank canvas atau statement piece polos. Katun combed 24s yang lembut dan bernapas dengan hem double-needle dan label leher screenprint anti-gatal.',
    details: [
      '100% Premium Combed Cotton 24s (210 GSM)',
      'Siluet relaxed kontemporer yang jatuh alami',
      'Kerah ribbed yang nyaman dan pas di leher',
      'Label ukuran screenprint di bagian dalam — bebas gatal',
      'Warna reactive dyed yang tetap kaya dan dalam setelah puluhan kali cuci',
      'Kompatibel untuk custom sablon DTF, silkscreen, atau pemakaian langsung'
    ],
    material: '100% Combed Cotton 24s (210 GSM)',
    fit: 'Relaxed Streetwear Fit (Potongan casual dengan ruang di dada dan lengan)',
    care: [
      'Cuci mesin normal dengan air dingin',
      'Keringkan dengan cara digantung atau mesin pengering suhu rendah',
      'Setrika suhu sedang jika diperlukan'
    ],
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Essential Tee — Charcoal Grey, street model',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Essential Tee — Flat lay depan',
        angle: 'front'
      },
      {
        id: 'img-2-3',
        url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Essential Tee — Detail kerah dan jahitan',
        angle: 'detail'
      }
    ],
    variants: [
      { id: 'var-2-s-blk', size: 'S', colorName: 'Pitch Black', colorHex: '#0c0c0e', stock: 24, sku: 'RDC-002-BLK-S' },
      { id: 'var-2-m-blk', size: 'M', colorName: 'Pitch Black', colorHex: '#0c0c0e', stock: 35, sku: 'RDC-002-BLK-M' },
      { id: 'var-2-l-blk', size: 'L', colorName: 'Pitch Black', colorHex: '#0c0c0e', stock: 30, sku: 'RDC-002-BLK-L' },
      { id: 'var-2-xl-blk', size: 'XL', colorName: 'Pitch Black', colorHex: '#0c0c0e', stock: 18, sku: 'RDC-002-BLK-XL' },
      { id: 'var-2-m-gry', size: 'M', colorName: 'Charcoal Grey', colorHex: '#2d2d30', stock: 22, sku: 'RDC-002-GRY-M' },
      { id: 'var-2-l-gry', size: 'L', colorName: 'Charcoal Grey', colorHex: '#2d2d30', stock: 19, sku: 'RDC-002-GRY-L' },
      { id: 'var-2-m-crm', size: 'M', colorName: 'Raw Cream', colorHex: '#eae6df', stock: 16, sku: 'RDC-002-CRM-M' },
      { id: 'var-2-l-crm', size: 'L', colorName: 'Raw Cream', colorHex: '#eae6df', stock: 14, sku: 'RDC-002-CRM-L' }
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0c0c0e' },
      { name: 'Charcoal Grey', hex: '#2d2d30' },
      { name: 'Raw Cream', hex: '#eae6df' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-03-02T10:00:00Z',
    rating: 4.8,
    reviewCount: 42,
    seoTitle: 'RDC Essential Blank Tee | RdCloth',
    seoDescription: 'Kaos blank premium 210 GSM Combed 24s. Lembut, berstruktur, dan tahan lama untuk pemakaian harian.'
  },
  {
    id: 'prod-3',
    slug: 'move-anyway-tee',
    sku: 'RDC-003',
    artifactCode: 'RDC / 003',
    chapter: 'CHAPTER I',
    name: 'Move Anyway Tee',
    tagline: 'Statement Typographic Drop 01 — 220 GSM Limited',
    price: 89000,
    originalPrice: 129000,
    marketplaceLinks: {
      shopee: 'https://shopee.co.id/search?keyword=RDCLOTH%20Move%20Anyway%20Graphic%20Tee',
      tokopedia: 'https://www.tokopedia.com/search?st=product&q=RDCLOTH%20Move%20Anyway%20Graphic%20Tee',
      tiktokshop: 'https://www.tiktok.com/search?lang=id-ID&keyword=RDCLOTH%20Move%20Anyway%20Graphic%20Tee'
    },
    category: 'tees',
    collectionId: 'drop-001',
    badge: 'LIMITED',
    description: 'Pengingat keras untuk bergerak tanpa menunggu validasi. Tipografi editorial Swiss-style kontras tinggi di dada dengan koordinat Jepang vertikal di hem lengan. Ini bukan hanya kaos — ini manifesto pergerakan.',
    storyDescription: 'Penantian yang sempurna tidak pernah datang. Mitologi mengajarkan kita bahwa para pahlawan bergerak meski takut, bukan karena tidak takut. "Move Anyway" adalah satu-satunya filosofi yang membuat perbedaan antara yang bermimpi dan yang berhasil.',
    symbolism: [
      { label: 'THE TYPOGRAPHY', meaning: 'Manifesto yang dicetak langsung di tubuhmu.' },
      { label: 'THE COORDINATES', meaning: 'Petunjuk arah menuju dirimu sendiri yang lebih baik.' },
      { label: 'THE WEIGHT', meaning: '220 GSM — seberat komitmen yang kamu buat.' }
    ],
    details: [
      '100% Combed Cotton 20s (220 GSM)',
      'Sablon rubber ink silkscreen + matte puff print pada headline',
      'Potongan boxy drop-shoulder dengan lengan yang sedikit lebih panjang',
      'Neck tape shoulder-to-shoulder yang diperkuat',
      'Run terbatas 150 pcs per batch'
    ],
    material: '100% Heavyweight Cotton 20s (220 GSM)',
    fit: 'Boxy Oversized Fit',
    care: [
      'Cuci mesin dengan air dingin, balikkan kaos ke dalam',
      'Jangan menggunakan pemutih',
      'Setrika dingin dari sisi dalam'
    ],
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Move Anyway Tee — Editorial streetwear shot',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-3-2',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        alt: 'Move Anyway Tee — Tampilan depan',
        angle: 'front'
      }
    ],
    variants: [
      { id: 'var-3-s-blk', size: 'S', colorName: 'Washed Black', colorHex: '#141416', stock: 8, sku: 'RDC-003-BLK-S' },
      { id: 'var-3-m-blk', size: 'M', colorName: 'Washed Black', colorHex: '#141416', stock: 12, sku: 'RDC-003-BLK-M' },
      { id: 'var-3-l-blk', size: 'L', colorName: 'Washed Black', colorHex: '#141416', stock: 10, sku: 'RDC-003-BLK-L' },
      { id: 'var-3-xl-blk', size: 'XL', colorName: 'Washed Black', colorHex: '#141416', stock: 5, sku: 'RDC-003-BLK-XL' }
    ],
    colors: [
      { name: 'Washed Black', hex: '#141416' },
      { name: 'Pure White', hex: '#fafafa' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-03-03T10:00:00Z',
    rating: 5.0,
    reviewCount: 19,
    seoTitle: 'Move Anyway Tee — Artifact 003 | RdCloth',
    seoDescription: 'Kaos streetwear limited edition dengan sablon tipografi editorial modern. RdCloth Drop 01: Mythology.'
  },
  {
    id: 'prod-4',
    slug: 'rdc-canvas-tote',
    sku: 'RDC-004',
    artifactCode: 'RDC / 004',
    chapter: 'ESSENTIALS',
    name: 'RDC Heavy Canvas Tote',
    tagline: 'Tas Kanvas 16oz Raw Cotton — Everyday Carrier',
    price: 59000,
    originalPrice: 79000,
    marketplaceLinks: {
      shopee: 'https://shopee.co.id/search?keyword=RDCLOTH%20Heavy%20Canvas%20Tote',
      tokopedia: 'https://www.tokopedia.com/search?st=product&q=RDCLOTH%20Heavy%20Canvas%20Tote',
      tiktokshop: 'https://www.tiktok.com/search?lang=id-ID&keyword=RDCLOTH%20Heavy%20Canvas%20Tote'
    },
    category: 'accessories',
    collectionId: 'essentials',
    badge: 'BEST SELLER',
    description: 'Dibuat untuk membawa laptop, buku, dan perlengkapan harian tanpa melorot. Konstruksi dari kanvas katun alami unbleached 16oz yang berat dengan jahitan X-box di titik-titik beban utama. Tas yang bertahan lebih lama dari trennya.',
    details: [
      '16oz Heavyweight Unbleached Raw Cotton Canvas',
      'Kantong resleting dalam untuk ponsel, kunci, dan dompet',
      'Ukuran 38cm × 42cm × 10cm dengan gusset bawah untuk volume terstruktur',
      'Handle webbing 65cm heavy-duty untuk kenyamanan carry over-shoulder',
      'Label woven RdCloth di sisi luar sambungan'
    ],
    material: '100% 16oz Rugged Cotton Canvas',
    fit: 'One Size (38 × 42 × 10 cm)',
    care: [
      'Bersihkan dengan sabun ringan dan air dingin secara spot-clean',
      'Jangan cuci mesin agar kekauan kanvas terjaga',
      'Keringkan dengan posisi flat di tempat teduh'
    ],
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Canvas Tote — Street lifestyle shot',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-4-2',
        url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Canvas Tote — Studio flat lay',
        angle: 'front'
      }
    ],
    variants: [
      { id: 'var-4-os-nat', size: 'One Size', colorName: 'Raw Natural Ecru', colorHex: '#ede8dd', stock: 45, sku: 'RDC-004-NAT-OS' },
      { id: 'var-4-os-blk', size: 'One Size', colorName: 'Matte Jet Black', colorHex: '#121214', stock: 38, sku: 'RDC-004-BLK-OS' }
    ],
    colors: [
      { name: 'Raw Natural Ecru', hex: '#ede8dd' },
      { name: 'Matte Jet Black', hex: '#121214' }
    ],
    sizes: ['One Size'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-03-04T10:00:00Z',
    rating: 4.9,
    reviewCount: 36,
    seoTitle: 'RDC Heavy Canvas Tote | RdCloth Essentials',
    seoDescription: 'Tas kanvas katun 16oz berat dengan kantong resleting dalam dan webbing yang diperkuat.'
  },
  {
    id: 'prod-5',
    slug: 'rdc-unstructured-cap',
    sku: 'RDC-005',
    artifactCode: 'RDC / 005',
    chapter: 'ESSENTIALS',
    name: 'RDC Washed Dad Cap',
    tagline: '6-Panel Vintage Washed Cotton Twill',
    price: 69000,
    originalPrice: 89000,
    marketplaceLinks: {
      shopee: 'https://shopee.co.id/search?keyword=RDCLOTH%20Washed%20Dad%20Cap',
      tokopedia: 'https://www.tokopedia.com/search?st=product&q=RDCLOTH%20Washed%20Dad%20Cap',
      tiktokshop: 'https://www.tiktok.com/search?lang=id-ID&keyword=RDCLOTH%20Washed%20Dad%20Cap'
    },
    category: 'accessories',
    collectionId: 'essentials',
    badge: 'NEW',
    description: 'Siluet 6-panel unstructured low-profile dari chino twill vintage enzyme-washed. Bordir monogram RdCloth 3D tonal yang halus dengan buckle kuningan antik. Topi yang pas untuk segala situasi — dari pasar hingga exhibit.',
    details: [
      '100% Enzyme-Washed Chino Cotton Twill',
      'Crown unstructured rendah untuk siluet yang effortless',
      'Tali self-fabric dengan buckle sliding kuningan antik',
      'Bordir 3D tonal high-density di crown depan',
      'Brim melengkung dengan eyelet ventilasi yang dijahit'
    ],
    material: '100% Washed Chino Cotton Twill',
    fit: 'One Size Fits All (Lingkar kepala 54-60cm, adjustable)',
    care: [
      'Cuci tangan dengan air hangat suam dan deterjen lembut',
      'Bentuk ulang brim dan keringkan di atas mangkuk bulat atau bentuk kepala'
    ],
    images: [
      {
        id: 'img-5-1',
        url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Washed Dad Cap — Black cotton',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-5-2',
        url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Washed Dad Cap — Side profile',
        angle: 'front'
      }
    ],
    variants: [
      { id: 'var-5-os-blk', size: 'One Size', colorName: 'Faded Obsidian', colorHex: '#1b1b1d', stock: 25, sku: 'RDC-005-BLK-OS' },
      { id: 'var-5-os-oli', size: 'One Size', colorName: 'Vintage Olive', colorHex: '#4a5340', stock: 18, sku: 'RDC-005-OLI-OS' }
    ],
    colors: [
      { name: 'Faded Obsidian', hex: '#1b1b1d' },
      { name: 'Vintage Olive', hex: '#4a5340' }
    ],
    sizes: ['One Size'],
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-03-05T10:00:00Z',
    rating: 4.7,
    reviewCount: 15,
    seoTitle: 'RDC Washed Dad Cap | RdCloth',
    seoDescription: 'Topi 6-panel washed cotton twill low-profile dengan buckle kuningan antik.'
  },
  {
    id: 'prod-6',
    slug: 'rdc-heavy-fleece-hoodie',
    sku: 'RDC-006',
    artifactCode: 'RDC / 006',
    chapter: 'CHAPTER I',
    name: 'RDC Heavy Fleece Hoodie',
    tagline: 'French Terry 330 GSM Custom Milled — Drop 01',
    price: 149000,
    originalPrice: 189000,
    marketplaceLinks: {
      shopee: 'https://shopee.co.id/search?keyword=RDCLOTH%20Heavy%20Fleece%20Hoodie',
      tokopedia: 'https://www.tokopedia.com/search?st=product&q=RDCLOTH%20Heavy%20Fleece%20Hoodie',
      tiktokshop: 'https://www.tiktok.com/search?lang=id-ID&keyword=RDCLOTH%20Heavy%20Fleece%20Hoodie'
    },
    category: 'hoodies',
    collectionId: 'drop-001',
    badge: 'LIMITED',
    description: 'Berbobot berat, hangat, dan terstruktur tanpa terasa kaku. Hood double-layer tanpa drawstring untuk estetika arsitektural yang bersih, bahu yang jatuh, dan kantong kangguru yang dalam. Hoodie untuk mereka yang memilih ketahanan sebagai gaya hidup.',
    storyDescription: 'Dalam mitologi Yunani, para pahlawan tidak pernah berhenti di saat dingin. Mereka melanjutkan perjalanan — diselimuti ketabahan yang lebih tebal dari kain manapun. Hoodie ini adalah armor modern untuk hari-hari berat.',
    symbolism: [
      { label: 'THE DOUBLE HOOD', meaning: 'Perlindungan berlapis — dari dingin dan dari keraguan.' },
      { label: 'THE WEIGHT', meaning: '330 GSM — seberat tanggung jawab yang kamu pikul dengan bangga.' },
      { label: 'THE KANGAROO POUCH', meaning: 'Tempat menyimpan keberanian — tersembunyi, tapi selalu ada.' }
    ],
    details: [
      '330 GSM Custom Milled French Terry 100% Cotton',
      'Struktur hood double-walled tanpa jahitan yang terlihat',
      'Cuff dan waistband ribbed 2x2 yang lebar',
      'Loop earbud/kunci tersembunyi di dalam kantong',
      'Pre-washed dan enzyme softened'
    ],
    material: '100% French Terry Cotton 330 GSM',
    fit: 'Boxy Relaxed Cut (Pas oversized dengan nyaman)',
    care: [
      'Cuci mesin gentle cycle dengan air dingin',
      'Keringkan dengan posisi flat untuk menjaga bentuk'
    ],
    images: [
      {
        id: 'img-6-1',
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Fleece Hoodie — Model shot',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-6-2',
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Fleece Hoodie — Tekstur dan detail hood',
        angle: 'front'
      }
    ],
    variants: [
      { id: 'var-6-m-blk', size: 'M', colorName: 'Charcoal Black', colorHex: '#171717', stock: 12, sku: 'RDC-006-BLK-M' },
      { id: 'var-6-l-blk', size: 'L', colorName: 'Charcoal Black', colorHex: '#171717', stock: 10, sku: 'RDC-006-BLK-L' },
      { id: 'var-6-xl-blk', size: 'XL', colorName: 'Charcoal Black', colorHex: '#171717', stock: 6, sku: 'RDC-006-BLK-XL' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#171717' }
    ],
    sizes: ['M', 'L', 'XL'],
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-03-06T10:00:00Z',
    rating: 4.9,
    reviewCount: 11,
    seoTitle: 'RDC Heavy Fleece Hoodie | RdCloth',
    seoDescription: 'Hoodie boxy heavyweight 330 GSM French Terry. RdCloth Drop 01: Mythology.'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'drop-001',
    slug: 'drop-001',
    name: 'DROP 01: MYTHOLOGY',
    subtitle: 'CHAPTER I — MOVING ON',
    description: 'Kisah mitologi kuno sebagai metafora perjalanan hidup, ketabahan menghadapi badai kehilangan, dan keberanian melangkah menuju cakrawala baru.',
    bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-1', 'prod-3', 'prod-6'],
    isFeatured: true,
    status: 'ACTIVE',
    releaseDate: 'RELEASED — DROP 01'
  },
  {
    id: 'drop-002',
    slug: 'drop-002',
    name: 'DROP 02: GAMES',
    subtitle: 'CHAPTER II — RESPAWN & QUESTS',
    description: 'Dunia game sebagai metafora realitas: tentang kegagalan yang bukan akhir, keberanian menekan tombol Respawn, dan grinding tanpa henti.',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-2', 'prod-4'],
    isFeatured: true,
    status: 'ACTIVE',
    releaseDate: 'COMING SOON — Q3 2026'
  },
  {
    id: 'drop-003',
    slug: 'drop-003',
    name: 'DROP 03: ANIME',
    subtitle: 'CHAPTER III — LIMIT BREAK',
    description: 'Arsip narasi anime tentang tekad manusia yang pantang menyerah, menjadi tokoh utama dalam hidup sendiri, dan ikatan persahabatan yang abadi.',
    bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-5'],
    isFeatured: true,
    status: 'ACTIVE',
    releaseDate: 'UPCOMING — Q4 2026'
  },
  {
    id: 'essentials',
    slug: 'essentials',
    name: 'ESSENTIALS',
    subtitle: 'PERMANENT FOUNDATIONS',
    description: 'Kaos polos katun combed premium 24s dan 16s untuk rotasi pemakaian harian dengan standar ketebalan dan fitting streetwear terbaik.',
    bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-2', 'prod-4', 'prod-5'],
    isFeatured: true,
    status: 'ACTIVE',
    releaseDate: 'PERMANENT CAPSULE'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Moving On Tee',
    userName: 'Dimas Aditya',
    rating: 5,
    comment: 'Bahan 16s cotton-nya tebal dan kokoh banget, jatuhnya beneran boxy streetwear. Pas dicuci kerah lehernya gak melar sama sekali. Makna ceritanya juga dapet banget!',
    fitFeedback: 'True to Size',
    sizePurchased: 'L',
    isApproved: true,
    createdAt: '2026-03-08T14:30:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    productName: 'RDC Essential Blank Tee',
    userName: 'Farhan Maulana',
    rating: 5,
    comment: 'Nyaman dipakai seharian, adem tapi gak nerawang. Sablonan neck label-nya rapi gak gatal.',
    fitFeedback: 'True to Size',
    sizePurchased: 'XL',
    isApproved: true,
    createdAt: '2026-03-10T09:15:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-4',
    productName: 'RDC Heavy Canvas Tote',
    userName: 'Clarissa W.',
    rating: 5,
    comment: 'Muat laptop 15 inch + binder + charger. Bahannya tebel banget 16oz dan talinya gak bikin sakit pundak. Desain minimalisnya suka bgt.',
    fitFeedback: 'True to Size',
    sizePurchased: 'One Size',
    isApproved: true,
    createdAt: '2026-03-11T16:40:00Z'
  }
];

export const INITIAL_CMS: HomepageCMS = {
  heroTagline: 'DROP 01 // CHAPTER I: MYTHOLOGY',
  heroHeadline: 'RDCLOTH',
  heroSubheadline: 'Setiap drop membawa narasi dan makna tersendiri tentang fase kehidupan manusia. Diekspresikan ke dalam streetwear berbobot tebal dengan kualitas tanpa kompromi.',
  heroImage: '/thinker-bg.png',
  heroSecondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  heroCtaText: 'Jelajahi Drop 01',
  heroCtaLink: '/shop',
  heroSecondaryCtaText: 'Beli di Marketplace',
  heroSecondaryCtaLink: '/shop',
  marqueeText: 'RDCLOTH — STORIES WORTH WEARING — DROP 01: MYTHOLOGY • DROP 02: GAMES • DROP 03: ANIME — EVERY DROP TELLS A STORY —',
  featuredDropSubtitle: 'Cerita yang bermakna, dibuat untuk dipakai setiap hari.',
  brandStoryTitle: 'EVERY DROP TELLS A STORY',
  brandStoryText1: 'RdCloth adalah brand apparel storytelling. Kami percaya bahwa pakaian bukan sekadar kain kosong, melainkan kanvas yang merefleksikan fase perjalanan hidup manusia.',
  brandStoryText2: 'Setiap Drop dirilis dengan tema dan narasi yang berbeda—mulai dari Mitologi Kuno, Dunia Games & Realitas Virtual, hingga Filosofi Anime—dibuat dengan bahan katun 235 GSM terbaik.',
  visualBreakQuote: 'EVERY DROP TELLS A DIFFERENT STORY.',
  instagramHandle: '@rdcloth.studio',
  instagramImages: [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop'
  ]
};

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'RdCloth',
  tagline: 'STORIES WORTH WEARING.',
  adminWhatsapp: '6281234567890',
  contactEmail: 'contact@rdcloth.com',
  instagramUrl: 'https://instagram.com/rdcloth',
  tiktokUrl: 'https://tiktok.com/@rdcloth',
  shopeeUrl: 'https://shopee.co.id/search?keyword=rdcloth',
  tokopediaUrl: 'https://www.tokopedia.com/',
  tiktokshopUrl: 'https://www.tiktok.com/shop',
  bankAccount: {
    bankName: 'BCA (Bank Central Asia)',
    accountNumber: '8910-2345-67',
    accountHolder: 'RDCLOTH APPAREL STUDIO'
  },
  freeShippingThreshold: 250000,
  address: 'Jl. Riau No. 88, Citarum, Kec. Bandung Wetan',
  city: 'Kota Bandung, Jawa Barat'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RDC-89214',
    customer: {
      fullName: 'Rian Pratama',
      whatsapp: '081298765432',
      email: 'rian.pratama@gmail.com',
      address: 'Jl. Tebet Barat Raya No. 45B, RT 04 / RW 02',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12810'
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'Moving On Tee',
        productSlug: 'moving-on-tee',
        sku: 'RDC-001-BLK-L',
        size: 'L',
        colorName: 'Washed Black',
        quantity: 1,
        unitPrice: 89000,
        subtotal: 89000,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop'
      }
    ],
    subtotal: 89000,
    shippingMethod: {
      id: 'sicepat-best',
      name: 'SiCepat BEST (Next Day)',
      description: 'Estimasi 1 hari kerja sampai',
      cost: 18000,
      estimatedDays: '1-2 Days'
    },
    shippingCost: 18000,
    discount: 0,
    total: 107000,
    paymentMethod: 'QRIS',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    trackingNumber: 'SCP9028491823',
    courier: 'SiCepat Express',
    createdAt: '2026-03-12T08:20:00Z',
    updatedAt: '2026-03-13T10:00:00Z',
    timeline: [
      { status: 'PENDING', timestamp: '2026-03-12 08:20', description: 'Order created & invoice generated.' },
      { status: 'PAID', timestamp: '2026-03-12 08:25', description: 'Payment of Rp107.000 verified via QRIS.' },
      { status: 'PROCESSING', timestamp: '2026-03-12 10:00', description: 'Order batch queued at Bandung workshop.' },
      { status: 'QC', timestamp: '2026-03-12 16:30', description: 'Quality inspection passed. Packaged in biodegradable polybag.' },
      { status: 'SHIPPED', timestamp: '2026-03-13 10:00', description: 'Picked up by SiCepat courier. Tracking Resi: SCP9028491823.' }
    ]
  }
];

export const INITIAL_CUSTOM_ORDERS: CustomOrder[] = [
  {
    id: 'CUST-38291',
    customerName: 'Nadhif Alamsyah',
    whatsapp: '087823419082',
    email: 'nadhif.alam@gmail.com',
    apparelType: 'Heavyweight Boxy Tee 235 GSM',
    color: 'Washed Black',
    colorHex: '#18181b',
    size: 'XL',
    quantity: 12,
    placement: 'Front Chest Pocket + Back Oversized Graphic',
    printTechnique: 'High-Density DTF (Direct-to-Film)',
    designFileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
    designFileName: 'architect_club_artwork_v2.png',
    notes: 'Untuk seragam studio arsitektur batch 2026. Mohon sablon matte jangan terlalu glossy ya min.',
    estimatedPrice: 1140000,
    status: 'PRODUCTION',
    adminNotes: 'Desain artwork sudah high-res 300dpi. Sedang proses cetak DTF dan press.',
    createdAt: '2026-03-11T11:15:00Z',
    updatedAt: '2026-03-12T14:00:00Z'
  }
];
