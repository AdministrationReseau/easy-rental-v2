"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import PaymentForm from '@/components/payment/PaymentForm';
import { Payment } from '@/types/models/payment';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, HelpCircle, AlertCircle } from 'lucide-react';

interface OrganizationFormData {
    // Step 1: Personal Information
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    // Step 2: Organization Information
    organizationName: string;
    organizationEmail: string;
    organizationPhone: string;
    organizationAddress: string;
    organizationCity: string;
    organizationCountry: string;
    organizationDescription: string;
    businessActorId: string;
}

interface StepInfo {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function OrganizationRegister() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedPlan = searchParams?.get('plan') || 'basic-monthly';
    const { register } = useAuth();
    const { t } = useTranslation('organization');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<OrganizationFormData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        organizationName: '',
        organizationEmail: '',
        organizationPhone: '',
        organizationAddress: '',
        organizationCity: '',
        organizationCountry: 'Cameroon',
        organizationDescription: '',
        businessActorId: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const [completed, setCompleted] = useState<number[]>([]);

    // Update completed steps
    useEffect(() => {
        if (currentStep > 1 && !completed.includes(currentStep - 1)) {
            setCompleted([...completed, currentStep - 1]);
        }
    }, [currentStep, completed]);

    const steps: StepInfo[] = [
        {
            number: 1,
            title: t('register.steps.personal'),
            description: t('register.steps.personal_description'),
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        },
        {
            number: 2,
            title: t('register.steps.organization'),
            description: t('register.steps.organization_description'),
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        },
        {
            number: 3,
            title: t('register.steps.payment'),
            description: t('register.steps.payment_description'),
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        },
        {
            number: 4,
            title: t('register.steps.confirmation'),
            description: t('register.steps.confirmation_description'),
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        }
    ];

    const handleNext = () => {
        setError(null);
        if (currentStep === 1) {
            // Validate personal information
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.username) {
                setError(t('register.errors.required_fields'));
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError(t('register.errors.password_mismatch'));
                return;
            }
            if (formData.password.length < 6) {
                setError(t('register.errors.password_length'));
                return;
            }
        }
        if (currentStep === 2) {
            // Validate organization information
            if (!formData.organizationName || !formData.organizationEmail || !formData.businessActorId) {
                setError(t('register.errors.required_organization_fields'));
                return;
            }
        }
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showTooltip = (text: string) => {
        setTooltip(text);
    };

    const hideTooltip = () => {
        setTooltip(null);
    };

    const handlePaymentSubmit = async (paymentDetails: Payment) => {
        setIsProcessing(true);
        setError(null);
        try {
            // Process payment
            const paymentResponse = await fetch('/api/payment/process-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    api_key: process.env.NEXT_PUBLIC_PAYMENT_API_KEY,
                    transaction_amount: getPlanPrice(selectedPlan),
                    transaction_currency: process.env.NEXT_PUBLIC_PAYMENT_CURRENCY || 'XAF',
                    transaction_method: paymentDetails.method,
                    transaction_reference: `ORG-${Date.now()}`,
                    payer_reference: `REF-${Date.now()}`,
                    payer_name: `${formData.firstName} ${formData.lastName}`,
                    payer_phone_number: paymentDetails.phoneNumber || formData.phoneNumber,
                    payer_lang: 'french',
                    payer_email: formData.email,
                    service_reference: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_REF || '7c85bea3',
                    service_name: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_NAME || 'Subscription',
                    service_description: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_DESC || 'Organization Subscription',
                    service_quantity: 1,
                    ...paymentDetails
                }),
            });
            if (!paymentResponse.ok) {
                throw new Error('Payment processing failed');
            }
            const paymentData = await paymentResponse.json();
            // Register user and organization
            const fullName = `${formData.firstName} ${formData.lastName}`;
            await register(fullName, formData.email, formData.password, 'admin', formData.username, formData.phoneNumber);
            // Save organization data
            localStorage.setItem('organization-data', JSON.stringify({
                ...formData,
                planId: selectedPlan,
                transactionId: paymentData.transactionId
            }));
            // Go to confirmation step
            setCurrentStep(4);
            setCompleted([...completed, 3]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du paiement');
        } finally {
            setIsProcessing(false);
        }
    };

    const getPlanPrice = (planId: string): number => {
        const prices: Record<string, number> = {
            'basic-monthly': 49000,
            'pro-monthly': 99000,
            'enterprise-monthly': 199000
        };
        return prices[planId] || 49000;
    };

    const getPlanName = (planId: string): string => {
        const names: Record<string, string> = {
            'basic-monthly': t('register.plans.basic'),
            'pro-monthly': t('register.plans.pro'),
            'enterprise-monthly': t('register.plans.enterprise')
        };
        return names[planId] || t('register.plans.basic');
    };

    const finishRegistration = () => {
        // Redirect to organization dashboard
        router.push('/organization');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head>
                <title>{t('register.title')} | Easy Rental</title>
            </Head>

            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-800 dark:to-primary-600">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-white">{t('register.title')}</h1>
                        <p className="mt-2 text-sm md:text-base text-primary-100">{t('register.subtitle')}</p>
                    </div>

                    {/* Selected Plan Badge */}
                    <div className="mt-4 flex justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center space-x-2">
                            <span className="text-white font-medium">{t('register.selected_plan_label')}:</span>
                            <span className="bg-primary-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {getPlanName(selectedPlan)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Steps Indicator */}
                <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative z-10">
                    <div className="hidden md:flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center w-full">
                                <div className={`flex flex-col items-center ${index === 0 ? 'flex-1' : ''}`}>
                                    <div
                                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg relative z-10
                                        ${completed.includes(step.number)
                                            ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-400 dark:text-green-400'
                                            : currentStep === step.number
                                                ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/50 dark:border-primary-400 dark:text-primary-400'
                                                : 'bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                                        {completed.includes(step.number) ? <Check className="w-6 h-6" /> : step.number}
                                    </div>
                                    <span className={`mt-2 text-sm font-medium ${currentStep === step.number ? 'text-primary-700 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>

                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-1 flex-1 mx-2 rounded-full ${
                                            completed.includes(step.number) ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile stepper */}
                    <div className="flex md:hidden justify-between items-center">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('register.step')} {currentStep} {t('register.of')} {steps.length}
                        </div>
                        <div className="flex space-x-1">
                            {steps.map((step) => (
                                <div
                                    key={step.number}
                                    className={`h-2 w-10 rounded-full transition-colors duration-300 ${
                                        completed.includes(step.number)
                                            ? 'bg-green-500 dark:bg-green-600'
                                            : currentStep === step.number
                                                ? 'bg-primary-500 dark:bg-primary-600'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start"
                    >
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">{t('register.errors.title')}</h3>
                            <p className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Step Content Card */}
                <Card className="bg-white dark:bg-gray-800 shadow-md border-0 overflow-hidden">
                    <CardContent className="p-0">
                        {/* Step Header */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 p-6">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4 flex-shrink-0">
                                    {steps[currentStep - 1].icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {steps[currentStep - 1].title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {steps[currentStep - 1].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Steps */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Personal Information */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label={t('register.fields.first_name')}
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <Input
                                                label={t('register.fields.last_name')}
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                        </div>

                                        <div className="relative">
                                            <Input
                                                label={t('register.fields.username')}
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
                                                onMouseEnter={() => showTooltip(t('register.tooltips.username'))}
                                                onMouseLeave={hideTooltip}
                                            >
                                                <HelpCircle className="h-4 w-4" />
                                            </button>
                                            {tooltip === t('register.tooltips.username') && (
                                                <div className="absolute right-0 mt-1 z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg">
                                                    {t('register.tooltips.username')}
                                                </div>
                                            )}
                                        </div>

                                        <Input
                                            label={t('register.fields.email')}
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className={{
                                                container: "relative",
                                                input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                            }}
                                        />

                                        <div className="relative">
                                            <Input
                                                label={t('register.fields.phone')}
                                                name="phoneNumber"
                                                type="tel"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="e.g. +237 6XX XXX XXX"
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
                                                onMouseEnter={() => showTooltip(t('register.tooltips.phone'))}
                                                onMouseLeave={hideTooltip}
                                            >
                                                <HelpCircle className="h-4 w-4" />
                                            </button>
                                            {tooltip === t('register.tooltips.phone') && (
                                                <div className="absolute right-0 mt-1 z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg">
                                                    {t('register.tooltips.phone')}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <Input
                                                    label={t('register.fields.password')}
                                                    name="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={{
                                                        container: "relative",
                                                        input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
                                                    onMouseEnter={() => showTooltip(t('register.tooltips.password'))}
                                                    onMouseLeave={hideTooltip}
                                                >
                                                    <HelpCircle className="h-4 w-4" />
                                                </button>
                                                {tooltip === t('register.tooltips.password') && (
                                                    <div className="absolute right-0 mt-1 z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg">
                                                        {t('register.tooltips.password')}
                                                    </div>
                                                )}
                                            </div>
                                            <Input
                                                label={t('register.fields.confirm_password')}
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                        </div>

                                        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                {t('register.note.title')}
                                            </h4>
                                            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                                                {t('register.note.content')}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Organization Information */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="relative">
                                            <Input
                                                label={t('register.fields.org_name')}
                                                name="organizationName"
                                                value={formData.organizationName}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
                                                onMouseEnter={() => showTooltip(t('register.tooltips.org_name'))}
                                                onMouseLeave={hideTooltip}
                                            >
                                                <HelpCircle className="h-4 w-4" />
                                            </button>
                                            {tooltip === t('register.tooltips.org_name') && (
                                                <div className="absolute right-0 mt-1 z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg">
                                                    {t('register.tooltips.org_name')}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label={t('register.fields.org_email')}
                                                name="organizationEmail"
                                                type="email"
                                                value={formData.organizationEmail}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <Input
                                                label={t('register.fields.org_phone')}
                                                name="organizationPhone"
                                                type="tel"
                                                value={formData.organizationPhone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="e.g. +237 6XX XXX XXX"
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <Input
                                                    label={t('register.fields.org_address')}
                                                    name="organizationAddress"
                                                    value={formData.organizationAddress}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={{
                                                        container: "relative",
                                                        input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                    }}
                                                />
                                            </div>
                                            <Input
                                                label={t('register.fields.org_city')}
                                                name="organizationCity"
                                                value={formData.organizationCity}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <Input
                                                label={t('register.fields.org_country')}
                                                name="organizationCountry"
                                                value={formData.organizationCountry}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                        </div>

                                        <div className="relative">
                                            <Input
                                                label={t('register.fields.business_actor_id')}
                                                name="businessActorId"
                                                value={formData.businessActorId}
                                                onChange={handleInputChange}
                                                required
                                                className={{
                                                    container: "relative",
                                                    input: "bg-white dark:bg-gray-900 transition-all focus:border-primary-500"
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
                                                onMouseEnter={() => showTooltip(t('register.tooltips.business_actor_id'))}
                                                onMouseLeave={hideTooltip}
                                            >
                                                <HelpCircle className="h-4 w-4" />
                                            </button>
                                            {tooltip === t('register.tooltips.business_actor_id') && (
                                                <div className="absolute right-0 mt-1 z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg">
                                                    {t('register.tooltips.business_actor_id')}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {t('register.fields.org_description')}
                                            </label>
                                            <textarea
                                                name="organizationDescription"
                                                value={formData.organizationDescription}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                                            />
                                        </div>

                                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                                            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {t('register.important.title')}
                                            </h4>
                                            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                                {t('register.important.content')}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Payment */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {getPlanName(selectedPlan)}
                                                    </h3>
                                                    <div className="mt-1 flex items-baseline">
                                                        <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
                                                            {new Intl.NumberFormat('fr-FR').format(getPlanPrice(selectedPlan))}
                                                        </span>
                                                        <span className="ml-1 text-lg text-gray-500 dark:text-gray-400">XAF</span>
                                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">/ {t('register.per_month')}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 md:mt-0">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {t('register.plans.includes_free_trial')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                                    {t('register.payment_methods')}
                                                </h3>
                                                <PaymentForm
                                                    onSubmit={handlePaymentSubmit}
                                                    isProcessing={isProcessing}
                                                    amount={getPlanPrice(selectedPlan)}
                                                />
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {t('register.payment_note')}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Confirmation */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-8 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                                            className="w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>

                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            {t('register.success.title')}
                                        </h2>

                                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                                            {t('register.success.message')}
                                        </p>

                                        <div className="bg-gray-50 dark:bg-gray-800/80 rounded-lg p-6 max-w-lg mx-auto mb-8 border border-gray-200 dark:border-gray-700">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-left">
                                                {t('register.success.details')}
                                            </h3>
                                            <div className="space-y-3 text-left">
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-gray-600 dark:text-gray-400">{t('register.fields.org_name')}</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{formData.organizationName}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-gray-600 dark:text-gray-400">{t('register.fields.email')}</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-gray-600 dark:text-gray-400">{t('register.selected_plan')}</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{getPlanName(selectedPlan)}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-600 dark:text-gray-400">{t('register.subscription_status')}</span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                                                        {t('register.subscription_active')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-lg mx-auto mb-8 border border-blue-100 dark:border-blue-800">
                                            <p className="text-blue-700 dark:text-blue-300 flex items-start">
                                                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                {t('register.success.email_note')}
                                            </p>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={finishRegistration}
                                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                        >
                                            {t('register.success.goto_dashboard')}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        {currentStep < 4 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                                {currentStep > 1 ? (
                                    <Button
                                        onClick={handleBack}
                                        variant="outline"
                                        disabled={isProcessing}
                                        className="text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                                    >
                                        {t('register.navigation.back')}
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < 3 && (
                                    <Button
                                        onClick={handleNext}
                                        className="bg-primary-600 hover:bg-primary-700 text-white px-6"
                                    >
                                        {t('register.navigation.next')}
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
