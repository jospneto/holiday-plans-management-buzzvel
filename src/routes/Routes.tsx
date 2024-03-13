import { Route, Routes as RouterDOMRoutes } from 'react-router-dom'

import { Layout } from '../layout'
import { ListHolidayPlans } from '../pages'

export const Routes: React.FC = () => {
  return (
    <RouterDOMRoutes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<ListHolidayPlans />} />
      </Route>
    </RouterDOMRoutes>
  )
}
