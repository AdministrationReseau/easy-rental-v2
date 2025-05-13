'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import {NavbarProps, NavAction} from "@/types/models/navbar";


const Navbar: React.FC<NavbarProps> = ({
  logo = { href: '/', label: 'EASY-RENT', icon: <FaCar className="text-primary mr-2 text-2xl" /> },
  links = [],
  actions = [],
  showLanguageSwitcher = false,
  showThemeSwitcher = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const renderNavAction = (action: NavAction, index: number) => {
    switch (action.type) {
      case 'link':
        return (
          <Link
            key={index}
            href={action.href || '#'}
            className="flex flex-row items-center font-bold text-text-light/70 dark:text-text-dark/70 hover:text-primary transition"
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </Link>
        );

      case 'button':
        return (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex items-center px-3 py-2 rounded-full hover:bg-primary-700 transition ${
              action.className || 'bg-primary text-white'
            }`}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </button>
        );

      case 'icon':
        return (
          <button
            key={index}
            onClick={action.onClick}
            className="text-text-light/70 dark:text-text-dark/70 hover:text-primary relative"
          >
            {action.icon}
            {typeof action.badge === 'number' && action.badge > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {action.badge}
              </span>
            )}
          </button>
        );

      case 'dropdown':
        return (
          <div key={index} className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="flex items-center bg-primary text-white px-3 py-2 rounded-full hover:bg-primary-700 transition"
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
            {activeDropdown === index && action.items && action.items.length > 0 && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
                {action.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <nav className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={logo.href} className="flex items-center">
          {logo.icon}
          <span className="text-xl font-bold">{logo.label}</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-text-light dark:text-text-dark focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {/* Navigation Links */}
          <nav className="flex space-x-4 items-center">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex flex-row items-center font-semibold text-text-light/70 dark:text-text-dark/70 hover:text-primary transition"
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Items */}
          <div className="flex items-center space-x-4">
            {/* Language and Theme Switchers */}
            {showLanguageSwitcher && <LanguageSwitcher />}
            {showThemeSwitcher && <ThemeSwitcher />}

            {/* Custom Actions */}
            {actions.map((action, index) => renderNavAction(action, index))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark px-4 py-2 pb-4 shadow-lg">
          {/* Mobile Links */}
          <nav className="flex flex-col space-y-3">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex flex-row items-center font-bold text-text-light/70 dark:text-text-dark/70 hover:text-primary transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Action Items */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Language and Theme Switchers */}
            {showLanguageSwitcher && <LanguageSwitcher />}
            {showThemeSwitcher && <ThemeSwitcher />}

            {/* Custom Actions */}
            {actions.map((action, index) => (
              <div key={index} className="mt-2">
                {renderNavAction(action, index)}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
