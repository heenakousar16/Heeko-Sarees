import React from 'react';
import { BlouseStyle } from '../../types/products';
import { blouseStyles } from '../../data/productData';
import { Check, Shirt } from 'lucide-react';

interface BlouseStyleSelectionProps {
  selectedStyle: BlouseStyle | null;
  onSelectStyle: (style: BlouseStyle) => void;
}

export default function BlouseStyleSelection({ selectedStyle, onSelectStyle }: BlouseStyleSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Shirt className="w-8 h-8 text-blue-500" />
          Choose Blouse Style
        </h2>
        <p className="text-gray-600">Select the perfect style and neckline for your blouse</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {blouseStyles.map((style) => {
          const isSelected = selectedStyle?.id === style.id;
          
          return (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'ring-4 ring-blue-500 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{style.name}</h3>
                  <span className="text-lg font-bold text-blue-600">
                    +₹{style.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{style.description}</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Neckline:</span> {style.neckline}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Sleeves:</span> {style.sleeves}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}