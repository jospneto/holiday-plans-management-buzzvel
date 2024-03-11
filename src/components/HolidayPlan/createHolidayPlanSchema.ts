import { z } from 'zod'

export const createHolidayPlanSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  participants: z.array(z.object({
    name: z.string(),
    email: z.string()
  })).optional()
})

export type CreateHolidayPlan = z.infer<typeof createHolidayPlanSchema>
