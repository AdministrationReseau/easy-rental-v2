'use client'

import { motion } from 'framer-motion';
import Section from '../layout/Section';

const CTA = () => {
	return (
		<Section className="bg-gradient-to-r from-primary-600 to-primary" >
			<div className="text-center text-white max-w-3xl mx-auto">
				<h2 className="text-3xl font-bold mb-6">Ready to Experience Luxury on Wheels?</h2>
				<p className="text-gray-100 mb-8">
					Join thousands of satisfied customers who choose our platform for premium car rentals. Whether it&lsquo;s for a special occasion or business needs, we have the perfect vehicle for you.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-md transition-all duration-300"
					>
						Rent Now
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-md transition-all duration-300"
					>
						Explore Vehicles
					</motion.button>
				</div>
			</div>
		</Section>
	);
};

export default CTA;
