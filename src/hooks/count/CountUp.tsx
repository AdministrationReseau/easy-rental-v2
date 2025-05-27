import {useEffect, useState} from "react";

const useCountUp = (endValue: number, duration:number) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let start = 0;
		const increment = endValue / (duration / 10);
		const interval = setInterval(() => {
			start += increment;
			if (start >= endValue) {
				clearInterval(interval);
				setCount(endValue);
			} else {
				setCount(Math.ceil(start));
			}
		}, 10);

		return () => clearInterval(interval);
	}, [endValue, duration]);

	return count;
};

export default useCountUp;