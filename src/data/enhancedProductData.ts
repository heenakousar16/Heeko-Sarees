import { SareeMaterial, SareeColor, SareePattern, SareeBorder, SareeSize, SareeBlouse, BlouseMaterial, BlouseStyle, BlouseSize, Review, Recommendation } from '../types/products';

// Enhanced Materials with texture and shimmer properties
export const materials: SareeMaterial[] = [
  {
    id: 'silk',
    name: 'Pure Silk',
    texture: 'Luxurious and smooth',
    price: 2500,
    description: 'Premium quality pure silk with natural sheen and lustrous finish',
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury',
    careInstructions: 'Dry clean only',
    origin: 'Kanchipuram, Tamil Nadu',
    texturePattern: 'silk-weave',
    shimmer: true,
    weight: 'medium'
  },
  {
    id: 'banarasi',
    name: 'Banarasi Silk',
    texture: 'Rich and ornate',
    price: 4500,
    description: 'Traditional Banarasi silk with intricate gold zari work and royal heritage',
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury',
    careInstructions: 'Dry clean only',
    origin: 'Varanasi, Uttar Pradesh',
    texturePattern: 'zari-work',
    shimmer: true,
    weight: 'heavy'
  },
  {
    id: 'cotton',
    name: 'Handloom Cotton',
    texture: 'Soft and breathable',
    price: 800,
    description: 'Eco-friendly handloom cotton perfect for daily wear and comfort',
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'standard',
    careInstructions: 'Machine wash cold',
    origin: 'Handloom, West Bengal',
    texturePattern: 'cotton-weave',
    shimmer: false,
    weight: 'light'
  },
  {
    id: 'georgette',
    name: 'Georgette',
    texture: 'Light and flowy',
    price: 1200,
    description: 'Elegant georgette with beautiful drape and graceful movement',
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    careInstructions: 'Hand wash or dry clean',
    origin: 'Mumbai, Maharashtra',
    texturePattern: 'georgette-flow',
    shimmer: false,
    weight: 'light'
  },
  {
    id: 'chiffon',
    name: 'Chiffon',
    texture: 'Delicate and sheer',
    price: 1500,
    description: 'Delicate chiffon with ethereal appeal and romantic drape',
    image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    careInstructions: 'Dry clean recommended',
    origin: 'Surat, Gujarat',
    texturePattern: 'chiffon-sheer',
    shimmer: false,
    weight: 'light'
  },
  {
    id: 'tussar',
    name: 'Tussar Silk',
    texture: 'Natural and textured',
    price: 2200,
    description: 'Wild silk with natural golden hue and rich texture',
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury',
    careInstructions: 'Dry clean only',
    origin: 'Jharkhand, India',
    texturePattern: 'tussar-texture',
    shimmer: true,
    weight: 'medium'
  }
];

// Enhanced Colors with occasion and hex codes
export const colors: SareeColor[] = [
  { 
    id: 'royal-blue', 
    name: 'Royal Blue', 
    value: '#1e40af', 
    gradient: 'from-blue-600 to-blue-800', 
    category: 'traditional', 
    popularity: 95,
    hexCode: '#1e40af',
    pantone: 'PANTONE 286 C',
    occasion: ['wedding', 'festival', 'party']
  },
  { 
    id: 'emerald', 
    name: 'Emerald Green', 
    value: '#059669', 
    gradient: 'from-emerald-500 to-emerald-700', 
    category: 'festive', 
    popularity: 88,
    hexCode: '#059669',
    pantone: 'PANTONE 348 C',
    occasion: ['festival', 'traditional', 'wedding']
  },
  { 
    id: 'crimson', 
    name: 'Crimson Red', 
    value: '#dc2626', 
    gradient: 'from-red-500 to-red-700', 
    category: 'traditional', 
    popularity: 92,
    hexCode: '#dc2626',
    pantone: 'PANTONE 18-1664 TPX',
    occasion: ['wedding', 'festival', 'traditional']
  },
  { 
    id: 'golden', 
    name: 'Golden Yellow', 
    value: '#d97706', 
    gradient: 'from-yellow-500 to-orange-600', 
    category: 'festive', 
    popularity: 85,
    hexCode: '#d97706',
    pantone: 'PANTONE 130 C',
    occasion: ['festival', 'traditional', 'party']
  },
  { 
    id: 'magenta', 
    name: 'Magenta', 
    value: '#c2185b', 
    gradient: 'from-pink-500 to-purple-600', 
    category: 'modern', 
    popularity: 78,
    hexCode: '#c2185b',
    pantone: 'PANTONE 219 C',
    occasion: ['party', 'modern', 'casual']
  },
  { 
    id: 'turquoise', 
    name: 'Turquoise', 
    value: '#0891b2', 
    gradient: 'from-cyan-500 to-teal-600', 
    category: 'modern', 
    popularity: 72,
    hexCode: '#0891b2',
    pantone: 'PANTONE 3125 C',
    occasion: ['casual', 'modern', 'office']
  },
  { 
    id: 'wine', 
    name: 'Wine', 
    value: '#7c2d12', 
    gradient: 'from-red-800 to-red-900', 
    category: 'traditional', 
    popularity: 80,
    hexCode: '#7c2d12',
    pantone: 'PANTONE 19-1557 TPX',
    occasion: ['wedding', 'traditional', 'party']
  },
  { 
    id: 'pearl', 
    name: 'Pearl White', 
    value: '#f8fafc', 
    gradient: 'from-slate-100 to-slate-200', 
    category: 'traditional', 
    popularity: 90,
    hexCode: '#f8fafc',
    pantone: 'PANTONE 11-4001 TPX',
    occasion: ['wedding', 'traditional', 'office']
  },
  { 
    id: 'lavender', 
    name: 'Lavender', 
    value: '#8b5cf6', 
    gradient: 'from-purple-400 to-purple-600', 
    category: 'modern', 
    popularity: 75,
    hexCode: '#8b5cf6',
    pantone: 'PANTONE 2665 C',
    occasion: ['party', 'modern', 'casual']
  },
  { 
    id: 'coral', 
    name: 'Coral Pink', 
    value: '#f97316', 
    gradient: 'from-orange-400 to-pink-500', 
    category: 'modern', 
    popularity: 82,
    hexCode: '#f97316',
    pantone: 'PANTONE 16-1546 TPX',
    occasion: ['party', 'modern', 'festival']
  }
];

// Enhanced Patterns with popularity and occasion
export const patterns: SareePattern[] = [
  {
    id: 'paisley',
    name: 'Paisley',
    type: 'traditional',
    complexity: 'intricate',
    price: 500,
    preview: '🌿',
    description: 'Classic paisley motifs with intricate detailing and royal heritage',
    region: 'Kashmir',
    popularity: 95,
    occasion: ['wedding', 'traditional', 'festival']
  },
  {
    id: 'floral-vine',
    name: 'Floral Vine',
    type: 'floral',
    complexity: 'medium',
    price: 400,
    preview: '🌸',
    description: 'Delicate floral vines with blooming flowers and natural beauty',
    region: 'Bengal',
    popularity: 88,
    occasion: ['party', 'casual', 'festival']
  },
  {
    id: 'geometric',
    name: 'Geometric',
    type: 'modern',
    complexity: 'simple',
    price: 300,
    preview: '◇',
    description: 'Contemporary geometric patterns with clean lines',
    region: 'Modern Design',
    popularity: 75,
    occasion: ['office', 'modern', 'casual']
  },
  {
    id: 'mandala',
    name: 'Mandala',
    type: 'traditional',
    complexity: 'intricate',
    price: 600,
    preview: '⚜️',
    description: 'Sacred mandala designs with spiritual significance',
    region: 'Rajasthan',
    popularity: 85,
    occasion: ['traditional', 'festival', 'wedding']
  },
  {
    id: 'lotus',
    name: 'Lotus',
    type: 'floral',
    complexity: 'medium',
    price: 450,
    preview: '🪷',
    description: 'Sacred lotus flowers in traditional style',
    region: 'Odisha',
    popularity: 80,
    occasion: ['traditional', 'festival', 'wedding']
  },
  {
    id: 'peacock',
    name: 'Peacock',
    type: 'traditional',
    complexity: 'intricate',
    price: 700,
    preview: '🦚',
    description: 'Majestic peacock motifs with detailed feathers',
    region: 'South India',
    popularity: 90,
    occasion: ['wedding', 'festival', 'traditional']
  }
];

// New Border Options
export const borders: SareeBorder[] = [
  {
    id: 'gold-zari',
    name: 'Gold Zari',
    type: 'gold',
    width: 'medium',
    price: 800,
    preview: '✨',
    description: 'Traditional gold zari work with intricate patterns'
  },
  {
    id: 'silver-thread',
    name: 'Silver Thread',
    type: 'silver',
    width: 'thin',
    price: 600,
    preview: '🌟',
    description: 'Elegant silver thread embroidery'
  },
  {
    id: 'contrast-color',
    name: 'Contrast Color',
    type: 'contrast',
    width: 'wide',
    price: 400,
    preview: '🎨',
    description: 'Bold contrast color border for modern appeal'
  },
  {
    id: 'embroidered-floral',
    name: 'Embroidered Floral',
    type: 'embroidered',
    width: 'wide',
    price: 1200,
    preview: '🌺',
    description: 'Hand-embroidered floral motifs'
  }
];

// Enhanced Sizes with body type recommendations
export const sizes: SareeSize[] = [
  { 
    id: 'standard', 
    name: 'Standard (5.5m)', 
    length: 5.5, 
    width: 1.2, 
    price: 0,
    bodyType: ['petite', 'average'],
    heightRange: '5\'0" - 5\'6"'
  },
  { 
    id: 'long', 
    name: 'Long (6m)', 
    length: 6, 
    width: 1.2, 
    price: 200,
    bodyType: ['tall', 'average'],
    heightRange: '5\'4" - 5\'10"'
  },
  { 
    id: 'extra-long', 
    name: 'Extra Long (6.5m)', 
    length: 6.5, 
    width: 1.2, 
    price: 400,
    bodyType: ['tall'],
    heightRange: '5\'8" and above'
  },
  { 
    id: 'wide', 
    name: 'Wide (5.5m x 1.4m)', 
    length: 5.5, 
    width: 1.4, 
    price: 300,
    bodyType: ['plus-size', 'curvy'],
    heightRange: 'All heights'
  }
];

// Enhanced Blouses with fit and occasion
export const blouses: SareeBlouse[] = [
  {
    id: 'sleeveless',
    name: 'Sleeveless Blouse',
    style: 'Modern sleeveless design',
    price: 800,
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=200',
    neckline: 'Round neck',
    sleeves: 'Sleeveless',
    fit: 'Fitted'
  },
  {
    id: 'short-sleeve',
    name: 'Short Sleeve Blouse',
    style: 'Classic short sleeve style',
    price: 900,
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=200',
    neckline: 'Boat neck',
    sleeves: 'Short sleeves',
    fit: 'Regular'
  },
  {
    id: 'long-sleeve',
    name: 'Long Sleeve Blouse',
    style: 'Elegant long sleeve design',
    price: 1100,
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=200',
    neckline: 'High neck',
    sleeves: 'Long sleeves',
    fit: 'Fitted'
  },
  {
    id: 'designer',
    name: 'Designer Blouse',
    style: 'Premium designer cut with embellishments',
    price: 1500,
    image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=200',
    neckline: 'Deep V-neck',
    sleeves: 'Cap sleeves',
    fit: 'Tailored'
  }
];

// Sample Reviews
export const reviews: Review[] = [
  {
    id: '1',
    customerName: 'Priya S.',
    rating: 5,
    comment: 'Absolutely stunning saree! The silk quality is exceptional and the color is exactly as shown.',
    date: new Date('2024-01-15'),
    verified: true,
    images: ['https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=200']
  },
  {
    id: '2',
    customerName: 'Anita M.',
    rating: 5,
    comment: 'Perfect for my daughter\'s wedding. The embroidery work is beautiful and the fit is perfect.',
    date: new Date('2024-01-10'),
    verified: true
  },
  {
    id: '3',
    customerName: 'Kavya R.',
    rating: 4,
    comment: 'Great quality cotton saree. Very comfortable for daily wear.',
    date: new Date('2024-01-08'),
    verified: true
  }
];

// AI Recommendations
export const recommendations: Recommendation[] = [
  {
    id: 'trending-colors',
    title: 'Trending Colors This Season',
    description: 'Popular color choices based on current fashion trends',
    items: [colors[0], colors[2], colors[9]],
    reason: 'Based on 2024 fashion trends and customer preferences'
  },
  {
    id: 'wedding-collection',
    title: 'Perfect for Weddings',
    description: 'Elegant combinations for wedding occasions',
    items: [materials[1], patterns[0], colors[2]],
    reason: 'Recommended for wedding ceremonies and receptions'
  }
];

// Blouse Materials
export const blouseMaterials: BlouseMaterial[] = [
  {
    id: 'silk-blouse',
    name: 'Silk',
    texture: 'Smooth and lustrous',
    price: 1200,
    description: 'Premium silk fabric for elegant blouses',
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury'
  },
  {
    id: 'cotton-blouse',
    name: 'Cotton',
    texture: 'Breathable and comfortable',
    price: 600,
    description: 'Soft cotton perfect for everyday wear',
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'standard'
  },
  {
    id: 'brocade',
    name: 'Brocade',
    texture: 'Rich and textured',
    price: 1800,
    description: 'Luxurious brocade with intricate weaving',
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury'
  }
];

// Blouse Styles
export const blouseStyles: BlouseStyle[] = [
  {
    id: 'boat-neck',
    name: 'Boat Neck',
    description: 'Elegant boat neckline with modern appeal',
    price: 300,
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=300',
    neckline: 'Boat neck',
    sleeves: 'Short sleeves',
    fit: 'Regular',
    occasion: ['office', 'casual', 'party']
  },
  {
    id: 'deep-neck',
    name: 'Deep V-Neck',
    description: 'Bold deep V-neck for contemporary look',
    price: 400,
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=300',
    neckline: 'Deep V-neck',
    sleeves: 'Sleeveless',
    fit: 'Fitted',
    occasion: ['party', 'modern', 'wedding']
  },
  {
    id: 'high-neck',
    name: 'High Neck',
    description: 'Traditional high neck with full coverage',
    price: 350,
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=300',
    neckline: 'High neck',
    sleeves: 'Long sleeves',
    fit: 'Regular',
    occasion: ['traditional', 'office', 'festival']
  }
];

// Blouse Sizes
export const blouseSizes: BlouseSize[] = [
  { id: 'xs', name: 'XS', measurements: '32" chest', price: 0 },
  { id: 's', name: 'S', measurements: '34" chest', price: 0 },
  { id: 'm', name: 'M', measurements: '36" chest', price: 0 },
  { id: 'l', name: 'L', measurements: '38" chest', price: 50 },
  { id: 'xl', name: 'XL', measurements: '40" chest', price: 100 },
  { id: 'xxl', name: 'XXL', measurements: '42" chest', price: 150 }
];