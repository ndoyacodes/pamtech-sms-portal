import {
  IconLayoutDashboard,
  IconMessages,
  IconUserScreen,
  IconTemplate,
  IconSettings,
  IconDashboard,
  IconReport,
  IconReportAnalytics,
  IconFilePhone,
  IconLayersSubtract,
  IconUser, 
  IconAtOff,
  IconSend,
  IconCurrencyDollar,  
  IconHistory,
  IconHome, 
  IconLogout,
  IconCreditCard
} from '@tabler/icons-react'

  
  export interface NavLink {
    title: string
    label?: string
    href: string
    icon: JSX.Element
    isLogout?: boolean
  }
  
  export interface SideLink extends NavLink {
    sub?: NavLink[]
  }
  
  export const sidelinksAccount: SideLink[] = [
    {
      title: 'Dashboard',
      label: '',
      href: '/dashboard',
      icon: <IconLayoutDashboard size={18} />,
      isLogout: false,
    },
    {
      title: 'Send SMS',
      label: '',
      href: '/requests',
      icon: <IconMessages size={18} />,
      isLogout: false,
      sub: [
        {
          title: 'Quick Send',
          label: '',
          href: '/sms/send-bulk-sms',
          icon: <IconSend size={18} />,
          isLogout: false,
        },
        {
          title: 'Campaigns',
          label: '',
          href: '/automations',
          icon: <IconMessages size={18} />,
          isLogout: false,
        },
        {
          title: 'Outbox',
          label: '',
          href: '/reports',
          icon: <IconReport size={18} />,
          isLogout: false,
        }
      ],
    },
    {
      title: 'Contacts',
      label: '',
      href: '/contacts',
      icon: <IconFilePhone size={18} />,
      isLogout: false,
      sub: [
        {
          title: 'Contact lists',
          label: '',
          href: '/contacts',
          icon: <IconFilePhone size={18} />,
          isLogout: false,
        },
        {
          title: 'Blacklist',
          label: '',
          href: '/blacklists',
          icon: <IconAtOff size={18} />,
          isLogout: false,
        },
      ],
    },
    {
      title: 'Billing',
      label: '',
      href: '/subscriptions',
      icon: <IconLayersSubtract size={18} />,
      isLogout: false,
      sub: [
        {
          title: 'Subscriptions',
          label: '',
          href: '/subscriptions',
          icon: <IconHistory size={18} />,
          isLogout: false,
        },
         {
          title: 'Payments',
          label: '',
          href: '/payments',
          icon: <IconCreditCard size={18} />,
          isLogout: false,
        },
        {
          title: 'Invoices',
          label: '',
          href: '/invoices',
          icon: <IconLayersSubtract size={18} />,
          isLogout: false,
        },
        {
          title: 'Pricing',
          label: '',
          href: '/pricing-buy',
          icon: <IconCurrencyDollar size={18} />,
          isLogout: false,
        },
      ]
    },
    {
      title: 'User Management',
      label: '',
      href: '/users',
      icon: <IconUser size={18} />,
      isLogout: false,
    },
    {
      title: 'Settings',
      label: '',
      href: '/developers',
      icon: <IconSettings size={18} />,
      isLogout: false,
      sub: [
        {
          title: 'Sender ID',
          label: '',
          href: '/sender-ids',
          icon: <IconUserScreen size={18} />,
          isLogout: false,
        },
        {
          title: 'SMS Templates',
          label: '',
          href: '/templates',
          icon: <IconTemplate size={18} />,
          isLogout: false,
        },
        {
          title: 'Preferences',
          label: '',
          href: '/settings',
          icon: <IconReportAnalytics size={18} />,
          isLogout: false,
        },
        {
          title: 'Developers',
          label: '',
          href: 'developers',
          icon: <IconDashboard size={18} />,
          isLogout: false,
        },
      ],
    },
    {
      title: 'Home',
      label: '',
      href: '/',
      icon: <IconHome size={18} />,
      isLogout: false,
    },
    
    {
      title: 'Sign out',
      label: '',
      href: '',
      icon: <IconLogout size={18} />,
      isLogout: true,
    },
  ]
  