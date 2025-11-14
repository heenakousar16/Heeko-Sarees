import React from 'react';
import { Sparkles, Type } from 'lucide-react';

interface EmbroideryCustomizationProps {
  embroidery: boolean;
  embroideryText: string;
  onToggleEmbroidery: (enabled: boolean) => void;
  onEmbroideryTextChange: (text: string) => void;
}

export default function EmbroideryCustomization({
  embroidery,
  embroideryText,
  onToggleEmbroidery,
  onEmbroideryTextChange
}: EmbroideryCustomizationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Custom Embroidery
        </h2>
        <p className="text-gray-600">Add a personal touch with custom embroidery</p>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Custom Text Embroidery</h3>
                <p className="text-sm text-gray-600">Add personalized text to your saree</p>
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
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embroidery Text
                </label>
                <input
                  type="text"
                  value={embroideryText}
                  onChange={(e) => onEmbroideryTextChange(e.target.value)}
                  placeholder="Enter your custom text (max 20 characters)"
                  maxLength={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {embroideryText.length}/20 characters
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Embroidery Preview</h4>
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-yellow-300">
                  <p className="text-center text-lg font-serif text-yellow-700">
                    {embroideryText || 'Your custom text will appear here'}
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Embroidery Cost: <span className="font-bold text-yellow-600">+₹500</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}