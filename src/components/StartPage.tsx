import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductType } from '../types/products';
import { Shirt, Crown, Star, Sparkles, Award, LogIn, UserPlus, ArrowRight, Users } from 'lucide-react';

interface StartPageProps {
  onSelectProduct: (productType: ProductType) => void;
  onShowLogin?: () => void;
}

export default function StartPage({ onSelectProduct, onShowLogin }: StartPageProps) {
  const [showAuthOptions, setShowAuthOptions] = useState(true);

  const products = [
    {
      id: 'saree' as ProductType,
      name: 'Custom Saree',
      description: 'Design your perfect saree with premium fabrics, colors, and patterns',
      icon: Crown,
      image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=600',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Virtual Preview', 'Premium Materials', 'Traditional Patterns', 'Custom Embroidery'],
      startingPrice: '₹800'
    },
    {
      id: 'blouse' as ProductType,
      name: 'Designer Blouse',
      description: 'Create stunning blouses with custom embroidery and perfect fit',
      icon: Shirt,
      image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=600',
      gradient: 'from-blue-500 to-teal-500',
      features: ['Custom Embroidery', 'Perfect Fit', 'Designer Styles', 'Premium Fabrics'],
      startingPrice: '₹600'
    }
  ];

  const handleContinueAsGuest = () => {
    setShowAuthOptions(false);
  };

  const handleLogin = () => {
    if (onShowLogin) {
      onShowLogin();
    }
    setShowAuthOptions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Mobile-Optimized Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative px-4 py-16">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Design Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Perfect Outfit
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create stunning custom Indian wear with our advanced virtual studio. 
              Experience your designs in 3D before they're crafted to perfection.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>15,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span>Virtual Studio Experience</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-300/20 rounded-full blur-lg animate-bounce" />
      </div>

      <div className="px-4 py-12">
        <AnimatePresence mode="wait">
          {showAuthOptions ? (
            /* Login/Guest Options */
            <motion.div
              key="auth-options"
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Welcome to Saree Studio
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Choose how you'd like to start your fashion journey
                  </p>

                  {/* Login Button */}
                  <motion.button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn className="w-6 h-6" />
                    Login / Sign Up
                  </motion.button>

                  {/* Benefits for logged in users */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Member Benefits:</h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>Save & share your designs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crown className="w-3 h-3 text-purple-500" />
                        <span>Get personalized recommendations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-pink-500" />
                        <span>Track your orders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 text-blue-500" />
                        <span>Access exclusive collections</span>
                      </div>
                    </div>
                  </div>

                  {/* Continue as Guest */}
                  <motion.button
                    onClick={handleContinueAsGuest}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Users className="w-5 h-5" />
                    Continue as Guest
                  </motion.button>

                  <p className="text-xs text-gray-500 mt-4">
                    You can always create an account later to save your designs
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Product Selection */
            <motion.div
              key="product-selection"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Style
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                  Select from our premium collection and start designing in our virtual studio
                </p>
              </motion.div>

              <div className="space-y-8 max-w-md mx-auto">
                {products.map((product, index) => {
                  const IconComponent = product.icon;
                  
                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => onSelectProduct(product.id)}
                      className="group cursor-pointer bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Image Section */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-80`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Icon */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-2">
                            <span className="text-sm font-bold text-gray-900">From {product.startingPrice}</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                          <p className="text-white/90 text-sm">{product.description}</p>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {product.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.gradient}`} />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button className={`w-full mt-6 bg-gradient-to-r ${product.gradient} text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2`}>
                          Start Designing
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Back to Auth Options */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  onClick={() => setShowAuthOptions(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto"
                >
                  <LogIn className="w-4 h-4" />
                  Want to save your designs? Login here
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile-Optimized Features Section - Only show when not showing auth options */}
        {!showAuthOptions && (
          <motion.div 
            className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Virtual Studio Experience</h3>
              <p className="text-gray-600">Experience the future of custom clothing design</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">3D Virtual Studio</h4>
                <p className="text-gray-600 text-sm">See your design come to life in our immersive virtual studio environment</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
                <p className="text-gray-600 text-sm">Only the finest materials and craftsmanship for your outfit</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Perfect Fit</h4>
                <p className="text-gray-600 text-sm">Custom measurements ensure your outfit fits perfectly</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}