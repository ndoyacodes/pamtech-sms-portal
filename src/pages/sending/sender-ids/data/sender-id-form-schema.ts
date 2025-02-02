import { z } from 'zod'

export const formSchema = z.object({
name: z.string().min(1, 'name is required'),
})

export type FormSchema = z.infer<typeof formSchema>
