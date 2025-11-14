import React from 'react';
import { motion } from 'framer-motion';
import { OccasionType } from '../../types/products';
import { Crown, Heart, Sparkles, Briefcase, Home, Calendar } from 'lucide-react';

interface OccasionFilterProps {
  selectedOccasion: OccasionType | null;
  onSelectOccasion: (occasion: OccasionType | null) => void;
}

export default function OccasionFilter({ selectedOccasion, onSelectOccasion }: OccasionFilterProps) {
  const occasions = [
    { id: 'wedding' as OccasionType, name: 'Wedding', icon: Crown, color: 'from-red-500 to-pink-500', description: 'Grand celebrations' },
    { id: 'festival' as OccasionType, name: 'Festival', icon: Sparkles, color: 'from-yellow-500 to-orange-500', description: 'Traditional festivities' },
    { id: 'party' as OccasionType, name: 'Party', icon: Heart, color: 'from-purple-500 to-pink-500', description: 'Social gatherings' },
    { id: 'office' as OccasionType, name: 'Office', icon: Briefcase, color: 'from-blue-500 to-teal-500', description: 'Professional wear' },
    { id: 'casual' as OccasionType, name: 'Casual', icon: Home, color: 'from-green-500 to-emerald-500', description: 'Everyday comfort' },
    { id: 'traditional' as OccasionType, name: 'Traditional', icon: Calendar, color: 'from-indigo-500 to-purple-500', description: 'Cultural events' }
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Occasion</h3>
        <p className="text-gray-600">Filter designs perfect for your special moment</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.button
          onClick={() => onSelectOccasion(null)}
          className={`p-4 rounded-xl font-medium transition-all ${
            selectedOccasion === null
              ? 'bg-gray-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          All Occasions
        </motion.button>

        {occasions.map((occasion, index) => {
          const IconComponent = occasion.icon;
          const isSelected = selectedOccasion === occasion.id;
          
          return (
            <motion.button
              key={occasion.id}
              onClick={() => onSelectOccasion(occasion.id)}
              className={`p-4 rounded-xl transition-all ${
                isSelected
                  ? `bg-gradient-to-r ${occasion.color} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-600 hover:shadow-md border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <IconComponent className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                <div className="font-medium">{occasion.name}</div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {occasion.description}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}