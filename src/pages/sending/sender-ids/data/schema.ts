import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  id: z.number(),
  senderId: z.string(),
  price: z.number(),
  billingCycle: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM']),
  status: z.boolean(),
  createdAt:z.string(),
  updatedAt:z.string(),
  activated:z.any(),
  customer:z.any(),
  user:z.any()
})

export type DataSchema = z.infer<typeof schema>
