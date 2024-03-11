import { Route, Routes as RouterDOMRoutes } from 'react-router-dom'
import { Layout } from '../layout'
import { ListHolidayEvents } from '../components'

export const Routes: React.FC = () => {
  return (
    <RouterDOMRoutes>
      <Route path='' element={<Layout />}>
        <Route path='' element={<ListHolidayEvents />} />
      </Route>
    </RouterDOMRoutes>
  )
}
