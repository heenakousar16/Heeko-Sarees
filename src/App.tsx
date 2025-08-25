import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductType, CustomSaree, CustomBlouse, SavedDesign, CustomerInfo, ViewMode, OccasionType } from './types/products';
import { SareeMaterial, SareeColor, SareePattern, SareeBorder, SareeSize, SareeBlouse, BlouseMaterial, BlouseStyle, BlouseSize } from './types/products';
import StartPage from './components/StartPage';
import StepIndicator from './components/StepIndicator';
import MaterialSelection from './components/MaterialSelection';
import ColorSelection from './components/ColorSelection';
import PatternSelection from './components/PatternSelection';
import SizeSelection from './components/SizeSelection';
import BlouseSelection from './components/BlouseSelection';
import EmbroideryCustomization from './components/EmbroideryCustomization';
import OrderSummary from './components/OrderSummary';
import SavedDesigns from './components/SavedDesigns';
import CustomerForm from './components/CustomerForm';
import BlouseMaterialSelection from './components/blouse/BlouseMaterialSelection';
import BlouseStyleSelection from './components/blouse/BlouseStyleSelection';
import BlouseSizeSelection from './components/blouse/BlouseSizeSelection';
import BlouseEmbroideryCustomization from './components/blouse/BlouseEmbroideryCustomization';

// Enhanced Components
import Enhanced3DPreview from './components/enhanced/Enhanced3DPreview';
import SmartRecommendations from './components/enhanced/SmartRecommendations';
import BorderSelection from './components/enhanced/BorderSelection';
import OccasionFilter from './components/enhanced/OccasionFilter';
import ReviewsSection from './components/enhanced/ReviewsSection';

// Auth Components
import LoginPage from './components/auth/LoginPage';
import UserProfile from './components/auth/UserProfile';

import { recommendations, reviews } from './data/enhancedProductData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shirt, 
  Award, 
  Menu, 
  X, 
  Home, 
  Heart, 
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
  Share2,
  Download,
  Settings,
  Palette,
  Eye,
  ChevronUp,
  ChevronDown,
  User,
  LogIn
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences?: {
    favoriteColors: string[];
    preferredStyle: string;
    occasions: string[];
  };
}

function App() {
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('front');
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentView, setCurrentView] = useState<'start' | 'customize' | 'saved' | 'profile'>('start');
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [undoStack, setUndoStack] = useState<any[]>([]);

  // Auth state
  const [user, setUser] = useState<UserData | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Saree state
  const [customSaree, setCustomSaree] = useState<CustomSaree>({
    material: null,
    color: null,
    pattern: null,
    border: null,
    size: null,
    blouse: null,
    embroidery: false,
    embroideryText: '',
    totalPrice: 0,
    occasion: undefined,
    styleNotes: undefined
  });

  // Blouse state
  const [customBlouse, setCustomBlouse] = useState<CustomBlouse>({
    material: null,
    color: null,
    style: null,
    size: null,
    embroidery: false,
    embroideryText: '',
    embroideryDesign: 'floral',
    totalPrice: 0
  });

  const getStepNames = () => {
    switch (currentProduct) {
      case 'saree':
        return ['Material', 'Color', 'Pattern', 'Border', 'Size', 'Blouse', 'Embroidery', 'Summary', 'Customer Info'];
      case 'blouse':
        return ['Material', 'Color', 'Style', 'Size', 'Embroidery', 'Summary', 'Customer Info'];
      default:
        return [];
    }
  };

  const stepNames = getStepNames();
  const totalSteps = stepNames.length;

  // Enhanced price calculation with new components
  useEffect(() => {
    if (currentProduct === 'saree') {
      const materialPrice = customSaree.material?.price || 0;
      const patternPrice = customSaree.pattern?.price || 0;
      const borderPrice = customSaree.border?.price || 0;
      const sizePrice = customSaree.size?.price || 0;
      const blousePrice = customSaree.blouse?.price || 0;
      const embroideryPrice = customSaree.embroidery ? 500 : 0;
      
      setCustomSaree(prev => ({
        ...prev,
        totalPrice: materialPrice + patternPrice + borderPrice + sizePrice + blousePrice + embroideryPrice
      }));
    }
  }, [customSaree.material, customSaree.pattern, customSaree.border, customSaree.size, customSaree.blouse, customSaree.embroidery, currentProduct]);

  useEffect(() => {
    if (currentProduct === 'blouse') {
      const materialPrice = customBlouse.material?.price || 0;
      const stylePrice = customBlouse.style?.price || 0;
      const sizePrice = customBlouse.size?.price || 0;
      const embroideryPrice = customBlouse.embroidery ? 300 : 0;
      const textPrice = customBlouse.embroideryText ? 200 : 0;
      
      setCustomBlouse(prev => ({
        ...prev,
        totalPrice: materialPrice + stylePrice + sizePrice + embroideryPrice + textPrice
      }));
    }
  }, [customBlouse.material, customBlouse.style, customBlouse.size, customBlouse.embroidery, customBlouse.embroideryText, currentProduct]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      if (currentProduct && (customSaree.material || customBlouse.material)) {
        const designData = {
          product: currentProduct,
          saree: customSaree,
          blouse: customBlouse,
          timestamp: Date.now()
        };
        localStorage.setItem('autoSavedDesign', JSON.stringify(designData));
      }
    };

    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [currentProduct, customSaree, customBlouse]);

  // Auth handlers
  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
    // Clear any user-specific data
    setSavedDesigns([]);
    setWishlist([]);
  };

  const handleSelectProduct = (productType: ProductType) => {
    setCurrentProduct(productType);
    setCurrentView('customize');
    setCurrentStep(1);
    setShowRecommendations(true);
  };

  const handleBackToStart = () => {
    setCurrentView('start');
    setCurrentProduct(null);
    setCurrentStep(1);
    setShowRecommendations(false);
  };

  // Enhanced handlers with undo functionality
  const saveToUndoStack = () => {
    setUndoStack(prev => [...prev.slice(-9), { saree: { ...customSaree }, blouse: { ...customBlouse } }]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setCustomSaree(lastState.saree);
      setCustomBlouse(lastState.blouse);
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  // Saree handlers
  const handleSelectMaterial = (material: SareeMaterial) => {
    saveToUndoStack();
    setCustomSaree(prev => ({ ...prev, material }));
  };

  const handleSelectColor = (color: SareeColor) => {
    saveToUndoStack();
    if (currentProduct === 'saree') {
      setCustomSaree(prev => ({ ...prev, color }));
    } else if (currentProduct === 'blouse') {
      setCustomBlouse(prev => ({ ...prev, color }));
    }
  };

  const handleSelectPattern = (pattern: SareePattern) => {
    saveToUndoStack();
    setCustomSaree(prev => ({ ...prev, pattern }));
  };

  const handleSelectBorder = (border: SareeBorder) => {
    saveToUndoStack();
    setCustomSaree(prev => ({ ...prev, border }));
  };

  const handleSelectSize = (size: SareeSize) => {
    saveToUndoStack();
    setCustomSaree(prev => ({ ...prev, size }));
  };

  const handleSelectBlouse = (blouse: SareeBlouse) => {
    saveToUndoStack();
    setCustomSaree(prev => ({ ...prev, blouse }));
  };

  const handleToggleEmbroidery = (enabled: boolean) => {
    saveToUndoStack();
    if (currentProduct === 'saree') {
      setCustomSaree(prev => ({ ...prev, embroidery: enabled }));
    } else if (currentProduct === 'blouse') {
      setCustomBlouse(prev => ({ ...prev, embroidery: enabled }));
    }
  };

  const handleEmbroideryTextChange = (text: string) => {
    if (currentProduct === 'saree') {
      setCustomSaree(prev => ({ ...prev, embroideryText: text }));
    } else if (currentProduct === 'blouse') {
      setCustomBlouse(prev => ({ ...prev, embroideryText: text }));
    }
  };

  // Blouse handlers
  const handleSelectBlouseMaterial = (material: BlouseMaterial) => {
    saveToUndoStack();
    setCustomBlouse(prev => ({ ...prev, material }));
  };

  const handleSelectBlouseStyle = (style: BlouseStyle) => {
    saveToUndoStack();
    setCustomBlouse(prev => ({ ...prev, style }));
  };

  const handleSelectBlouseSize = (size: BlouseSize) => {
    saveToUndoStack();
    setCustomBlouse(prev => ({ ...prev, size }));
  };

  const handleEmbroideryDesignChange = (design: string) => {
    setCustomBlouse(prev => ({ ...prev, embroideryDesign: design }));
  };

  // Enhanced 3D controls
  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Enhanced save and share
  const handleSaveDesign = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    let design: CustomSaree | CustomBlouse;
    let thumbnail = 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=200';
    
    switch (currentProduct) {
      case 'saree':
        design = customSaree;
        break;
      case 'blouse':
        design = customBlouse;
        thumbnail = 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=200';
        break;
      default:
        return;
    }

    const newDesign: SavedDesign = {
      id: Date.now().toString(),
      name: `${currentProduct?.charAt(0).toUpperCase()}${currentProduct?.slice(1)} Design ${savedDesigns.length + 1}`,
      type: currentProduct!,
      design,
      createdAt: new Date(),
      thumbnail,
      tags: [selectedOccasion || 'custom'],
      isPublic: false,
      likes: 0
    };
    setSavedDesigns(prev => [...prev, newDesign]);
    
    // Show success animation
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    notification.textContent = 'Design saved successfully! ✨';
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const designId = `${currentProduct}-${Date.now()}`;
    setWishlist(prev => 
      prev.includes(designId) 
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const handleLoadDesign = (savedDesign: SavedDesign) => {
    setCurrentProduct(savedDesign.type);
    
    switch (savedDesign.type) {
      case 'saree':
        setCustomSaree(savedDesign.design as CustomSaree);
        break;
      case 'blouse':
        setCustomBlouse(savedDesign.design as CustomBlouse);
        break;
    }
    
    setCurrentView('customize');
    setCurrentStep(1);
  };

  const handleDeleteDesign = (id: string) => {
    setSavedDesigns(prev => prev.filter(design => design.id !== id));
  };

  const handleShareDesign = () => {
    const designData = {
      product: currentProduct,
      design: currentProduct === 'saree' ? customSaree : customBlouse,
      timestamp: Date.now()
    };
    
    const shareUrl = `${window.location.origin}?design=${btoa(JSON.stringify(designData))}`;
    
    if (navigator.share) {
      navigator.share({
        title: `My Custom ${currentProduct?.charAt(0).toUpperCase()}${currentProduct?.slice(1)} Design`,
        text: `Check out my beautiful custom ${currentProduct} design!`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Design link copied to clipboard! 🔗';
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    }
  };

  const handleCustomerSubmit = (customerInfo: CustomerInfo) => {
    const orderData = {
      customer: customerInfo,
      product: currentProduct,
      design: currentProduct === 'saree' ? customSaree : customBlouse,
      totalPrice: getCurrentPrice(),
      orderDate: new Date(),
      orderId: `ORD-${Date.now()}`
    };
    
    // Simulate order processing
    setTimeout(() => {
      alert(`🎉 Order placed successfully! 
      
Order ID: ${orderData.orderId}
Thank you ${customerInfo.name} for choosing our custom ${currentProduct} service. 

📧 Confirmation sent to: ${customerInfo.email}
📱 SMS updates to: ${customerInfo.phone}
🚚 Estimated delivery: 7-10 business days

We'll start crafting your beautiful ${currentProduct} right away!`);
    }, 1000);
  };

  const handlePlaceOrder = () => {
    setCurrentStep(totalSteps); // Move to customer form
  };

  const handleRecommendationSelect = (item: any) => {
    if ('texture' in item) {
      handleSelectMaterial(item);
    } else if ('value' in item) {
      handleSelectColor(item);
    } else if ('preview' in item) {
      handleSelectPattern(item);
    }
  };

  const canProceed = () => {
    if (currentProduct === 'saree') {
      switch (currentStep) {
        case 1: return customSaree.material !== null;
        case 2: return customSaree.color !== null;
        case 3: return customSaree.pattern !== null;
        case 4: return customSaree.border !== null;
        case 5: return customSaree.size !== null;
        case 6: return customSaree.blouse !== null;
        case 7: return true; // Embroidery is optional
        case 8: return true; // Summary step
        default: return true;
      }
    } else if (currentProduct === 'blouse') {
      switch (currentStep) {
        case 1: return customBlouse.material !== null;
        case 2: return customBlouse.color !== null;
        case 3: return customBlouse.style !== null;
        case 4: return customBlouse.size !== null;
        case 5: return true; // Embroidery is optional
        case 6: return true; // Summary step
        default: return true;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep < totalSteps && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getCurrentPrice = () => {
    switch (currentProduct) {
      case 'saree': return customSaree.totalPrice;
      case 'blouse': return customBlouse.totalPrice;
      default: return 0;
    }
  };

  const renderCurrentStep = () => {
    if (currentView === 'saved') {
      return (
        <SavedDesigns
          savedDesigns={savedDesigns}
          onLoadDesign={handleLoadDesign}
          onDeleteDesign={handleDeleteDesign}
        />
      );
    }

    if (currentProduct === 'saree') {
      switch (currentStep) {
        case 1: return <MaterialSelection selectedMaterial={customSaree.material} onSelectMaterial={handleSelectMaterial} />;
        case 2: return <ColorSelection selectedColor={customSaree.color} onSelectColor={handleSelectColor} />;
        case 3: return <PatternSelection selectedPattern={customSaree.pattern} onSelectPattern={handleSelectPattern} />;
        case 4: return <BorderSelection selectedBorder={customSaree.border} onSelectBorder={handleSelectBorder} />;
        case 5: return <SizeSelection selectedSize={customSaree.size} onSelectSize={handleSelectSize} />;
        case 6: return <BlouseSelection selectedBlouse={customSaree.blouse} onSelectBlouse={handleSelectBlouse} />;
        case 7: return <EmbroideryCustomization embroidery={customSaree.embroidery} embroideryText={customSaree.embroideryText} onToggleEmbroidery={handleToggleEmbroidery} onEmbroideryTextChange={handleEmbroideryTextChange} />;
        case 8: return <OrderSummary customSaree={customSaree} onPlaceOrder={handlePlaceOrder} />;
        case 9: return <CustomerForm onSubmit={handleCustomerSubmit} />;
        default: return null;
      }
    } else if (currentProduct === 'blouse') {
      switch (currentStep) {
        case 1: return <BlouseMaterialSelection selectedMaterial={customBlouse.material} onSelectMaterial={handleSelectBlouseMaterial} />;
        case 2: return <ColorSelection selectedColor={customBlouse.color} onSelectColor={handleSelectColor} />;
        case 3: return <BlouseStyleSelection selectedStyle={customBlouse.style} onSelectStyle={handleSelectBlouseStyle} />;
        case 4: return <BlouseSizeSelection selectedSize={customBlouse.size} onSelectSize={handleSelectBlouseSize} />;
        case 5: return <BlouseEmbroideryCustomization embroidery={customBlouse.embroidery} embroideryText={customBlouse.embroideryText} embroideryDesign={customBlouse.embroideryDesign} onToggleEmbroidery={handleToggleEmbroidery} onEmbroideryTextChange={handleEmbroideryTextChange} onEmbroideryDesignChange={handleEmbroideryDesignChange} />;
        case 6: return <div>Blouse Order Summary</div>; // TODO: Create BlouseOrderSummary component
        case 7: return <CustomerForm onSubmit={handleCustomerSubmit} />;
        default: return null;
      }
    }

    return null;
  };

  if (currentView === 'start') {
    return <StartPage onSelectProduct={handleSelectProduct} onShowLogin={() => setShowLogin(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleBackToStart}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {currentProduct?.charAt(0).toUpperCase()}{currentProduct?.slice(1)} Studio
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  AI-Powered Designer
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* User Profile/Login Button */}
              {user ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">Login</span>
                </button>
              )}
              
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowSidebar(false)} />
            <motion.div
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="space-y-4">
                <button
                  onClick={() => { setCurrentView('customize'); setCurrentStep(1); setShowSidebar(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-5 h-5 text-purple-500" />
                  <span>Virtual Studio</span>
                </button>
                <button
                  onClick={() => { setCurrentView('saved'); setShowSidebar(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Saved Designs ({savedDesigns.length})</span>
                </button>
                <button
                  onClick={() => { setShowRecommendations(!showRecommendations); setShowSidebar(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span>AI Recommendations</span>
                </button>
                {user && (
                  <button
                    onClick={() => { setShowProfile(true); setShowSidebar(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-green-500" />
                    <span>My Profile</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 py-6">
        {/* Mobile Step Indicator */}
        {currentView === 'customize' && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StepIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepNames={stepNames}
            />
          </motion.div>
        )}

        {/* Occasion Filter - Mobile Optimized */}
        {currentView === 'customize' && currentStep === 1 && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <OccasionFilter
              selectedOccasion={selectedOccasion}
              onSelectOccasion={setSelectedOccasion}
            />
          </motion.div>
        )}

        {/* Side-by-Side Layout - Fixed to ensure preview is always visible */}
        {currentView === 'customize' ? (
          <div className="flex gap-4 h-full">
            {/* Selection Panel - Left Side (60% width) */}
            <motion.div
              className="w-3/5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 250px)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {renderCurrentStep()}
            </motion.div>

            {/* Preview Panel - Right Side (40% width) - Always visible */}
            <motion.div
              className="w-2/5 flex-shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-24">
                <Enhanced3DPreview
                  customSaree={currentProduct === 'saree' ? customSaree : {
                    material: null,
                    color: currentProduct === 'blouse' ? customBlouse.color : null,
                    pattern: null,
                    border: null,
                    size: null,
                    blouse: null,
                    embroidery: false,
                    embroideryText: '',
                    totalPrice: getCurrentPrice()
                  }}
                  rotation={rotation}
                  zoom={zoom}
                  viewMode={viewMode}
                  onRotate={handleRotate}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onViewModeChange={handleViewModeChange}
                  onSaveDesign={handleSaveDesign}
                  onShareDesign={handleShareDesign}
                  onAddToWishlist={handleAddToWishlist}
                  isInWishlist={wishlist.includes(`${currentProduct}-${Date.now()}`)}
                />
                
                {/* Enhanced Price Display */}
                {getCurrentPrice() > 0 && (
                  <motion.div
                    className="mt-4 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl shadow-lg border border-white/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        Current Total
                      </p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{getCurrentPrice().toLocaleString()}
                      </p>
                      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-green-500" />
                          <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>Premium Quality</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderCurrentStep()}
          </motion.div>
        )}

        {/* Smart Recommendations - Mobile */}
        {showRecommendations && currentView === 'customize' && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SmartRecommendations
              currentSaree={customSaree}
              recommendations={recommendations}
              onSelectRecommendation={handleRecommendationSelect}
            />
          </motion.div>
        )}

        {/* Reviews Section - Mobile */}
        {currentView === 'customize' && currentStep === totalSteps - 1 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ReviewsSection
              reviews={reviews}
              averageRating={4.8}
              totalReviews={reviews.length}
            />
          </motion.div>
        )}
      </div>

      {/* Mobile Navigation */}
      {currentView === 'customize' && currentStep < totalSteps && currentStep !== totalSteps && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-40"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>
            
            <div className="text-center px-4">
              <div className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</div>
              <div className="text-xs text-gray-500">{stepNames[currentStep - 1]}</div>
            </div>
            
            <motion.button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              whileHover={{ scale: canProceed() ? 1.05 : 1 }}
              whileTap={{ scale: canProceed() ? 0.95 : 1 }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Auth Modals */}
      <AnimatePresence>
        {showLogin && (
          <LoginPage
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        )}
        {showProfile && user && (
          <UserProfile
            user={user}
            onLogout={handleLogout}
            onClose={() => setShowProfile(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
// Development update - Week 4
// Date: 2025-08-07 17:11
// Saree customization feature improvements

// Development update - Week 6
// Date: 2025-08-24 15:10
// Saree customization feature improvements

// Development update - Week 6
// Date: 2025-08-25 10:03
// Saree customization feature improvements
