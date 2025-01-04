import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  timezone: z.string(),
  status: z.boolean(),
  language: z.string(),
  companyName: z.string(),
  website: z.string().url(),
  customerType: z.enum(['POSTPAID', 'PREPAID'])
})

export type Customer = z.infer<typeof customerSchema>
