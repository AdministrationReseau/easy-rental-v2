'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCar } from 'react-icons/fa';
import Section from '@/components/layout/Section';

const Services = () => {
	return (
		<Section>
			<div className="text-center mb-16">
				<h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">Our Services</h2>
				<p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
					Premium transportation solutions for luxury, comfort, and efficiency
				</p>
			</div>
			<div className="max-w-6xl mx-auto space-y-12">
				{[
					{
						title: "Car Rental Services",
						description: "Luxury, premium sedan, and SUV rentals for business and leisure",
						image: "/assets/luxury-car.png",
						color: "bg-primary"
					},
					{
						title: "Chauffeur Services",
						description: "Professional drivers for a personalized and comfortable experience",
						image: "/assets/chauffeur.png",
						color: "bg-text-green"
					},
					{
						title: "Transportation Fleet Management",
						description: "Streamlined management of fleets, including vehicle maintenance, driver supervision, and agency operations",
						image: "/organisation-gestion.jpg",
						color: "bg-text-orange"
					},
					{
						title: "Operational Excellence",
						description: "Expert management solutions to optimize your transportation operations, improve efficiency, and drive business growth",
						image: "/organisation-management.jpg",
						color: "bg-text-blue"
					}
				].map((service, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.7 }}
						className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 rounded-3xl overflow-hidden`}
					>
						<div className="w-full md:w-1/2 h-[300px] relative align-middle rounded-3xl overflow-hidden">
							<Image
								src={service.image}
								alt={service.title}
								fill
								style={{ objectFit: "contain" }}
								className="rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-110"
							/>
						</div>
						<div className="w-full md:w-1/2 p-6">
							<div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4`}>
								<FaCar className="text-3xl text-white" />
							</div>
							<h3 className="text-2xl font-semibold text-text-primary dark:text-white mb-3">{service.title}</h3>
							<p className="text-text-secondary dark:text-gray-400">{service.description}</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="mt-6 px-6 py-3 bg-primary text-white font-medium rounded-full shadow-md transition-all duration-300"
							>
								Learn More
							</motion.button>
						</div>
					</motion.div>
				))}
			</div>
		</Section>
	);
};

export default Services;
