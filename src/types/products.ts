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
  texturePattern?: string;
  shimmer?: boolean;
  weight?: 'light' | 'medium' | 'heavy';
}

export interface SareeColor {
  id: string;
  name: string;
  value: string;
  gradient?: string;
  category: 'traditional' | 'modern' | 'festive';
  popularity: number;
  hexCode?: string;
  pantone?: string;
  occasion?: string[];
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
  popularity?: number;
  occasion?: string[];
}

export interface SareeBorder {
  id: string;
  name: string;
  type: 'gold' | 'silver' | 'contrast' | 'embroidered' | 'plain';
  width: 'thin' | 'medium' | 'wide';
  price: number;
  preview: string;
  description: string;
  color?:string;
}

export interface SareeSize {
  id: string;
  name: string;
  length: number;
  width: number;
  price: number;
  bodyType?: string[];
  heightRange?: string;
}

export interface SareeBlouse {
  id: string;
  name: string;
  style: string;
  price: number;
  image: string;
  neckline?: string;
  sleeves?: string;
  fit?: string;
}

export interface CustomSaree {
  material: SareeMaterial | null;
  color: SareeColor | null;
  pattern: SareePattern | null;
  border: SareeBorder | null;
  size: SareeSize | null;
  blouse: SareeBlouse | null;
  embroidery: boolean;
  embroideryText: string;
  totalPrice: number;
  occasion?: string;
  styleNotes?: string;
}

// Blouse Types
export interface BlouseMaterial {
  id: string;
  name: string;
  texture: string;
  price: number;
  description: string;
  image: string;
  category: 'premium' | 'standard' | 'luxury';
}

export interface BlouseStyle {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  neckline: string;
  sleeves: string;
  fit?: string;
  occasion?: string[];
}

export interface BlouseSize {
  id: string;
  name: string;
  measurements: string;
  price: number;
}

export interface CustomBlouse {
  material: BlouseMaterial | null;
  color: SareeColor | null;
  style: BlouseStyle | null;
  size: BlouseSize | null;
  embroidery: boolean;
  embroideryText: string;
  embroideryDesign: string;
  totalPrice: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  measurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    height?: string;
  };
}

export interface SavedDesign {
  id: string;
  name: string;
  type: 'saree' | 'blouse';
  design: CustomSaree | CustomBlouse;
  createdAt: Date;
  thumbnail: string;
  tags?: string[];
  isPublic?: boolean;
  likes?: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  images?: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  items: (SareeMaterial | SareeColor | SareePattern)[];
  reason: string;
}

export type ProductType = 'saree' | 'blouse';
export type OccasionType = 'wedding' | 'festival' | 'party' | 'casual' | 'office' | 'traditional';
export type ViewMode = 'front' | 'back' | 'side' | '3d';