// components/PaymentForm.tsx
import React, { useState } from 'react';

type Props = {
  onSubmit: (paymentDetails: any) => void;
};

const PaymentForm = ({ onSubmit }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'MOBILE'>('CARD');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operatorCode, setOperatorCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'CARD') {
      onSubmit({
        method: 'CARD',
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiryMonth: expiry.split('/')[0],
        expiryYear: `20${expiry.split('/')[1]}`,
        cvc,
        cardName
      });
    } else {
      onSubmit({
        method: 'MOBILE',
        phoneNumber: phoneNumber.replace(/\s/g, ''),
        operatorCode
      });
    }
  };

  // Formatage du numéro de carte
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Formatage de la date d'expiration
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  // Formatage du numéro de téléphone
  const formatPhoneNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('CARD')}
            className={`flex-1 py-3 px-4 rounded-md ${
              paymentMethod === 'CARD'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Carte bancaire
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('MOBILE')}
            className={`flex-1 py-3 px-4 rounded-md ${
              paymentMethod === 'MOBILE'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Paiement mobile
          </button>
        </div>
      </div>

      {paymentMethod === 'CARD' ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom sur la carte</label>
            <input
              type="text"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Numéro de carte</label>
            <input
              type="text"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date d'expiration</label>
              <input
                type="text"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">CVC</label>
              <input
                type="text"
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="123"
                maxLength={3}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
              placeholder="Ex: 06XXXXXXXX"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Opérateur mobile</label>
            <select
              value={operatorCode}
              onChange={e => setOperatorCode(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionnez un opérateur</option>
              <option value="orange">Orange Money</option>
              <option value="mtn">MTN Mobile Money</option>
              {/* Ajoutez d'autres opérateurs selon votre marché */}
            </select>
          </div>
        </>
      )}
      
      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Payer
      </button>
    </form>
  );
};

export default PaymentForm;