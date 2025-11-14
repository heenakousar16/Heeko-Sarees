import React from 'react';
import { CustomSaree } from '../types/products';
import { RotateCcw, Eye, Save, Share2 } from 'lucide-react';
import { AvatarViewer } from './3d/AvatarViewer';

interface SareePreviewProps {
  customSaree: CustomSaree;
  rotation: number;
  onRotate: () => void;
  onSaveDesign?: () => void;
  onShareDesign?: () => void;
}

export default function SareePreview({ 
  customSaree, 
  rotation, 
  onRotate, 
  onSaveDesign, 
  onShareDesign 
}: SareePreviewProps) {
  const { material, color, pattern, size, blouse } = customSaree;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Eye className="w-5 h-5 text-blue-500" />
          3D Preview
        </h3>
        
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={onRotate}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Rotate
          </button>
          
          {onSaveDesign && (
            <button
              onClick={onSaveDesign}
              className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          )}
          
          {onShareDesign && (
            <button
              onClick={onShareDesign}
              className="inline-flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          )}
        </div>
      </div>
      
      <div className="relative w-80 h-96 mx-auto perspective-1000">
        <div
          className="relative w-full h-full transition-transform duration-1000 transform-style-3d"
          style={{
            transform: `rotateY(${rotation}deg) rotateX(5deg)`
          }}
        >
          {/* Saree silhouette */}
          <div
            className={`absolute inset-0 rounded-3xl shadow-2xl transition-all duration-500 ${
              color?.gradient ? `bg-gradient-to-br ${color.gradient}` : 'bg-gray-200'
            }`}
            style={color && !color.gradient ? { backgroundColor: color.value } : {}}
          >
            {/* Material texture overlay */}
            <div className="absolute inset-0 rounded-3xl opacity-20 bg-gradient-to-br from-white to-transparent" />
            
            {/* Pattern overlay */}
            {pattern && (
              <div className="absolute inset-0 flex items-center justify-center opacity-70">
                <div className="grid grid-cols-4 gap-4 p-8">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="text-2xl text-white/80 animate-pulse">
                      {pattern.preview}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size indicator */}
            {size && (
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {size.name}
              </div>
            )}
            
            {/* Saree drape lines */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="absolute top-10 left-4 right-4 h-0.5 bg-white/30 rounded" />
              <div className="absolute top-20 left-6 right-6 h-0.5 bg-white/20 rounded" />
              <div className="absolute bottom-20 left-4 right-4 h-0.5 bg-white/30 rounded" />
              <div className="absolute bottom-10 left-6 right-6 h-0.5 bg-white/20 rounded" />
            </div>
            
            {/* 3D depth shadow */}
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-black/20 rounded-3xl -z-10 blur-sm" />
          </div>
        </div>
      </div>
      
      {/* Preview details */}
      <div className="mt-6 space-y-2 text-center">
        {material && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Material:</span> {material.name}
          </p>
        )}
        {color && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Color:</span> {color.name}
          </p>
        )}
        {pattern && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Pattern:</span> {pattern.name}
          </p>
        )}
        {size && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Size:</span> {size.name}
          </p>
        )}
        {blouse && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Blouse:</span> {blouse.name}
          </p>
        )}
      </div>
    </div>
  );
}