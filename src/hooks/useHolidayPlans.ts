import { useContext } from 'react'
import { HolidayPlanContext } from '../contexts'

export const useHolidayPlans = () => {
  const context = useContext(HolidayPlanContext)
  return context
}
