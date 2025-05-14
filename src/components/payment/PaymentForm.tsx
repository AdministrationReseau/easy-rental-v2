'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Payment } from '@/types/models/payment';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Check, Lock, AlertTriangle, ChevronRight, Info } from 'lucide-react';
import Image from "next/image";

interface PaymentFormProps {
    onSubmit: (paymentDetails: Payment) => void;
    amount?: number;
    isProcessing?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
                                                     onSubmit,
                                                     amount,
                                                     isProcessing = false
                                                 }) => {
    const { t } = useTranslation(['organization', 'common']);
    const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'MOBILE'>('MOBILE');
    const [paymentData, setPaymentData] = useState<{
        cardNumber: string;
        expiryDate: string;
        cvc: string;
        cardName: string;
        phoneNumber: string;
        operatorCode: string;
    }>({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        cardName: '',
        phoneNumber: '',
        operatorCode: 'orange'
    });
    const [errors, setErrors] = useState<{
        [key: string]: string | null;
    }>({});
    const [cardBrand, setCardBrand] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState<string | null>(null);

    // Detect card brand based on the first digits
    useEffect(() => {
        const cardNumber = paymentData.cardNumber.replace(/\s/g, '');
        if (cardNumber.startsWith('4')) {
            setCardBrand('visa');
        } else if (/^5[1-5]/.test(cardNumber)) {
            setCardBrand('mastercard');
        } else if (/^3[47]/.test(cardNumber)) {
            setCardBrand('amex');
        } else if (/^6(?:011|5)/.test(cardNumber)) {
            setCardBrand('discover');
        } else {
            setCardBrand(null);
        }
    }, [paymentData.cardNumber]);

    // Format card number with spaces every 4 digits
    const formatCardNumber = (value: string): string => {
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

    // Format expiry date (MM/YY)
    const formatExpiryDate = (value: string): string => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }

        return v;
    };

    // Format phone number for Cameroonian numbers (9 digits - example: 622202421)
    const formatPhoneNumber = (value: string): string => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, '');

        // Handle country code if present
        if (digits.startsWith('237') && digits.length > 3) {
            // Format with country code
            const nationalNumber = digits.slice(3);
            if (nationalNumber.length <= 3) {
                return `+237 ${nationalNumber}`;
            } else if (nationalNumber.length <= 6) {
                return `+237 ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3)}`;
            } else {
                return `+237 ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3, 6)} ${nationalNumber.slice(6)}`;
            }
        }
        // Handle without country code
        else {
            // Format as 3-3-3 pattern
            if (digits.length <= 3) {
                return digits;
            } else if (digits.length <= 6) {
                return `${digits.slice(0, 3)} ${digits.slice(3)}`;
            } else {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Apply formatting based on field type
        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        } else if (name === 'phoneNumber') {
            formattedValue = formatPhoneNumber(value);
        }

        setPaymentData({
            ...paymentData,
            [name]: formattedValue
        });

        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleFocus = (field: string) => {
        setIsFocused(field);
    };

    const handleBlur = () => {
        setIsFocused(null);
    };

    const handleHover = (field: string) => {
        setIsHovered(field);
    };

    const handleHoverEnd = () => {
        setIsHovered(null);
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string | null } = {};
        let isValid = true;

        if (paymentMethod === 'CARD') {
            if (!paymentData.cardNumber.replace(/\s/g, '')) {
                newErrors.cardNumber = t('validation.required', { ns: 'common' });
                isValid = false;
            } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = t('payment.errors.invalid_card', { ns: 'organization' });
                isValid = false;
            }

            if (!paymentData.expiryDate) {
                newErrors.expiryDate = t('validation.required', { ns: 'common' });
                isValid = false;
            } else if (paymentData.expiryDate.length < 5) {
                newErrors.expiryDate = t('validation.invalid_format', { ns: 'common' });
                isValid = false;
            }

            if (!paymentData.cvc) {
                newErrors.cvc = t('validation.required', { ns: 'common' });
                isValid = false;
            } else if (paymentData.cvc.length < 3) {
                newErrors.cvc = t('validation.min_length', { ns: 'common', length: 3 });
                isValid = false;
            }

            if (!paymentData.cardName) {
                newErrors.cardName = t('validation.required', { ns: 'common' });
                isValid = false;
            }
        } else {
            if (!paymentData.phoneNumber) {
                newErrors.phoneNumber = t('validation.required', { ns: 'common' });
                isValid = false;
            } else {
                // Get just the digits
                const phoneDigits = paymentData.phoneNumber.replace(/\D/g, '');

                // Check if it's a valid length (9 digits or 12 with country code)
                const isValidLength = phoneDigits.length === 9 ||
                    (phoneDigits.length === 12 && phoneDigits.startsWith('237'));

                if (!isValidLength) {
                    newErrors.phoneNumber = t('validation.phone', { ns: 'common' });
                    isValid = false;
                }
            }

            if (!paymentData.operatorCode) {
                newErrors.operatorCode = t('validation.required', { ns: 'common' });
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        let paymentDetails: Payment = {
            method: paymentMethod
        };

        if (paymentMethod === 'CARD') {
            // Parse expiry date
            const [expiryMonth, expiryYear] = paymentData.expiryDate.split('/');

            paymentDetails = {
                ...paymentDetails,
                cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
                expiryMonth,
                expiryYear: `20${expiryYear}`,
                cvc: paymentData.cvc,
                cardName: paymentData.cardName
            };
        } else {
            // Format phone number for submission
            let phoneNumber = paymentData.phoneNumber.replace(/\s/g, '');

            // Add country code if not present and if the number is 9 digits
            if (phoneNumber.length === 9) {
                phoneNumber = `237${phoneNumber}`;
            } else if (phoneNumber.startsWith('+')) {
                // Remove the + sign if present
                phoneNumber = phoneNumber.substring(1);
            }

            paymentDetails = {
                ...paymentDetails,
                phoneNumber,
                operatorCode: paymentData.operatorCode
            };
        }

        onSubmit(paymentDetails);
    };

    const getCardLogoUrl = (brand: string) => {
        switch(brand) {
            case 'visa':
                return '/images/visa-logo.png';
            case 'mastercard':
                return '/images/mastercard-logo.png';
            default:
                return '';
        }
    };

    const getOperatorLogo = (operator: string) => {
        switch(operator) {
            case 'orange':
                return '/images/orange-money.png';
            case 'mtn':
                return '/images/mtn-momo.png';
            default:
                return '';
        }
    };

    const cardVariants = {
        active: {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            borderColor: "rgba(var(--primary-500), 1)"
        },
        inactive: {
            scale: 1,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            borderColor: "rgba(229, 231, 235, 1)"
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto"
        >
            {/* Amount Display */}
            {amount && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mb-8 bg-gradient-to-r from-primary-600/90 to-primary-500 rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="relative p-6 text-center text-white">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm"></div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-medium mb-2">
                                {t('payment.subtitle', { ns: 'organization' })}
                            </h3>
                            <div className="text-4xl font-bold mt-2 mb-1">
                                {new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(amount)}
                            </div>
                            <div className="inline-flex items-center mt-2 bg-white/20 rounded-full px-3 py-1 text-sm">
                                <Lock className="h-3 w-3 mr-1" />
                                {t('payment.secure_payment', { ns: 'organization' })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Payment Method Selection */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    {t('payment.choose_method', { ns: 'organization' })}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <motion.button
                        type="button"
                        onClick={() => setPaymentMethod('CARD')}
                        className={`
                            relative overflow-hidden p-4 rounded-xl flex flex-col items-center justify-center
                            border-2 transition-all duration-200
                            ${paymentMethod === 'CARD'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                        `}
                        disabled={isProcessing}
                        variants={cardVariants}
                        animate={paymentMethod === 'CARD' ? 'active' : 'inactive'}
                        whileHover={{ scale: paymentMethod !== 'CARD' ? 1.02 : 1.05 }}
                    >
                        <CreditCard
                            className={`h-8 w-8 mb-2 ${paymentMethod === 'CARD'
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                        />
                        <span className={`font-medium ${paymentMethod === 'CARD'
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                            {t('payment.methods.card', { ns: 'organization' })}
                        </span>
                        {paymentMethod === 'CARD' && (
                            <div className="absolute top-2 right-2">
                                <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                            </div>
                        )}
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={() => setPaymentMethod('MOBILE')}
                        className={`
                            relative overflow-hidden p-4 rounded-xl flex flex-col items-center justify-center
                            border-2 transition-all duration-200
                            ${paymentMethod === 'MOBILE'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                        `}
                        disabled={isProcessing}
                        variants={cardVariants}
                        animate={paymentMethod === 'MOBILE' ? 'active' : 'inactive'}
                        whileHover={{ scale: paymentMethod !== 'MOBILE' ? 1.02 : 1.05 }}
                    >
                        <Smartphone
                            className={`h-8 w-8 mb-2 ${paymentMethod === 'MOBILE'
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                        />
                        <span className={`font-medium ${paymentMethod === 'MOBILE'
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                            {t('payment.methods.mobile', { ns: 'organization' })}
                        </span>
                        {paymentMethod === 'MOBILE' && (
                            <div className="absolute top-2 right-2">
                                <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                            </div>
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Payment Forms */}
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.form
                            key={paymentMethod}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {paymentMethod === 'CARD' ? (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {t('payment.card.details', { ns: 'organization' })}
                                        </h3>
                                        {cardBrand && (
                                            <Image
                                                src={getCardLogoUrl(cardBrand)}
                                                alt={cardBrand}
                                                className="h-8"
                                                width={32}
                                                height={32}
                                            />
                                        )}
                                    </div>

                                    <div className="relative">
                                        <Input
                                            label={t('payment.card.name', { ns: 'organization' })}
                                            id="cardName"
                                            name="cardName"
                                            value={paymentData.cardName}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('cardName')}
                                            onBlur={handleBlur}
                                            onMouseEnter={() => handleHover('cardName')}
                                            onMouseLeave={handleHoverEnd}
                                            error={errors.cardName || ''}
                                            disabled={isProcessing}
                                            className={{
                                                container: "",
                                                input: `transition-all duration-200 ${
                                                    isFocused === 'cardName' || isHovered === 'cardName'
                                                        ? 'border-primary-400 ring-2 ring-primary-100'
                                                        : ''
                                                }`
                                            }}
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            label={t('payment.card.number', { ns: 'organization' })}
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={paymentData.cardNumber}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('cardNumber')}
                                            onBlur={handleBlur}
                                            onMouseEnter={() => handleHover('cardNumber')}
                                            onMouseLeave={handleHoverEnd}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            error={errors.cardNumber || ''}
                                            disabled={isProcessing}
                                            className={{
                                                container: "",
                                                input: `transition-all duration-200 ${
                                                    isFocused === 'cardNumber' || isHovered === 'cardNumber'
                                                        ? 'border-primary-400 ring-2 ring-primary-100'
                                                        : ''
                                                }`
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Input
                                                label={t('payment.card.expiry', { ns: 'organization' })}
                                                id="expiryDate"
                                                name="expiryDate"
                                                value={paymentData.expiryDate}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('expiryDate')}
                                                onBlur={handleBlur}
                                                onMouseEnter={() => handleHover('expiryDate')}
                                                onMouseLeave={handleHoverEnd}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                error={errors.expiryDate || ''}
                                                disabled={isProcessing}
                                                className={{
                                                    container: "",
                                                    input: `transition-all duration-200 ${
                                                        isFocused === 'expiryDate' || isHovered === 'expiryDate'
                                                            ? 'border-primary-400 ring-2 ring-primary-100'
                                                            : ''
                                                    }`
                                                }}
                                            />
                                        </div>

                                        <div className="relative">
                                            <Input
                                                label={t('payment.card.cvc', { ns: 'organization' })}
                                                id="cvc"
                                                name="cvc"
                                                value={paymentData.cvc}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('cvc')}
                                                onBlur={handleBlur}
                                                onMouseEnter={() => handleHover('cvc')}
                                                onMouseLeave={handleHoverEnd}
                                                placeholder="123"
                                                maxLength={3}
                                                error={errors.cvc || ''}
                                                disabled={isProcessing}
                                                className={{
                                                    container: "",
                                                    input: `transition-all duration-200 ${
                                                        isFocused === 'cvc' || isHovered === 'cvc'
                                                            ? 'border-primary-400 ring-2 ring-primary-100'
                                                            : ''
                                                    }`
                                                }}
                                            />
                                            <div className="absolute right-3 top-8 cursor-help" title={t('payment.card.cvc_tooltip', { ns: 'organization' })}>
                                                <Info className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-4 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                                        <input
                                            id="saveCard"
                                            name="saveCard"
                                            type="checkbox"
                                            className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                                        />
                                        <label htmlFor="saveCard" className="ml-3 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                            {t('payment.card.save', { ns: 'organization' })}
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {t('payment.mobile.details', { ns: 'organization' })}
                                        </h3>
                                        {paymentData.operatorCode && getOperatorLogo(paymentData.operatorCode) && (
                                            <Image
                                                src={getOperatorLogo(paymentData.operatorCode)}
                                                alt={paymentData.operatorCode}
                                                className="h-8"
                                                width={32}
                                                height={32}
                                            />
                                        )}
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/50 rounded-lg p-4 mb-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                                    {t('payment.mobile.notice', { ns: 'organization' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Input
                                            label={t('payment.mobile.number', { ns: 'organization' })}
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={paymentData.phoneNumber}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('phoneNumber')}
                                            onBlur={handleBlur}
                                            onMouseEnter={() => handleHover('phoneNumber')}
                                            onMouseLeave={handleHoverEnd}
                                            placeholder="6XX XXX XXX"
                                            error={errors.phoneNumber || ''}
                                            disabled={isProcessing}
                                            className={{
                                                container: "",
                                                input: `transition-all duration-200 ${
                                                    isFocused === 'phoneNumber' || isHovered === 'phoneNumber'
                                                        ? 'border-primary-400 ring-2 ring-primary-100'
                                                        : ''
                                                }`
                                            }}
                                        />
                                        <div className="absolute right-3 top-8 text-gray-500">
                                            <span className="text-sm font-medium">+237</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="operatorCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {t('payment.mobile.operator', { ns: 'organization' })}
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="operatorCode"
                                                name="operatorCode"
                                                value={paymentData.operatorCode}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('operatorCode')}
                                                onBlur={handleBlur}
                                                onMouseEnter={() => handleHover('operatorCode')}
                                                onMouseLeave={handleHoverEnd}
                                                className={`
                                                    block w-full px-3 py-2 border rounded-md shadow-sm
                                                    ${errors.operatorCode
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
                                                }
                                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                                                    focus:outline-none text-sm transition-colors
                                                    ${isFocused === 'operatorCode' || isHovered === 'operatorCode'
                                                    ? 'border-primary-400 ring-2 ring-primary-100'
                                                    : ''
                                                }
                                                `}
                                                disabled={isProcessing}
                                            >
                                                <option value="">{t('payment.mobile.select_operator', { ns: 'organization' })}</option>
                                                <option value="orange">{t('payment.mobile.operators.orange', { ns: 'organization' })}</option>
                                                <option value="mtn">{t('payment.mobile.operators.mtn', { ns: 'organization' })}</option>
                                                <option value="other">{t('payment.mobile.operators.other', { ns: 'organization' })}</option>
                                            </select>
                                            {errors.operatorCode && (
                                                <p className="mt-1 text-sm text-red-500">{errors.operatorCode}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                            {t('payment.mobile.how_it_works', { ns: 'organization' })}
                                        </h4>
                                        <ol className="mt-2 ml-4 text-sm text-blue-700 dark:text-blue-400 list-decimal space-y-1">
                                            <li>{t('payment.mobile.step1', { ns: 'organization' })}</li>
                                            <li>{t('payment.mobile.step2', { ns: 'organization' })}</li>
                                            <li>{t('payment.mobile.step3', { ns: 'organization' })}</li>
                                        </ol>
                                    </div>
                                </>
                            )}

                            <motion.button
                                type="submit"
                                className="w-full p-4 rounded-xl flex items-center justify-center font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                disabled={isProcessing}
                                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('payment.processing', { ns: 'organization' })}
                                    </>
                                ) : (
                                    <>
                                        {t('payment.button', { ns: 'organization' })}
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </motion.button>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                    <Lock className="h-3 w-3 mr-1" />
                                    {t('payment.secure', { ns: 'organization' })}
                                </div>

                                <div className="mt-3 flex justify-center space-x-4">
                                    <Image src="/images/visa-logo.png" alt="Visa" className="h-6 opacity-50" width={32} height={32} />
                                    <Image src="/images/mastercard-logo.png" alt="Mastercard" className="h-6 opacity-50" width={32} height={32} />
                                    <Image src="/images/mtn-momo.png" alt="MTN" className="h-6 opacity-50" width={32} height={32} />
                                    <Image src="/images/orange-money.png" alt="Orange" className="h-6 opacity-50" width={32} height={32} />
                                </div>
                            </div>
                        </motion.form>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaymentForm;
