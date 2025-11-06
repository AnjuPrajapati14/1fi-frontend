import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductVariant, EMIPlan } from '../types';
import { productService } from '../services/api';
import EMIPlanCard from '../components/EMIPlanCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedEMIPlan, setSelectedEMIPlan] = useState<EMIPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!slug) {
      setError('Product not found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProductBySlug(slug);
      
      if (response.success) {
        setProduct(response.data);
        setSelectedVariant(response.data.variants[0]);
        setSelectedEMIPlan(response.data.emiPlans[0]);
      } else {
        setError(response.message || 'Product not found');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const handleProceed = () => {
    if (!selectedVariant || !selectedEMIPlan) return;
    
    // In a real app, this would navigate to a checkout or payment page
    alert(`Proceeding with:\n${selectedVariant.name}\nEMI: ₹${selectedEMIPlan.monthlyAmount.toLocaleString()} × ${selectedEMIPlan.tenure} months`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage 
          message={error || 'Product not found'} 
          onRetry={fetchProduct} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to products
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image and Info */}
          <div className="space-y-8">
            {/* Product Image */}
            <div className="aspect-square bg-white rounded-2xl p-8 shadow-card">
              <img
                src={selectedVariant?.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="bg-white p-6 rounded-xl shadow-card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info and EMI Plans */}
          <div className="space-y-8">
            {/* Product Info */}
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  New
                </span>
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
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Available Finishes: {product.variants.length} colors
                </h3>
                <div className="flex items-center space-x-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`color-selector ${
                        selectedVariant?.id === variant.id ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: variant.colorCode }}
                      title={variant.name}
                    />
                  ))}
                </div>
                {selectedVariant && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {selectedVariant.name}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="price-current">
                    ₹{selectedVariant?.price.toLocaleString()}
                  </span>
                  <span className="price-strike">
                    ₹{selectedVariant?.originalPrice.toLocaleString()}
                  </span>
                </div>
                {selectedEMIPlan && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      Additional cashback of ₹{selectedEMIPlan.cashback?.toLocaleString() || 0}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* EMI Plans */}
            <div className="bg-white p-6 rounded-xl shadow-card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Choose your EMI plan
              </h2>
              
              <div className="space-y-4">
                {product.emiPlans.map((plan) => (
                  <EMIPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedEMIPlan?.id === plan.id}
                    onSelect={() => setSelectedEMIPlan(plan)}
                  />
                ))}
              </div>

              <button
                onClick={handleProceed}
                disabled={!selectedVariant || !selectedEMIPlan}
                className="w-full mt-8 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                {selectedEMIPlan 
                  ? `Buy on ${selectedEMIPlan.tenure} months EMI`
                  : 'Select an EMI plan'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;