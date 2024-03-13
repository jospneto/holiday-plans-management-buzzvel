import { Flex } from '@chakra-ui/react'

import { Outlet } from 'react-router-dom'
import { TabNavigator } from './TabNavigator'

export const Layout: React.FC = () => {
  return (
    <Flex
      direction="column"
      minHeight="100vh"
      paddingTop={{ base: 12, sm: 16 }}
      paddingBottom={{ base: 12, sm: 16, md: 0 }}
    >
      <Flex as="main" flex={1} width={{ base: 'auto', sm: '100vh' }} minW={0} position="relative">
        <Outlet />
      </Flex>
      <TabNavigator />
    </Flex>
  )
}
