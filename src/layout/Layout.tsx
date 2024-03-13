import { Outlet } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { TabNavigator } from './TabNavigator'

export const Layout: React.FC = () => {
  return (
    <Flex
      display={{ base: 'block', sm: 'flex' }}
      direction="column"
      minHeight="100vh"
      paddingTop={{ base: 8, sm: 0 }}
      paddingBottom={{ base: 12, sm: 0, md: 0 }}
    >
      <Flex as="main" flex={1} minW={0} position="relative">
        <Outlet />
      </Flex>
      <TabNavigator />
    </Flex>
  )
}
