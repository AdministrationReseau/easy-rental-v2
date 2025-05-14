'use client';

import { motion } from 'framer-motion';
import { FaUser, FaCar, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';
import Section from '@/components/layout/Section';
import CountUp from '@/components/animations/CountUp';
import { useTranslation } from 'react-i18next';

const Statistics = () => {
	const { t } = useTranslation('components');

	const stats = [
		{
			value: t('landing.statistics.stats.happyCustomers.value'),
			suffix: t('landing.statistics.stats.happyCustomers.suffix'),
			label: t('landing.statistics.stats.happyCustomers.label'),
			icon: <FaUser className="text-primary text-4xl" />
		},
		{
			value: t('landing.statistics.stats.premiumVehicles.value'),
			suffix: t('landing.statistics.stats.premiumVehicles.suffix'),
			label: t('landing.statistics.stats.premiumVehicles.label'),
			icon: <FaCar className="text-primary text-4xl" />
		},
		{
			value: t('landing.statistics.stats.partnerAgencies.value'),
			suffix: t('landing.statistics.stats.partnerAgencies.suffix'),
			label: t('landing.statistics.stats.partnerAgencies.label'),
			icon: <FaBuilding className="text-primary text-4xl" />
		},
		{
			value: t('landing.statistics.stats.earningsGenerated.value'),
			suffix: t('landing.statistics.stats.earningsGenerated.suffix'),
			prefix: t('landing.statistics.stats.earningsGenerated.prefix'),
			label: t('landing.statistics.stats.earningsGenerated.label'),
			icon: <FaMoneyBillWave className="text-primary text-4xl" />
		}
	];

	return (
		<Section className="bg-background-whitish dark:bg-background-blue">
			<div className="text-center mb-16">
				<h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">
					{t('landing.statistics.title')}
				</h2>
				<p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					{t('landing.statistics.subtitle')}
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
				{stats.map((stat, index) => (
					<motion.div
						key={index}
						whileHover={{ y: -10 }}
						className="text-center bg-white dark:bg-background-dark p-6 rounded-3xl shadow-lg"
					>
						<div className="flex justify-center mb-4">{stat.icon}</div>
						<h3 className="text-3xl font-bold text-text-primary dark:text-white mb-2">
							{stat.prefix}
							<CountUp end={parseInt(stat.value, 10)} />
							{stat.suffix}
						</h3>
						<p className="text-text-secondary dark:text-gray-400">{stat.label}</p>
					</motion.div>
				))}
			</div>
		</Section>
	);
};

export default Statistics;