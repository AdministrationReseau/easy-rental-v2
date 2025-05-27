'use client'

import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import TeamMember from "@/components/cards/TeamMember";
import { useTranslation } from 'next-i18next';

const TeamSection = () => {
	const { t } = useTranslation('common');

	return (
		<Section className="bg-surface-light dark:bg-surface-dark">
			<div className="text-center mb-16">
				<motion.h2
					className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{t('components.landing.team.title')}
				</motion.h2>
				<motion.p
					className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{t('components.landing.team.subtitle')}
				</motion.p>
			</div>

			<div className="md:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				<TeamMember
					name={t('components.landing.team.members.teacher.name')}
					role={t('components.landing.team.members.teacher.position')}
					bio={t('components.landing.team.members.teacher.bio')}
					image={t('components.landing.team.members.teacher.image', { defaultValue: '/assets/member.jpg' })}
					linkedin={t('components.landing.team.members.teacher.linkedin')}
					twitter={t('components.landing.team.members.teacher.twitter')}
				/>
				<TeamMember
					name={t('components.landing.team.members.engineer.name')}
					role={t('components.landing.team.members.engineer.position')}
					bio={t('components.landing.team.members.engineer.bio')}
					image={t('components.landing.team.members.engineer.image', { defaultValue: '/assets/member.jpg' })}
					linkedin={t('components.landing.team.members.engineer.linkedin')}
					twitter={t('components.landing.team.members.engineer.twitter')}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				{['member1', 'member2', 'member3', 'member4', 'member5'].map((memberKey) => (
					<TeamMember
						key={memberKey}
						name={t(`components.landing.team.members.${memberKey}.name`)}
						role={t(`components.landing.team.members.${memberKey}.position`)}
						bio={t(`components.landing.team.members.${memberKey}.bio`)}
						image={t(`components.landing.team.members.${memberKey}.image`, { defaultValue: '/assets/member.jpg' })}
						linkedin={t(`components.landing.team.members.${memberKey}.linkedin`)}
						twitter={t(`components.landing.team.members.${memberKey}.twitter`)}
					/>
				))}
			</div>
		</Section>
	);
};

export default TeamSection;
