import { FiCalendar } from 'react-icons/fi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { IoLocationOutline } from 'react-icons/io5'
import { MdTitle } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'

import {
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
  HStack,
  Icon,
  Avatar,
  AvatarGroup,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react'

import logo from '../../public/holiday-icon.ico'
import { useHolidayPlans } from '../hooks'

interface CardHolidayPlan {
  holidayPlans: HolidayPlan
}

const CardHolidayPlan: React.FC<CardHolidayPlan> = ({ holidayPlans }) => {
  return (
    <Card width={{ base: '300px', sm: '380px' }} minW={0}>
      <CardBody gap={6} padding={4}>
        <Stack spacing={4}>
          <HStack width="full" justifyContent="space-between">
            <HStack>
              <Icon as={MdTitle} color="gray.600" />
              <Text as="span" color="gray.600">
                {holidayPlans.title}
              </Text>
            </HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                size="sm"
                variant="ghost"
                icon={<SlOptions />}
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Print</MenuItem>
                <MenuItem>PDF Download</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <HStack>
            <Icon as={FiCalendar} color="gray.600" />
            <Text as="span" color="gray.600">
              {holidayPlans.date}
            </Text>
          </HStack>
          <HStack>
            <Icon as={IoLocationOutline} color="gray.600" />
            <Text as="span" color="gray.600">
              {holidayPlans.location}
            </Text>
          </HStack>
          <HStack>
            <Icon as={GrTextAlignLeft} color="gray.600" />
            <Text as="span" color="gray.600">
              {holidayPlans.description}
            </Text>
          </HStack>
          <Stack spacing={4}>
            <Text as="span" color="gray.600">
              Participants
            </Text>
            <AvatarGroup size="sm" max={7} gap={4}>
              {holidayPlans.participants?.map((p) => (
                <Tooltip key={p._id} label={p.name} rounded="md">
                  <Avatar size="sm" src={p.avatar} name={p.name} />
                </Tooltip>
              ))}
            </AvatarGroup>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}

export const ListHolidayPlans: React.FC = () => {
  const { holidayPlans } = useHolidayPlans()

  return (
    <Container
      position="relative"
      paddingY={{ base: 2, sm: 4, lg: 8 }}
      paddingX={{ base: 0, lg: 4 }}
    >
      <Stack
        height="full"
        alignItems={{ base: 'center', sm: 'baseline' }}
        minH={0}
        spacing={6}
        paddingBottom={4}
      >
        <HStack
          spacing={4}
          alignItems="center"
          paddingBottom={4}
          textAlign="center"
        >
          <Image src={logo} position="relative" />
          <Text
            as="span"
            fontSize="xx-large"
            fontWeight={500}
            noOfLines={2}
            whiteSpace="break-spaces"
            color="gray.600"
            marginBottom={4}
          >
            Holiday New Events
          </Text>
        </HStack>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {holidayPlans.map((p) => (
            <GridItem key={p._id} width="full" height="full">
              <CardHolidayPlan holidayPlans={p} />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}
