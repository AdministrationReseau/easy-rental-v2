'use client'

import { motion } from 'framer-motion';
import Section from '../layout/Section';

const Team = () => {
	return (
		<Section>
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">Trusted By Industry Leaders</h2>
				<p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					We partner with the best to deliver exceptional service
				</p>
			</div>
			<div className="flex flex-wrap justify-center gap-8 md:gap-16">
				{[1, 2, 3, 4, 5, 6].map((partner) => (
					<motion.div
						key={partner}
						whileHover={{ scale: 1.1 }}
						className="h-16 w-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center"
					>
						<span className="text-gray-500 dark:text-gray-400 font-semibold">Partner {partner}</span>
					</motion.div>
				))}
			</div>
		</Section>
	);
};

export default Team;
