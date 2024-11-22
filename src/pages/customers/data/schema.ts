import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  createdAt: z.date(),
  isActive: z.boolean(),
})

export type Customer = z.infer<typeof customerSchema>
