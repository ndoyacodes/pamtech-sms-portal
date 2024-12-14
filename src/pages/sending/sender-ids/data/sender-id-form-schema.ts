import { z } from 'zod'

export const formSchema = z.object({
senderID: z.string().min(1, 'Name is required'),
status: z.string().min(1, 'status is required'),
price: z.string().min(1, 'price is required'),
billing_cycle: z.string().min(1, 'billing cycle is required'),
customer: z.string().min(1, 'Customer is required'),
currency: z.string().min(1, 'Currency is required'),
})

export type FormSchema = z.infer<typeof formSchema>
