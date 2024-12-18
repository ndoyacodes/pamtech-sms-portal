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
  
  export const sidelinksAccount: SideLink[] = [
    {
      title: 'Dashboard',
      label: '',
      href: '/',
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: 'Contacts',
      label: '',
      href: '/invoices',
      icon: <IconShoppingCart size={18} />,
    },
    {
        title: 'Automations',
        label: '',
        href: '/invoices',
        icon: <IconShoppingCart size={18} />,
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
          title: 'Sms Templates',
          label: '',
          href: '/templates',
          icon: <IconTemplate size={18} />,
        },
    
      ],
    },
    {
        title: 'Blacklist',
        label: '',
        href: '/invoices',
        icon: <IconShoppingCart size={18} />,
      } ,
      
      {
        title: 'SMS',
        label: '',
        href: '/requests',
        icon: <IconMessages size={18} />,
        sub: [
          {
            title: 'Campaigns builder',
            label: '',
            href: '/sender-ids',
            icon: <IconUserScreen size={18} />,
          },
          {
           title: 'Quick Send',
            label: '',
            href: '/phone-numbers',
            icon: <IconPhoneCall size={18} />,
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
          title: 'Analysis',
          label: '',
          href: '/dashboard',
          icon: <IconDashboard size={18} />,
        },
        {
          title: 'all messages',
          label: '',
          href: '/sms-history',
          icon: <IconReportAnalytics size={18} />,
        },
        {
            title: 'received messages',
            label: '',
            href: '/sms-history',
            icon: <IconReportAnalytics size={18} />,
          },
          {
            title: 'sent messages',
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
  