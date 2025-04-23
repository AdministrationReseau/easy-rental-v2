// components/SubscriptionPlan.tsx
"use client";
import React from 'react';

type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
};

type Props = {
  plan: Plan;
  onSelect: () => void;
};

const SubscriptionPlan = ({ plan, onSelect }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{plan.price} FCFA</span>
        <span className="text-gray-500">/{plan.billingCycle === 'monthly' ? 'mois' : 'an'}</span>
      </div>
      
      <ul className="mb-6 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start mb-2">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className="mt-auto w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Sélectionner
      </button>
    </div>
  );
};

export default SubscriptionPlan;