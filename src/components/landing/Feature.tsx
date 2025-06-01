'use client'

import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import { FaCar, FaShieldAlt, FaHeadset, FaMobileAlt } from 'react-icons/fa';
import React from 'react';
import FeatureCard from "@/components/cards/FeatureCard";
import { useTranslation } from 'react-i18next';

const Features = () => {
	const { t } = useTranslation('common');

	return (
		<Section className="bg-background-whitish dark:text-text-dark dark:bg-background-darkish">
			<div className="text-center mb-16">
				<motion.h2
					className="text-3xl font-bold"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{t('components.landing.features.title')}
				</motion.h2>
				<motion.p
					className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{t('components.landing.features.subtitle')}
				</motion.p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<FeatureCard
					icon={<FaCar />}
					title={t('components.landing.features.cards.vehicles.title')}
					description={t('components.landing.features.cards.vehicles.description')}
				/>
				<FeatureCard
					icon={<FaShieldAlt />}
					title={t('components.landing.features.cards.security.title')}
					description={t('components.landing.features.cards.security.description')}
				/>
				<FeatureCard
					icon={<FaHeadset />}
					title={t('components.landing.features.cards.support.title')}
					description={t('components.landing.features.cards.support.description')}
				/>
				<FeatureCard
					icon={<FaMobileAlt />}
					title={t('components.landing.features.cards.mobile.title')}
					description={t('components.landing.features.cards.mobile.description')}
				/>
			</div>
		</Section>
	);
};

export default Features;