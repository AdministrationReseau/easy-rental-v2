"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Types for our application
type Plan = {
    id: string;
    name: string;
    price: number;
    features: string[];
    billingCycle: 'monthly' | 'yearly';
    isPopular?: boolean;
};

const plans: Plan[] = [
    {
        id: 'basic-monthly',
        name: 'Basique',
        price: 49000,
        features: [
            'Accès à 5 véhicules',
            'Support par email',
            'Tableau de bord basique',
            'Gestion des réservations'
        ],
        billingCycle: 'monthly',
    },
    {
        id: 'pro-monthly',
        name: 'Professionnel',
        price: 99000,
        features: [
            'Accès à 20 véhicules',
            'Support prioritaire',
            'Tableau de bord avancé',
            'Gestion complète des flottes',
            'Accès API',
            'Rapports détaillés'
        ],
        billingCycle: 'monthly',
        isPopular: true,
    },
    {
        id: 'enterprise-monthly',
        name: 'Entreprise',
        price: 199000,
        features: [
            'Véhicules illimités',
            'Support dédié 24/7',
            'Toutes les fonctionnalités',
            'Personnalisation avancée',
            'Intégration personnalisée',
            'Formation dédiée'
        ],
        billingCycle: 'monthly',
    },
];

export default function SubscriptionPage() {
    const router = useRouter();
    const { t } = useTranslation('organization');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    // Handle plan selection
    const handlePlanSelect = (plan: Plan) => {
        // Redirect to register page with selected plan
        router.push(`/organization/register?plan=${plan.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head>
                <title>{t('subscription.title')} | Easy Rental</title>
            </Head>

            {/* Hero Section with Gradient Background */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 py-16">
                <div className="absolute inset-0">
                    <svg
                        className="absolute left-0 top-0 h-full w-full text-white/10 transform -translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('subscription.choose_plan')}
                    </motion.h1>
                    <motion.p
                        className="text-xl text-white/80 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {t('subscription.select_plan_description')}
                    </motion.p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 -mt-8">
                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md inline-flex items-center">
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                billingCycle === 'monthly'
                                    ? 'bg-primary-500 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            {t('subscription.billing.monthly')}
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                billingCycle === 'yearly'
                                    ? 'bg-primary-500 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setBillingCycle('yearly')}
                        >
                            {t('subscription.billing.yearly')}
                            <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                -20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Plans Section */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            className={`
                                relative overflow-hidden rounded-2xl shadow-lg
                                ${plan.isPopular
                                ? 'border-2 border-primary-500 ring-4 ring-primary-500/20 bg-white dark:bg-gray-800 transform scale-105 md:scale-110 z-10'
                                : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                            }
                            `}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: plan.isPopular ? 0.1 : 0.2 }}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-primary-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg transform rotate-45 origin-top-right shadow-md">
                                    {t('subscription.popular')}
                                </div>
                            )}

                            <div className="p-6 sm:p-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {plan.name}
                                </h3>
                                <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                                        {new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(
                                            billingCycle === 'yearly' ? plan.price * 0.8 * 12 : plan.price
                                        )}
                                    </span>
                                    <span className="ml-1 text-2xl font-medium text-gray-500 dark:text-gray-400">
                                        XAF
                                    </span>
                                    <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        /{billingCycle === 'yearly' ? t('subscription.per_year') : t('subscription.per_month')}
                                    </span>
                                </div>

                                <p className="mt-2 text-gray-500 dark:text-gray-400 min-h-[40px]">
                                    {plan.isPopular
                                        ? t('subscription.pro_description')
                                        : plan.id === 'basic-monthly'
                                            ? t('subscription.basic_description')
                                            : t('subscription.enterprise_description')
                                    }
                                </p>

                                <button
                                    onClick={() => handlePlanSelect(plan)}
                                    className={`
                                        mt-6 w-full py-3 px-4 rounded-lg text-center font-medium transition-all
                                        ${plan.isPopular
                                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
                                        : 'bg-white hover:bg-gray-50 text-primary-500 border border-primary-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-primary-400 dark:text-primary-400'
                                    }
                                    `}
                                >
                                    {plan.isPopular ? t('subscription.get_started') : t('subscription.select_plan')}
                                </button>

                                <div className="mt-8">
                                    <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                                        {t('subscription.features_included')}
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className={`flex-shrink-0 ${plan.isPopular ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    <Check className="h-5 w-5" />
                                                </div>
                                                <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                                    {feature}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features & Benefits Section */}
                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('subscription.why_choose')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t('subscription.why_choose_description')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: "🛡️",
                                title: t('subscription.advantages.secure'),
                                description: t('subscription.advantages.secure_description')
                            },
                            {
                                icon: "⚡",
                                title: t('subscription.advantages.fast'),
                                description: t('subscription.advantages.fast_description')
                            },
                            {
                                icon: "🔧",
                                title: t('subscription.advantages.support'),
                                description: t('subscription.advantages.support_description')
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-5 text-4xl">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        {t('subscription.faq.title')}
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                                    <details className="group">
                                        <summary className="cursor-pointer flex items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                                            {t(`subscription.faq.q${i}`)}
                                            <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-6 pb-6 pt-0">
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {t(`subscription.faq.a${i}`)}
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 bg-primary-500 rounded-2xl overflow-hidden shadow-xl">
                    <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-16 text-center">
                        <h2 className="text-3xl font-extrabold text-white mb-4">
                            {t('subscription.ready_to_start')}
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                            {t('subscription.ready_to_start_description')}
                        </p>
                        <div className="inline-flex items-center rounded-full shadow-lg bg-white text-primary-500 px-2 py-2 font-medium">
                            <button
                                onClick={() => handlePlanSelect(plans.find(p => p.isPopular) || plans[1])}
                                className="px-6 py-2 bg-primary-500 text-white rounded-full"
                            >
                                {t('subscription.start_free_trial')}
                            </button>
                            <span className="px-4">{t('subscription.or')}</span>
                            <button
                                onClick={() => document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-6 py-2"
                            >
                                {t('subscription.learn_more')}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
