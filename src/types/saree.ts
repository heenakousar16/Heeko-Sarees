export interface SareeMaterial {
  id: string;
  name: string;
  texture: string;
  price: number;
  description: string;
  image: string;
  category: 'premium' | 'standard' | 'luxury';
  careInstructions: string;
  origin: string;
}

export interface SareeColor {
  id: string;
  name: string;
  value: string;
  gradient?: string;
  category: 'traditional' | 'modern' | 'festive';
  popularity: number;
}

export interface SareePattern {
  id: string;
  name: string;
  type: 'floral' | 'geometric' | 'traditional' | 'modern' | 'abstract';
  complexity: 'simple' | 'medium' | 'intricate';
  price: number;
  preview: string;
  description: string;
  region: string;
}

export interface SareeSize {
  id: string;
  name: string;
  length: number;
  width: number;
  price: number;
}

export interface SareeBlouse {
  id: string;
  name: string;
  style: string;
  price: number;
  image: string;
}

export interface CustomSaree {
  material: SareeMaterial | null;
  color: SareeColor | null;
  pattern: SareePattern | null;
  size: SareeSize | null;
  blouse: SareeBlouse | null;
  embroidery: boolean;
  embroideryText: string;
  totalPrice: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface SavedDesign {
  id: string;
  name: string;
  saree: CustomSaree;
  createdAt: Date;
  thumbnail: string;
}