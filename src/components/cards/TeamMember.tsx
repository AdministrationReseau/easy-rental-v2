import { useRef } from "react";
import { motion, useInView, UseInViewOptions } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const TeamMember = ({ name, role, bio, image, linkedin, twitter }: { name: string, role: string, bio: string, image: string, linkedin?: string, twitter?: string }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold: 0.2 } as UseInViewOptions);

	return (
		<motion.div
			ref={ref}
			className="bg-card-light dark:bg-card-dark rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<div className="h-64 relative overflow-hidden">
				<Image
					src={image}
					fill
					className="object-cover"
					alt={name}
				/>
			</div>
			<div className="p-6">
				<h3 className="text-xl font-bold mb-1 text-text-light dark:text-text-dark">{name}</h3>
				<p className="text-primary-600 dark:text-primary-400 mb-3">{role}</p>
				<p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">{bio}</p>
				<div className="flex space-x-4">
					{linkedin && (
						<a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:hover:text-primary-300 transition-colors">
							<FaLinkedin size={20} />
						</a>
					)}
					{twitter && (
						<a href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:hover:text-primary-300 transition-colors">
							<FaTwitter size={20} />
						</a>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default TeamMember;
