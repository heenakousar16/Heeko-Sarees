import React from 'react';
import { SareeSize } from '../types/saree';
import { sizes } from '../data/sareeData';
import { Check, Ruler } from 'lucide-react';

interface SizeSelectionProps {
  selectedSize: SareeSize | null;
  onSelectSize: (size: SareeSize) => void;
}

export default function SizeSelection({ selectedSize, onSelectSize }: SizeSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Ruler className="w-8 h-8 text-blue-500" />
          Choose Size
        </h2>
        <p className="text-gray-600">Select the perfect dimensions for your saree</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {sizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;
          
          return (
            <div
              key={size.id}
              onClick={() => onSelectSize(size)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'ring-4 ring-blue-500 shadow-2xl bg-blue-50'
                  : 'shadow-lg hover:shadow-xl bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{size.name}</h3>
                {isSelected && (
                  <div className="bg-blue-500 text-white rounded-full p-2">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>Length: {size.length}m</p>
                <p>Width: {size.width}m</p>
                <p className="text-lg font-bold text-blue-600">
                  {size.price === 0 ? 'Standard' : `+₹${size.price}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}