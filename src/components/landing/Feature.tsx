'use client'

import {motion, UseInViewOptions} from 'framer-motion';
import {ReactElement, useRef} from 'react';
import { useInView } from 'framer-motion';
import Section from '@/components/layout/Section';
import { FaCar, FaShieldAlt, FaHeadset, FaMobileAlt } from 'react-icons/fa';
import React from 'react';

const FeatureCard = ({ icon, title, description }:{ icon: ReactElement, title: string, description: string}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(ref, { once: true, threshold: 0.2 }  as UseInViewOptions);

	return (
		<motion.div
			ref={ref}
			className="bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light dark:border-border-dark"
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
				{React.cloneElement(icon, { className: "text-primary-600 dark:text-primary-400 text-3xl" })}
			</div>
			<h3 className="text-xl font-bold mb-3 text-text-primary dark:text-text-dark">{title}</h3>
			<p className="text-text-light-secondary dark:text-text-dark-secondary">{description}</p>
		</motion.div>
	);
};

const Features = () => {
	return (
		<Section className="bg-surface-light dark:bg-surface-dark">
			<div className="text-center mb-16">
				<motion.h2
					className="text-3xl md:text-4xl font-bold mb-4 text-text-primary dark:text-text-dark"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Pourquoi Choisir Easy Rental ?
				</motion.h2>
				<motion.p
					className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					La plateforme leader pour la location de véhicules au Cameroun
				</motion.p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<FeatureCard
					icon={<FaCar />}
					title="Large Sélection de Véhicules"
					description="Choisissez parmi notre vaste flotte de véhicules bien entretenus"
				/>
				<FeatureCard
					icon={<FaShieldAlt />}
					title="100% Sécurisé"
					description="Toutes les transactions sont protégées avec des protocoles de sécurité avancés"
				/>
				<FeatureCard
					icon={<FaHeadset />}
					title="Support 24/7"
					description="Notre équipe est disponible 24h/24 pour vous assister"
				/>
				<FeatureCard
					icon={<FaMobileAlt />}
					title="Application Mobile"
					description="Accédez à Easy Rental sur tout appareil, n'importe où, n'importe quand"
				/>
			</div>
		</Section>
	);
};

export default Features;
