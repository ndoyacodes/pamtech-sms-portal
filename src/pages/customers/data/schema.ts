import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  timezone: z.any(),
  status: z.boolean(),
  language: z.any(),
  companyName: z.any(),
  website: z.any(),
  customerType: z.any(),
  approvalStatus: z.string()
})

export type Customer = z.infer<typeof customerSchema>
