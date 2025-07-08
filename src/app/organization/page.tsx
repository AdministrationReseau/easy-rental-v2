'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OrganizationNavbar from '@/components/navbar/OrganizationNavbar';
import LoadingSpinner from '@/components/ui/loadingSpinner'; // Corrected to default import
import dynamic from 'next/dynamic'; // Added dynamic

interface OrganizationData {
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

const OrganizationCreationModal = dynamic(() => import('@/components/organisation/OrganizationCreationModal'), {
  loading: () => <LoadingSpinner size="md" />,
});

const Organization = () => {
	const router = useRouter();
	const { user, isAuthenticated, isLoading } = useAuth();
	const { t } = useTranslation('organization');
	const [showOrganizationModal, setShowOrganizationModal] = useState(false);
	const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);
	const [formData, setFormData] = useState<OrganizationData>({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		country: 'Cameroon',
		description: '',
		businessActorId: '',
		planId: '',
		transactionId: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		// Redirect if not authenticated or not admin
		if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
			router.push('/signin');
			return;
		}

		// Check if organization data exists
		const storedOrganizationData = localStorage.getItem('organization-data');
		if (storedOrganizationData) {
			try {
				const orgData = JSON.parse(storedOrganizationData);
				setOrganizationData(orgData);
				setFormData(prev => ({ ...prev, ...orgData }));
			} catch (e) {
				console.error('Failed to parse organization data', e);
			}
		}

		// Check if we need to show the organization creation modal
		const organizationId = localStorage.getItem('organization-id');
		if (!organizationId && !storedOrganizationData) {
			setShowOrganizationModal(true);
		}
	}, [isAuthenticated, isLoading, user, router]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleCreateOrganization = async () => {
		setIsSubmitting(true);
		try {
			// Create organization ID
			const organizationId = `org-${Date.now()}`;

			// Save organization data
			const completeOrgData = {
				...formData,
				id: organizationId,
				ownerId: user?.id,
				createdAt: new Date().toISOString()
			};

			// Store in localStorage
			localStorage.setItem('organization-id', organizationId);
			localStorage.setItem('organization-data', JSON.stringify(completeOrgData));

			// Update state
			setOrganizationData(completeOrgData);
			setShowOrganizationModal(false);

			// Here you would typically send this data to your backend
			// const response = await fetch('/api/organizations', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(completeOrgData)
			// });

		} catch (error) {
			console.error('Error creating organization:', error);
			// You could show an error message here
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
				<LoadingSpinner size="lg" showText={true} fullScreen={false} />
			</div>
		);
	}

	if (!isAuthenticated || user?.role !== 'admin') {
		return null; // Will redirect in useEffect
	}

	if (!organizationData && !showOrganizationModal) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-background-dark">
				<OrganizationNavbar />
				<div className="pt-[80px] p-8">
					<div className="max-w-4xl mx-auto">
						<Card>
							<CardHeader>
								<CardTitle>{t('register.title')}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-text-dark/70 mb-4">
									{t('dashboard.create_organization_prompt')}
								</p>
								<Button
									onClick={() => setShowOrganizationModal(true)}
									className="bg-primary-600 hover:bg-primary-700 text-white"
								>
									{t('dashboard.create_organization_button')}
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-background-dark">
			<OrganizationNavbar />

			<main className="pt-[80px] p-8">
				<div className="max-w-7xl mx-auto">
					{/* Welcome Section */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-text-dark">
							{t('dashboard.welcome')}, {organizationData?.name || 'Organization'}!
						</h1>
						<p className="text-gray-600 dark:text-text-dark/70 mt-2">
							{t('dashboard.welcome_subtitle')}
						</p>
					</div>

					{/* Stats Overview */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-600 dark:text-text-dark/70">
									{t('dashboard.stats.total_vehicles')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-gray-900 dark:text-text-dark">0</div>
								<p className="text-xs text-gray-500 dark:text-text-dark/50">
									{t('dashboard.stats.vehicles_active')}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-600 dark:text-text-dark/70">
									{t('dashboard.stats.active_bookings')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-gray-900 dark:text-text-dark">0</div>
								<p className="text-xs text-gray-500 dark:text-text-dark/50">
									{t('dashboard.stats.bookings_today')}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-600 dark:text-text-dark/70">
									{t('dashboard.stats.total_revenue')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-gray-900 dark:text-text-dark">0 XAF</div>
								<p className="text-xs text-gray-500 dark:text-text-dark/50">
									{t('dashboard.stats.revenue_this_month')}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-600 dark:text-text-dark/70">
									{t('dashboard.stats.customer_satisfaction')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-gray-900 dark:text-text-dark">-</div>
								<p className="text-xs text-gray-500 dark:text-text-dark/50">
									{t('dashboard.stats.average_rating')}
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Quick Actions */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle>{t('dashboard.quick_actions.title')}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-4">
									<Button
										onClick={() => router.push('/organization/vehicles/add')}
										className="bg-primary-600 hover:bg-primary-700 text-white"
									>
										{t('dashboard.quick_actions.add_vehicle')}
									</Button>
									<Button
										onClick={() => router.push('/organization/bookings')}
										variant="outline"
									>
										{t('dashboard.quick_actions.view_bookings')}
									</Button>
									<Button
										onClick={() => router.push('/organization/analytics')}
										variant="outline"
									>
										{t('dashboard.quick_actions.view_analytics')}
									</Button>
									<Button
										onClick={() => router.push('/organization/drivers')}
										variant="outline"
									>
										{t('dashboard.quick_actions.manage_drivers')}
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>{t('dashboard.organization_info.title')}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div>
                    <span className="text-sm text-gray-500 dark:text-text-dark/50">
                      {t('dashboard.organization_info.name')}:
                    </span>
										<p className="font-medium text-gray-900 dark:text-text-dark">
											{organizationData?.name}
										</p>
									</div>
									<div>
                    <span className="text-sm text-gray-500 dark:text-text-dark/50">
                      {t('dashboard.organization_info.email')}:
                    </span>
										<p className="font-medium text-gray-900 dark:text-text-dark">
											{organizationData?.email}
										</p>
									</div>
									<div>
                    <span className="text-sm text-gray-500 dark:text-text-dark/50">
                      {t('dashboard.organization_info.plan')}:
                    </span>
										<p className="font-medium text-gray-900 dark:text-text-dark capitalize">
											{organizationData?.planId?.replace('-monthly', '')} Plan
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>

			{/* Dynamically loaded Organization Creation Modal */}
			{showOrganizationModal && (
				<OrganizationCreationModal
					showOrganizationModal={showOrganizationModal}
					setShowOrganizationModal={setShowOrganizationModal}
					formData={formData}
					handleInputChange={handleInputChange}
					handleCreateOrganization={handleCreateOrganization}
					isSubmitting={isSubmitting}
					t={t}
				/>
			)}
		</div>
	);
};

export default Organization;