import { Avatar, HStack, Icon } from '@chakra-ui/react'
import { CreateButton } from '../components'
import { FiCalendar } from 'react-icons/fi'

export const TabNavigator: React.FC = () => {
  return (
    <HStack
      flexDir={{ base: 'row', sm: 'column' }}
      bgColor="white"
      position="fixed"
      width={{ base: 'full', sm: '80px' }}
      height={{ base: '80px', sm: 'full' }}
      paddingX={8}
      paddingY={8}
      alignItems="center"
      justifyContent="space-between"
      boxShadow="sm"
      bottom={0}>
      <Icon as={FiCalendar} boxSize={10} color="gray.500" />
      <CreateButton />
      <Avatar src='https://bit.ly/sage-adebayo' />
    </HStack>
  )
}
