'use client'

import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import { useTranslation } from 'react-i18next';

const Earning = () => {
	const { t } = useTranslation('common');
	const steps = t('components.landing.earning.steps', { returnObjects: true }) as Array<{ title: string, desc: string }>;

	return (
		<Section className="bg-primary bg-opacity-10 dark:bg-opacity-20">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold text-primary mb-4">{t('components.landing.earning.title')}</h2>
				<p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					{t('components.landing.earning.subtitle')}
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				{steps.map((item, index) => (
					<motion.div
						key={index}
						whileHover={{ y: -10 }}
						className="relative bg-white dark:bg-background-dark p-8 rounded-3xl shadow-lg"
					>
						<div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
							{index + 1}
						</div>
						<h3 className="text-xl font-semibold text-text-primary dark:text-white mt-4 mb-3">{item.title}</h3>
						<p className="text-text-secondary dark:text-gray-400">{item.desc}</p>
					</motion.div>
				))}
			</div>
		</Section>
	);
};

export default Earning;