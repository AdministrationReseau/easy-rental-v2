import React, {ReactElement, useRef} from "react";
import {motion, useInView, UseInViewOptions} from "framer-motion";

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
			<div className="bg-primary-100  rounded-full w-16 h-16 flex items-center justify-center mb-6">
				{React.cloneElement(icon, { className: "text-primary-600 dark:text-primary-900 text-3xl" })}
			</div>
			<h3 className="text-xl font-bold mb-3 text-text-primary dark:text-text-dark">{title}</h3>
			<p className="text-text-light-secondary dark:text-text-dark-secondary">{description}</p>
		</motion.div>
	);
};

export default FeatureCard;