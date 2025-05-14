'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import Section from '@/components/layout/Section';

const Organization = () => {
	return (
		<Section className="bg-gradient-to-r from-primary-800 to-primary-900 text-white">
			<div className="flex flex-col md:flex-row items-center justify-between gap-10">
				<div className="w-full md:w-1/2 mb-10 md:mb-0">
					<h2 className="text-3xl font-bold mb-4">Become a Partner Organization</h2>
					<p className="text-gray-200 mb-6">
						List your fleet on our platform and reach thousands of potential customers every day. Our streamlined system makes managing rentals simple and profitable.
					</p>
					<ul className="space-y-3 mb-8">
						{[
							"Expand your customer base",
							"Flexible commission structure",
							"Real-time booking management",
							"Dedicated support team"
						].map((feature, index) => (
							<li key={index} className="flex items-center gap-2">
								<FaCheck className="text-primary-300" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 bg-white text-primary-800 font-semibold rounded-full shadow-md transition-all duration-300"
					>
						Register as Organization
					</motion.button>
				</div>
				<div className="w-full md:w-1/2 flex justify-center">
					<div className="relative w-full h-[400px] md:h-[500px]">
						<Image
							src="/organization-fleet.jpg"
							alt="Organization Fleet"
							fill
							style={{objectFit: "cover"}}
							className="rounded-3xl shadow-2xl"
						/>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="absolute -bottom-5 -right-5 md:bottom-10 md:-right-10 bg-white dark:bg-background-dark p-6 rounded-3xl shadow-2xl max-w-xs"
						>
							<h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">Join 500+ Organizations</h3>
							<p className="text-text-secondary dark:text-gray-400 text-sm">
								&ldquo;Partnering with Easy-Rent increased our bookings by 60% in the first quarter!&rdquo;
							</p>
							<div className="mt-3 flex items-center gap-2">
								<div className="w-10 h-10 rounded-full bg-gray-200"></div>
								<div>
									<p className="text-text-primary dark:text-white font-medium text-sm">John Smith</p>
									<p className="text-text-secondary dark:text-gray-400 text-xs">CEO, Premium Rides</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Organization;
