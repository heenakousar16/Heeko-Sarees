import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomSaree, ViewMode } from '../../types/products';
import { AvatarViewer } from "../3d/AvatarViewer";
import { ErrorBoundary } from "../3d/ErrorBoundary";
import {
  RotateCcw,
  Eye,
  Save,
  Share2,
  ZoomIn,
  ZoomOut,
  Camera,
  Sparkles,
  Palette,
  Heart,
  Download,
  RotateCw,
  Move3D
} from 'lucide-react';

interface Enhanced3DPreviewProps {
  customSaree: CustomSaree;
  rotation: number;
  zoom: number;
  viewMode: ViewMode;
  onRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onSaveDesign?: () => void;
  onShareDesign?: () => void;
  onAddToWishlist?: () => void;
  isInWishlist?: boolean;
}

export default function Enhanced3DPreview({
  customSaree,
  rotation,
  zoom,
  viewMode,
  onRotate,
  onZoomIn,
  onZoomOut,
  onViewModeChange,
  onSaveDesign,
  onShareDesign,
  onAddToWishlist,
  isInWishlist = false
}: Enhanced3DPreviewProps) {
  const { material, color, pattern, border, size, blouse } = customSaree;
  const [isAnimating, setIsAnimating] = useState(false);
  const [lightingAngle, setLightingAngle] = useState(0);

  // Animate lighting for shimmer effect
  useEffect(() => {
    if (material?.shimmer) {
      const interval = setInterval(() => {
        setLightingAngle(prev => (prev + 1) % 360);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [material?.shimmer]);

  const handleRotate = () => {
    setIsAnimating(true);
    onRotate();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getTextureClass = () => {
    if (!material) return '';

    switch (material.texturePattern) {
      case 'silk-weave':
        return 'bg-gradient-to-br from-white/20 to-transparent';
      case 'zari-work':
        return 'bg-gradient-to-br from-yellow-200/30 to-transparent';
      case 'cotton-weave':
        return 'bg-gradient-to-br from-gray-100/20 to-transparent';
      case 'georgette-flow':
        return 'bg-gradient-to-br from-white/10 to-transparent';
      case 'chiffon-sheer':
        return 'bg-gradient-to-br from-white/5 to-transparent';
      case 'tussar-texture':
        return 'bg-gradient-to-br from-amber-100/30 to-transparent';
      default:
        return 'bg-gradient-to-br from-white/10 to-transparent';
    }
  };

  const getShimmerEffect = () => {
    if (!material?.shimmer) return '';

    return `
      background: linear-gradient(
        ${lightingAngle}deg,
        transparent 30%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 70%
      );
    `;
  };

  const getSareeBackgroundStyle = () => {
    if (!color) return { backgroundColor: '#e5e7eb' };

    // Handle gradient colors
    if (color.gradient) {
      // Convert Tailwind gradient classes to CSS
      const gradientMap: { [key: string]: string } = {
        'from-blue-600 to-blue-800': 'linear-gradient(135deg, #2563eb, #1e40af)',
        'from-emerald-500 to-emerald-700': 'linear-gradient(135deg, #10b981, #047857)',
        'from-red-500 to-red-700': 'linear-gradient(135deg, #ef4444, #b91c1c)',
        'from-yellow-500 to-orange-600': 'linear-gradient(135deg, #eab308, #ea580c)',
        'from-pink-500 to-purple-600': 'linear-gradient(135deg, #ec4899, #9333ea)',
        'from-cyan-500 to-teal-600': 'linear-gradient(135deg, #06b6d4, #0d9488)',
        'from-red-800 to-red-900': 'linear-gradient(135deg, #991b1b, #7f1d1d)',
        'from-slate-100 to-slate-200': 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
        'from-purple-400 to-purple-600': 'linear-gradient(135deg, #c084fc, #9333ea)',
        'from-orange-400 to-pink-500': 'linear-gradient(135deg, #fb923c, #ec4899)'
      };

      return {
        background: gradientMap[color.gradient] || `linear-gradient(135deg, ${color.value}, ${color.value})`
      };
    }

    // Handle solid colors
    return { backgroundColor: color.value };
  };

  const viewModes = [
    { id: 'front' as ViewMode, label: 'Front', icon: '👗' },
    { id: 'back' as ViewMode, label: 'Back', icon: '🔄' },
    { id: 'side' as ViewMode, label: 'Side', icon: '↔️' },
    { id: '3d' as ViewMode, label: '3D', icon: '🎭' }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <motion.h3
            className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eye className="w-5 h-5 text-blue-500" />
            Virtual Studio
          </motion.h3>
          <p className="text-sm text-gray-600">Experience your design in 3D</p>
        </div>

        {/* View Mode Selector - Mobile Optimized */}
        <div className="flex justify-center gap-1 mb-4">
          {viewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onViewModeChange(mode.id)}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${viewMode === mode.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <span className="mr-1">{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </div>

        {/* Control Buttons - Mobile Optimized */}
        <div className="flex justify-center gap-1 mb-4 flex-wrap">
          <motion.button
            onClick={handleRotate}
            disabled={isAnimating}
            className="inline-flex items-center gap-1 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-3 h-3" />
            Rotate
          </motion.button>

          <button
            onClick={onZoomIn}
            className="inline-flex items-center gap-1 px-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs"
          >
            <ZoomIn className="w-3 h-3" />
            +
          </button>

          <button
            onClick={onZoomOut}
            className="inline-flex items-center gap-1 px-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs"
          >
            <ZoomOut className="w-3 h-3" />
            -
          </button>

          {onAddToWishlist && (
            <motion.button
              onClick={onAddToWishlist}
              className={`inline-flex items-center gap-1 px-2 py-2 rounded-lg transition-colors text-xs ${isInWishlist
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-3 h-3 ${isInWishlist ? 'fill-current' : ''}`} />
              {isInWishlist ? 'Saved' : 'Save'}
            </motion.button>
          )}
        </div>

        {/* 3D Preview Container - Mobile Optimized */}
        <ErrorBoundary>
          <div className="relative w-full h-96 mx-auto mb-4 rounded-2xl overflow-hidden">
            <AvatarViewer
              modelUrl="/models/lady_V4.glb"
              sareeHex={customSaree?.color || customSaree?.color?.value}
              blouseHex={customSaree?.blouse?.color}
              borderHex={customSaree?.border?.color}   // 👈 this line makes the 3D border update
              cameraView={viewMode}
              rotation={rotation}
              zoom={zoom}
            />



          </div>
        </ErrorBoundary>

        {/* Preview Details - Mobile Optimized */}
        <motion.div
          className="space-y-1 text-center text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {material && (
            <p className="text-gray-600 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span className="font-medium">Material:</span> {material.name}
              {material.shimmer && <span className="text-yellow-500">✨</span>}
            </p>
          )}
          {color && (
            <p className="text-gray-600 flex items-center justify-center gap-1">
              <Palette className="w-3 h-3 text-purple-500" />
              <span className="font-medium">Color:</span> {color.name}
              <div
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color.value }}
              />
            </p>
          )}
        </motion.div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {onSaveDesign && (
            <button
              onClick={onSaveDesign}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-xs font-medium"
            >
              <Save className="w-3 h-3" />
              Save
            </button>
          )}

          {onShareDesign && (
            <button
              onClick={onShareDesign}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-xs font-medium"
            >
              <Share2 className="w-3 h-3" />
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}