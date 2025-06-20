import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  type: z.string(),
  details: z.string(),
  amount: z.string(),
  status: z.string(),
})

export type Invoice = z.infer<typeof taskSchema>
