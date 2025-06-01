'use client'

import {motion} from 'framer-motion';
import Section from '@/components/layout/Section';
import { useTranslation } from 'react-i18next';
import ServiceCard from "@/components/cards/ServiceCard";


const Services = () => {
	const { t } = useTranslation('common');

	// Récupérer les fonctionnalités traduites
	const clientFeatures = t('components.landing.services.client.features', { returnObjects: true }) as string[];
	const agencyFeatures = t('components.landing.services.agency.features', { returnObjects: true }) as string[];

	return (
		<Section className="bg-background-light dark:bg-background-dark items-center">
			<div className="text-center mb-16">
				<motion.h2
					className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{t('components.landing.services.title')}
				</motion.h2>
				<motion.p
					className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{t('components.landing.services.subtitle')}
				</motion.p>
			</div>

			<ServiceCard
				title={t('components.landing.services.client.title')}
				description={t('components.landing.services.client.description')}
				features={clientFeatures}
				cta={t('components.landing.services.client.cta')}
				image={t('components.landing.services.client.image')}
				isReversed={false}
			/>

			<hr className="mx-auto mb-24 border-t w-[40%] border-text-primary dark:border-text-dark-secondary" />

			<ServiceCard
				title={t('components.landing.services.agency.title')}
				description={t('components.landing.services.agency.description')}
				features={agencyFeatures}
				cta={t('components.landing.services.agency.cta')}
				image={t('components.landing.services.agency.image')}
				isReversed={false}
			/>
		</Section>
	);
};

export default Services;