
import React from 'react';

interface PreviewGalleryProps {
  images: { src: string; prompt: string }[];
  onSelect: (prompt: string, src: string) => void;
  selectedImageSrc: string | null;
}

export const PreviewGallery: React.FC<PreviewGalleryProps> = ({ images, onSelect, selectedImageSrc }) => {
  if (images.length === 0) return null;

  return (
    <div className="w-full bg-[#111] border-b border-gray-800 p-4">
      <h3 className="text-[9px] uppercase tracking-widest text-gray-400 mb-3">Style History</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => onSelect(img.prompt, img.src)}
            className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border transition-all ${
              selectedImageSrc === img.src ? 'border-white scale-105' : 'border-gray-800 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt={`Style ${index + 1}`} className="w-full h-full object-cover" />
            {selectedImageSrc === img.src && (
                <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
