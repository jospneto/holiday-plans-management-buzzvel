import { useCallback, useRef } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiCalendar, FiEdit, FiInfo } from 'react-icons/fi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { IoLocationOutline, IoPrintOutline } from 'react-icons/io5'
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
  SkeletonCircle,
  SkeletonText,
  Center,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { format, parse } from 'date-fns'

import logo from '../../public/holiday-icon.ico'
import { CreateHolidayPlan, DeleteHolidayPlan } from '../components/HolidayPlan'
import { useHolidayPlans } from '../hooks'

interface CardHolidayPlan {
  holidayPlans: HolidayPlan
}

interface HolidayPlansArrayData {
  key: 'title' | 'description' | 'date' | 'location'
  icon: IconType
  content: string
}

const CardHolidayPlan: React.FC<CardHolidayPlan> = ({ holidayPlans }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useCallback(() => {
    if (contentRef.current) {
      const printContents = contentRef.current.innerHTML
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }, [])

  const holidayPlansItems: HolidayPlansArrayData[] = [
    {
      key: 'title',
      icon: MdTitle,
      content: holidayPlans.title,
    },
    {
      key: 'description',
      icon: GrTextAlignLeft,
      content: holidayPlans.description,
    },
    {
      key: 'date',
      icon: FiCalendar,
      content: holidayPlans?.date
        ? format(
            parse(holidayPlans.date, 'yyyy-MM-dd', new Date()),
            'dd MMMM yyyy',
          )
        : '',
    },
    {
      key: 'location',
      icon: IoLocationOutline,
      content: holidayPlans.title,
    },
  ]

  return (
    <Card
      data-testid="card-holiday-plan-root"
      width={{ base: '300px', sm: '360px' }}
      minW={0}
    >
      <CardBody
        data-testid={`card-holiday-plan-${holidayPlans._id}`}
        gap={6}
        padding={4}
      >
        <HStack spacing={4} align="center" justifyContent="flex-end">
          <Menu>
            <MenuButton
              as={IconButton}
              size="sm"
              variant="ghost"
              icon={<SlOptions />}
              data-testid="menu-actions-holiday-plans"
            />
            <MenuList>
              <CreateHolidayPlan defaultValues={holidayPlans}>
                <MenuItem
                  data-testid="menu-edit-holiday-plans"
                  icon={<FiEdit size={16} />}
                  color="gray.600"
                >
                  Edit
                </MenuItem>
              </CreateHolidayPlan>
              <DeleteHolidayPlan holidayPlanId={holidayPlans._id}>
                <MenuItem
                  icon={<AiOutlineDelete size={18} />}
                  color="gray.600"
                  data-testid="menu-delete-holiday-plans"
                >
                  Delete
                </MenuItem>
              </DeleteHolidayPlan>
              <MenuItem
                icon={<IoPrintOutline size={18} />}
                color="gray.600"
                onClick={handlePrint}
              >
                Print/PDF
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Stack ref={contentRef} spacing={4}>
          {holidayPlansItems.map((item) => (
            <HStack key={item.key}>
              <Icon as={item.icon} color="gray.600" />
              <Text
                as="span"
                color="gray.600"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {item.content}
              </Text>
            </HStack>
          ))}
          {holidayPlans.participants?.length && (
            <Stack spacing={4}>
              <Text as="span" color="gray.600">
                Participants
              </Text>
              <AvatarGroup size="sm">
                {holidayPlans.participants.map((p) => (
                  <Tooltip key={p._id} label={p.name} rounded="md">
                    <Avatar size="sm" src={p.avatar} name={p.name} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}

const ListHolidayPlansLoading: React.FC = () => {
  return (
    <>
      {Array.from(Array(6).keys()).map((item) => (
        <GridItem key={item} width="full" height="full">
          <Card width={{ base: '300px', sm: '360px' }} padding={5} minW={0}>
            <Stack spacing={4}>
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="3"
                rounded="md"
              />
              <HStack spacing={4}>
                {Array.from(Array(6).keys()).map((item) => (
                  <SkeletonCircle key={item} size="10" />
                ))}
              </HStack>
            </Stack>
          </Card>
        </GridItem>
      ))}
    </>
  )
}

export const ListHolidayPlans: React.FC = () => {
  const { holidayPlans, isLoading } = useHolidayPlans()
  const color = useColorModeValue('gray.600', 'gray.400')
  const colorIcon = useColorModeValue('blue.500', 'blue.400')

  return (
    <Container
      display="flex"
      width="auto"
      position="relative"
      paddingY={{ base: 2, sm: 4, lg: 8 }}
      paddingX={{ base: 0, lg: 4 }}
    >
      <Stack
        height="full"
        alignItems="center"
        minH={0}
        spacing={6}
        paddingBottom={4}
        position="relative"
      >
        <HStack alignItems="flex-end" paddingBottom={4} textAlign="center">
          <Image src={logo} alt="logo" position="relative" />
          <Text
            as="span"
            fontSize={{ base: 'large', sm: 'x-large' }}
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
          minW={0}
          gap={6}
          position="relative"
          padding={4}
        >
          {holidayPlans.map((p) => (
            <GridItem key={p._id} width="full" height="full">
              <CardHolidayPlan holidayPlans={p} />
            </GridItem>
          ))}
          {isLoading && <ListHolidayPlansLoading />}
        </Grid>
        {!isLoading && !holidayPlans.length && (
          <Card
            width={{ base: '300px', sm: '800px' }}
            height="200px"
            paddingTop={{ base: 10, sm: 2 }}
            paddingBottom={{ base: 10, sm: 2 }}
            paddingY={4}
            paddingX={4}
            rounded="md"
          >
            <Center height="full" flexDirection="column">
              <Stack spacing={4}>
                <Flex width="full" justify="center">
                  <Icon as={FiInfo} boxSize="2.5rem" color={colorIcon} />
                </Flex>
                <Stack>
                  <Heading as="h2" fontSize="xl" textAlign="center">
                    No new plans were found
                  </Heading>
                  <Text textAlign="center" color={color}>
                    Sign up for new holiday plans by clicking on the plus icon
                    in the navigation tab
                  </Text>
                </Stack>
              </Stack>
            </Center>
          </Card>
        )}
      </Stack>
    </Container>
  )
}
