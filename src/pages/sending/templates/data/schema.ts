import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  message: z.string(),
  messageType:z.enum(['dynamic','static']),
  name: z.string(),
  customerId: z.number(),
  id: z.number(),
  createdAt:z.string(),
  updatedAt:z.string(),
  active:z.boolean(),
})

export type DataSchema = z.infer<typeof schema>
