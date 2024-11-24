import { z } from 'zod'

export const formSchema = z.object({
name: z.string().min(1, 'Name is required'),
price: z.number().min(0, 'Price must be positive'),
billingCycle: z.string().min(1, 'Billing cycle is required'),
currency: z.string().min(1, 'Currency is required'),
showInCustomer: z.boolean(),
billingInfoRequired: z.boolean(),
isPopular: z.boolean()
})

export type FormSchema = z.infer<typeof formSchema>
