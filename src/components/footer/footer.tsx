'use client'

import { FaCar } from 'react-icons/fa';
// import AnimatedBackground from '../animations/AnimatedBackground';

const Footer = () => {
	return (
		<footer className="bg-background-dark text-white py-12 px-4 md:px-8 lg:px-16 relative">
			{/*<AnimatedBackground />*/}
			<div className="relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					<div>
						<h3 className="text-xl font-bold mb-4 flex items-center">
							<FaCar className="text-primary mr-2" /> EASY-RENT
						</h3>
						<p className="text-gray-400 mb-4">
							Premium car rental services for business and leisure travelers.
						</p>
						<div className="flex space-x-4">
							{['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
								<a key={social} href="#" className="text-gray-400 hover:text-primary">
                  <span className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors duration-300 hover:bg-gray-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                  </span>
								</a>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">Company</h3>
						<ul className="space-y-3">
							{['About Us', 'Careers', 'Blog', 'Press'].map(item => (
								<li key={item}>
									<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">Support</h3>
						<ul className="space-y-3">
							{['Help Center', 'Contact Us', 'Safety Center', 'Community Guidelines'].map(item => (
								<li key={item}>
									<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">Legal</h3>
						<ul className="space-y-3">
							{['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Rental Agreement'].map(item => (
								<li key={item}>
									<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
					<p>© {new Date().getFullYear()} EASY-RENT. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
