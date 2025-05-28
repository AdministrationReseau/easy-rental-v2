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
      label: t('components.sidebar.dashboard'),
      href: '/organization/dashboard',
      icon: <FaChartBar />
    },
    {
      label: t('components.sidebar.entities'),
      icon: <FaCar />,
      children: [
        {
          label: t('components.sidebar.organization.agencies'),
          href: '/organization/agencies',
          icon: <FaBuilding />
        },
        {
          label: t('components.sidebar.organization.vehicles'),
          href: '/organization/vehicles',
          icon: <FaCarSide />
        },
        {
          label: t('components.sidebar.organization.staff'),
          href: '/organization/staff',
          icon: <FaUsers />
        },
        {
          label: t('components.sidebar.organization.drivers'),
          href: '/organization/drivers',
          icon: <FaUserTie />
        }
      ]
    },
    {
      label: t('components.sidebar.rentals'),
      href: '/organization/rentals',
      icon: <FaCarSide />
    },
    {
      label: t('components.sidebar.transactions'),
      href: '/organization/transactions',
      icon: <FaExchangeAlt />
    }
  ];

  const bottomItems: SidebarItem[] = [
    {
      label: t('components.sidebar.help_center'),
      href: '/organization/help',
      icon: <FaQuestionCircle />
    },
    {
      label: t('components.sidebar.logout'),
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
