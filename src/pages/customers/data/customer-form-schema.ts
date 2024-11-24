import { z } from 'zod'

export const formSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter first name' }),
  email: z.string().min(1, { message: 'Please enter middle name' }),
  lastName: z.string().min(1, { message: 'Please enter last name' }),
  timezone: z.string().min(1, { message: 'Please select Time zone' }),
  language: z.string().min(1, { message: 'Please select Time zone' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(1, { message: 'Please enter phone number' }),
  status: z.string().min(1, { message: 'Status is empty' }),
  image: z.any(),
  sendEmail: z.boolean(),
})

export type FormSchema = z.infer<typeof formSchema>
