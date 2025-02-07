import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subscriptionSchema = z.object({
  id: z.string(),
  customer: z.any(),
  numberOfSmsPurchased: z.number(),
  currentBalance: z.number(),
  expired: z.boolean(),
  expiryDate: z.any(),
  createdAt: z.any(),
})

export type Invoice = z.infer<typeof subscriptionSchema>
