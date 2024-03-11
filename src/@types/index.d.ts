// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn<A = any[], R> = (...args: A) => R

interface HolidayPlanParticipant {
  id: string
  avatar: string
  name: string
  email: string
}

interface HolidayPlan {
  id: string
  title: string
  description: string
  date: string
  location: string
  participants: Array<HolidayPlanParticipant>
}
