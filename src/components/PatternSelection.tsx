import React, { useState } from 'react';
import { SareePattern } from '../types/saree';
import { patterns } from '../data/sareeData';
import { Check, Star, MapPin, Info } from 'lucide-react';

interface PatternSelectionProps {
  selectedPattern: SareePattern | null;
  onSelectPattern: (pattern: SareePattern) => void;
}

export default function PatternSelection({ selectedPattern, onSelectPattern }: PatternSelectionProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const filteredPatterns = filterType === 'all' 
    ? patterns 
    : patterns.filter(pattern => pattern.type === filterType);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'intricate': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'traditional': return '🏛️';
      case 'floral': return '🌺';
      case 'geometric': return '🔷';
      case 'modern': return '✨';
      case 'abstract': return '🎨';
      default: return '🎨';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Pattern</h2>
        <p className="text-gray-600">Add the perfect design to your saree</p>
      </div>
      
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {['all', 'traditional', 'floral', 'geometric', 'modern', 'abstract'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filterType === type
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredPatterns.map((pattern) => {
          const isSelected = selectedPattern?.id === pattern.id;
          const isDetailsOpen = showDetails === pattern.id;
          
          return (
            <div
              key={pattern.id}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'ring-4 ring-purple-500 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 relative flex items-center justify-center">
                <div className="text-6xl opacity-80">
                  {pattern.preview}
                </div>
                <div className="absolute top-2 right-2 text-2xl">
                  {getTypeIcon(pattern.type)}
                </div>
                
                {isSelected && (
                  <div className="absolute top-4 left-4 bg-purple-500 text-white rounded-full p-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(isDetailsOpen ? null : pattern.id);
                  }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full p-2 hover:bg-white transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 bg-white" onClick={() => onSelectPattern(pattern)}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{pattern.name}</h3>
                  <span className="text-lg font-bold text-purple-600">
                    +₹{pattern.price}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(pattern.complexity)}`}>
                    {pattern.complexity}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {pattern.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {pattern.region}
                </div>
                
                {isDetailsOpen && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-xl animate-fadeIn">
                    <p className="text-sm text-gray-600">{pattern.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}