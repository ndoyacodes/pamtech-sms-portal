import { z } from 'zod'

export const formSchema = z.object({
    message: z.string(),
    messageType:z.enum(['dynamic','static']),
    name: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>
