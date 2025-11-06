import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const defaultVariant = product.variants[0];
  const lowestEMI = Math.min(...product.emiPlans.map(plan => plan.monthlyAmount));
  
  return (
    <Link to={`/products/${product.slug}`} className="block">
      <div className="card p-6 h-full">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={defaultVariant.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="price-current">₹{defaultVariant.price.toLocaleString()}</span>
            <span className="price-strike">₹{defaultVariant.originalPrice.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {product.variants.slice(0, 3).map((variant) => (
              <div
                key={variant.id}
                className="color-selector"
                style={{ backgroundColor: variant.colorCode }}
                title={variant.color}
              />
            ))}
            {product.variants.length > 3 && (
              <span className="text-xs text-gray-500 ml-2">
                +{product.variants.length - 3} more
              </span>
            )}
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              EMI starts from ₹{lowestEMI.toLocaleString()}/month
            </p>
            <p className="text-xs text-green-600">
              {product.emiPlans.length} EMI options available
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
            
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {product.variants.length} variants
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;