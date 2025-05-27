'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCar,
  FaBell
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavAction} from "@/types/models/navbar";

const AgencyNavbar: React.FC = () => {
  const { t } = useTranslation('common');


  const actions: NavAction[] = [
    {
      type: 'icon',
      icon: <FaBell />,
      badge: 2,
      href: '/agency/notifications',
      label: t('components.navbar.agency_navbar.notifications')
    },

  ];

  return (
    <Navbar
      logo={{
        href: '/agency',
        label: 'EASY-RENT',
        icon: <FaCar className="text-primary mr-2 text-2xl" />
      }}
      actions={actions}
      showLanguageSwitcher={true}
      showThemeSwitcher={true}
    />
  );
};

export default AgencyNavbar;
