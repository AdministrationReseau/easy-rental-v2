'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TFunction } from 'i18next'; // Or any, if TFunction is problematic to import directly

// Copied from src/app/organization/page.tsx - consider moving to a shared types file
export interface OrganizationData {
	id?: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	country: string;
	description: string;
	businessActorId: string;
	planId: string;
	transactionId: string;
}

interface OrganizationCreationModalProps {
	showOrganizationModal: boolean;
	setShowOrganizationModal: (isOpen: boolean) => void;
	formData: OrganizationData;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleCreateOrganization: () => Promise<void>;
	isSubmitting: boolean;
	t: TFunction<"organization", undefined>; // More specific type for t function based on usage
}

const OrganizationCreationModal: React.FC<OrganizationCreationModalProps> = ({
	showOrganizationModal,
	setShowOrganizationModal,
	formData,
	handleInputChange,
	handleCreateOrganization,
	isSubmitting,
	t,
}) => {
	if (!showOrganizationModal) {
		return null; // Or handle visibility internally if Dialog's `open` prop is solely used
	}

	return (
		<Dialog open={showOrganizationModal} onOpenChange={setShowOrganizationModal}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{t('modal.create_organization.title')}</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Input
						label={t('register.fields.org_name')}
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
					<Input
						label={t('register.fields.org_email')}
						name="email"
						type="email"
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
					<Input
						label={t('register.fields.org_phone')}
						name="phone"
						type="tel"
						value={formData.phone}
						onChange={handleInputChange}
						required
					/>
					<div className="mt-6">
						<Button
							onClick={handleCreateOrganization}
							disabled={isSubmitting}
							className="w-full bg-primary-600 hover:bg-primary-700 text-white"
						>
							{isSubmitting ? t('modal.create_organization.creating') : t('modal.create_organization.create_button')}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default OrganizationCreationModal;