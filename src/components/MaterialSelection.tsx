import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SareeMaterial } from '../types/saree';
import { materials } from '../data/sareeData';
import { Check, Sparkles, Info, MapPin, Filter } from 'lucide-react';

interface MaterialSelectionProps {
  selectedMaterial: SareeMaterial | null;
  onSelectMaterial: (material: SareeMaterial) => void;
}

export default function MaterialSelection({ selectedMaterial, onSelectMaterial }: MaterialSelectionProps) {
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredMaterials(materials);
    } else {
      setFilteredMaterials(materials.filter(material => material.category === category));
    }
  };

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
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Choose Your Fabric</h2>
        <p className="text-gray-600">Select the perfect material for your saree</p>
      </motion.div>
      
      {/* Mobile-Optimized Filter */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'luxury', 'premium', 'standard'].map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Mobile-Optimized Material Grid */}
      <div className="space-y-4">
        {filteredMaterials.map((material, index) => {
          const isSelected = selectedMaterial?.id === material.id;
          const isDetailsOpen = showDetails === material.id;
          
          return (
            <motion.div
              key={material.id}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'ring-4 ring-blue-500 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex bg-white">
                {/* Image Section */}
                <div className="w-32 h-32 relative overflow-hidden">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(material.category)}`}>
                      {material.category}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-4" onClick={() => onSelectMaterial(material)}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {material.name}
                      {material.category === 'luxury' && <Sparkles className="w-4 h-4 text-yellow-500" />}
                    </h3>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{material.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{material.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                      {material.texture}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {material.origin}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(isDetailsOpen ? null : material.id);
                    }}
                    className="mt-2 text-blue-500 text-sm font-medium flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    {isDetailsOpen ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
              
              {isDetailsOpen && (
                <motion.div 
                  className="p-4 bg-gray-50 border-t"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="font-medium text-gray-900 mb-2">Care Instructions</h4>
                  <p className="text-sm text-gray-600">{material.careInstructions}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
// Development update - Week 10
// Date: 2025-09-20 11:37
// Saree customization feature improvements

// Development update - Week 11
// Date: 2025-09-27 10:28
// Saree customization feature improvements

// Development update - Week 11
// Date: 2025-09-25 13:39
// Saree customization feature improvements

// Development update - Week 11
// Date: 2025-09-25 18:56
// Saree customization feature improvements
