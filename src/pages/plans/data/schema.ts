import { z } from 'zod'

export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  pricePerSms: z.any(),
  billingCycle: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  customerVisible: z.boolean(),
  popular: z.boolean()
})

export type Invoice = z.infer<typeof taskSchema>
