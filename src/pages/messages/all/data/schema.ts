import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  campaign: z.null().optional(),
  senderId: z.null().optional(),
  recipient: z.string(),
  message: z.string(),
  status: z.string(),
  statusSmsc: z.any().optional(),
  dlr: z.any().optional(),
  network: z.string(),
  smscUsername: z.any().optional(),
  smscPassword: z.string(),
  sendingNetwork: z.any().optional(),
  smsCount: z.number(),
  dateSent: z.string(),
  customer: z.any(),
  plan: z.any(),
  messageId: z.string(),
  smsType: z.string(),
  template: z.any().optional(),
  deliveryDate: z.any().optional(),
  initiatedBy: z.any().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Invoice = z.infer<typeof taskSchema>
