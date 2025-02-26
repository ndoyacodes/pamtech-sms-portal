import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  campaign: z.any().optional(),
  senderId: z.any().optional(),
  recipient: z.any().optional(),
  message: z.any().optional(),
  status: z.any().optional(),
  statusSmsc: z.any().optional(),
  dlr: z.any().optional(),
  network: z.any().optional(),
  smscUsername: z.any().optional(),
  smscPassword: z.any().optional(),
  sendingNetwork: z.any().optional(),
  smsCount: z.any().optional(),
  dateSent: z.any().optional(),
  customer: z.any().optional(),
  plan: z.any().optional(),
  messageId: z.any().optional(),
  smsType: z.any().optional(),
  template: z.any().optional(),
  deliveryDate: z.any().optional(),
  initiatedBy: z.any().optional(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
})

export type Invoice = z.infer<typeof taskSchema>
