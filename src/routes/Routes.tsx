import { Route, Routes as RouterDOMRoutes } from 'react-router-dom'

import { ListHolidayPlans } from '../components'
import { Layout } from '../layout'

export const Routes: React.FC = () => {
  return (
    <RouterDOMRoutes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<ListHolidayPlans />} />
      </Route>
    </RouterDOMRoutes>
  )
}
