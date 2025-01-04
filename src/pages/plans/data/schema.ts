import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  pricePerSms: z.any(),
  billingCycle: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  customerVisible: z.boolean(),
  popular: z.boolean()
})

export type Invoice = z.infer<typeof taskSchema>
