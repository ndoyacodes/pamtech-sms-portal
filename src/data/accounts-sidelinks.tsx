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
  IconUser, IconAtOff, IconSend, IconCurrencyDollar,   IconHistory
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
  
  export const sidelinksAccount: SideLink[] = [
    {
      title: 'Dashboard',
      label: '',
      href: '/dashboard',
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: 'Send SMS',
      label: '',
      href: '/requests',
      icon: <IconMessages size={18} />,
      sub: [
        {
         title: 'Quick Send',
          label: '',
          href: '/sms/send-bulk-sms',
          icon: <IconSend size={18} />,
        },
        {
          title: 'Campaigns',
          label: '',
          href: '/automations',
          icon: <IconMessages size={18} />,
        },
         {
      title: 'Outbox',
      label: '',
      href: '/reports',
      icon: <IconReport size={18} />,
    }
    
      ],
    },
    {
      title: 'Contacts list',
      label: '',
      href: '/contacts',
      icon: <IconFilePhone size={18} />,
      sub: [
        {
          title: 'Contacts',
          label: '',
          href: '/contacts',
          icon: <IconFilePhone size={18} />,
        },
        {
          title: 'Blacklist',
          label: '',
          href: '/blacklists',
          icon: <IconAtOff size={18} />,
        },
    
      ],

    },
    
     {
      title: 'Billing',
      label: '',
      href: '/subscriptions',
      icon: <IconLayersSubtract size={18} />,
      sub: [
        {
          title: 'History',
          label: '',
          href: '/subscriptions',
          icon: <IconHistory size={18} />,
        },
         {
          title: 'Invoices',
          label: '',
          href: '/invoices',
          icon: <IconLayersSubtract size={18} />,
        },
        {
          title: 'Pricing',
          label: '',
          href: '/pricing-buy',
          icon: <IconCurrencyDollar size={18} />,
        },
      ]
    },

     {
      title: 'User Management',
      label: '',
      href: '/users',
      icon: <IconUser size={18} />,
    } ,
    {
      title: 'Settings',
      label: '',
      href: '/developers',
      icon: <IconSettings size={18} />,
      sub: [
       
        {
          title: 'Sender ID',
          label: '',
          href: '/sender-ids',
          icon: <IconUserScreen size={18} />,
        },
        {
          title: 'SMS Templates',
          label: '',
          href: '/templates',
          icon: <IconTemplate size={18} />,
        },
        {
          title: 'Preferences',
          label: '',
          href: '/settings',
          icon: <IconReportAnalytics size={18} />,
        },
        {
          title: 'Developers',
          label: '',
          href: 'developers',
          icon: <IconDashboard size={18} />,
        },
      ],
    } ,
  
  
  ]
  