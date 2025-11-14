import React from 'react';
import { motion } from 'framer-motion';
import { CustomSaree, Recommendation, SareeMaterial, SareeColor, SareePattern } from '../../types/products';
import { Sparkles, TrendingUp, Heart, Star, Award } from 'lucide-react';

interface SmartRecommendationsProps {
  currentSaree: CustomSaree;
  recommendations: Recommendation[];
  onSelectRecommendation: (item: SareeMaterial | SareeColor | SareePattern) => void;
}

export default function SmartRecommendations({ 
  currentSaree, 
  recommendations, 
  onSelectRecommendation 
}: SmartRecommendationsProps) {
  const getItemIcon = (item: any) => {
    if ('texture' in item) return '🧵'; // Material
    if ('value' in item) return '🎨'; // Color
    if ('preview' in item) return '✨'; // Pattern
    return '💎';
  };

  const getItemPrice = (item: any) => {
    return item.price || 0;
  };

  const getItemName = (item: any) => {
    return item.name || 'Unknown';
  };

  // Enhanced trending combinations
  const trendingCombinations = [
    { 
      name: 'Royal Blue + Gold Zari', 
      description: 'Classic wedding choice',
      popularity: '95%',
      gradient: 'from-blue-600 to-yellow-500'
    },
    { 
      name: 'Emerald + Silver', 
      description: 'Elegant festive look',
      popularity: '88%',
      gradient: 'from-emerald-500 to-gray-400'
    },
    { 
      name: 'Crimson + Paisley', 
      description: 'Traditional beauty',
      popularity: '92%',
      gradient: 'from-red-600 to-orange-400'
    },
    { 
      name: 'Pearl + Minimalist', 
      description: 'Modern sophistication',
      popularity: '90%',
      gradient: 'from-slate-200 to-purple-300'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-500" />
          AI Recommendations
        </h3>
        <p className="text-gray-600">Personalized suggestions just for you</p>
      </motion.div>

      {recommendations.map((recommendation, index) => (
        <motion.div
          key={recommendation.id}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
              <p className="text-sm text-gray-600">{recommendation.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {recommendation.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className="cursor-pointer bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100"
                onClick={() => onSelectRecommendation(item)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{getItemIcon(item)}</div>
                  <h5 className="font-medium text-gray-900 mb-1">{getItemName(item)}</h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {'category' in item ? item.category : 
                     'type' in item ? item.type : 
                     'texture' in item ? item.texture : ''}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-purple-600">
                      ₹{getItemPrice(item).toLocaleString()}
                    </span>
                    {'popularity' in item && item.popularity && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{item.popularity}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{recommendation.reason}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Recommended for you</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Enhanced Trending Combinations */}
      <motion.div
        className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Trending This Week
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingCombinations.map((combo, index) => (
            <motion.div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${combo.gradient}`} />
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">{combo.name}</div>
                  <div className="text-xs text-gray-600">{combo.description}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>{combo.popularity} popular</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-purple-600">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Trending</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional trending info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Based on 15,000+ customer choices this week
          </p>
        </div>
      </motion.div>
    </div>
  );
}