import { createContext, useCallback, useState } from 'react'

import { useToast } from '@chakra-ui/react'

import { getHolidayPlans } from '../api'
import { useAsync } from '../hooks'

interface HolidayPlanContext {
  holidayPlans: Array<HolidayPlan>
  isLoading: boolean
  onAddHolidayPlan: (holidayPlan: HolidayPlan) => void
  onRemoveHolidayPlan: (holidayPlanId: string) => void
  onUpdatedHolidayPlan: (holidayPlan: HolidayPlan) => void
}

interface HolidayPlanProviderProps {
  children: React.ReactElement
}

export const HolidayPlanContext = createContext<HolidayPlanContext>(
  {} as HolidayPlanContext,
)

export const HolidayPlanProvider: React.FC<HolidayPlanProviderProps> = ({
  children,
}) => {
  const [holidayPlans, setHolidayPlans] = useState<HolidayPlan[]>([])
  const toast = useToast()
  const { status } = useAsync(getHolidayPlans, {
    enabled: true,
    onSuccess: (data) => {
      setHolidayPlans(data)
    },
    onError: () => {
      toast({
        status: 'error',
        title: 'Oops, something happened!',
        description:
          'An error occurred while trying to get plans. Please try again later.',
      })
    },
  })

  const onAddHolidayPlan = useCallback((holidayPlan: HolidayPlan) => {
    setHolidayPlans((state) => [...state, holidayPlan])
  }, [])

  const onRemoveHolidayPlan = useCallback((holidayPlanId: string) => {
    setHolidayPlans((state) => state?.filter((s) => s._id !== holidayPlanId))
  }, [])

  const onUpdatedHolidayPlan = useCallback((holidayPlan: HolidayPlan) => {
    setHolidayPlans((state) =>
      state?.map((s) => (s._id === holidayPlan._id ? holidayPlan : s)),
    )
  }, [])

  return (
    <HolidayPlanContext.Provider
      value={{
        holidayPlans,
        isLoading: status === 'pending',
        onAddHolidayPlan,
        onRemoveHolidayPlan,
        onUpdatedHolidayPlan,
      }}
    >
      {children}
    </HolidayPlanContext.Provider>
  )
}
