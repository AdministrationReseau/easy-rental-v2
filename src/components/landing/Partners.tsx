'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '../layout/Section';
import { useTranslation } from 'next-i18next';
import {Partner} from "@/types/models/partner";

const Partners = () => {
	const { t } = useTranslation('common');

	// Safely parse the partners list
	const partners = t('components.landing.partners.partnersList', { returnObjects: true }) as unknown;

	const partnersList: Partner[] = Array.isArray(partners) ? partners as Partner[] : [];

	return (
		<Section>
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">
					{t('components.landing.partners.title')}
				</h2>
				<p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					{t('components.landing.partners.subtitle')}
				</p>
			</div>
			<div className="flex flex-wrap justify-center gap-8 md:gap-16">
				{partnersList.map((partner) => (
					<motion.div
						key={partner.name}
						whileHover={{ scale: 1.1 }}
						className="rounded-lg w-80 flex flex-col items-center justify-center dark:bg-white"
					>
						<Image
							src={partner.logo}
							alt={partner.name}
							width={120}
							height={120}
							className="object-contain"
						/>
						<span className="text-gray-500 dark:text-gray-400 font-semibold mt-2">{partner.name}</span>
					</motion.div>
				))}
			</div>
		</Section>
	);
};

export default Partners;
