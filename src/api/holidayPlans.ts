import { api } from '../services'

export const getHolidayPlans = async () => {
  return api.get<HolidayPlan[]>('/holiday-plans').then(resp => resp.data)
}

export const createHolidayPlan = async () => {
  return api.post<HolidayPlan>('/holiday-plan-create').then(resp => resp.data)
}

interface DeleteOrUpdatedHolidayPlanParams {
  holidayPlanId: string
}

export const deleteHolidayPlan = async ({ holidayPlanId }: DeleteOrUpdatedHolidayPlanParams) => {
  return api.delete<HolidayPlan>(`/holiday-plan/${holidayPlanId}`).then(resp => resp.data)
}

export const updatedHolidayPlan = async ({ holidayPlanId }: DeleteOrUpdatedHolidayPlanParams) => {
  return api.put<HolidayPlan>(`/holiday-plan/${holidayPlanId}`).then(resp => resp.data)
}