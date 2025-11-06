import React from 'react';
import { EMIPlan } from '../types';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: () => void;
}

const EMIPlanCard: React.FC<EMIPlanCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <div
      className={`emi-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{plan.monthlyAmount.toLocaleString()}
            </span>
            <span className="text-gray-600">×</span>
            <span className="text-lg text-gray-700">
              {plan.tenure} months
            </span>
          </div>
          
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${
                plan.interestRate === 0 
                  ? 'text-green-600' 
                  : 'text-orange-600'
              }`}>
                {plan.interestRate === 0 ? '0% EMI' : `${plan.interestRate}% interest`}
              </span>
            </div>
            
            {plan.cashback && plan.cashback > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-600 font-medium">
                  ₹{plan.cashback.toLocaleString()} cashback
                </span>
              </div>
            )}
          </div>
          
          {plan.processingFee && plan.processingFee > 0 && (
            <div className="mt-1">
              <span className="text-xs text-gray-500">
                Processing fee: ₹{plan.processingFee.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        
        <div className="ml-4">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected 
              ? 'border-primary-600 bg-primary-600' 
              : 'border-gray-300'
          }`}>
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total amount: ₹{(plan.monthlyAmount * plan.tenure).toLocaleString()}</span>
          {plan.interestRate === 0 && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              No Cost EMI
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EMIPlanCard;