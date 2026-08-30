import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler, Sparkles } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  if (!isSizeGuideOpen) return null;

  // Measurement table for RdCloth Boxy Streetwear Cotton
  const sizeDataCm = [
    { size: 'S', width: 52, length: 70, shoulder: 49, sleeve: 23 },
    { size: 'M', width: 55, length: 73, shoulder: 52, sleeve: 24 },
    { size: 'L', width: 58, length: 76, shoulder: 55, sleeve: 25 },
    { size: 'XL', width: 62, length: 79, shoulder: 59, sleeve: 26 },
    { size: 'XXL', width: 66, length: 82, shoulder: 63, sleeve: 27 },
  ];

  const sizeDataInch = sizeDataCm.map(item => ({
    size: item.size,
    width: (item.width / 2.54).toFixed(1),
    length: (item.length / 2.54).toFixed(1),
    shoulder: (item.shoulder / 2.54).toFixed(1),
    sleeve: (item.sleeve / 2.54).toFixed(1),
  }));

  const currentData = unit === 'cm' ? sizeDataCm : sizeDataInch;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 bg-black/40 backdrop-blur-xs flex items-center justify-center">
      <div 
        id="size-guide-backdrop"
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0"
      />

      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E0DFD8] shadow-2xl p-6 sm:p-8 z-10">
        <div className="flex items-center justify-between pb-6 border-b border-[#E0DFD8]">
          <div>
            <div className="flex items-center space-x-2 text-[#706E6B] text-xs font-mono-code mb-1">
              <Ruler className="w-4 h-4 text-[#C5A059]" />
              <span>OFFICIAL SIZING SPECS</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#141414] tracking-tight">
              BOXY STREETWEAR FIT GUIDE
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 text-[#706E6B] hover:text-[#141414] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit switch */}
        <div className="flex items-center justify-between py-4">
          <p className="text-xs font-mono-code text-[#706E6B]">
            *Toleransi ukuran penjahitan: ± 1 - 1.5 cm
          </p>
          <div className="flex items-center space-x-1 border border-[#E0DFD8] p-0.5 bg-[#ECECE7]">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono-code uppercase font-bold transition-colors ${
                unit === 'cm' ? 'bg-[#141414] text-[#F5F5F0]' : 'text-[#706E6B] hover:text-[#141414]'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('inch')}
              className={`px-3 py-1 text-xs font-mono-code uppercase font-bold transition-colors ${
                unit === 'inch' ? 'bg-[#141414] text-[#F5F5F0]' : 'text-[#706E6B] hover:text-[#141414]'
              }`}
            >
              INCH
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#E0DFD8]">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#ECECE7] text-[#141414] uppercase border-b border-[#E0DFD8]">
              <tr>
                <th className="p-3 font-bold">SIZE</th>
                <th className="p-3 font-bold">WIDTH (LEBAR DADA)</th>
                <th className="p-3 font-bold">LENGTH (PANJANG)</th>
                <th className="p-3 font-bold">SHOULDER (BAHU)</th>
                <th className="p-3 font-bold">SLEEVE (LENGAN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0DFD8] text-[#141414]">
              {currentData.map(row => (
                <tr key={row.size} className="hover:bg-[#F5F5F0]">
                  <td className="p-3 font-bold text-[#141414] bg-[#ECECE7]/40">{row.size}</td>
                  <td className="p-3">{row.width} {unit}</td>
                  <td className="p-3">{row.length} {unit}</td>
                  <td className="p-3">{row.shoulder} {unit}</td>
                  <td className="p-3">{row.sleeve} {unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fitting recommendations */}
        <div className="mt-6 p-4 bg-[#F5F5F0] border border-[#E0DFD8] space-y-2 text-xs font-mono-code text-[#706E6B]">
          <div className="flex items-center space-x-2 text-[#141414] font-bold uppercase">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>FIT RECOMMENDATION</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-[#706E6B] leading-relaxed">
            <li><strong>Streetwear Boxy Fit:</strong> Pilih ukuran normal (True to size) untuk tampilan drop-shoulder yang proporsional.</li>
            <li><strong>Fitted Silhouette:</strong> Turun 1 ukuran (Size Down) jika lebih menyukai potongan regular fit pas badan.</li>
            <li><strong>Ultra Oversized:</strong> Naik 1 ukuran (Size Up) jika ingin siluet skater loose yang lebih bervolume.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
