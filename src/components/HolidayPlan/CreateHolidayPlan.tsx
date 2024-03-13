import { cloneElement, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft } from 'react-icons/fi'

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  chakra,
  useDisclosure,
  Text,
  useToast,
  Input,
  IconButton,
  ModalFooter,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'

import { createHolidayPlan, updatedHolidayPlan } from '../../api'
import { useAsync, useHolidayPlans } from '../../hooks'
import { Form, FormRegister } from '../Ui'
import { Select } from '../Ui/Select'
import {
  CreateHolidayPlan as CreateHolidayPlanType,
  createHolidayPlanSchema,
} from './createHolidayPlanSchema'

interface CreateHolidayPlanProps {
  defaultValues?: HolidayPlan
  children: React.ReactElement
}

interface CreateHolidayPlanFormProps {
  defaultValues?: HolidayPlan
  isLoading?: boolean
  onSelectedParticipants: (participant: HolidayPlanParticipant[]) => void
  onSubmit: (values: CreateHolidayPlanType) => void
}

const CreateHolidayPlanForm: React.FC<CreateHolidayPlanFormProps> = ({
  defaultValues,
  isLoading,
  onSelectedParticipants,
  onSubmit,
}) => {
  const [hasActive, setHasActive] = useState(false)
  const form = useForm<CreateHolidayPlanType>({
    defaultValues,
    resolver: zodResolver(createHolidayPlanSchema),
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <ModalBody>
        <Stack
          data-testid="holiday-plan-create-modal"
          height="full"
          spacing={6}
          paddingBottom={0}
        >
          <HStack width="full">
            <FormRegister register={form.register} name="title" label="Title">
              <Input placeholder="Adding title" />
            </FormRegister>
            <FormRegister register={form.register} name="date" label="Date">
              <Input type="date" placeholder="Adding date" />
            </FormRegister>
          </HStack>
          <FormRegister
            register={form.register}
            name="description"
            label="Description"
          >
            <chakra.textarea
              width="full"
              height={{ base: '100px', sm: 24 }}
              placeholder="Adding description"
              overflowY="auto"
              rows={1}
              border="1px"
              outline="none"
              bgColor="gray.100"
              borderColor={!hasActive ? 'transparent' : 'primary.500'}
              paddingX={4}
              paddingY={4}
              rounded="md"
              resize="none"
              onFocus={() => setHasActive(true)}
              onBlur={() => setHasActive(false)}
            />
          </FormRegister>
          <FormRegister
            register={form.register}
            name="location"
            label="Location"
          >
            <Input placeholder="Adding location" />
          </FormRegister>
          <Stack width="full" spacing={4}>
            <Text as="span" fontWeight={500} color="gray.700">
              Participants
            </Text>
            <Select
              defaultValues={defaultValues?.participants}
              onSelect={onSelectedParticipants}
            />
          </Stack>
        </Stack>
      </ModalBody>
      <ModalFooter
        data-testid="create-holiday-plan-modal-footer"
        paddingX={{ base: 4, sm: 6 }}
        paddingBottom={{ base: 4, sm: 6 }}
      >
        <Button
          width="full"
          colorScheme="primary"
          isLoading={isLoading}
          data-testid="create-or-edit-button"
          onClick={form.handleSubmit(onSubmit)}
        >
          {defaultValues?._id ? 'EditPlan' : 'Create Plan'}
        </Button>
      </ModalFooter>
    </Form>
  )
}

export const CreateHolidayPlan: React.FC<CreateHolidayPlanProps> = ({
  children,
  defaultValues,
}) => {
  const [selectedParticipants, setSelectedParticipants] = useState<
    HolidayPlanParticipant[]
  >([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onAddHolidayPlan, onUpdatedHolidayPlan } = useHolidayPlans()
  const toast = useToast()
  const { status: statusCreatedHolidayPlan, run: runCreatedHolidayPlan } =
    useAsync(createHolidayPlan, {
      onSuccess: (data) => {
        onAddHolidayPlan(data)

        toast({
          status: 'success',
          title: 'Success!',
          description: 'Plan successfully created.',
        })

        onClose()
      },
      onError: () => {
        toast({
          status: 'error',
          title: 'Oops, something happened!',
          description:
            'An error occurred while trying to create the plan. Please try again later.',
        })
      },
    })
  const { status: statusUpdatedHolidayPlan, run: runUpdatedHolidayPlan } =
    useAsync(updatedHolidayPlan, {
      onSuccess: (data) => {
        onUpdatedHolidayPlan(data)

        toast({
          status: 'success',
          title: 'Success!',
          description: 'Plan successfully updated.',
        })

        onClose()
      },
      onError: () => {
        toast({
          status: 'error',
          title: 'Oops, something happened!',
          description:
            'An error occurred while trying to updated the plan. Please try again later.',
        })
      },
    })

  const formattedSelectedParticipants = selectedParticipants.reduce(
    (acc, p) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...rest } = p
      acc.push(rest as unknown as HolidayPlanParticipant)
      return [...acc]
    },
    [] as HolidayPlanParticipant[],
  )

  const handleSubmit = useCallback(
    async (values: CreateHolidayPlanType) => {
      const formattedDate = format(
        parse(values.date, 'yyyy-MM-dd', new Date()),
        'yyyy-MM-dd',
      )

      if (!defaultValues) {
        await runCreatedHolidayPlan({
          data: {
            ...values,
            date: formattedDate,
            participants: formattedSelectedParticipants,
          },
        })
      }

      if (defaultValues) {
        await runUpdatedHolidayPlan({
          holidayPlanId: defaultValues._id,
          data: {
            ...values,
            date: formattedDate,
            participants: formattedSelectedParticipants,
          },
        })
      }
    },
    [
      defaultValues,
      formattedSelectedParticipants,
      runCreatedHolidayPlan,
      runUpdatedHolidayPlan,
    ],
  )

  return (
    <>
      {cloneElement(children, {
        ...children.props,
        onClick: callAllHandlers(children.props.onClick, onOpen),
      })}
      <Modal
        isOpen={isOpen}
        size={{ base: 'full', sm: '2xl' }}
        autoFocus
        allowPinchZoom
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent paddingTop={6} paddingBottom={6} overflowY="auto">
          <ModalHeader
            paddingRight={0}
            paddingBottom={4}
            paddingTop={0}
            paddingLeft={4}
          >
            <IconButton
              icon={<FiArrowLeft size={24} />}
              alignItems="center"
              justifyContent="center"
              variant="unstyled"
              aria-label="to-go-back"
              marginRight={2}
              padding={2}
              display={{ base: 'inline-block', sm: 'none' }}
              onClick={onClose}
            />
            {defaultValues ? 'Holiday Plan Edit' : 'HolidayPlan Create'}
            <ModalCloseButton display={{ base: 'none', sm: 'flex' }} />
          </ModalHeader>

          <CreateHolidayPlanForm
            defaultValues={defaultValues}
            isLoading={
              statusCreatedHolidayPlan === 'pending' ||
              statusUpdatedHolidayPlan === 'pending'
            }
            onSubmit={handleSubmit}
            onSelectedParticipants={(participants) =>
              setSelectedParticipants(participants)
            }
          />
        </ModalContent>
      </Modal>
    </>
  )
}
