import React from 'react';
import { BlouseMaterial } from '../../types/products';
import { blouseMaterials } from '../../data/productData';
import { Check, Sparkles, Info } from 'lucide-react';

interface BlouseMaterialSelectionProps {
  selectedMaterial: BlouseMaterial | null;
  onSelectMaterial: (material: BlouseMaterial) => void;
}

export default function BlouseMaterialSelection({ selectedMaterial, onSelectMaterial }: BlouseMaterialSelectionProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'luxury': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'standard': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Blouse Fabric</h2>
        <p className="text-gray-600">Select the perfect material for your custom blouse</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {blouseMaterials.map((material) => {
          const isSelected = selectedMaterial?.id === material.id;
          
          return (
            <div
              key={material.id}
              onClick={() => onSelectMaterial(material)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'ring-4 ring-blue-500 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <img
                  src={material.image}
                  alt={material.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(material.category)}`}>
                    {material.category}
                  </span>
                </div>
                
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {material.name}
                    {material.category === 'luxury' && <Sparkles className="w-5 h-5 text-yellow-500" />}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{material.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{material.description}</p>
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                  {material.texture}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}