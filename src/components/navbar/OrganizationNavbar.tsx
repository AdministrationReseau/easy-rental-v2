'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaCar, 
  FaBell,
  FaUser, 
  FaUserCircle, 
  FaCog, 
  FaMoneyBillWave
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavAction} from "@/types/models/navbar";

const OrganizationNavbar: React.FC = () => {
  const { t } = useTranslation('components');
  
  const actions: NavAction[] = [
    {
      type: 'icon',
      icon: <FaBell />,
      badge: 2,
      href: '/organization/notifications',
      label: t('navbar.organization_navbar.notifications')
    },
    {
      type: 'dropdown',
      label: t('navbar.organization_navbar.profile'),
      icon: <FaUser />,
      items: [
        { 
          label: t('navbar.organization_navbar.account'), 
          href: '/organization/account',
          icon: <FaUserCircle />
        },
        { 
          label: t('navbar.organization_navbar.configurations'), 
          href: '/organization/configurations',
          icon: <FaCog />
        },
        { 
          label: t('navbar.organization_navbar.subscription'), 
          href: '/organization/subscription',
          icon: <FaMoneyBillWave />
        }
      ]
    }
  ];

  return (
    <Navbar
      logo={{
        href: '/organization',
        label: 'EASY-RENT',
        icon: <FaCar className="text-primary mr-2 text-2xl" />
      }}
      actions={actions}
      showLanguageSwitcher={true}
      showThemeSwitcher={true}
    />
  );
};

export default OrganizationNavbar;
