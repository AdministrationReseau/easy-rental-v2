'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Section from "@/components/layout/Section";
import {PlayCircle} from "lucide-react";
import { motion } from 'framer-motion';

const Hero = () => {
	const { t } = useTranslation('components');

	return (
		<Section
			className="md:pt-[120px] h-[100vh] flex flex-col lg:flex-row items-center justify-between bg-cover bg-center bg-[url('/assets/Ads1.png')] dark:bg-[url('/assets/Ads3.png')]">
			<div className="w-full lg:w-1/2 space-y-6 lg:pl-10">
				<h1 className="text-4xl md:text-5xl lg:text-6xl mb-5 font-bold text-text-dark leading-tight">
					{t('landing.hero.title')}<br/> <span className="text-background-blue dark:text-primary-400">{t('landing.hero.titleHighlight')}</span>
				</h1>
				<p className="text-sm sm:text-lg text-text-dark mb-8">
					{t('landing.hero.description')}
				</p>

				<button className="flex items-center text-white mx-0 pb-3 sm:pb-12 rounded-full hover:bg-primary-dark">
					<div className= " bg-primary p-2 rounded-full mr-2">
						<PlayCircle />
					</div>
					<span className= "font-md ">{t('landing.hero.videoButton')}</span>
				</button>

				<div className="flex flex-col sm:flex-row gap-4">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 bg-primary hover:bg-primary-700 text-white font-semibold rounded-full shadow-md transition-all duration-300">
						{t('landing.hero.rentNowButton')}
					</motion.button>
					<div className="flex mx-auto md:mx-0 items-center gap-4">
						<div className="flex space-x-4">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link href="##"
								      className="flex items-center gap-2 px-4 py-3 bg-background-blue dark:bg-background-light text-white dark:text-text-primary rounded-full">
									<FaApple className="text-xl"/> {t('landing.hero.appStore')}
								</Link>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link href="#1"
								      className="flex items-center gap-2 px-4 py-3 bg-background-blue dark:bg-background-light text-white dark:text-text-primary rounded-full">
									<FaGooglePlay className="text-xl"/> {t('landing.hero.googlePlay')}
								</Link>
							</motion.div>

						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-1/2 mb-10 lg:mb-0">
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
					<Image
						src="/assets/voiture.png"
						alt={t('landing.hero.altText')}
						fill
						style={{objectFit: "contain"}}
						priority
					/>
				</div>
			</div>
		</Section>
	);
};

export default Hero;
