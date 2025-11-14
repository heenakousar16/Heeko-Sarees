import React from 'react';
import { motion } from 'framer-motion';
import { SareeBorder } from '../../types/products';
import { borders } from '../../data/enhancedProductData';
import { Check, Crown, Sparkles } from 'lucide-react';

interface BorderSelectionProps {
  selectedBorder: SareeBorder | null;
  onSelectBorder: (border: SareeBorder & { color?: string }) => void; // add color
}

// Map border “type” → a hex you want on the 3D model
const BORDER_COLOR_HEX: Record<string, string> = {
  gold: '#FFD700',
  silver: '#C0C0C0',
  contrast: '#8B00FF',
  embroidered: '#E11D48',
  plain: '#9CA3AF',
};

export default function BorderSelection({ selectedBorder, onSelectBorder }: BorderSelectionProps) {
  const getBorderGradient = (type: string) => {
    switch (type) {
      case 'gold':        return 'from-yellow-400 to-yellow-600';
      case 'silver':      return 'from-gray-300 to-gray-500';
      case 'contrast':    return 'from-purple-500 to-pink-500';
      case 'embroidered': return 'from-red-400 to-pink-500';
      default:            return 'from-gray-400 to-gray-600';
    }
  };

  const getWidthClass = (width: string) => {
    switch (width) {
      case 'thin':   return 'h-2';
      case 'medium': return 'h-4';
      case 'wide':   return 'h-6';
      default:       return 'h-4';
    }
  };

  // Helper: include a color when selecting a border
  const selectWithColor = (b: SareeBorder) => {
    const color = (b as any).color || BORDER_COLOR_HEX[b.type] || BORDER_COLOR_HEX.plain;
    onSelectBorder({ ...b, color });
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-yellow-500" />
          Choose Border Design
        </h2>
        <p className="text-gray-600">Add elegant borders to enhance your saree</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {borders.map((border, index) => {
          const isSelected = selectedBorder?.id === border.id;

          return (
            <motion.div
              key={border.id}
              onClick={() => selectWithColor(border)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected ? 'ring-4 ring-yellow-500 shadow-2xl' : 'shadow-lg hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {/* Border Preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${getBorderGradient(border.type)} ${getWidthClass(border.width)} opacity-80`} />
                  <div className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${getBorderGradient(border.type)} ${getWidthClass(border.width)} opacity-60`} />
                  <div className={`absolute top-0 bottom-0 left-0 bg-gradient-to-b ${getBorderGradient(border.type)} w-2 opacity-60`} />
                  <div className={`absolute top-0 bottom-0 right-0 bg-gradient-to-b ${getBorderGradient(border.type)} w-2 opacity-60`} />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="text-2xl">{border.preview}</span>
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute top-4 right-4 bg-yellow-500 text-white rounded-full p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                )}
              </div>

              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {border.name}
                    {border.type === 'gold' && <Sparkles className="w-4 h-4 text-yellow-500" />}
                  </h3>
                  <span className="text-lg font-bold text-yellow-600">+₹{border.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{border.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full capitalize">
                    {border.type} • {border.width}
                  </span>
                  <div className={`w-16 ${getWidthClass(border.width)} bg-gradient-to-r ${getBorderGradient(border.type)} rounded`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skip Option */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() =>
            onSelectBorder({
              id: 'none',
              name: 'No Border',
              type: 'plain',
              width: 'thin',
              price: 0,
              preview: '⚪',
              description: 'Simple saree without border',
              color: 'transparent', // no border color
            })
          }
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedBorder?.id === 'none'
              ? 'bg-gray-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          No Border (Simple Design)
        </button>
      </motion.div>
    </div>
  );
}
