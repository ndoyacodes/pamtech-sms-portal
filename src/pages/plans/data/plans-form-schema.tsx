import { z } from 'zod'

export const formSchema = z.object({
    name: z.string(),
    pricePerSms: z.number(),
    billingCycle: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
    customerVisible: z.boolean(),
    popular: z.boolean()
})

export type FormSchema = z.infer<typeof formSchema>
