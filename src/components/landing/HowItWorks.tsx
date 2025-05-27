'use client'

import { motion } from 'framer-motion';
import { BsSearch, BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Section from '../layout/Section';

const HowItWorks = () => {
	const { t } = useTranslation('components');
	
	// Définir les étapes avec leurs icônes
	const steps = [
		{
			icon: <BsSearch className="text-4xl text-primary" />,
			title: t('landing.howItWorks.steps.step1.title'),
			description: t('landing.howItWorks.steps.step1.description')
		},
		{
			icon: <BsFillCalendarCheckFill className="text-4xl text-primary" />,
			title: t('landing.howItWorks.steps.step2.title'),
			description: t('landing.howItWorks.steps.step2.description')
		},
		{
			icon: <FaCar className="text-4xl text-primary" />,
			title: t('landing.howItWorks.steps.step3.title'),
			description: t('landing.howItWorks.steps.step3.description')
		},
	];

	return (
		<Section className="bg-background-whitish dark:bg-background-darkish">
			<div className="text-center mb-16">
				<h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">
					{t('landing.howItWorks.title')}
				</h2>
				<p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					{t('landing.howItWorks.subtitle')}
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{steps.map((step, index) => (
					<motion.div
						key={index}
						whileHover={{ y: -10 }}
						className="bg-white dark:bg-background-blue p-8 rounded-3xl shadow-lg text-center"
					>
						<div className="flex justify-center mb-4">
							{step.icon}
						</div>
						<h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3">{step.title}</h3>
						<p className="text-text-secondary dark:text-gray-400">{step.description}</p>
					</motion.div>
				))}
			</div>
		</Section>
	);
};

export default HowItWorks;
