'use client'

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaChartBar,
  FaCar,
  FaUsers,
  FaUserTie,
  FaCarSide,
  FaExchangeAlt,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBuilding,
} from 'react-icons/fa';

import Sidebar from './Sidebar';
import { SidebarItem } from '@/types/models/sidebar';

const OrganizationSidebar: React.FC = () => {
  const { t } = useTranslation('common');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      label: t('components.sidebar.organization_sidebar.dashboard'),
      href: '/organization',
      icon: <FaChartBar />
    },
    {
      label: t('components.sidebar.organization_sidebar.entities.label'),
      icon: <FaCar />,
      children: [
        {
          label: t('components.sidebar.organization_sidebar.entities.agencies'),
          href: '/organization/agencies',
          icon: <FaBuilding />
        },
        {
          label: t('components.sidebar.organization_sidebar.entities.vehicles'),
          href: '/organization/vehicles',
          icon: <FaCarSide />
        },
        {
          label: t('components.sidebar.organization_sidebar.entities.staff'),
          href: '/organization/staff',
          icon: <FaUsers />
        },
        {
          label: t('components.sidebar.organization_sidebar.entities.drivers'),
          href: '/organization/drivers',
          icon: <FaUserTie />
        }
      ]
    },
    {
      label: t('components.sidebar.organization_sidebar.rentals'),
      href: '/organization/rentals',
      icon: <FaCarSide />
    },
    {
      label: t('components.sidebar.organization_sidebar.transactions'),
      href: '/organization/transactions',
      icon: <FaExchangeAlt />
    }
  ];

  const bottomItems: SidebarItem[] = [
    {
      label: t('components.sidebar.organization_sidebar.help_center'),
      href: '/organization/help',
      icon: <FaQuestionCircle />
    },
    {
      label: t('components.sidebar.organization_sidebar.logout'),
      href: '/auth/logout',
      icon: <FaSignOutAlt />
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Sidebar
      items={sidebarItems}
      bottomItems={bottomItems}
      isCollapsed={isCollapsed}
      onToggle={toggleSidebar}
    />
  );
};

export default OrganizationSidebar;
