import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  fileName: z.string(),
  count: z.number(),
  deleted: z.boolean(),
  active: z.boolean(),
  customer: z.any(),
  createdBy: z.any(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Phonebook = z.infer<typeof taskSchema>


// import { z } from 'zod'

// // We're keeping a simple non-relational schema here.
// // IRL, you will have a schema for your data models.
// export const phoneBookSchema = z.object({

// })

// export type Phonebook = z.infer<typeof phoneBookSchema>
