import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import RequireAuth from './components/require-auth.tsx'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in-other',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-other.tsx')).default,
    }),
  },
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in.tsx')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },

  // Main routes
 {
   element: <RequireAuth />,
   children:[
    {
      path: '/',
      lazy: async () => {
        const AppShell = await import('./components/app-shell')
        return { Component: AppShell.default }
      },
      errorElement: <GeneralError />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import('./pages/dashboard')).default,
          }),
        },
        {
          path: '/invoices',
          lazy: async () => ({
            Component: (await import('@/pages/invoices')).default,
          }),
        },
        {
          path: '/automations',
          lazy: async () => ({
            Component: (await import('@/pages/automations')).default,
          }),
        },
        {
          path: '/automations/:id',
          lazy: async () => ({
            Component: (await import('@/pages/automations/components/add-edit-automations.tsx')).default,
          }),
        },
        {
          path: '/customers',
          lazy: async () => ({
            Component: (await import('@/pages/customers')).default,
          }),
        },
        {
          path: '/customer/:id',
          lazy: async () => ({
            Component: (await import('@/pages/customers/components/customer-details.tsx')).default,
          }),
        },
        {
          path: '/customers/add',
          lazy: async () => ({
            Component: (await import('@/pages/customers/components/add-edit-customer.tsx')).default,
          }),
        },
        {
          path: '/subscriptions',
          lazy: async () => ({
            Component: (await import('@/pages/subscriptions')).default,
          }),
        },
        {
          path: '/subscriptions/add',
          lazy: async () => ({
            Component: (await import('@/pages/subscriptions/components/add-edit-suscription.tsx')).default,
          }),
        },
        {
          path: '/plans',
          lazy: async () => ({
            Component: (await import('@/pages/plans')).default,
          }),
        },
        {
          path: '/plans/add',
          lazy: async () => ({
            Component: (await import('@/pages/plans/components/add-edit-plans.tsx')).default,
          }),
        },
        {
          path: '/currencies',
          lazy: async () => ({
            Component: (await import('@/pages/currency')).default,
          }),
        },
        {
          path: '/currencies/add',
          lazy: async () => ({
            Component: (await import('@/pages/currency/components/add-edit-currency.tsx')).default,
          }),
        },
        {
          path: '/sender-ids',
          lazy: async () => ({
            Component: (await import('@/pages/sending/sender-ids')).default,
          }),
        },
        {
          path: '/sender-ids/add',
          lazy: async () => ({
            Component: (await import('@/pages/sending/sender-ids/components/create-edit-sender.tsx')).default,
          }),
        },
        {
          path: 'phone-numbers',
          lazy: async () => ({
            Component: (await import('@/pages/sending/numbers')).default,
          }),
        },
        {
          path: 'phone-numbers/add',
          lazy: async () => ({
            Component: (await import('@/pages/sending/numbers/components/add-edit-numbers.tsx')).default,
          }),
        },
        {
          path: 'upload-phonebook',
          lazy: async () => ({
            Component: (await import('@/pages/contact-groups/components/phonebook.tsx')).default,
          }),
        },
        {
          path: 'keywords',
          lazy: async () => ({
            Component: (await import('@/pages/sending/keywords')).default,
          }),
        },
        {
          path: 'keywords/add',
          lazy: async () => ({
            Component: (await import('@/pages/sending/keywords/components/add-edit-keywords.tsx')).default,
          }),
        },
        {
          path: 'templates',
          lazy: async () => ({
            Component: (await import('@/pages/sending/templates')).default,
          }),
        },
        {
          path: 'templates/add',
          lazy: async () => ({
            Component: (await import('@/pages/sending/templates/components/add-edit-templates.tsx')).default,
          }),
        },
        {
          path: 'templates-tags',
          lazy: async () => ({
            Component: (await import('@/pages/sending/template-tags')).default,
          }),
        },
        {
          path: 'templates-tags/add',
          lazy: async () => ({
            Component: (await import('@/pages/sending/template-tags/components/add-edit-templates.tsx')).default,
          }),
        },
        {
          path: 'chats',
          lazy: async () => ({
            Component: (await import('@/pages/chats')).default,
          }),
        },
        {
          path: 'apps',
          lazy: async () => ({
            Component: (await import('@/pages/apps')).default,
          }),
        },
        {
          path: 'users',
          lazy: async () => ({
            Component: (await import('@/components/coming-soon')).default,
          }),
        },
        {
          path: 'contacts',
          lazy: async () => ({
            Component: (await import('@/pages/contact-groups')).default,
          }),
        },
        {
          path: 'contacts/add',
          lazy: async () => ({
            Component: (await import('@/pages/contact-groups/components/add-edit-contact.tsx')).default,
          }),
        },
        {
          path: 'blacklists',
          lazy: async () => ({
            Component: (await import('@/pages/blacklists')).default,
          }),
        },
        {
          path: 'blacklists/add',
          lazy: async () => ({
            Component: (await import('@/pages/blacklists/components/add-edit-blacklist.tsx')).default,
          }),
        },
        {
          path: 'analysis',
          lazy: async () => ({
            Component: (await import('@/components/coming-soon')).default,
          }),
        },
        {
          path: 'developers',
          lazy: async () => ({
            Component: (await import('@/pages/developers')).default,
          }),
        },
        {
          path: 'sms/campaign-builder',
          lazy: async () => ({
            Component: (await import('@/pages/campaign-builder')).default,
          }),
        },
        {
          path: 'sms/quick-send',
          lazy: async () => ({
            Component: (await import('@/pages/campaign-builder')).default,
          }),
        },
        {
          path: 'sms/top-up',
          lazy: async () => ({
            Component: (await import('@/pages/top-up')).default,
          }),
        },
        {
          path: 'extra-components',
          lazy: async () => ({
            Component: (await import('@/pages/extra-components')).default,
          }),
        },
        {
          path: 'reports',
          lazy: async () => ({
            Component: (await import('@/pages/messages/all')).default,
          }),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('@/pages/messages/all')).default,
              }),
            },  
            {
              path: 'all-messages',
              lazy: async () => ({
                Component: (await import('@/pages/messages/all')).default,
              }),
            },
          
         
          ],
        },
        {
          path: 'settings',
          lazy: async () => ({
            Component: (await import('./pages/settings')).default,
          }),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('./pages/settings/profile')).default,
              }),
            },
            {
              path: 'account',
              lazy: async () => ({
                Component: (await import('./pages/settings/account')).default,
              }),
            },
            {
              path: 'appearance',
              lazy: async () => ({
                Component: (await import('./pages/settings/appearance')).default,
              }),
            },
            {
              path: 'notifications',
              lazy: async () => ({
                Component: (await import('./pages/settings/notifications'))
                  .default,
              }),
            },
            {
              path: 'display',
              lazy: async () => ({
                Component: (await import('./pages/settings/display')).default,
              }),
            },
            {
              path: 'error-example',
              lazy: async () => ({
                Component: (await import('./pages/settings/error-example'))
                  .default,
              }),
              errorElement: <GeneralError className='h-[50svh]' minimal />,
            },
          ],
        },
      ],
    },
   ]
 },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
