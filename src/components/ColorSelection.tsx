import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SareeColor } from '../types/saree';
import { colors } from '../data/sareeData';
import { Check, Palette, Star, TrendingUp } from 'lucide-react';

interface ColorSelectionProps {
  selectedColor: SareeColor | null;
  onSelectColor: (color: SareeColor) => void;
}

export default function ColorSelection({ selectedColor, onSelectColor }: ColorSelectionProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const filteredColors = filterCategory === 'all' 
    ? colors 
    : colors.filter(color => color.category === filterCategory);

  const sortedColors = [...filteredColors].sort((a, b) => b.popularity - a.popularity);

  const getPopularityIcon = (popularity: number) => {
    if (popularity >= 90) return <Star className="w-3 h-3 text-yellow-500" />;
    if (popularity >= 80) return <TrendingUp className="w-3 h-3 text-blue-500" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Palette className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
          Choose Your Color
        </h2>
        <p className="text-gray-600">Select the perfect shade for your saree</p>
      </motion.div>
      
      {/* Mobile-Optimized Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {['all', 'traditional', 'modern', 'festive'].map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
              filterCategory === category
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>
      
      {/* Mobile-Optimized Color Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sortedColors.map((color, index) => {
          const isSelected = selectedColor?.id === color.id;
          
          return (
            <motion.div
              key={color.id}
              onClick={() => onSelectColor(color)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'ring-4 ring-white shadow-2xl scale-105'
                  : 'shadow-lg hover:shadow-xl'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`aspect-square bg-gradient-to-br ${color.gradient || `bg-[${color.value}]`} relative`}
                style={!color.gradient ? { backgroundColor: color.value } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {getPopularityIcon(color.popularity)}
                  <span className="text-xs text-white bg-black/30 px-2 py-1 rounded-full">
                    {color.popularity}%
                  </span>
                </div>
                
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Check className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-white">
                <h3 className="font-medium text-gray-900 text-center text-sm">{color.name}</h3>
                <p className="text-xs text-gray-500 text-center capitalize mt-1">
                  {color.category}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}