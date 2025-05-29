import { ReactNode } from 'react';

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: SidebarItem[];
}

export interface SidebarLogo {
  label: string;
  icon: ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  bottomItems?: SidebarItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  logo?: SidebarLogo;
}
