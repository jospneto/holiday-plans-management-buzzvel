import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FiCalendar } from 'react-icons/fi'

import {
  Avatar,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'

import { CreateButton } from '../components'
import { generateFakeUser } from '../utils'

export const TabNavigator: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const fakeUser = generateFakeUser()

  return (
    <Stack
      flexDir={{ base: 'row', sm: 'column' }}
      bgColor="white"
      position="fixed"
      alignItems="center"
      justifyContent="space-evenly"
      minW={0}
      width={{ base: 'full', sm: '60px' }}
      height={{ base: '60px', sm: 'full' }}
      left={0}
      top={{ base: 'none', sm: 0 }}
      bottom={{ base: 0, sm: 'none' }}
      boxShadow="sm"
      zIndex={120}
    >
      <Popover placement={isMobile ? 'auto' : 'end-end'}>
        <PopoverTrigger>
          <IconButton
            icon={<FiCalendar size={24} />}
            aria-label="calender"
            variant="ghost"
            color="gray.500"
            padding={2}
            minW={0}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="500" color="gray.600">
            Calendar
          </PopoverHeader>
          <PopoverBody paddingX={4} paddingY={4}>
            <Calendar calendarType="US" />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <CreateButton
        data-testid="holiday-plan-create-button"
        size="sm"
        _hover={{ bgColor: 'primary.500' }}
      />
      <Avatar size="sm" src={fakeUser.avatar} name={fakeUser.name} minW={0} />
    </Stack>
  )
}
