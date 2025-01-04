import { z } from 'zod'

export const formSchema = z.object({
price: z.string().min(1, 'price is required'),
billingCycle: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM']),
name: z.string().min(1, 'name is required'),
})

export type FormSchema = z.infer<typeof formSchema>
