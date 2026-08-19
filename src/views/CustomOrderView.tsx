import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { formatIDR, generateWhatsAppUrl, buildCustomOrderWhatsAppMsg } from '../utils/formatters';
import { 
  UploadCloud, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  MessageCircle, 
  FileText, 
  Layers, 
  Shirt, 
  Image as ImageIcon,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface ApparelOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  mockupBg: string;
}

const APPAREL_OPTIONS: ApparelOption[] = [
  {
    id: 'heavy-tee',
    name: 'Heavyweight Boxy Tee (235 GSM)',
    category: 'T-Shirt',
    basePrice: 89000,
    description: '100% Combed Cotton 16s with 2.5cm ribbed collar and architectural boxy streetwear fit.',
    mockupBg: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'regular-tee',
    name: 'RDC Classic Combed 24s (200 GSM)',
    category: 'T-Shirt',
    basePrice: 79000,
    description: 'Soft, breathable daily cotton blank with comfort crewneck collar and relaxed drape.',
    mockupBg: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'heavy-hoodie',
    name: 'Heavy Fleece Hoodie (330 GSM)',
    category: 'Hoodie',
    basePrice: 149000,
    description: 'Heavyweight French Terry cotton with structured double-layer hood and kangaroo pouch.',
    mockupBg: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'canvas-tote',
    name: 'Rugged Canvas Tote 16oz',
    category: 'Totebag',
    basePrice: 59000,
    description: 'Heavy unbleached raw cotton canvas with inner zipper pocket and reinforced webbing.',
    mockupBg: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'washed-cap',
    name: 'Vintage Washed Chino Cap',
    category: 'Cap',
    basePrice: 69000,
    description: 'Unstructured 6-panel dad cap with antique brass sliding buckle.',
    mockupBg: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'jersey-custom',
    name: 'Sublimated Vintage Jersey',
    category: 'Jersey',
    basePrice: 119000,
    description: 'Dry-fit jacquard breathable fabric with retro jacquard collar and custom numbering.',
    mockupBg: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
  }
];

const COLOR_OPTIONS = [
  { name: 'Washed Black', hex: '#18181b' },
  { name: 'Off-White Chalk', hex: '#f4f4f0' },
  { name: 'Charcoal Grey', hex: '#2d2d30' },
  { name: 'Vintage Olive', hex: '#4a5340' },
  { name: 'Raw Sand', hex: '#d1c7b7' }
];

const PLACEMENT_OPTIONS = [
  { id: 'front-center', name: 'Front Chest Center (A3 / A4 Standard)', extraPrice: 0 },
  { id: 'front-pocket', name: 'Left Chest Pocket Minimalist (10x10cm)', extraPrice: 0 },
  { id: 'back-oversized', name: 'Oversized Back Graphic (A3+ 32x48cm)', extraPrice: 15000 },
  { id: 'front-and-back', name: 'Dual Print: Front Pocket + Back Poster', extraPrice: 25000 },
  { id: 'sleeve-detail', name: 'Sleeve Hem or Neck Tag Accent', extraPrice: 10000 }
];

const PRINT_TECHNIQUES = [
  { id: 'dtf', name: 'High-Density Japanese DTF', desc: 'Vibrant full-color gradients, sharp micro-text, ultra flexible & stretch-resistant.' },
  { id: 'plastisol', name: 'Plastisol Screenprint (Sablon Manual)', desc: 'Matte/glossy rubber texture, legendary durability for high quantity orders.' },
  { id: 'embroidery', name: 'Japanese Precision Embroidery (Bordir Komputer)', desc: 'Tactile 3D stitching, ideal for caps, chest logos, and hoodies.' }
];

export const CustomOrderView: React.FC = () => {
  const { submitCustomOrder, settings, showToast, setCurrentView } = useStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<ApparelOption>(APPAREL_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [selectedPlacement, setSelectedPlacement] = useState(PLACEMENT_OPTIONS[0]);
  const [selectedTechnique, setSelectedTechnique] = useState(PRINT_TECHNIQUES[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  
  // File Upload State
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreviewUrl, setDesignPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);

  // Price Calculation
  const unitPrice = selectedProduct.basePrice + selectedPlacement.extraPrice;
  // Volume discount calculation (5% off for 6-11 pcs, 10% off for 12+ pcs, 15% off for 24+ pcs)
  let discountRate = 0;
  if (quantity >= 24) discountRate = 0.15;
  else if (quantity >= 12) discountRate = 0.10;
  else if (quantity >= 6) discountRate = 0.05;

  const totalEstimatedPrice = Math.round(unitPrice * quantity * (1 - discountRate));

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      showToast('File size must be under 15MB.', 'error');
      return;
    }
    setDesignFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      setDesignPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    showToast(`Uploaded: ${file.name}`, 'success');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !whatsapp.trim()) {
      showToast('Please provide your name and WhatsApp number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const newCustom = await submitCustomOrder({
        customerName,
        whatsapp,
        email,
        apparelType: selectedProduct.name,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        size: selectedSize,
        quantity,
        placement: selectedPlacement.name,
        printTechnique: selectedTechnique.name,
        designFileName: designFile?.name || 'Uploaded Artwork',
        designFileUrl: designPreviewUrl,
        notes,
        estimatedPrice: totalEstimatedPrice,
        status: 'NEW'
      });

      setSubmittedOrder(newCustom);
      setCurrentStep(6);
    } catch (err: any) {
      showToast('Error submitting request. Please retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const waRedirectUrl = submittedOrder
    ? generateWhatsAppUrl(
        settings.adminWhatsapp || '6281234567890',
        buildCustomOrderWhatsAppMsg({
          id: submittedOrder.id,
          customerName: submittedOrder.customerName,
          apparelType: submittedOrder.apparelType,
          color: submittedOrder.color,
          size: submittedOrder.size,
          quantity: submittedOrder.quantity,
          placement: submittedOrder.placement,
          printTechnique: submittedOrder.printTechnique,
          estimatedPrice: submittedOrder.estimatedPrice,
          notes: submittedOrder.notes
        })
      )
    : '';

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono-code uppercase tracking-[0.3em] text-[#706E6B]">
            CUSTOM STUDIO
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#141414] leading-none">
            MAKE IT YOURS.
          </h1>
          <p className="text-sm sm:text-base font-mono-code text-[#706E6B] max-w-xl mx-auto">
            YOUR IDEA. YOUR SHIRT. Turn your idea into something you can actually wear.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-4xl mx-auto mb-12 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px] border-b border-[#E0DFD8] pb-4 text-xs font-mono-code">
            {[
              { num: 1, label: 'APPAREL' },
              { num: 2, label: 'COLOR' },
              { num: 3, label: 'SIZE & PLACEMENT' },
              { num: 4, label: 'UPLOAD ART' },
              { num: 5, label: 'NOTES & DETAILS' },
              { num: 6, label: 'REVIEW & ORDER' },
            ].map(step => (
              <button
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                className={`flex items-center space-x-2 transition-colors ${
                  currentStep === step.num
                    ? 'text-[#141414] font-bold'
                    : currentStep > step.num
                    ? 'text-[#F27D26]'
                    : 'text-[#706E6B]'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    currentStep === step.num
                      ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                      : currentStep > step.num
                      ? 'bg-[#F27D26] text-white border-[#F27D26]'
                      : 'border-[#E0DFD8] text-[#706E6B]'
                  }`}
                >
                  {currentStep > step.num ? '✓' : `0${step.num}`}
                </span>
                <span className="hidden sm:inline tracking-wider">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Step Content Container */}
        <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#E0DFD8] p-6 sm:p-10 shadow-xs">
          {/* ==================================================== */}
          {/* STEP 01: CHOOSE PRODUCT */}
          {/* ==================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#E0DFD8] pb-4">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">
                  STEP 01
                </span>
                <h2 className="font-heading text-2xl font-black uppercase text-[#141414] mt-0.5">
                  CHOOSE APPAREL BLANK
                </h2>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                  Select your garment base from our signature heavy cotton blanks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {APPAREL_OPTIONS.map(apparel => {
                  const isSelected = selectedProduct.id === apparel.id;
                  return (
                    <div
                      key={apparel.id}
                      onClick={() => setSelectedProduct(apparel)}
                      className={`cursor-pointer p-4 border transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#F5F5F0] border-[#141414] ring-1 ring-[#141414]'
                          : 'bg-[#FFFFFF] border-[#E0DFD8] hover:border-[#141414]'
                      }`}
                    >
                      <div>
                        <div className="aspect-[4/3] bg-[#E0DFD8] mb-3 overflow-hidden border border-[#E0DFD8]">
                          <img
                            src={apparel.mockupBg}
                            alt={apparel.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[10px] font-mono-code text-[#706E6B] uppercase block">
                          {apparel.category}
                        </span>
                        <h3 className="font-heading text-sm font-bold uppercase text-[#141414] mt-1 leading-snug">
                          {apparel.name}
                        </h3>
                        <p className="text-[11px] font-mono-code text-[#706E6B] mt-2 leading-relaxed">
                          {apparel.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E0DFD8] flex items-center justify-between">
                        <span className="text-xs font-mono-code font-bold text-[#F27D26]">
                          {formatIDR(apparel.basePrice)}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#141414] text-[#F5F5F0] flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xs"
                >
                  <span>NEXT: CHOOSE COLOR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 02: CHOOSE COLOR */}
          {/* ==================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#E0DFD8] pb-4">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">
                  STEP 02
                </span>
                <h2 className="font-heading text-2xl font-black uppercase text-[#141414] mt-0.5">
                  CHOOSE COLORWAY
                </h2>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                  Selected Base: <strong>{selectedProduct.name}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLOR_OPTIONS.map(color => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`cursor-pointer p-4 border transition-all flex items-center space-x-4 ${
                        isSelected
                          ? 'bg-[#F5F5F0] border-[#141414] ring-1 ring-[#141414]'
                          : 'bg-[#FFFFFF] border-[#E0DFD8] hover:border-[#141414]'
                      }`}
                    >
                      <span
                        className="w-10 h-10 rounded-full border border-[#E0DFD8] block flex-shrink-0 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <h4 className="font-heading text-sm font-bold uppercase text-[#141414]">
                          {color.name}
                        </h4>
                        <span className="text-[10px] font-mono-code text-[#706E6B]">
                          Reactive Dyes (Anti-fade)
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#141414]" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E0DFD8]">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 bg-[#FFFFFF] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] text-xs font-mono-code uppercase flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xs"
                >
                  <span>NEXT: SIZE & PLACEMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 03: CHOOSE SIZE & PLACEMENT */}
          {/* ==================================================== */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="border-b border-[#E0DFD8] pb-4">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">
                  STEP 03
                </span>
                <h2 className="font-heading text-2xl font-black uppercase text-[#141414] mt-0.5">
                  CHOOSE SIZE & PRINT PLACEMENT
                </h2>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono-code uppercase font-bold text-[#706E6B] block">
                  1. SELECT GARMENT SIZE:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono-code uppercase font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]'
                          : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8] hover:text-[#141414] hover:border-[#141414]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Placement */}
              <div className="space-y-3">
                <label className="text-xs font-mono-code uppercase font-bold text-[#706E6B] block">
                  2. SELECT PRINT / EMBROIDERY POSITION:
                </label>
                <div className="space-y-2">
                  {PLACEMENT_OPTIONS.map(place => {
                    const isSelected = selectedPlacement.id === place.id;
                    return (
                      <div
                        key={place.id}
                        onClick={() => setSelectedPlacement(place)}
                        className={`cursor-pointer p-4 border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F5F5F0] border-[#141414] ring-1 ring-[#141414]'
                            : 'bg-[#FFFFFF] border-[#E0DFD8] hover:border-[#141414]'
                        }`}
                      >
                        <div>
                          <h4 className="font-heading text-xs sm:text-sm font-bold uppercase text-[#141414]">
                            {place.name}
                          </h4>
                          <span className="text-[10px] font-mono-code text-[#706E6B]">
                            High resolution positioning
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono-code font-bold text-[#F27D26]">
                            {place.extraPrice > 0 ? `+${formatIDR(place.extraPrice)}` : 'INCLUDED'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E0DFD8]">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-[#FFFFFF] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] text-xs font-mono-code uppercase flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xs"
                >
                  <span>NEXT: UPLOAD DESIGN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 04: UPLOAD DESIGN & MOCKUP PREVIEW */}
          {/* ==================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#E0DFD8] pb-4">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">
                  STEP 04
                </span>
                <h2 className="font-heading text-2xl font-black uppercase text-[#141414] mt-0.5">
                  UPLOAD YOUR ARTWORK
                </h2>
                <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                  Supported formats: PNG (Transparent background recommended), JPG, PDF. Up to 15MB.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Upload Area */}
                <div className="md:col-span-6 space-y-4">
                  <div
                    onDragOver={e => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer p-8 border-2 border-dashed text-center transition-all flex flex-col items-center justify-center min-h-[220px] ${
                      isDragging
                        ? 'border-[#141414] bg-[#F5F5F0]'
                        : 'border-[#E0DFD8] bg-[#FAFAF8] hover:border-[#706E6B]'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, application/pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />

                    <UploadCloud className="w-10 h-10 text-[#706E6B] mb-3" />
                    <p className="font-heading text-sm font-bold uppercase text-[#141414]">
                      DRAG & DROP YOUR DESIGN HERE
                    </p>
                    <p className="text-[11px] font-mono-code text-[#706E6B] mt-1">
                      or click to browse files from your device
                    </p>
                  </div>

                  {designFile && (
                    <div className="p-3 bg-[#F5F5F0] border border-[#E0DFD8] flex items-center justify-between text-xs font-mono-code">
                      <div className="flex items-center space-x-2 truncate pr-2">
                        <FileText className="w-4 h-4 text-[#F27D26] flex-shrink-0" />
                        <span className="truncate text-[#141414] font-bold">{designFile.name}</span>
                        <span className="text-[#706E6B]">
                          ({(designFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setDesignFile(null);
                          setDesignPreviewUrl('');
                        }}
                        className="text-[#706E6B] hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Live Mockup Visual Preview */}
                <div className="md:col-span-6 space-y-2">
                  <span className="text-[10px] font-mono-code uppercase font-bold text-[#706E6B] block">
                    LIVE MOCKUP POSITIONING PREVIEW
                  </span>
                  <div className="relative aspect-[4/5] bg-[#E0DFD8] border border-[#E0DFD8] overflow-hidden flex items-center justify-center">
                    <img
                      src={selectedProduct.mockupBg}
                      alt="Apparel Base"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Projected Artwork Graphic */}
                    {designPreviewUrl ? (
                      <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
                        <div className="relative max-w-[55%] max-h-[55%] border border-dashed border-[#141414]/50 p-2 shadow-lg backdrop-blur-[0.5px]">
                          <img
                            src={designPreviewUrl}
                            alt="Uploaded graphic on mockup"
                            className="w-full h-full object-contain filter drop-shadow-md"
                          />
                          <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#141414] text-[#F5F5F0] text-[8px] font-mono-code px-1 uppercase">
                            {selectedPlacement.name.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/10">
                        <div className="w-28 h-28 border border-dashed border-[#141414]/30 flex items-center justify-center text-[10px] font-mono-code text-[#141414] uppercase">
                          YOUR ARTWORK
                        </div>
                        <span className="text-[10px] font-mono-code text-[#706E6B] mt-2">
                          Upload file to see live mockup
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 inset-x-3 bg-white/90 backdrop-blur-md p-2 text-[10px] font-mono-code text-center text-[#141414] border border-[#E0DFD8]">
                      {selectedProduct.name} • {selectedColor.name} • {selectedSize}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E0DFD8]">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-[#FFFFFF] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] text-xs font-mono-code uppercase flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-8 py-3.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xs"
                >
                  <span>NEXT: PRODUCTION NOTES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 05: NOTES, PRINT TECHNIQUE & QUANTITY */}
          {/* ==================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-[#E0DFD8] pb-4">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#706E6B]">
                  STEP 05
                </span>
                <h2 className="font-heading text-2xl font-black uppercase text-[#141414] mt-0.5">
                  TECHNIQUE & ORDER SPECS
                </h2>
              </div>

              {/* Technique Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono-code uppercase font-bold text-[#706E6B] block">
                  1. PRINT / APPLICATION TECHNIQUE:
                </label>
                <div className="space-y-2">
                  {PRINT_TECHNIQUES.map(tech => {
                    const isSelected = selectedTechnique.id === tech.id;
                    return (
                      <div
                        key={tech.id}
                        onClick={() => setSelectedTechnique(tech)}
                        className={`cursor-pointer p-4 border transition-all ${
                          isSelected
                            ? 'bg-[#F5F5F0] border-[#141414] ring-1 ring-[#141414]'
                            : 'bg-[#FFFFFF] border-[#E0DFD8] hover:border-[#141414]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-xs sm:text-sm font-bold uppercase text-[#141414]">
                            {tech.name}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-[#141414]" />}
                        </div>
                        <p className="text-[11px] font-mono-code text-[#706E6B] mt-1">
                          {tech.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <label className="uppercase font-bold text-[#706E6B]">
                    2. QUANTITY (PCS):
                  </label>
                  {discountRate > 0 && (
                    <span className="text-emerald-700 font-bold">
                      VOLUME DISCOUNT: {discountRate * 100}% OFF!
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-32 bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2 text-[#141414] font-mono-code font-bold text-center focus:outline-none focus:border-[#141414]"
                  />
                  <div className="flex space-x-1.5 text-xs font-mono-code">
                    {[1, 6, 12, 24, 50].map(q => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`px-3 py-2 border ${
                          quantity === q ? 'bg-[#141414] text-[#F5F5F0] border-[#141414]' : 'bg-[#FFFFFF] text-[#706E6B] border-[#E0DFD8]'
                        }`}
                      >
                        {q} pcs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom Notes */}
              <div className="space-y-2">
                <label className="text-xs font-mono-code uppercase font-bold text-[#706E6B] block">
                  3. SPECIAL INSTRUCTIONS / NOTES:
                </label>
                <textarea
                  rows={3}
                  placeholder='Contoh: "Print di bagian depan 10cm di bawah kerah. Sablon matte finish."'
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-[#E0DFD8] p-3 text-xs font-mono-code text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>

              {/* Customer Contact Inputs for Quote */}
              <div className="pt-4 border-t border-[#E0DFD8] space-y-4">
                <label className="text-xs font-mono-code uppercase font-bold text-[#141414] block">
                  4. YOUR CONTACT DETAILS:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code">
                  <div>
                    <label className="text-[#706E6B] block mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nadhif Alamsyah"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                  </div>
                  <div>
                    <label className="text-[#706E6B] block mb-1">WHATSAPP NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 081298765432"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      className="w-full bg-[#F5F5F0] border border-[#E0DFD8] px-3 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E0DFD8]">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-[#FFFFFF] border border-[#E0DFD8] text-[#706E6B] hover:text-[#141414] text-xs font-mono-code uppercase flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#141414] text-[#F5F5F0] hover:bg-[#F27D26] transition-all font-heading font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xs disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'PROCESSING...' : 'SUBMIT & GET QUOTE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 06: SUMMARY & WHATSAPP BRIDGE */}
          {/* ==================================================== */}
          {currentStep === 6 && submittedOrder && (
            <div className="space-y-8 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 border-b border-[#E0DFD8] pb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-code uppercase text-emerald-700 font-bold">
                    ORDER ID: {submittedOrder.id}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#141414]">
                    CUSTOM APPAREL REQUEST SUBMITTED!
                  </h2>
                  <p className="text-xs font-mono-code text-[#706E6B] mt-1">
                    Your specs have been received by the RdCloth design & production team.
                  </p>
                </div>
              </div>

              {/* Order Specs Breakdown */}
              <div className="p-6 bg-[#F5F5F0] border border-[#E0DFD8] space-y-3 text-xs font-mono-code">
                <div className="flex justify-between border-b border-[#E0DFD8] pb-2 text-[#706E6B]">
                  <span>APPAREL SPEC</span>
                  <span className="text-[#141414] font-bold">{submittedOrder.apparelType}</span>
                </div>
                <div className="flex justify-between border-b border-[#E0DFD8] pb-2 text-[#706E6B]">
                  <span>COLOR & SIZE</span>
                  <span className="text-[#141414] font-bold">{submittedOrder.color} • Size {submittedOrder.size}</span>
                </div>
                <div className="flex justify-between border-b border-[#E0DFD8] pb-2 text-[#706E6B]">
                  <span>PLACEMENT & TECHNIQUE</span>
                  <span className="text-[#141414] font-bold">{submittedOrder.placement} ({submittedOrder.printTechnique})</span>
                </div>
                <div className="flex justify-between border-b border-[#E0DFD8] pb-2 text-[#706E6B]">
                  <span>QUANTITY</span>
                  <span className="text-[#141414] font-bold">{submittedOrder.quantity} pcs</span>
                </div>
                <div className="flex justify-between pt-2 text-sm">
                  <span className="text-[#706E6B] font-bold">ESTIMATED TOTAL</span>
                  <span className="text-[#F27D26] font-bold">{formatIDR(submittedOrder.estimatedPrice)}</span>
                </div>
              </div>

              {/* WhatsApp direct chat CTA */}
              <div className="p-6 bg-[#FFFFFF] border border-emerald-300 space-y-4 text-center">
                <h3 className="font-heading text-lg font-bold uppercase text-[#141414]">
                  FAST-TRACK WITH WHATSAPP CONFIRMATION
                </h3>
                <p className="text-xs font-mono-code text-[#706E6B] max-w-md mx-auto">
                  Click below to chat with the RdCloth production admin. Your order specs and design file proofing will be reviewed instantly.
                </p>
                <a
                  href={waRedirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-black text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CHAT VIA WHATSAPP NOW</span>
                </a>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-[#FFFFFF] border border-[#E0DFD8] text-xs font-mono-code uppercase text-[#706E6B] hover:text-[#141414]"
                >
                  EXPLORE SHOP
                </button>
                <button
                  onClick={() => {
                    setSubmittedOrder(null);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 bg-[#141414] text-[#F5F5F0] text-xs font-heading font-bold uppercase hover:bg-[#F27D26]"
                >
                  CREATE ANOTHER CUSTOM
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
