'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCar,
  FaHeart,
  FaBell,
  FaUser,
  FaHome,
  FaBuilding,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavLink, NavAction} from "@/types/models/navbar";

const ClientNavbar: React.FC = () => {
  const { t } = useTranslation('common');

  const links: NavLink[] = [
    {
      href: '/client',
      label: t('components.navbar.client_navbar.home'),
      icon: <FaHome />
    },
    {
      href: '/client/vehicles',
      label: t('components.navbar.client_navbar.vehicles'),
      icon: <FaCar />
    },
    {
      href: '/client/agencies',
      label: t('components.navbar.client_navbar.agencies'),
      icon: <FaBuilding />
    }
  ];

  const actions: NavAction[] = [
    {
      type: 'icon',
      icon: <FaHeart />,
      badge: 3,
      href: '/client/favorites',
      label: t('components.navbar.client_navbar.favorites')
    },
    {
      type: 'icon',
      icon: <FaBell />,
      badge: 2,
      href: '/client/notifications',
      label: t('components.navbar.client_navbar.notifications')
    },
    {
      type: 'dropdown',
      label: t('components.navbar.client_navbar.profile'),
      icon: <FaUser />,
      items: [
        { 
          label: t('components.navbar.client_navbar.account'),
          href: '/client/profile',
          icon: <FaUserCircle />
        },
        { 
          label: t('components.navbar.client_navbar.rentals'),
          href: '/client/rentals',
          icon: <FaExchangeAlt />
        },
        { 
          label: t('components.navbar.client_navbar.transactions'),
          href: '/client/transactions',
          icon: <FaMoneyBillWave />
        },
        { 
          label: t('components.navbar.client_navbar.help'),
          href: '/client/help',
          icon: <FaQuestionCircle />
        },
        { 
          label: t('components.navbar.client_navbar.logout'),
          href: '/logout',
          icon: <FaSignOutAlt />
        }
      ]
    }
  ];

  return (
    <Navbar
      logo={{
        href: '/client',
        label: 'EASY-RENT',
        icon: <FaCar className="text-primary mr-2 text-2xl" />
      }}
      links={links}
      actions={actions}
      showLanguageSwitcher={true}
      showThemeSwitcher={true}
    />
  );
};

export default ClientNavbar;
