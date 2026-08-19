import { Product, Collection, Review, HomepageCMS, StoreSettings, CustomOrder, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'stay-lowkey-tee',
    sku: 'RDC-001',
    name: 'Stay Lowkey Tee',
    tagline: 'Boxy Heavyweight 235 GSM Graphic Tee',
    price: 89000,
    originalPrice: 119000,
    category: 'tees',
    collectionId: 'drop-001',
    badge: 'NEW',
    description: 'Designed for quiet confidence. Crafted from custom-knit 235 GSM heavyweight combed cotton with an architectural boxy drape. High-density micro-screenprinted chest accent with subtle typography across the back yolk.',
    details: [
      '100% Ring-Spun Combed Cotton 16s (235 GSM)',
      'Boxy drop-shoulder modern streetwear silhouette',
      'Thick 2.5cm ribbed collar that holds shape after multiple washes',
      'Dual-pass Plastisol silkscreen print for ultra-durable texture',
      'Pre-shrunk to prevent shrinkage after machine wash',
      'Made in Bandung, Indonesia in limited small batches'
    ],
    material: '100% Heavyweight Combed Cotton 16s (235 GSM)',
    fit: 'Boxy Streetwear Fit (True to size for relaxed look, size down for fitted)',
    care: [
      'Machine wash cold with like colors',
      'Turn garment inside out before washing',
      'Do not iron directly on print graphic',
      'Hang dry in shade to preserve cotton density'
    ],
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        alt: 'Stay Lowkey Tee Front Angle - Model wearing black oversized streetwear tee',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Stay Lowkey Tee Back Detail Angle',
        angle: 'back'
      },
      {
        id: 'img-1-3',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Stay Lowkey Tee Fabric Texture and Ribbed Neck Detail',
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
    seoTitle: 'Stay Lowkey Tee | RdCloth Modern Streetwear',
    seoDescription: 'Heavyweight 235 GSM boxy streetwear graphic t-shirt by RdCloth. Premium combed cotton with minimalist graphic print.'
  },
  {
    id: 'prod-2',
    slug: 'rdc-essential-tee',
    sku: 'RDC-002',
    name: 'RDC Essential Blank Tee',
    tagline: 'The Ultimate Daily Blank Canvas 210 GSM',
    price: 79000,
    originalPrice: 99000,
    category: 'tees',
    collectionId: 'essentials',
    badge: 'BEST SELLER',
    description: 'The foundation of everyday styling. Built for effortless daily wear or as a custom-ready canvas. Pure breathable combed cotton 24s with reinforced double-needle hem and zero scratchy neck labels.',
    details: [
      '100% Premium Combed Cotton 24s (210 GSM)',
      'Contemporary relaxed silhouette that drapes naturally',
      'Comfort-bound ribbed crewneck collar',
      'Screenprinted interior neck sizing for itch-free wear',
      'Reactive dyed fabric that stays deep and rich after dozens of washes',
      'Compatible with custom silkscreen, DTF, or direct wear'
    ],
    material: '100% Combed Cotton 24s (210 GSM)',
    fit: 'Relaxed Streetwear Fit (Casual cut with room in chest and arms)',
    care: [
      'Normal machine wash cold',
      'Tumble dry low or air dry',
      'Warm iron if necessary'
    ],
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Essential Tee in Charcoal Grey on Street Model',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Essential Tee Flat Lay Front View',
        angle: 'front'
      },
      {
        id: 'img-2-3',
        url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Essential Tee Collar and Stitching Detail',
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
    seoDescription: 'Premium blank t-shirt 210 GSM Combed 24s. Soft, structured, and long-lasting.'
  },
  {
    id: 'prod-3',
    slug: 'move-anyway-tee',
    sku: 'RDC-003',
    name: 'Move Anyway Graphic Tee',
    tagline: 'Minimalist Typographic Statement Piece',
    price: 89000,
    originalPrice: 129000,
    category: 'tees',
    collectionId: 'drop-001',
    badge: 'LIMITED',
    description: 'A bold, rebellious reminder to execute without waiting for validation. Features high-contrast editorial Swiss-style typography across the chest and vertical Japanese coordinates on the sleeve hem.',
    details: [
      '100% Combed Cotton 20s (220 GSM)',
      'Silkscreen rubber ink + subtle matte puff print on headline',
      'Boxy drop-shoulder cut with elongated sleeves',
      'Reinforced shoulder-to-shoulder neck tape',
      'Numbered run of 150 pieces per batch'
    ],
    material: '100% Heavyweight Cotton 20s (220 GSM)',
    fit: 'Boxy Oversized Fit',
    care: [
      'Machine wash inside out in cold water',
      'Do not bleach',
      'Cool iron inside out'
    ],
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Move Anyway Tee Editorial Streetwear Shot',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-3-2',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        alt: 'Move Anyway Tee Front Angle',
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
    seoTitle: 'Move Anyway Graphic Tee | RdCloth',
    seoDescription: 'Limited edition streetwear graphic tee with modern typographic print.'
  },
  {
    id: 'prod-4',
    slug: 'rdc-canvas-tote',
    sku: 'RDC-004',
    name: 'RDC Heavy Canvas Tote',
    tagline: '16oz Rugged Raw Cotton Everyday Carrier',
    price: 59000,
    originalPrice: 79000,
    category: 'accessories',
    collectionId: 'essentials',
    badge: 'BEST SELLER',
    description: 'Built to carry laptops, books, sketching pads, or daily essentials without bowing. Constructed from ultra-tough 16oz unbleached natural canvas with reinforced X-box cross-stitching on load points.',
    details: [
      '16oz Heavyweight Unbleached Raw Cotton Canvas',
      'Inner zippered security pocket for phone, keys & wallet',
      '38cm x 42cm x 10cm wide bottom gusset for structured volume',
      '65cm heavy-duty webbing shoulder handles for comfortable over-shoulder carry',
      'Woven RdCloth label on exterior side seam'
    ],
    material: '100% 16oz Rugged Cotton Canvas',
    fit: 'One Size (38 x 42 x 10 cm)',
    care: [
      'Spot clean with mild soap and cold water',
      'Do not machine wash to preserve canvas stiffness',
      'Air dry flat'
    ],
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Canvas Tote Street Lifestyle',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-4-2',
        url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Canvas Tote Studio Flat Shot',
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
    seoDescription: '16oz heavy cotton canvas tote bag with inner zipped pocket and reinforced webbing.'
  },
  {
    id: 'prod-5',
    slug: 'rdc-unstructured-cap',
    sku: 'RDC-005',
    name: 'RDC Washed Dad Cap',
    tagline: '6-Panel Vintage Washed Cotton Twill',
    price: 69000,
    originalPrice: 89000,
    category: 'accessories',
    collectionId: 'essentials',
    badge: 'NEW',
    description: 'Low-profile, unstructured 6-panel silhouette in vintage enzyme-washed twill. Features subtle tonal micro-embroidery of the RdCloth monogram with an antique brass strapback buckle.',
    details: [
      '100% Enzyme-Washed Chino Cotton Twill',
      'Unstructured low crown for effortless silhouette',
      'Self-fabric strap with antique brass sliding buckle',
      'High-density 3D tonal embroidery on front crown',
      'Curved brim with stitched ventilation eyelets'
    ],
    material: '100% Washed Chino Cotton Twill',
    fit: 'One Size Fits All (Adjustable 54-60cm circumference)',
    care: [
      'Hand wash in lukewarm water with gentle detergent',
      'Reshape brim and dry on a rounded bowl or head form'
    ],
    images: [
      {
        id: 'img-5-1',
        url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Washed Dad Cap in Black Cotton',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-5-2',
        url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Washed Dad Cap Side Profile',
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
    seoDescription: 'Low profile 6-panel washed cotton twill dad cap with antique brass buckle.'
  },
  {
    id: 'prod-6',
    slug: 'rdc-heavy-fleece-hoodie',
    sku: 'RDC-006',
    name: 'RDC Heavy Fleece Hoodie',
    tagline: '330 GSM Custom Milled French Terry Cotton',
    price: 149000,
    originalPrice: 189000,
    category: 'hoodies',
    collectionId: 'drop-001',
    badge: 'LIMITED',
    description: 'Substantial, warm, and structured without being stiff. Double-layered hood without drawstring for a clean architectural aesthetic, dropped shoulders, and deep kangaroo pouch.',
    details: [
      '330 GSM Custom Milled French Terry 100% Cotton',
      'Seamless double-walled hood structure',
      'Wide 2x2 ribbed cuffs and waistband',
      'Hidden interior earbud/key loop in pocket',
      'Pre-washed and enzyme softened'
    ],
    material: '100% French Terry Cotton 330 GSM',
    fit: 'Boxy Relaxed Cut (Fits oversized comfortably)',
    care: [
      'Machine wash gentle cycle cold',
      'Lay flat to dry to maintain shape'
    ],
    images: [
      {
        id: 'img-6-1',
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Fleece Hoodie Model Shot',
        isPrimary: true,
        angle: 'model'
      },
      {
        id: 'img-6-2',
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
        alt: 'RDC Heavy Fleece Hoodie Texture and Hood',
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
    seoDescription: '330 GSM French Terry heavyweight boxy hoodie.'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'drop-001',
    slug: 'drop-001',
    name: 'DROP 001',
    subtitle: 'START SOMEWHERE.',
    description: 'The debut capsule. A tribute to unfiltered creative impulses and personal execution. Heavyweight garments engineered to be lived in.',
    bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-1', 'prod-3', 'prod-6'],
    isFeatured: true,
    status: 'ACTIVE',
    releaseDate: 'MARCH 2026'
  },
  {
    id: 'essentials',
    slug: 'essentials',
    name: 'ESSENTIALS',
    subtitle: 'BUILT TO BE WORN.',
    description: 'Clean blanks and daily carry essentials. High-thread-count combed cotton and heavy canvas designed for constant rotation.',
    bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-2', 'prod-4', 'prod-5'],
    isFeatured: true,
    status: 'ACTIVE',
    releaseDate: 'PERMANENT CAPSULE'
  },
  {
    id: 'custom-blanks',
    slug: 'custom-blanks',
    name: 'CUSTOM CANVAS',
    subtitle: 'YOUR IDEA. YOUR SHIRT.',
    description: 'Order your custom graphic or community apparel on our premium heavy cotton blanks with no minimum order requirements.',
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    productIds: ['prod-1', 'prod-2', 'prod-4'],
    isFeatured: true,
    status: 'ACTIVE'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Stay Lowkey Tee',
    userName: 'Dimas Aditya',
    rating: 5,
    comment: 'Bahan 16s cotton-nya tebal dan kokoh banget, jatuhnya beneran boxy streetwear. Pas dicuci kerah lehernya gak melar sama sekali. Definitely worth the price!',
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
    comment: 'Nyaman dipakai seharian di Jakarta yang panas, adem tapi gak nerawang. Sablonan neck label-nya rapi gak gatal.',
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
  heroTagline: 'DROP MMXXIV // PHILOSOPHER\'S EDITION',
  heroHeadline: 'WEAR YOUR IDEA.',
  heroSubheadline: 'Crafted for modern thinkers. Heavyweight streetwear infused with timeless Stoic philosophy.',
  heroImage: '/thinker-bg.png',
  heroSecondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  heroCtaText: 'EXPLORE COLLECTION',
  heroCtaLink: '/shop',
  heroSecondaryCtaText: 'CUSTOM STUDIO',
  heroSecondaryCtaLink: '/custom',
  marqueeText: 'RDCLOTH — WEAR YOUR IDEA — ΓΝΩΘΙ ΣΕΑΥΤΟΝ — HEAVYWEIGHT COMBED COTTON — STOIC SERIES — MMXXIV —',
  featuredDropSubtitle: 'Neoclassical small batch. Quiet strength.',
  brandStoryTitle: 'PHILOSOPHIA & APPAREL.',
  brandStoryText1: 'RdCloth started with a simple conviction: apparel should be a personal canvas for your deepest conviction and individual thought.',
  brandStoryText2: 'We craft architectural heavyweight garments that give your ideas a permanent place to exist. Simple. Stoic. Yours.',
  visualBreakQuote: "SILENT STRENGTH IN EVERY THREAD.",
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
  tagline: 'WEAR YOUR IDEA.',
  adminWhatsapp: '6281234567890',
  contactEmail: 'contact@rdcloth.com',
  instagramUrl: 'https://instagram.com/rdcloth',
  tiktokUrl: 'https://tiktok.com/@rdcloth',
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
        productName: 'Stay Lowkey Tee',
        productSlug: 'stay-lowkey-tee',
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
