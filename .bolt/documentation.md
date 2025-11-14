# 3D Saree Customization Business Application - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [File Structure](#file-structure)
4. [Type Definitions](#type-definitions)
5. [Data Layer](#data-layer)
6. [Component Documentation](#component-documentation)
7. [State Management](#state-management)
8. [Database Integration Guide](#database-integration-guide)
9. [Adding Custom Designs](#adding-custom-designs)
10. [API Integration Points](#api-integration-points)

---

## 🎯 Project Overview

### Purpose
A comprehensive web application for designing custom Indian sarees and blouses with real-time 3D visualization, user authentication, and e-commerce functionality.

### Key Features
- **3D Virtual Studio**: Real-time preview with rotation, zoom, and multiple view modes
- **Complete Customization**: Materials, colors, patterns, borders, sizes, embroidery
- **User Management**: Authentication, profiles, order history, wishlist
- **AI Recommendations**: Smart suggestions based on user preferences
- **E-commerce Flow**: Cart, checkout, order management
- **Mobile Responsive**: Optimized for all devices

---

## 🏗️ Architecture & Tech Stack

### Frontend Technologies
```typescript
{
  "framework": "React 18.3.1",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "animations": "Framer Motion",
  "icons": "Lucide React",
  "build": "Vite",
  "state": "React Hooks + Context"
}
```

### Project Structure
```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── blouse/          # Blouse-specific components
│   ├── enhanced/        # Advanced features
│   └── *.tsx            # Core components
├── types/               # TypeScript definitions
├── data/                # Mock data & constants
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---

## 📁 File Structure

### Core Files
```
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── src/
    ├── App.tsx                  # Main app component
    ├── main.tsx                 # React DOM entry
    ├── index.css                # Global styles
    ├── vite-env.d.ts           # Vite type definitions
    ├── types/
    │   ├── products.ts          # Product type definitions
    │   └── saree.ts             # Legacy saree types
    ├── data/
    │   ├── productData.ts       # Product data
    │   ├── sareeData.ts         # Legacy saree data
    │   └── enhancedProductData.ts # Enhanced product data
    └── components/
        ├── StartPage.tsx        # Landing page
        ├── StepIndicator.tsx    # Progress indicator
        ├── MaterialSelection.tsx # Material picker
        ├── ColorSelection.tsx   # Color picker
        ├── PatternSelection.tsx # Pattern picker
        ├── SizeSelection.tsx    # Size picker
        ├── BlouseSelection.tsx  # Blouse picker
        ├── EmbroideryCustomization.tsx # Embroidery options
        ├── OrderSummary.tsx     # Order review
        ├── CustomerForm.tsx     # Customer details
        ├── SavedDesigns.tsx     # Saved designs
        ├── SareePreview.tsx     # 3D preview
        ├── FilterPanel.tsx      # Filter options
        ├── auth/
        │   ├── LoginPage.tsx    # Authentication
        │   └── UserProfile.tsx  # User management
        ├── blouse/
        │   ├── BlouseMaterialSelection.tsx
        │   ├── BlouseStyleSelection.tsx
        │   ├── BlouseSizeSelection.tsx
        │   └── BlouseEmbroideryCustomization.tsx
        └── enhanced/
            ├── Enhanced3DPreview.tsx
            ├── SmartRecommendations.tsx
            ├── BorderSelection.tsx
            ├── OccasionFilter.tsx
            └── ReviewsSection.tsx
```

---

## 🔧 Type Definitions

### Core Types (`src/types/products.ts`)

#### Product Types
```typescript
export type ProductType = 'saree' | 'blouse';
export type OccasionType = 'wedding' | 'festival' | 'party' | 'casual' | 'office' | 'traditional';
export type ViewMode = 'front' | 'back' | 'side' | '3d';
```

#### Material Interface
```typescript
export interface SareeMaterial {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  texture: string;               // Texture description
  price: number;                 // Base price
  description: string;           // Detailed description
  image: string;                 // Image URL
  category: 'premium' | 'standard' | 'luxury';
  careInstructions: string;      // Care guidelines
  origin: string;                // Manufacturing origin
  texturePattern?: string;       // 3D texture pattern
  shimmer?: boolean;             // Shimmer effect
  weight?: 'light' | 'medium' | 'heavy';
}
```

#### Color Interface
```typescript
export interface SareeColor {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  value: string;                 // Hex color value
  gradient?: string;             // Tailwind gradient class
  category: 'traditional' | 'modern' | 'festive';
  popularity: number;            // Popularity percentage
  hexCode?: string;              // Standard hex code
  pantone?: string;              // Pantone color code
  occasion?: string[];           // Suitable occasions
}
```

#### Pattern Interface
```typescript
export interface SareePattern {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  type: 'floral' | 'geometric' | 'traditional' | 'modern' | 'abstract';
  complexity: 'simple' | 'medium' | 'intricate';
  price: number;                 // Additional cost
  preview: string;               // Emoji/symbol preview
  description: string;           // Detailed description
  region: string;                // Cultural origin
  popularity?: number;           // Popularity percentage
  occasion?: string[];           // Suitable occasions
}
```

#### Custom Saree Interface
```typescript
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
```

#### User & Order Types
```typescript
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
```

---

## 📊 Data Layer

### Product Data Structure (`src/data/enhancedProductData.ts`)

#### Materials Array
```typescript
export const materials: SareeMaterial[] = [
  {
    id: 'silk',
    name: 'Pure Silk',
    texture: 'Luxurious and smooth',
    price: 2500,
    description: 'Premium quality pure silk with natural sheen',
    image: 'https://images.pexels.com/photos/6069951/...',
    category: 'luxury',
    careInstructions: 'Dry clean only',
    origin: 'Kanchipuram, Tamil Nadu',
    texturePattern: 'silk-weave',
    shimmer: true,
    weight: 'medium'
  },
  // ... more materials
];
```

#### Colors Array
```typescript
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
  // ... more colors
];
```

### Database Integration Points

#### Current Mock Data
```typescript
// Replace these with API calls
export const materials = [...];     // → GET /api/materials
export const colors = [...];        // → GET /api/colors
export const patterns = [...];      // → GET /api/patterns
export const borders = [...];       // → GET /api/borders
export const sizes = [...];         // → GET /api/sizes
export const blouses = [...];       // → GET /api/blouses
```

---

## 🧩 Component Documentation

### 1. App Component (`src/App.tsx`)

#### Purpose
Main application component managing global state and routing.

#### Key State Variables
```typescript
const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
const [currentStep, setCurrentStep] = useState(1);
const [customSaree, setCustomSaree] = useState<CustomSaree>({...});
const [customBlouse, setCustomBlouse] = useState<CustomBlouse>({...});
const [user, setUser] = useState<UserData | null>(null);
const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
```

#### Key Functions
```typescript
// Product selection
const handleSelectProduct = (productType: ProductType) => {...};

// Material selection
const handleSelectMaterial = (material: SareeMaterial) => {...};

// Color selection
const handleSelectColor = (color: SareeColor) => {...};

// Save design
const handleSaveDesign = () => {...};

// User authentication
const handleLogin = (userData: UserData) => {...};
```

#### Database Integration Points
- Save/load user preferences
- Save/load custom designs
- Order management
- User authentication

### 2. StartPage Component (`src/components/StartPage.tsx`)

#### Purpose
Landing page with authentication options and product selection.

#### Key Features
```typescript
// Authentication options
const [showAuthOptions, setShowAuthOptions] = useState(true);

// Product showcase
const products = [
  {
    id: 'saree' as ProductType,
    name: 'Custom Saree',
    description: 'Design your perfect saree...',
    features: ['Virtual Preview', 'Premium Materials', ...],
    startingPrice: '₹800'
  },
  // ... more products
];
```

#### Database Integration
- User authentication
- Product catalog
- Featured products
- Pricing information

### 3. Enhanced3DPreview Component (`src/components/enhanced/Enhanced3DPreview.tsx`)

#### Purpose
Advanced 3D visualization with interactive controls.

#### Key Features
```typescript
// 3D Controls
const [rotation, setRotation] = useState(0);
const [zoom, setZoom] = useState(1);
const [viewMode, setViewMode] = useState<ViewMode>('front');
const [lightingAngle, setLightingAngle] = useState(0);

// Visual effects
const getTextureClass = () => {...};
const getShimmerEffect = () => {...};
const getSareeBackgroundStyle = () => {...};
```

#### Customization Points
- Add new texture patterns
- Implement advanced lighting
- Add more view modes
- Custom 3D models

### 4. Material Selection Components

#### MaterialSelection (`src/components/MaterialSelection.tsx`)
```typescript
// Filter functionality
const [filteredMaterials, setFilteredMaterials] = useState(materials);
const [activeFilter, setActiveFilter] = useState('all');

// Category filtering
const handleFilterChange = (category: string) => {
  if (category === 'all') {
    setFilteredMaterials(materials);
  } else {
    setFilteredMaterials(materials.filter(m => m.category === category));
  }
};
```

#### Database Integration
- Material catalog management
- Inventory tracking
- Price updates
- Image management

### 5. Authentication Components

#### LoginPage (`src/components/auth/LoginPage.tsx`)
```typescript
// Form state
const [isLogin, setIsLogin] = useState(true);
const [formData, setFormData] = useState({
  name: '', email: '', phone: '', password: '', confirmPassword: ''
});

// Validation
const validateForm = () => {...};

// Authentication
const handleSubmit = async (e: React.FormEvent) => {...};
```

#### UserProfile (`src/components/auth/UserProfile.tsx`)
```typescript
// Profile tabs
const [activeTab, setActiveTab] = useState('profile');

// Profile editing
const [isEditing, setIsEditing] = useState(false);

// User data management
const handleSaveProfile = () => {...};
```

#### Database Integration
- User registration/login
- Profile management
- Order history
- Wishlist management

### 6. Smart Recommendations (`src/components/enhanced/SmartRecommendations.tsx`)

#### Purpose
AI-powered product recommendations based on user preferences.

#### Key Features
```typescript
// Recommendation engine
const recommendations: Recommendation[] = [
  {
    id: 'trending-colors',
    title: 'Trending Colors This Season',
    description: 'Popular color choices...',
    items: [colors[0], colors[2], colors[9]],
    reason: 'Based on 2024 fashion trends...'
  }
];

// Trending combinations
const trendingCombinations = [
  {
    name: 'Royal Blue + Gold Zari',
    description: 'Classic wedding choice',
    popularity: '95%',
    gradient: 'from-blue-600 to-yellow-500'
  }
];
```

#### Database Integration
- User behavior tracking
- Recommendation algorithms
- Trending analysis
- Personalization data

---

## 🔄 State Management

### Global State Structure
```typescript
// App.tsx state
interface AppState {
  // Navigation
  currentProduct: ProductType | null;
  currentStep: number;
  currentView: 'start' | 'customize' | 'saved' | 'profile';
  
  // Product customization
  customSaree: CustomSaree;
  customBlouse: CustomBlouse;
  
  // User management
  user: UserData | null;
  savedDesigns: SavedDesign[];
  wishlist: string[];
  
  // UI state
  showSidebar: boolean;
  showRecommendations: boolean;
  selectedOccasion: OccasionType | null;
}
```

### State Update Patterns
```typescript
// Immutable updates
const handleSelectMaterial = (material: SareeMaterial) => {
  setCustomSaree(prev => ({ ...prev, material }));
};

// Complex state updates
const handleSaveDesign = () => {
  const newDesign: SavedDesign = {
    id: Date.now().toString(),
    name: `Design ${savedDesigns.length + 1}`,
    type: currentProduct!,
    design: currentProduct === 'saree' ? customSaree : customBlouse,
    createdAt: new Date(),
    thumbnail: '...',
  };
  setSavedDesigns(prev => [...prev, newDesign]);
};
```

---

## 🗄️ Database Integration Guide

### 1. Database Schema Design

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Materials Table
```sql
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  texture VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category VARCHAR(50) NOT NULL,
  care_instructions TEXT,
  origin VARCHAR(255),
  texture_pattern VARCHAR(100),
  shimmer BOOLEAN DEFAULT FALSE,
  weight VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Colors Table
```sql
CREATE TABLE colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  hex_value VARCHAR(7) NOT NULL,
  gradient_class VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  popularity INTEGER DEFAULT 0,
  pantone_code VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Patterns Table
```sql
CREATE TABLE patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  complexity VARCHAR(20) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  preview_emoji VARCHAR(10),
  description TEXT,
  region VARCHAR(255),
  popularity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Custom Designs Table
```sql
CREATE TABLE custom_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  product_type VARCHAR(20) NOT NULL,
  material_id UUID REFERENCES materials(id),
  color_id UUID REFERENCES colors(id),
  pattern_id UUID REFERENCES patterns(id),
  border_id UUID REFERENCES borders(id),
  size_id UUID REFERENCES sizes(id),
  blouse_id UUID REFERENCES blouses(id),
  embroidery BOOLEAN DEFAULT FALSE,
  embroidery_text VARCHAR(255),
  total_price DECIMAL(10,2),
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  design_id UUID REFERENCES custom_designs(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  shipping_address TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. API Endpoints Structure

#### Authentication Endpoints
```typescript
// POST /api/auth/register
interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// GET /api/auth/profile
// PUT /api/auth/profile
// POST /api/auth/logout
```

#### Product Endpoints
```typescript
// GET /api/materials
// GET /api/materials/:id
// POST /api/materials (admin)
// PUT /api/materials/:id (admin)
// DELETE /api/materials/:id (admin)

// Similar for colors, patterns, borders, sizes, blouses
```

#### Design Endpoints
```typescript
// GET /api/designs (user's designs)
// POST /api/designs (save design)
// PUT /api/designs/:id (update design)
// DELETE /api/designs/:id (delete design)
// GET /api/designs/public (public designs)
// POST /api/designs/:id/like (like design)
```

#### Order Endpoints
```typescript
// POST /api/orders (create order)
// GET /api/orders (user's orders)
// GET /api/orders/:id (order details)
// PUT /api/orders/:id/status (admin - update status)
```

### 3. API Integration in Components

#### Replace Mock Data with API Calls
```typescript
// Before (mock data)
import { materials } from '../data/enhancedProductData';

// After (API integration)
const [materials, setMaterials] = useState<SareeMaterial[]>([]);

useEffect(() => {
  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/materials');
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    }
  };
  
  fetchMaterials();
}, []);
```

#### Save Design to Database
```typescript
const handleSaveDesign = async () => {
  if (!user) {
    setShowLogin(true);
    return;
  }

  try {
    const designData = {
      name: `${currentProduct} Design ${savedDesigns.length + 1}`,
      product_type: currentProduct,
      material_id: customSaree.material?.id,
      color_id: customSaree.color?.id,
      pattern_id: customSaree.pattern?.id,
      border_id: customSaree.border?.id,
      size_id: customSaree.size?.id,
      blouse_id: customSaree.blouse?.id,
      embroidery: customSaree.embroidery,
      embroidery_text: customSaree.embroideryText,
      total_price: customSaree.totalPrice,
      thumbnail_url: generateThumbnail(), // Implement thumbnail generation
    };

    const response = await fetch('/api/designs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(designData),
    });

    if (response.ok) {
      const savedDesign = await response.json();
      setSavedDesigns(prev => [...prev, savedDesign]);
      showSuccessNotification('Design saved successfully!');
    }
  } catch (error) {
    console.error('Failed to save design:', error);
    showErrorNotification('Failed to save design');
  }
};
```

---

## 🎨 Adding Custom Designs

### 1. Adding New Materials

#### Step 1: Database Entry
```sql
INSERT INTO materials (
  name, texture, price, description, image_url, category,
  care_instructions, origin, texture_pattern, shimmer, weight
) VALUES (
  'Mysore Silk',
  'Soft and lustrous',
  3500,
  'Traditional Mysore silk with gold thread work',
  'https://your-cdn.com/mysore-silk.jpg',
  'luxury',
  'Dry clean only, store in cotton cloth',
  'Mysore, Karnataka',
  'mysore-weave',
  true,
  'medium'
);
```

#### Step 2: Update Type Definitions (if needed)
```typescript
// Add new texture patterns
type TexturePattern = 
  | 'silk-weave' 
  | 'zari-work' 
  | 'cotton-weave' 
  | 'georgette-flow' 
  | 'chiffon-sheer' 
  | 'tussar-texture'
  | 'mysore-weave'; // New pattern
```

#### Step 3: Update 3D Preview Component
```typescript
// In Enhanced3DPreview.tsx
const getTextureClass = () => {
  if (!material) return '';
  
  switch (material.texturePattern) {
    case 'mysore-weave':
      return 'bg-gradient-to-br from-yellow-100/40 to-orange-100/30';
    // ... existing cases
  }
};
```

### 2. Adding New Patterns

#### Step 1: Database Entry
```sql
INSERT INTO patterns (
  name, type, complexity, price, preview_emoji, 
  description, region, popularity
) VALUES (
  'Kanjeevaram Border',
  'traditional',
  'intricate',
  800,
  '🏛️',
  'Classic Kanjeevaram temple border design',
  'Tamil Nadu',
  85
);
```

#### Step 2: Update Pattern Component
```typescript
// In PatternSelection.tsx - add new pattern type if needed
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'traditional': return '🏛️';
    case 'temple': return '🕉️'; // New type
    // ... existing cases
  }
};
```

### 3. Adding New Colors

#### Step 1: Database Entry
```sql
INSERT INTO colors (
  name, hex_value, gradient_class, category, 
  popularity, pantone_code
) VALUES (
  'Peacock Blue',
  '#005f73',
  'from-teal-700 to-blue-800',
  'traditional',
  88,
  'PANTONE 3145 C'
);
```

#### Step 2: Update Color Gradients
```typescript
// In Enhanced3DPreview.tsx
const getSareeBackgroundStyle = () => {
  if (!color) return { backgroundColor: '#e5e7eb' };
  
  const gradientMap: { [key: string]: string } = {
    'from-teal-700 to-blue-800': 'linear-gradient(135deg, #0f766e, #1e40af)',
    // ... existing gradients
  };
  
  // ... rest of function
};
```

### 4. Custom Embroidery Designs

#### Step 1: Create Embroidery Table
```sql
CREATE TABLE embroidery_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  preview_emoji VARCHAR(10),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  complexity VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Step 2: Update Embroidery Component
```typescript
// In BlouseEmbroideryCustomization.tsx
const [embroideryDesigns, setEmbroideryDesigns] = useState([]);

useEffect(() => {
  const fetchEmbroideryDesigns = async () => {
    const response = await fetch('/api/embroidery-designs');
    const designs = await response.json();
    setEmbroideryDesigns(designs);
  };
  
  fetchEmbroideryDesigns();
}, []);
```

### 5. Adding New Product Categories

#### Step 1: Update Type Definitions
```typescript
// Add new product type
export type ProductType = 'saree' | 'blouse' | 'lehenga' | 'kurti';

// Create new product interface
export interface CustomLehenga {
  material: SareeMaterial | null;
  color: SareeColor | null;
  pattern: SareePattern | null;
  style: LehengaStyle | null;
  size: SareeSize | null;
  dupatta: Dupatta | null;
  embroidery: boolean;
  embroideryText: string;
  totalPrice: number;
}
```

#### Step 2: Create New Components
```typescript
// Create LehengaCustomization.tsx
export default function LehengaCustomization({ ... }) {
  // Similar structure to saree customization
  return (
    <div className="space-y-6">
      {/* Lehenga-specific customization options */}
    </div>
  );
}
```

#### Step 3: Update Main App Component
```typescript
// In App.tsx
const [customLehenga, setCustomLehenga] = useState<CustomLehenga>({...});

// Add lehenga handlers
const handleSelectLehengaStyle = (style: LehengaStyle) => {
  setCustomLehenga(prev => ({ ...prev, style }));
};
```

---

## 🔌 API Integration Points

### 1. Authentication Service
```typescript
// services/authService.ts
export class AuthService {
  private baseURL = '/api/auth';

  async register(userData: RegisterRequest): Promise<UserData> {
    const response = await fetch(`${this.baseURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  }

  async login(credentials: LoginRequest): Promise<UserData> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  }

  async getProfile(): Promise<UserData> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${this.baseURL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    return response.json();
  }
}
```

### 2. Product Service
```typescript
// services/productService.ts
export class ProductService {
  private baseURL = '/api';

  async getMaterials(): Promise<SareeMaterial[]> {
    const response = await fetch(`${this.baseURL}/materials`);
    return response.json();
  }

  async getColors(): Promise<SareeColor[]> {
    const response = await fetch(`${this.baseURL}/colors`);
    return response.json();
  }

  async getPatterns(): Promise<SareePattern[]> {
    const response = await fetch(`${this.baseURL}/patterns`);
    return response.json();
  }

  async getRecommendations(userId: string): Promise<Recommendation[]> {
    const response = await fetch(`${this.baseURL}/recommendations/${userId}`);
    return response.json();
  }
}
```

### 3. Design Service
```typescript
// services/designService.ts
export class DesignService {
  private baseURL = '/api/designs';

  async saveDesign(design: SaveDesignRequest): Promise<SavedDesign> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(design),
    });
    
    return response.json();
  }

  async getUserDesigns(): Promise<SavedDesign[]> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(this.baseURL, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    return response.json();
  }

  async deleteDesign(designId: string): Promise<void> {
    const token = localStorage.getItem('authToken');
    await fetch(`${this.baseURL}/${designId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }
}
```

### 4. Order Service
```typescript
// services/orderService.ts
export class OrderService {
  private baseURL = '/api/orders';

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    
    return response.json();
  }

  async getUserOrders(): Promise<Order[]> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(this.baseURL, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    return response.json();
  }

  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    const response = await fetch(`${this.baseURL}/${orderId}/status`);
    return response.json();
  }
}
```

---

## 🚀 Implementation Roadmap

### Phase 1: Database Setup
1. Set up database schema
2. Create API endpoints
3. Implement authentication
4. Replace mock data with API calls

### Phase 2: Enhanced Features
1. Add image upload for custom designs
2. Implement advanced 3D rendering
3. Add payment integration
4. Create admin dashboard

### Phase 3: AI & Analytics
1. Implement recommendation engine
2. Add user behavior tracking
3. Create analytics dashboard
4. Implement A/B testing

### Phase 4: Mobile App
1. Create React Native version
2. Add offline capabilities
3. Implement push notifications
4. Add AR try-on features

---

## 📝 Development Notes

### Code Quality Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Add loading states for all async operations
- Use proper accessibility attributes

### Performance Optimization
- Implement lazy loading for images
- Use React.memo for expensive components
- Optimize bundle size with code splitting
- Add service worker for caching

### Security Considerations
- Validate all user inputs
- Implement proper authentication
- Use HTTPS for all API calls
- Sanitize user-generated content

### Testing Strategy
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for API endpoints
- E2E tests for critical user flows

---

This documentation provides a comprehensive guide for understanding, maintaining, and extending your 3D Saree Customization application. Use it as a reference when integrating with databases, adding new features, or onboarding new developers to the project.