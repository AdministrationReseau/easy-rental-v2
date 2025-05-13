'use client'

import {ReactNode, useEffect, useRef} from 'react';
import {motion, useAnimation, useInView, UseInViewOptions} from 'framer-motion';

const Section = (
		{ children, className = "", style= {} }:
		{ children: ReactNode; className?: string; style?: React.CSSProperties }
	) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, threshold: 0.1 } as UseInViewOptions)
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	return (
		<motion.section
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
			}}
			className={`py-16 px-4 md:px-8 lg:px-16 ${className}`}
			style={style}
		>
			{children}
		</motion.section>
	);
};

export default Section;
