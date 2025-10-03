import React from 'react';
import { SareeBlouse } from '../types/saree';
import { blouses } from '../data/sareeData';
import { Check, Shirt } from 'lucide-react';

interface BlouseSelectionProps {
  selectedBlouse: SareeBlouse | null;
  onSelectBlouse: (blouse: SareeBlouse) => void;
}

export default function BlouseSelection({ selectedBlouse, onSelectBlouse }: BlouseSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Shirt className="w-8 h-8 text-pink-500" />
          Choose Blouse
        </h2>
        <p className="text-gray-600">Complete your look with a matching blouse</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {blouses.map((blouse) => {
          const isSelected = selectedBlouse?.id === blouse.id;
          
          return (
            <div
              key={blouse.id}
              onClick={() => onSelectBlouse(blouse)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'ring-4 ring-pink-500 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
                <img
                  src={blouse.image}
                  alt={blouse.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{blouse.name}</h3>
                  <span className="text-lg font-bold text-pink-600">
                    ₹{blouse.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{blouse.style}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// Development update - Week 1
// Date: 2025-07-19 10:06
// Saree customization feature improvements

// Development update - Week 5
// Date: 2025-08-15 13:38
// Saree customization feature improvements

// Development update - Week 7
// Date: 2025-08-28 13:10
// Saree customization feature improvements

// Development update - Week 7
// Date: 2025-08-31 11:04
// Saree customization feature improvements

// Development update - Week 10
// Date: 2025-09-20 15:34
// Saree customization feature improvements

// Development update - Week 12
// Date: 2025-10-06 13:56
// Saree customization feature improvements

// Development update - Week 12
// Date: 2025-10-03 14:42
// Saree customization feature improvements
