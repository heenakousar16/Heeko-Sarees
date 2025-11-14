import React from 'react';
import { SavedDesign } from '../types/saree';
import { Heart, Trash2, Eye } from 'lucide-react';

interface SavedDesignsProps {
  savedDesigns: SavedDesign[];
  onLoadDesign: (design: SavedDesign) => void;
  onDeleteDesign: (id: string) => void;
}

export default function SavedDesigns({ savedDesigns, onLoadDesign, onDeleteDesign }: SavedDesignsProps) {
  if (savedDesigns.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Saved Designs</h3>
        <p className="text-gray-500">Create and save your favorite saree designs</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-red-500" />
          Saved Designs
        </h2>
        <p className="text-gray-600">Your favorite saree combinations</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedDesigns.map((design) => (
          <div key={design.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative">
              <img
                src={design.thumbnail}
                alt={design.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg">{design.name}</h3>
                <p className="text-white/80 text-sm">
                  {design.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onLoadDesign(design)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Load
                </button>
                <button
                  onClick={() => onDeleteDesign(design.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}