'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { SidebarProps, SidebarItem } from '@/types/models/sidebar';

const Sidebar: React.FC<SidebarProps> = ({
  items = [],
  bottomItems = [],
  logo,
}) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showMobileSubMenu, setShowMobileSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const toggleMobileSubMenu = (label: string) => {
    setShowMobileSubMenu(prevState => prevState === label ? null : label);
  };

  // Check if any child in the item is active
  const isItemOrChildActive = (item: SidebarItem): boolean => {
    if (pathname === item.href) return true;
    
    if (item.children && item.children.length > 0) {
      return item.children.some(child => pathname === child.href);
    }
    
    return false;
  };

  // Auto-expand parents with active children
  useEffect(() => {
    const newExpandedItems = { ...expandedItems };

    items.forEach(item => {
      if (item.children && item.children.some(child => pathname === child.href)) {
        newExpandedItems[item.label] = true;
      }
    });

    if (bottomItems) {
      bottomItems.forEach(item => {
        if (item.children && item.children.some(child => pathname === child.href)) {
          newExpandedItems[item.label] = true;
        }
      });
    }

    setExpandedItems(newExpandedItems);
  }, [pathname, items, bottomItems, expandedItems]);

  const renderSidebarItem = (item: SidebarItem, index: number, isLastBottomItem: boolean = false) => {
    const isActive = isItemOrChildActive(item);
    const isExpanded = expandedItems[item.label] || false;
    const hasSubItems = item.children && item.children.length > 0;
    const isLogout = isLastBottomItem;

    return (
      <div key={index} className="mb-3">
        {hasSubItems ? (
          <>
            <button
              onClick={() => toggleSubMenu(item.label)}
              className={`flex items-center w-full text-text-light-secondary dark:text-text-dark-secondary text-left px-4 py-4 rounded-lg transition-colors duration-150
                ${isLogout ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <div className="flex items-center flex-grow">
                {item.icon && (
                  <span className={`mr-3 text-xl ${isLogout ? 'text-red-500' : ''}`}>
                    {item.icon}
                  </span>
                )}
                <span className={`${isLogout ? 'text-red-500' : ''}`}>
                  {item.label}
                </span>
              </div>
              {hasSubItems && (
                <span>{isExpanded ? <FaAngleUp /> : <FaAngleDown />}</span>
              )}
            </button>

            {hasSubItems && isExpanded && (
              <div className="ml-4 mt-1 space-y-1 py-1">
                {item.children?.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.href || '#'}
                    className={`flex items-center px-4 py-4 rounded-lg transition-colors duration-150 
                      ${pathname === child.href ? 'bg-primary/10 text-primary dark:text-primary-300' : 'dark:text-text-dark-secondary text-text-light-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {child.icon && <span className="mr-3 text-lg">{child.icon}</span>}
                    <span>{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href || '#'}
            className={`flex items-center dark:text-text-dark-secondary text-text-light-secondary px-4 py-4 rounded-lg transition-colors duration-150
              ${isLogout ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 
                isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {item.icon && (
              <span className={`mr-3 text-lg ${isLogout ? 'text-red-500' : isActive ? 'text-white' : ''}`}>
                {item.icon}
              </span>
            )}
            <span className={`${isLogout && !isActive ? 'text-red-500' : ''}`}>
              {item.label}
            </span>
          </Link>
        )}
      </div>
    );
  };

  // Mobile Bottom Navigation Item
  const renderMobileNavItem = (item: SidebarItem, index: number, isLastBottomItem: boolean = false) => {
    const isActive = isItemOrChildActive(item);
    const hasSubItems = item.children && item.children.length > 0;
    const isShowingSubMenu = showMobileSubMenu === item.label;
    const isLogout = isLastBottomItem;

    if (hasSubItems) {
      return (
        <div key={index} className="relative">
          <button
            onClick={() => toggleMobileSubMenu(item.label)}
            className={`flex flex-col items-center justify-center px-2 py-1
              ${isLogout ? 'text-red-500' : 
                isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {item.icon && <span className="text-xl mb-1">{item.icon}</span>}
            <span className="text-xs">{item.label}</span>
          </button>
          
          {isShowingSubMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
              {item.children?.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  href={child.href || '#'}
                  className={`flex items-center px-4 py-2 transition-colors duration-150
                    ${pathname === child.href ? 'bg-primary/10 text-primary' : 'dark:text-text-dark-secondary text-text-light-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  onClick={() => setShowMobileSubMenu(null)}
                >
                  {child.icon && <span className="mr-3 text-lg">{child.icon}</span>}
                  <span>{child.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={index}
        href={item.href || '#'}
        className={`flex flex-col items-center justify-center px-2 py-1
          ${isLogout ? 'text-red-500' : 
            isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
      >
        {item.icon && <span className="text-xl mb-1">{item.icon}</span>}
        <span className="text-xs">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - Always fixed width */}
      <aside
        className="fixed top-[60px] left-0 z-40 hidden md:flex flex-col h-[calc(100vh-60px)] w-64 bg-background-light dark:bg-background-dark border-r border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {logo && (
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {logo.icon}
              <span className="text-xl font-bold ml-2">{logo.label}</span>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex-grow overflow-y-auto scrollbar-thin p-4">
          <nav className="space-y-1">
            {items.map((item, index) => renderSidebarItem(item, index))}
          </nav>
        </div>

        {/* Bottom Navigation (Settings, Logout, etc) */}
        {bottomItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="space-y-1">
              {bottomItems.map((item, index) => 
                renderSidebarItem(item, index, index === bottomItems.length - 1)
              )}
            </nav>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center py-2 px-2 z-50">
        {items.slice(0, 4).map((item, index) => renderMobileNavItem(item, index))}
        
        {/* More button for additional items if needed */}
        {(items.length > 4 || bottomItems.length > 0) && (
          <div className="relative">
            <button
              onClick={() => toggleMobileSubMenu('more')}
              className="flex flex-col items-center justify-center px-2 py-1 text-gray-500 dark:text-gray-400"
            >
              <span className="text-xl mb-1">•••</span>
              <span className="text-xs">More</span>
            </button>
            
            {showMobileSubMenu === 'more' && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                {items.slice(4).map((item, index) => (
                  <Link
                    key={index}
                    href={item.href || '#'}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowMobileSubMenu(null)}
                  >
                    {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {bottomItems.length > 0 && items.length > 4 && (
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                )}
                
                {bottomItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href || '#'}
                    className={`flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 
                      ${index === bottomItems.length - 1 ? 'text-red-500' : ''}`}
                    onClick={() => setShowMobileSubMenu(null)}
                  >
                    {item.icon && <span className={`mr-3 text-lg ${index === bottomItems.length - 1 ? 'text-red-500' : ''}`}>
                      {item.icon}
                    </span>}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
