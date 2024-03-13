import { Avatar, Icon, Box, Stack } from '@chakra-ui/react'
import { CreateButton } from '../components'
import { FiCalendar } from 'react-icons/fi'

export const TabNavigator: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDir={{ base: 'row', sm: 'column' }}
      bgColor="white"
      position="fixed"
      width={{ base: 'full', sm: '80px' }}
      height={{ base: '80px', sm: 'full' }}
      boxShadow="sm"
      zIndex={120}
      left={0}
      bottom={0}
    >
      <Stack flexDir={{ base: 'row', sm: 'column' }} alignItems="center" justifyContent="space-evenly" height="full" width="full">
        <Icon as={FiCalendar} boxSize={6} color="gray.500" />
        <CreateButton size="sm" />
        <Avatar size="sm" src='https://bit.ly/sage-adebayo' />
      </Stack>
    </Box>
  )
}
