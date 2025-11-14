import React from 'react';
import { BlouseSize } from '../../types/products';
import { blouseSizes } from '../../data/productData';
import { Check, Ruler } from 'lucide-react';

interface BlouseSizeSelectionProps {
  selectedSize: BlouseSize | null;
  onSelectSize: (size: BlouseSize) => void;
}

export default function BlouseSizeSelection({ selectedSize, onSelectSize }: BlouseSizeSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Ruler className="w-8 h-8 text-blue-500" />
          Choose Size
        </h2>
        <p className="text-gray-600">Select your perfect fit</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {blouseSizes.map((size) => {
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
              <div className="text-center">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{size.name}</h3>
                  {isSelected && (
                    <div className="bg-blue-500 text-white rounded-full p-2">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{size.measurements}</p>
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