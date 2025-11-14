import React from 'react';
import { Sparkles, Type, Palette } from 'lucide-react';

interface BlouseEmbroideryCustomizationProps {
  embroidery: boolean;
  embroideryText: string;
  embroideryDesign: string;
  onToggleEmbroidery: (enabled: boolean) => void;
  onEmbroideryTextChange: (text: string) => void;
  onEmbroideryDesignChange: (design: string) => void;
}

export default function BlouseEmbroideryCustomization({
  embroidery,
  embroideryText,
  embroideryDesign,
  onToggleEmbroidery,
  onEmbroideryTextChange,
  onEmbroideryDesignChange
}: BlouseEmbroideryCustomizationProps) {
  const embroideryDesigns = [
    { id: 'floral', name: 'Floral', preview: '🌸', price: 300 },
    { id: 'paisley', name: 'Paisley', preview: '🌿', price: 400 },
    { id: 'geometric', name: 'Geometric', preview: '◇', price: 250 },
    { id: 'traditional', name: 'Traditional', preview: '⚜️', price: 500 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Custom Embroidery
        </h2>
        <p className="text-gray-600">Add beautiful embroidery to make your blouse unique</p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Enable Custom Embroidery</h3>
                <p className="text-sm text-gray-600">Add personalized designs and text</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={embroidery}
                onChange={(e) => onToggleEmbroidery(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
            </label>
          </div>
          
          {embroidery && (
            <div className="space-y-6 animate-fadeIn">
              {/* Embroidery Design Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Choose Embroidery Design
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {embroideryDesigns.map((design) => (
                    <div
                      key={design.id}
                      onClick={() => onEmbroideryDesignChange(design.id)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        embroideryDesign === design.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{design.preview}</div>
                        <p className="text-sm font-medium text-gray-900">{design.name}</p>
                        <p className="text-xs text-gray-500">+₹{design.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Custom Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Text (Optional)
                </label>
                <input
                  type="text"
                  value={embroideryText}
                  onChange={(e) => onEmbroideryTextChange(e.target.value)}
                  placeholder="Enter your custom text (max 15 characters)"
                  maxLength={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {embroideryText.length}/15 characters
                </p>
              </div>
              
              {/* Preview */}
              <div className="bg-yellow-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3">Embroidery Preview</h4>
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-yellow-300">
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {embroideryDesigns.find(d => d.id === embroideryDesign)?.preview || '🌸'}
                    </div>
                    {embroideryText && (
                      <p className="text-lg font-serif text-yellow-700">
                        {embroideryText}
                      </p>
                    )}
                    {!embroideryText && (
                      <p className="text-gray-400 italic">Your custom text will appear here</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Embroidery Cost: <span className="font-bold text-yellow-600">
                    +₹{embroideryDesigns.find(d => d.id === embroideryDesign)?.price || 300}
                    {embroideryText && ' + ₹200 (text)'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}