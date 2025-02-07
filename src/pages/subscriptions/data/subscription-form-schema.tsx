import { z } from 'zod'

export const formSchema = z.object({
  customer: z.any(),
  plan: z.string(),
  notificationNumberOfDays: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>
