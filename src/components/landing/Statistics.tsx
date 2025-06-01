'use client'

import StatCard from "@/components/statistics/StatCard";
import {useTranslation} from "react-i18next";

const Statistics = () => {
	const { t } = useTranslation('common');

	const stats = [
		{
			value: Number(t('components.landing.statistics.stats.vehicles.value')),
			suffix: t('components.landing.statistics.stats.vehicles.suffix'),
			label: t('components.landing.statistics.stats.vehicles.label')
		},
		{
			value: Number(t('components.landing.statistics.stats.agencies.value')),
			suffix: t('components.landing.statistics.stats.agencies.suffix'),
			label: t('components.landing.statistics.stats.agencies.label')
		},
		{
			value: Number(t('components.landing.statistics.stats.clients.value')),
			suffix: t('components.landing.statistics.stats.clients.suffix'),
			label: t('components.landing.statistics.stats.clients.label')
		},
		{
			value: Number(t('components.landing.statistics.stats.rating.value')),
			suffix: t('components.landing.statistics.stats.rating.suffix'),
			label: t('components.landing.statistics.stats.rating.label')
		}
	];

	return (
		<div className="bg-background-whitish dark:bg-background-darkish">
			<div className="text-center mt-8">
				<h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">
					{t('components.landing.statistics.title')}
				</h2>
				<p className="text-lg text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					{t('components.landing.statistics.subtitle')}
				</p>
			</div>

			<div className="py-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<div key={index}>
							<StatCard value={stat.value} label={stat.label} suffix={stat.suffix} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Statistics;
