import {
    IconLayoutDashboard,
    IconMessages,
    IconUserScreen,
    IconShoppingCart,
    IconPhoneCall,
    IconTemplate,
    IconDashboard,
    IconReport,
    IconReportAnalytics,
    IconBrandTelegram,
    IconCpu2,
    IconFilePhone,
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
      title: 'Phone book',
      label: '',
      href: '/contacts',
      icon: <IconFilePhone size={18} />,
    },
    {
      title: 'Subscriptions',
      label: '',
      href: '/subcriptions',
      icon: <IconShoppingCart size={18} />,
    },
    {
        title: 'Campaigns',
        label: '',
        href: '/automations',
        icon: <IconBrandTelegram size={18} />,
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
        // {
        //   title: 'Numbers',
        //   label: '',
        //   href: '/phone-numbers',
        //   icon: <IconPhoneCall size={18} />,
        // },
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
        href: '/blacklists',
        icon: <IconShoppingCart size={18} />,
      } ,
      
      {
        title: 'SMS',
        label: '',
        href: '/requests',
        icon: <IconMessages size={18} />,
        sub: [
          // {
          //   title: 'Campaigns builder',
          //   label: '',
          //   href: '/sms/campaign-builder',
          //   icon: <IconUserScreen size={18} />,
          // },
          {
           title: 'Send Bulk SMS',
            label: '',
            href: '/sms/send-bulk-sms',
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
          href: '/reports/all-messages',
          icon: <IconReportAnalytics size={18} />,
        },
        // {
        //     title: 'received messages',
        //     label: '',
        //     href: '/reports/all-messages',
        //     icon: <IconReportAnalytics size={18} />,
        //   },
          {
            title: 'sent messages',
            label: '',
            href: '/reports/all-messages',
            icon: <IconReportAnalytics size={18} />,
          },
      ],
    },
    {
      title: 'Developers',
      label: '',
      href: '/developers',
      icon: <IconCpu2 size={18} />,
    } ,
  
  
  ]
  