import { SareeMaterial, SareeColor, SareePattern, SareeSize, SareeBlouse, BlouseMaterial, BlouseStyle, BlouseSize, SalwarMaterial, SalwarStyle, SalwarSize } from '../types/products';

// Saree Data
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
  { id: 'pearl', name: 'Pearl White', value: '#f8fafc', gradient: 'from-slate-100 to-slate-200', category: 'traditional', popularity: 90 }
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
  }
];

// Blouse Data
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

export const blouseStyles: BlouseStyle[] = [
  {
    id: 'boat-neck',
    name: 'Boat Neck',
    description: 'Elegant boat neckline with modern appeal',
    price: 300,
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=300',
    neckline: 'Boat neck',
    sleeves: 'Short sleeves'
  },
  {
    id: 'deep-neck',
    name: 'Deep V-Neck',
    description: 'Bold deep V-neck for contemporary look',
    price: 400,
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=300',
    neckline: 'Deep V-neck',
    sleeves: 'Sleeveless'
  },
  {
    id: 'high-neck',
    name: 'High Neck',
    description: 'Traditional high neck with full coverage',
    price: 350,
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=300',
    neckline: 'High neck',
    sleeves: 'Long sleeves'
  }
];

export const blouseSizes: BlouseSize[] = [
  { id: 'xs', name: 'XS', measurements: '32" chest', price: 0 },
  { id: 's', name: 'S', measurements: '34" chest', price: 0 },
  { id: 'm', name: 'M', measurements: '36" chest', price: 0 },
  { id: 'l', name: 'L', measurements: '38" chest', price: 50 },
  { id: 'xl', name: 'XL', measurements: '40" chest', price: 100 },
  { id: 'xxl', name: 'XXL', measurements: '42" chest', price: 150 }
];

// Salwar Data
export const salwarMaterials: SalwarMaterial[] = [
  {
    id: 'cotton-salwar',
    name: 'Cotton',
    texture: 'Soft and breathable',
    price: 800,
    description: 'Comfortable cotton for daily wear',
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'standard'
  },
  {
    id: 'silk-salwar',
    name: 'Silk',
    texture: 'Luxurious and smooth',
    price: 1500,
    description: 'Premium silk for special occasions',
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'luxury'
  },
  {
    id: 'georgette-salwar',
    name: 'Georgette',
    texture: 'Light and flowy',
    price: 1000,
    description: 'Elegant georgette with beautiful drape',
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium'
  }
];

export const salwarStyles: SalwarStyle[] = [
  {
    id: 'straight',
    name: 'Straight Cut',
    description: 'Classic straight cut salwar',
    price: 200,
    image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'straight'
  },
  {
    id: 'palazzo',
    name: 'Palazzo',
    description: 'Wide-legged palazzo style',
    price: 400,
    image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'palazzo'
  },
  {
    id: 'churidar',
    name: 'Churidar',
    description: 'Traditional fitted churidar',
    price: 300,
    image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'churidar'
  },
  {
    id: 'sharara',
    name: 'Sharara',
    description: 'Flared sharara style',
    price: 500,
    image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'sharara'
  }
];

export const salwarSizes: SalwarSize[] = [
  { id: 'xs', name: 'XS', measurements: '26" waist', price: 0 },
  { id: 's', name: 'S', measurements: '28" waist', price: 0 },
  { id: 'm', name: 'M', measurements: '30" waist', price: 0 },
  { id: 'l', name: 'L', measurements: '32" waist', price: 50 },
  { id: 'xl', name: 'XL', measurements: '34" waist', price: 100 },
  { id: 'xxl', name: 'XXL', measurements: '36" waist', price: 150 }
];