import {NavItem} from "@/types/model.tsx";

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: 'dashboard',
        label: 'Dashboard'
    },
    {
        title: 'Products',
        href: '/product',
        icon: 'media',
        label: 'Product'
    },
    {
        title: 'Customers',
        href: '/customer',
        icon: 'user',
        label: 'Customer'
    },
    {
        title: 'Invoices',
        href: '/invoice',
        icon: 'billing',
        label: 'Invoices'
    }
];