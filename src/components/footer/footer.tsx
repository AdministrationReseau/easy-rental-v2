'use client'

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation('common');

	return (
		<footer className="bg-background-dark text-white py-12 px-4 md:px-8 lg:px-16 relative">
			<div className="relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					<div>
						<h3 className="text-xl font-bold mb-4 flex items-center">
							<FaCar className="text-primary mr-2" /> EASY-RENT
						</h3>
						<p className="text-gray-400 mb-4">{t('components.footer.about')}</p>
						<div className="flex space-x-4">
								<a
								href={t('components.footer.socials.facebook')}
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-light-tertiary dark:text-text-dark-tertiary hover:text-primary dark:hover:text-primary-300 transition-colors"
							>
								<FaFacebook size={20} />
							</a>
							<a
								href={t('components.footer.socials.twitter')}
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-light-tertiary dark:text-text-dark-tertiary hover:text-primary dark:hover:text-primary-300 transition-colors"
							>
								<FaTwitter size={20} />
							</a>
							<a
								href={t('components.footer.socials.instagram')}
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-light-tertiary dark:text-text-dark-tertiary hover:text-primary dark:hover:text-primary-300 transition-colors"
							>
								<FaInstagram size={20} />
							</a>
							<a
								href={t('components.footer.socials.linkedin')}
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-light-tertiary dark:text-text-dark-tertiary hover:text-primary dark:hover:text-primary-300 transition-colors"
							>
								<FaLinkedin size={20} />
							</a>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">{t('components.footer.links.title')}</h3>
						<ul className="space-y-4">
							<li>
								<Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.links.about')}
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.links.contact')}
								</Link>
							</li>
							<li>
								<Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.links.terms')}
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('footer.links.privacy')}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">{t('components.footer.services.title')}</h3>
						<ul className="space-y-4">
							<li>
								<Link href="/vehicles" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.services.browse')}
								</Link>
							</li>
							<li>
								<Link href="/register-agency" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.services.agency')}
								</Link>
							</li>
							<li>
								<Link href="/bookings" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.services.bookings')}
								</Link>
							</li>
							<li>
								<Link href="/support" className="text-gray-400 hover:text-white transition-colors duration-300">
									{t('components.footer.services.support')}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">{t('footer.contact.title')}</h3>
						<ul className="space-y-4">
							<li className="text-gray-400 hover:text-white transition-colors duration-300">
								{t('components.footer.contact.email')}
							</li>
							<li className="text-gray-400 hover:text-white transition-colors duration-300">
								{t('components.footer.contact.phone')}
							</li>
							<li className="text-gray-400 hover:text-white transition-colors duration-300">
								{t('components.footer.contact.address')}
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
					<p>© {new Date().getFullYear()} EASY-RENT. {t('components.footer.copyright')}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

