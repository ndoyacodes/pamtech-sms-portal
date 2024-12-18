import {
  IconLayoutDashboard,
  IconMessages,
  IconSettings,
  IconUsers,
  IconUserScreen,
  IconShoppingCart,
  IconUsersPlus,
  IconLayersSubtract,
  IconBusinessplan,
  IconCurrencyDollar,
  IconPhoneCall,
  IconKeyboardShow,
  IconTemplate,
  IconTag,
  IconUserExclamation,
  IconBoxOff,
  IconDashboard,
  IconReport,
  IconReportAnalytics,
  IconBrandTelegram,
  IconRecordMail,
  
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Invoices',
    label: '',
    href: '/invoices',
    icon: <IconShoppingCart size={18} />,
  },
  // {
  //   title: 'Farmers Harvests',
  //   label: '',
  //   href: '/harvests',
  //   icon: <IconScale size={18} />,
  // },
  {
    title: 'Customers',
    label: '',
    href: '/customers',
    icon: <IconUsersPlus size={18} />,
    sub: [
      {
        title: 'Customers',
        label: '',
        href: '/customers',
        icon: <IconUsers size={18} />,
      },
      {
        title: 'Subscriptions',
        label: '',
        href: '/subscriptions',
        icon: <IconLayersSubtract size={18} />,
      },

    ],
  },
  {
    title: 'Plan',
    label: '',
    href: '/Plans',
    icon: <IconBusinessplan size={18} />,
    sub: [
      {
        title: 'Plan',
        label: '',
        href: '/plans',
        icon: <IconBusinessplan size={18} />,
      },
      {
        title: 'Currencies',
        label: '',
        href: '/currencies',
        icon: <IconCurrencyDollar size={18} />,
      },
    ],
  },
  {
    title: 'Sending',
    label: '',
    href: '/requests',
    icon: <IconMessages size={18} />,
    sub: [
      {
        title: 'Sender ID',
        label: '',
        href: '/sender-ids',
        icon: <IconUserScreen size={18} />,
      },
      {
        title: 'Numbers',
        label: '',
        href: '/phone-numbers',
        icon: <IconPhoneCall size={18} />,
      },
      {
        title: 'Templates',
        label: '',
        href: '/templates',
        icon: <IconTemplate size={18} />,
      },
      {
        title: 'Templates tags',
        label: '',
        href: '/templates-tags',
        icon: <IconTag  size={18} />,
      },
   
      {
        title: 'Keywords',
        label: '',
        href: '/keywords',
        icon: <IconKeyboardShow size={18} />,
      },
    ],
  },

  {
    title: 'Security',
    label: '',
    href: '/security',
    icon: <IconBusinessplan size={18} />,
    sub: [
      {
        title: 'Blacklist',
        label: '',
        href: '/blacklist',
        icon: <IconUserExclamation size={18} />,
      },
      {
        title: 'Spam words',
        label: '',
        href: '/spam-words',
        icon: <IconBoxOff size={18} />,
      },
    ],
  },
  {
    title: 'Settings',
    label: '',
    href: '/security',
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: 'Email templates',
        label: '',
        href: '/email-templates',
        icon: <IconRecordMail size={18} />,
      },

    ],
  },


  //Admin Modules
  {
    title: 'Reports',
    label: '',
    href: '/requests',
    icon: <IconReport size={18} />,
    sub: [
      {
        title: 'Dashboard',
        label: '',
        href: '/dashboard',
        icon: <IconDashboard size={18} />,
      },
      {
        title: 'Sms History',
        label: '',
        href: '/sms-history',
        icon: <IconReportAnalytics size={18} />,
      },
      {
        title: 'Compaigins',
        label: '',
        href: '/compaigins',
        icon: <IconBrandTelegram size={18} />,
      },
    ],
  },



]
