import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight,
  Sparkles,
  Crown,
  Heart,
  Star,
  Shield,
  CheckCircle
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: UserData) => void;
  onClose: () => void;
}

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

export default function LoginPage({ onLogin, onClose }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData: UserData = {
        id: Date.now().toString(),
        name: formData.name || 'Fashion Enthusiast',
        email: formData.email,
        phone: formData.phone,
        avatar: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100`,
        preferences: {
          favoriteColors: ['royal-blue', 'emerald', 'crimson'],
          preferredStyle: 'traditional',
          occasions: ['wedding', 'festival']
        }
      };

      onLogin(userData);
      setIsLoading(false);
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
      notification.textContent = `Welcome ${userData.name}! 🎉`;
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      const userData: UserData = {
        id: Date.now().toString(),
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        avatar: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100`,
        preferences: {
          favoriteColors: ['royal-blue', 'emerald'],
          preferredStyle: 'modern',
          occasions: ['party', 'casual']
        }
      };

      onLogin(userData);
      setIsLoading(false);
    }, 1000);
  };

  const benefits = [
    { icon: Heart, text: 'Save your favorite designs', color: 'text-red-500' },
    { icon: Star, text: 'Get personalized recommendations', color: 'text-yellow-500' },
    { icon: Crown, text: 'Access exclusive collections', color: 'text-purple-500' },
    { icon: Shield, text: 'Secure order tracking', color: 'text-green-500' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col lg:flex-row h-full min-h-0">
          {/* Left Side - Branding & Benefits */}
          <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 text-white relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-4 inline-block mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Crown className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">Welcome to</h1>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Saree Studio
                </h2>
                <p className="text-white/90 mt-2">Your Virtual Fashion Designer</p>
              </div>

              {/* Benefits */}
              <div className="flex-1 space-y-6 overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">Why Join Us?</h3>
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="bg-white/20 rounded-lg p-2">
                        <IconComponent className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <span className="text-white/90">{benefit.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">15K+</div>
                  <div className="text-xs text-white/80">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs text-white/80">Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-xs text-white/80">Rating</div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg animate-bounce" />
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 relative flex flex-col min-h-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
            >
              ×
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-md mx-auto">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Welcome Back!' : 'Create Account'}
                  </h3>
                  <p className="text-gray-600">
                    {isLogin 
                      ? 'Sign in to continue your fashion journey' 
                      : 'Join thousands of fashion enthusiasts'
                    }
                  </p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
                    Continue with Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <div className="w-5 h-5 bg-blue-600 rounded-full" />
                    Continue with Facebook
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                                  errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter your full name"
                              />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                                  errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter your phone number"
                              />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Confirm your password"
                            />
                          </div>
                          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                        <span className="ml-2 text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-purple-600 hover:text-purple-700">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Toggle Form */}
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrors({});
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          password: '',
                          confirmPassword: ''
                        });
                      }}
                      className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>

                {/* Terms */}
                {!isLogin && (
                  <p className="text-xs text-gray-500 text-center mt-4 mb-6">
                    By creating an account, you agree to our{' '}
                    <button className="text-purple-600 hover:text-purple-700">Terms of Service</button>
                    {' '}and{' '}
                    <button className="text-purple-600 hover:text-purple-700">Privacy Policy</button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}