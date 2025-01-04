import { z } from 'zod'

export const customerTypeEnum = z.enum(['POSTPAID', 'PREPAID'])
export type CustomerType = z.infer<typeof customerTypeEnum>

export const customerFormSchema = z.object({
  email: z.string().min(1, { message: 'Please enter email' }).email({ message: 'Invalid email format' }),
  firstName: z.string().min(1, { message: 'Please enter first name' }),
  lastName: z.string().min(1, { message: 'Please enter last name' }),
  timezone: z.string().min(1, { message: 'Please select Time zone' }),
  status: z.boolean(),
  language: z.string().min(1, { message: 'Please select language' }),
  companyName: z.string().min(1, { message: 'Please enter company name' }),
  website: z.string().url({ message: 'Invalid website URL' }).optional(),
  kycFile: z.any(),
  customerType: customerTypeEnum,
  countryCode: z.string().min(1, { message: 'Please select country code' }),
  phoneNumber: z.string().min(1, { message: 'Please enter phone number' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(7, { message: 'Password must be at least 7 characters long' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type CustomerSchema = z.infer<typeof customerFormSchema>