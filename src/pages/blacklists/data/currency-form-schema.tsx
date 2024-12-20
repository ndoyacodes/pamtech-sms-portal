import { z } from 'zod'

export const formSchema = z.object({
name: z.string().min(1, 'Name is required'),
code: z.string().min(1, 'Code is required').max(5, 'Code must be 5 characters or less'),
format: z.string().min(1, 'Format is required')
})

export type FormSchema = z.infer<typeof formSchema>
