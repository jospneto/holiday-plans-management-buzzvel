import { Flex } from '@chakra-ui/react'

import { Outlet } from 'react-router-dom'
import { TabNavigator } from './TabNavigator'
import { Header } from './Header'

export const Layout: React.FC = () => {
  return (
    <Flex flexDir="column" height="100vh">
      <Flex as="main" paddingX={{ base: 4, sm: 8 }} paddingY={{ base: 4, sm: 8 }} >
        <Header />
        <Outlet />
      </Flex>
      <TabNavigator />
    </Flex>
  )
}
