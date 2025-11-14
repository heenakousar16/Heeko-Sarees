import React from 'react';
import { CustomSaree } from '../types/saree';
import { ShoppingBag, Star, Sparkles, Clock, Shield, Truck } from 'lucide-react';

interface OrderSummaryProps {
  customSaree: CustomSaree;
  onPlaceOrder: () => void;
}

export default function OrderSummary({ customSaree, onPlaceOrder }: OrderSummaryProps) {
  const { material, color, pattern, size, blouse, embroidery, embroideryText, totalPrice } = customSaree;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Your Custom Saree
        </h2>
        <p className="text-gray-600">Review your beautiful creation</p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <h3 className="text-xl font-semibold">Order Summary</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {material && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-gray-900">{material.name}</h4>
                <p className="text-sm text-gray-500">{material.description}</p>
                <p className="text-xs text-gray-400">{material.origin}</p>
              </div>
              <span className="font-semibold text-gray-900">₹{material.price.toLocaleString()}</span>
            </div>
          )}
          
          {color && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <h4 className="font-medium text-gray-900">{color.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{color.category} • {color.popularity}% popular</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">Included</span>
            </div>
          )}
          
          {pattern && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{pattern.preview}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{pattern.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{pattern.type} • {pattern.complexity}</p>
                  <p className="text-xs text-gray-400">{pattern.region}</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">+₹{pattern.price}</span>
            </div>
          )}
          
          {size && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-gray-900">{size.name}</h4>
                <p className="text-sm text-gray-500">{size.length}m × {size.width}m</p>
              </div>
              <span className="font-semibold text-gray-900">
                {size.price === 0 ? 'Standard' : `+₹${size.price}`}
              </span>
            </div>
          )}
          
          {blouse && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-gray-900">{blouse.name}</h4>
                <p className="text-sm text-gray-500">{blouse.style}</p>
              </div>
              <span className="font-semibold text-gray-900">+₹{blouse.price}</span>
            </div>
          )}
          
          {embroidery && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h4 className="font-medium text-gray-900">Custom Embroidery</h4>
                <p className="text-sm text-gray-500">"{embroideryText}"</p>
              </div>
              <span className="font-semibold text-gray-900">+₹500</span>
            </div>
          )}
          
          <div className="flex items-center justify-between py-4 bg-gradient-to-r from-gray-50 to-gray-100 -mx-6 px-6 mt-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900">Total Amount</h4>
              <p className="text-sm text-gray-500">Including all customizations</p>
            </div>
            <span className="text-2xl font-bold text-purple-600">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Service Features */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-6 h-6 text-blue-500" />
              <span className="text-xs text-gray-600">7-10 Days Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              <span className="text-xs text-gray-600">Quality Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-6 h-6 text-purple-500" />
              <span className="text-xs text-gray-600">Free Shipping</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50">
          <button
            onClick={onPlaceOrder}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-6 h-6" />
            Place Order
          </button>
          
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-500">Trusted by 10,000+ customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}