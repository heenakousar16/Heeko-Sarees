import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  Star, 
  Edit3, 
  LogOut,
  Crown,
  Gift,
  Truck,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Calendar
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

interface UserProfileProps {
  user: UserData;
  onLogout: () => void;
  onClose: () => void;
}

export default function UserProfile({ user, onLogout, onClose }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    phone: user.phone || '',
    preferredStyle: user.preferences?.preferredStyle || 'traditional'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: '₹3,500',
      items: 'Royal Blue Silk Saree + Blouse',
      image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'In Progress',
      total: '₹2,800',
      items: 'Emerald Green Cotton Saree',
      image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Delivered',
      total: '₹4,200',
      items: 'Golden Yellow Banarasi Saree',
      image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'ORD-004',
      date: '2023-12-28',
      status: 'Delivered',
      total: '₹2,100',
      items: 'Designer Blouse Collection',
      image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const wishlistItems = [
    {
      id: 'W-001',
      name: 'Crimson Red Banarasi',
      price: '₹4,500',
      image: 'https://images.pexels.com/photos/8853450/pexels-photo-8853450.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'W-002',
      name: 'Golden Yellow Silk',
      price: '₹3,200',
      image: 'https://images.pexels.com/photos/6765019/pexels-photo-6765019.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'W-003',
      name: 'Emerald Green Cotton',
      price: '₹1,800',
      image: 'https://images.pexels.com/photos/7148647/pexels-photo-7148647.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'W-004',
      name: 'Royal Blue Designer',
      price: '₹5,200',
      image: 'https://images.pexels.com/photos/6069951/pexels-photo-6069951.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const handleSaveProfile = () => {
    // Simulate saving profile
    setIsEditing(false);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = 'Profile updated successfully! ✨';
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white rounded-full p-1">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">Premium Member</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Style</label>
              <select
                value={editData.preferredStyle}
                onChange={(e) => setEditData(prev => ({ ...prev, preferredStyle: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
                <option value="fusion">Fusion</option>
              </select>
            </div>
            <button
              onClick={handleSaveProfile}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium text-gray-900">{user.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Preferred Style</label>
              <p className="font-medium text-gray-900 capitalize">{user.preferences?.preferredStyle || 'Traditional'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Member Since</label>
              <p className="font-medium text-gray-900">January 2024</p>
            </div>
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Style Preferences</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-2 block">Favorite Colors</label>
            <div className="flex gap-2">
              {['#1e40af', '#059669', '#dc2626', '#d97706'].map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-2 block">Preferred Occasions</label>
            <div className="flex flex-wrap gap-2">
              {['Wedding', 'Festival', 'Party'].map((occasion) => (
                <span
                  key={occasion}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {occasion}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">Order History</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShoppingBag className="w-4 h-4" />
          <span>{recentOrders.length} orders</span>
        </div>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.items}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-900">Order {order.id}</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{order.items}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{order.date}</span>
                  <span className="font-semibold text-purple-600">{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">My Wishlist</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Heart className="w-4 h-4" />
          <span>{wishlistItems.length} items</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-xl mb-4"
            />
            <h5 className="font-semibold text-gray-900 mb-2">{item.name}</h5>
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-600">{item.price}</span>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Settings</h4>
      
      <div className="space-y-4">
        {[
          { icon: Bell, label: 'Notifications', description: 'Manage your notification preferences' },
          { icon: Shield, label: 'Privacy & Security', description: 'Control your privacy settings' },
          { icon: CreditCard, label: 'Payment Methods', description: 'Manage saved payment methods' },
          { icon: Truck, label: 'Shipping Addresses', description: 'Manage delivery addresses' },
          { icon: Palette, label: 'Theme Preferences', description: 'Customize your app experience' },
          { icon: Gift, label: 'Referral Program', description: 'Invite friends and earn rewards' }
        ].map((setting, index) => {
          const IconComponent = setting.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <IconComponent className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{setting.label}</h5>
                  <p className="text-gray-600 text-sm">{setting.description}</p>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Account</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'orders' && renderOrdersTab()}
              {activeTab === 'wishlist' && renderWishlistTab()}
              {activeTab === 'settings' && renderSettingsTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}