import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subscriptionSchema = z.object({
  id: z.string(),
  firstName: z.any(),
  lastName: z.number(),
  email: z.number(),
  phoneNumber: z.boolean(),
  role: z.any(),
})

export type Invoice = z.infer<typeof subscriptionSchema>
