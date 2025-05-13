'use client'

import { useState, useEffect, useRef } from 'react';
import {useInView, UseInViewOptions} from 'framer-motion';
import {CountUpProps} from "@/types/models/animation";

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2 }) => {
	const [count, setCount] = useState<number>(0);
	const nodeRef = useRef<HTMLSpanElement | null>(null);
	const isInView = useInView(nodeRef, { once: true, threshold: 0.3 } as UseInViewOptions);

	useEffect(() => {
		if (!isInView) return;

		let startTime: number | null = null;
		let animationFrame: number | null = null;

		const startAnimation = (timestamp: DOMHighResTimeStamp) => {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;
			const percentage = Math.min(progress / (duration * 1000), 1);

			setCount(Math.floor(end * percentage));

			if (percentage < 1) {
				animationFrame = requestAnimationFrame(startAnimation);
			}
		};

		animationFrame = requestAnimationFrame(startAnimation);

		return () => {
			if (animationFrame !== null) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [end, duration, isInView]);

	return <span ref={nodeRef}>{isInView ? count : 0}</span>;
};

export default CountUp;
