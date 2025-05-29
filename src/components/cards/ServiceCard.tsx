import {useRef} from "react";
import {motion, useInView, UseInViewOptions} from "framer-motion";
import Image from "next/image";
import {FaCheck} from "react-icons/fa";
import {Button} from "@/components/ui/button";

const ServiceCard = ({ title, description, features, cta, image, isReversed }:{title: string, description: string, features: string[], cta: string, image: string, isReversed: boolean}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(ref, { once: true, threshold: 0.1 } as UseInViewOptions);

	return (
		<motion.div
			ref={ref}
			className={`flex flex-col lg:flex-row items-center mb-24 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<div className="relative overflow-hidden max-w-lg mx-auto rounded-3xl shadow-xl">
				<Image
					src={image}
					width={600}
					height={400}
					className="w-full h-auto object-cover"
					alt={title}
				/>
			</div>

			<div className="p-4">
				<h3 className="text-2xl lg:text-3xl font-bold mb-4 text-text-light dark:text-text-dark">{title}</h3>
				<p className="text-lg mb-6 text-text-light-secondary dark:text-text-dark-secondary">{description}</p>

				<div className="mb-8">
					{features.map((feature, index) => (
						<div key={index} className="flex items-center mb-3">
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 p-1 rounded-full mr-3">
                <FaCheck />
              </span>
							<span className="text-text-light-secondary dark:text-text-dark-secondary">{feature}</span>
						</div>
					))}
				</div>

				<Button className="px-8 py-3 text-white bg-primary hover:bg-primary-600 dark:bg-primary-700 dark:hover:bg-primary-600 rounded-xl transition-all">
					{cta}
				</Button>
			</div>
		</motion.div>
	);
};

export default ServiceCard;