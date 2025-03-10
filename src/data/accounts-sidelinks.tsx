import {
  IconLayoutDashboard,
  IconMessages,
  IconUserScreen,
  IconPhoneCall,
  IconTemplate,
  IconDashboard,
  IconReport,
  IconReportAnalytics,
  IconBrandTelegram,
  IconCpu2,
  IconFilePhone,
  IconLayersSubtract,
  IconUser, IconAtOff,
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
      title: 'Subscriptions',
      label: '',
      href: '/subscriptions',
      icon: <IconLayersSubtract size={18} />,
    },
    {
      title: 'SMS',
      label: '',
      href: '/requests',
      icon: <IconMessages size={18} />,
      sub: [
        {
         title: 'Send Bulk SMS',
          label: '',
          href: '/sms/send-bulk-sms',
          icon: <IconPhoneCall size={18} />,
        },
        {
          title: 'Campaigns',
          label: '',
          href: '/automations',
          icon: <IconBrandTelegram size={18} />,
        },
    
      ],
    },
    {
      title: 'Phone book',
      label: '',
      href: '/contacts',
      icon: <IconFilePhone size={18} />,
    },
    // {
    //   title: 'Subscriptions',
    //   label: '',
    //   href: '/subcriptions',
    //   icon: <IconShoppingCart size={18} />,
    // },

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
        icon: <IconAtOff size={18} />,
      } ,
    {
      title: 'Users',
      label: '',
      href: '/users',
      icon: <IconUser size={18} />,
    } ,
    {
      title: 'Reports',
      label: '',
      href: '/requests',
      icon: <IconReport size={18} />,
      sub: [
        {
          title: 'Analysis',
          label: '',
          href: '/',
          icon: <IconDashboard size={18} />,
        },
        {
          title: 'All Messages',
          label: '',
          href: '/reports/all-messages',
          icon: <IconReportAnalytics size={18} />,
        },
          {
            title: 'Sent Messages',
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
  