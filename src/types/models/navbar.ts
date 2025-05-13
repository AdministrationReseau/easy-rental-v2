// import React from "react";

export type NavLink = {
	href: string;
	label: string;
	icon?: React.ReactNode;
};

export type NavAction = {
	type: 'link' | 'button' | 'dropdown' | 'icon';
	label?: string;
	href?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	badge?: number;
	items?: { label: string; href: string; icon?: React.ReactNode }[];
	className?: string;
};

export type NavbarProps = {
	logo?: {
		href: string;
		label: string;
		icon?: React.ReactNode;
	};
	links?: NavLink[];
	actions?: NavAction[];
	showLanguageSwitcher?: boolean;
	showThemeSwitcher?: boolean;
};