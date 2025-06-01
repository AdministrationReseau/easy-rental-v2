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
} from 'react-icons/fa';

import Sidebar from '@/components/sidebar/Sidebar';
import { SidebarItem } from '@/types/models/sidebar';

const AgencySidebar: React.FC = () => {
  const { t } = useTranslation('common');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      label: t('components.sidebar.agency_sidebar.dashboard'),
      href: '/agency',
      icon: <FaChartBar />
    },
    {
      label: t('components.sidebar.agency_sidebar.entities.label'),
      icon: <FaCar />,
      children: [
        {
          label: t('components.sidebar.agency_sidebar.entities.staff'),
          href: '/agency/staff',
          icon: <FaUsers />
        },
        {
          label: t('components.sidebar.agency_sidebar.entities.vehicles'),
          href: '/agency/vehicles',
          icon: <FaCarSide />
        },
        {
          label: t('components.sidebar.agency_sidebar.entities.drivers'),
          href: '/agency/drivers',
          icon: <FaUserTie />
        }
      ]
    },
    {
      label: t('components.sidebar.agency_sidebar.rentals'),
      href: '/agency/rentals',
      icon: <FaCarSide />
    },
    {
      label: t('components.sidebar.agency_sidebar.transactions'),
      href: '/agency/transactions',
      icon: <FaExchangeAlt />
    }
  ];

  const bottomItems: SidebarItem[] = [
    {
      label: t('components.sidebar.agency_sidebar.help_center'),
      href: '/agency/help',
      icon: <FaQuestionCircle />
    },
    {
      label: t('components.sidebar.agency_sidebar.logout'),
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

export default AgencySidebar;
