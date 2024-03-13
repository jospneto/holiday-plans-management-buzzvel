import { api } from '../services'

export const getHolidayPlans = async () => {
  return api.get<HolidayPlan[]>('/holiday-plans').then((resp) => resp.data)
}

export interface HolidayPlanCreateOrUpdated
  extends Exclude<HolidayPlan, '_id'> {}

interface CreateOrUpdatedHolidayPlan {
  data: HolidayPlanCreateOrUpdated
}

export const createHolidayPlan = async ({
  data,
}: CreateOrUpdatedHolidayPlan) => {
  return api
    .post<HolidayPlan>('/holiday-plan-create', data)
    .then((resp) => resp.data)
}

interface DeleteOrUpdatedHolidayPlanParams {
  holidayPlanId: string
}

export const deleteHolidayPlan = async ({
  holidayPlanId,
}: DeleteOrUpdatedHolidayPlanParams) => {
  return api
    .delete<HolidayPlan>(`/holiday-plan/${holidayPlanId}`)
    .then((resp) => resp.data)
}

export const updatedHolidayPlan = async ({
  holidayPlanId,
}: DeleteOrUpdatedHolidayPlanParams) => {
  return api
    .put<HolidayPlan>(`/holiday-plan/${holidayPlanId}`)
    .then((resp) => resp.data)
}
