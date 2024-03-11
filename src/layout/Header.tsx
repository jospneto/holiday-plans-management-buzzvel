import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { FiCalendar } from 'react-icons/fi'

export const Header: React.FC = () => {
  const todayDate = format(new Date().getDay(), 'dd')
  const todayMonth = format(new Date().getMonth(), 'MMMM')

  return (
    <HStack width="full" alignItems="center" justifyContent="space-between" spacing={4} marginLeft={{ base: 'none', sm: 24 }}>
      <Text as="span" fontSize="xx-large" fontWeight={500} noOfLines={2} whiteSpace="break-spaces" color="gray.600">Holiday New Events</Text>
      <Stack alignItems="center" justifyContent="center" rounded="md" border="1px" borderColor="gray.300" padding={4} boxShadow="md">
        <HStack width="full" alignItems="center" justifyContent="center" minW={0}>
          <Text as="span" fontWeight="medium" color="gray.600">{todayDate}</Text>
          <Icon as={FiCalendar} color="gray.600" />
        </HStack>
        <Text as="span" fontWeight="medium" color="gray.600">{todayMonth}</Text>
      </Stack>
    </HStack>
  )
}
