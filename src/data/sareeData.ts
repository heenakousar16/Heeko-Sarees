import { SareeMaterial, SareeColor, SareePattern, SareeSize, SareeBlouse } from '../types/saree';

export const materials: SareeMaterial[] = [
  {
    id: 'silk',
    name: 'Pure Silk',
    texture: 'Luxurious and smooth',
    price: 2500,
    description: 'Premium quality pure silk with natural sheen',
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury',
    careInstructions: 'Dry clean only',
    origin: 'Kanchipuram, Tamil Nadu'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    texture: 'Soft and breathable',
    price: 800,
    description: 'Comfortable cotton fabric perfect for daily wear',
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'standard',
    careInstructions: 'Machine wash cold',
    origin: 'Handloom, West Bengal'
  },
  {
    id: 'georgette',
    name: 'Georgette',
    texture: 'Light and flowy',
    price: 1200,
    description: 'Elegant georgette with beautiful drape',
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    careInstructions: 'Hand wash or dry clean',
    origin: 'Mumbai, Maharashtra'
  },
  {
    id: 'chiffon',
    name: 'Chiffon',
    texture: 'Delicate and sheer',
    price: 1500,
    description: 'Delicate chiffon with ethereal appeal',
    image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    careInstructions: 'Dry clean recommended',
    origin: 'Surat, Gujarat'
  },
  {
    id: 'banarasi',
    name: 'Banarasi Silk',
    texture: 'Rich and ornate',
    price: 4500,
    description: 'Traditional Banarasi silk with gold zari work',
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury',
    careInstructions: 'Dry clean only',
    origin: 'Varanasi, Uttar Pradesh'
  },
  {
    id: 'linen',
    name: 'Linen',
    texture: 'Crisp and natural',
    price: 900,
    description: 'Eco-friendly linen with natural texture',
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'standard',
    careInstructions: 'Machine wash gentle',
    origin: 'Kerala, India'
  }
];

export const colors: SareeColor[] = [
  { id: 'royal-blue', name: 'Royal Blue', value: '#1e40af', gradient: 'from-blue-600 to-blue-800', category: 'traditional', popularity: 95 },
  { id: 'emerald', name: 'Emerald Green', value: '#059669', gradient: 'from-emerald-500 to-emerald-700', category: 'festive', popularity: 88 },
  { id: 'crimson', name: 'Crimson Red', value: '#dc2626', gradient: 'from-red-500 to-red-700', category: 'traditional', popularity: 92 },
  { id: 'golden', name: 'Golden Yellow', value: '#d97706', gradient: 'from-yellow-500 to-orange-600', category: 'festive', popularity: 85 },
  { id: 'magenta', name: 'Magenta', value: '#c2185b', gradient: 'from-pink-500 to-purple-600', category: 'modern', popularity: 78 },
  { id: 'turquoise', name: 'Turquoise', value: '#0891b2', gradient: 'from-cyan-500 to-teal-600', category: 'modern', popularity: 72 },
  { id: 'wine', name: 'Wine', value: '#7c2d12', gradient: 'from-red-800 to-red-900', category: 'traditional', popularity: 80 },
  { id: 'pearl', name: 'Pearl White', value: '#f8fafc', gradient: 'from-slate-100 to-slate-200', category: 'traditional', popularity: 90 },
  { id: 'lavender', name: 'Lavender', value: '#8b5cf6', gradient: 'from-purple-400 to-purple-600', category: 'modern', popularity: 75 },
  { id: 'coral', name: 'Coral Pink', value: '#f97316', gradient: 'from-orange-400 to-pink-500', category: 'modern', popularity: 82 },
  { id: 'navy', name: 'Navy Blue', value: '#1e3a8a', gradient: 'from-blue-800 to-blue-900', category: 'traditional', popularity: 87 },
  { id: 'mint', name: 'Mint Green', value: '#10b981', gradient: 'from-green-400 to-emerald-500', category: 'modern', popularity: 70 }
];

export const patterns: SareePattern[] = [
  {
    id: 'paisley',
    name: 'Paisley',
    type: 'traditional',
    complexity: 'intricate',
    price: 500,
    preview: '🌿',
    description: 'Classic paisley motifs with intricate detailing',
    region: 'Kashmir'
  },
  {
    id: 'floral-vine',
    name: 'Floral Vine',
    type: 'floral',
    complexity: 'medium',
    price: 400,
    preview: '🌸',
    description: 'Delicate floral vines with blooming flowers',
    region: 'Bengal'
  },
  {
    id: 'geometric',
    name: 'Geometric',
    type: 'modern',
    complexity: 'simple',
    price: 300,
    preview: '◇',
    description: 'Contemporary geometric patterns',
    region: 'Modern Design'
  },
  {
    id: 'mandala',
    name: 'Mandala',
    type: 'traditional',
    complexity: 'intricate',
    price: 600,
    preview: '⚜️',
    description: 'Sacred mandala designs with spiritual significance',
    region: 'Rajasthan'
  },
  {
    id: 'lotus',
    name: 'Lotus',
    type: 'floral',
    complexity: 'medium',
    price: 450,
    preview: '🪷',
    description: 'Sacred lotus flowers in traditional style',
    region: 'Odisha'
  },
  {
    id: 'chevron',
    name: 'Chevron',
    type: 'geometric',
    complexity: 'simple',
    price: 250,
    preview: '⫸',
    description: 'Modern chevron patterns',
    region: 'Contemporary'
  },
  {
    id: 'peacock',
    name: 'Peacock',
    type: 'traditional',
    complexity: 'intricate',
    price: 700,
    preview: '🦚',
    description: 'Majestic peacock motifs with detailed feathers',
    region: 'South India'
  },
  {
    id: 'abstract',
    name: 'Abstract Art',
    type: 'abstract',
    complexity: 'medium',
    price: 550,
    preview: '🎨',
    description: 'Modern abstract artistic patterns',
    region: 'Contemporary'
  }
];

export const sizes: SareeSize[] = [
  { id: 'standard', name: 'Standard (5.5m)', length: 5.5, width: 1.2, price: 0 },
  { id: 'long', name: 'Long (6m)', length: 6, width: 1.2, price: 200 },
  { id: 'extra-long', name: 'Extra Long (6.5m)', length: 6.5, width: 1.2, price: 400 },
  { id: 'wide', name: 'Wide (5.5m x 1.4m)', length: 5.5, width: 1.4, price: 300 }
];

export const blouses: SareeBlouse[] = [
  {
    id: 'sleeveless',
    name: 'Sleeveless Blouse',
    style: 'Modern sleeveless design',
    price: 800,
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'short-sleeve',
    name: 'Short Sleeve Blouse',
    style: 'Classic short sleeve style',
    price: 900,
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'long-sleeve',
    name: 'Long Sleeve Blouse',
    style: 'Elegant long sleeve design',
    price: 1100,
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'designer',
    name: 'Designer Blouse',
    style: 'Premium designer cut with embellishments',
    price: 1500,
    image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];
// Development update - Week 2
// Date: 2025-07-27 12:37
// Saree customization feature improvements

// Development update - Week 2
// Date: 2025-07-27 10:04
// Saree customization feature improvements

// Development update - Week 5
// Date: 2025-08-18 12:48
// Saree customization feature improvements

// Development update - Week 6
// Date: 2025-08-22 10:24
// Saree customization feature improvements

// Development update - Week 11
// Date: 2025-09-29 13:18
// Saree customization feature improvements

// Development update - Week 11
// Date: 2025-09-25 12:04
// Saree customization feature improvements
