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
  IconUser, IconAtOff, IconSend
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
          title: 'SMS Templates',
          label: '',
          href: '/templates',
          icon: <IconTemplate size={18} />,
        },
    
      ],
    },
    // {
    //     title: 'Blacklist',
    //     label: '',
    //     href: '/blacklists',
    //     icon: <IconAtOff size={18} />,
    //   } ,
    {
      title: 'Users',
      label: '',
      href: '/users',
      icon: <IconUser size={18} />,
    } ,
     {
      title: 'History',
      label: '',
      href: '/reports',
      icon: <IconReport size={18} />,
      // sub: [
      // {
      //     title: 'All Messages',
      //     label: '',
      //     href: '/reports/all-messages',
      //     icon: <IconReportAnalytics size={18} />,
      //   },
      //     // {
      //     //   title: 'Sent Messages',
      //     //   label: '',
      //     //   href: '/reports/all-messages',
      //     //   icon: <IconReportAnalytics size={18} />,
      //     // },
      // ],

    } ,
    // {
    //   title: 'Reports',
    //   label: '',
    //   href: '/reports',
    //   icon: <IconReport size={18} />,
    // },
     {
      title: 'Billing',
      label: '',
      href: '/subscriptions',
      icon: <IconLayersSubtract size={18} />,
    },
    {
      title: 'Settings',
      label: '',
      href: '/developers',
      icon: <IconSettings size={18} />,
      sub: [
       
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
  