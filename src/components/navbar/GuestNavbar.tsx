'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCar,
  FaHome,
  FaBuilding,
  FaUserPlus,
  FaSignInAlt,
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavLink, NavAction} from "@/types/models/navbar";

const GuestNavbar: React.FC = () => {
  const { t } = useTranslation('common');

  const links: NavLink[] = [
    {
      href: '/',
      label: t('components.navbar.guest_navbar.home'),
      icon: <FaHome />
    },
    {
      href: '/vehicles',
      label: t('components.navbar.guest_navbar.vehicles'),
      icon: <FaCar />
    },
    {
      href: '/agencies',
      label: t('components.navbar.guest_navbar.agencies'),
      icon: <FaBuilding />
    }
  ];

  const actions: NavAction[] = [
    {
      type: 'button',
      label: t('components.navbar.guest_navbar.becomeOrganization'),
      href: '/register/organization',
      icon: <FaUserPlus />,
      className: ''
    },
    {
      type: 'button',
      label: t('components.navbar.guest_navbar.loginRegister'),
      href: '/login',
      icon: <FaSignInAlt />
    }
  ];

  return (
    <Navbar
      logo={{
        href: '/',
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

export default GuestNavbar;