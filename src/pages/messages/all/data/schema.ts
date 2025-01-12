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
  statusSmsc: z.null().optional(),
  dlr: z.null().optional(),
  network: z.string(),
  smscUsername: z.null().optional(),
  smscPassword: z.string(),
  sendingNetwork: z.null().optional(),
  smsCount: z.number(),
  dateSent: z.string(),
  customer: z.any(),
  plan: z.null().optional(),
  messageId: z.string(),
  smsType: z.string(),
  template: z.null().optional(),
  deliveryDate: z.null().optional(),
  initiatedBy: z.null().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Invoice = z.infer<typeof taskSchema>
