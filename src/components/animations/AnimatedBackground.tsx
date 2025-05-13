'use client'

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
	return (
		<div className="absolute inset-0 overflow-hidden z-0 opacity-30">
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full bg-primary-200 dark:bg-primary-700"
					initial={{
						x: Math.random() * 100 - 50,
						y: Math.random() * 100 - 50,
						opacity: 0.3,
						scale: Math.random() * 0.5 + 0.5
					}}
					animate={{
						x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
						y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
						opacity: [0.3, 0.7, 0.3],
					}}
					transition={{
						repeat: Infinity,
						duration: 20 + Math.random() * 10,
						ease: "easeInOut"
					}}
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						width: `${Math.random() * 300 + 50}px`,
						height: `${Math.random() * 300 + 50}px`,
					}}
				/>
			))}
		</div>
	);
};

export default AnimatedBackground;
