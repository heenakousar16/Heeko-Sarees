import React from 'react';
import { motion } from 'framer-motion';
import { Review } from '../../types/products';
import { Star, CheckCircle, User, Calendar } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ReviewsSection({ reviews, averageRating, totalReviews }: ReviewsSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">({totalReviews} reviews)</span>
        </div>
      </motion.div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <User className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">Verified Purchase</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{review.date.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2">
                    {review.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt="Customer review"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rating Distribution */}
      <motion.div
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-semibold text-gray-900 mb-4">Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map((stars) => {
          const percentage = Math.random() * 100; // Mock data
          return (
            <div key={stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-600 w-8">{stars}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12">{percentage.toFixed(0)}%</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}