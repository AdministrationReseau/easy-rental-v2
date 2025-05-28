import {useRef} from "react";
import {motion, useInView, UseInViewOptions} from "framer-motion";
import useCountUp from "@/hooks/count/CountUp";

const StatCard = ({ value, label, suffix = '' }:{ value:number, label:string, suffix?:string }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold: 0.5 } as UseInViewOptions);
	const count = useCountUp(value, 2500);

	return (
		<motion.div
			ref={ref}
			className="text-center p-8"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.5 }}
		>
			<div className="text-3xl md:text-5xl font-bold mb-2 text-primary dark:text-primary-300">
				{isInView ? (
					<span>
					    {count}
						{suffix}
					  </span>
				) : (
					0
				)}
			</div>
			<div className="text-lg text-text-light-secondary dark:text-text-dark-secondary">{label}</div>
		</motion.div>
	);
};

export default StatCard;