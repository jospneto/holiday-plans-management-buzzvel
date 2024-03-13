import { cloneElement, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Stack,
  chakra,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { HolidayPlanCreateOrUpdated, createHolidayPlan } from '../../api'
import { useAsync, useHolidayPlans } from '../../hooks'
import { Form, Input } from '../Ui'
import { Select } from '../Ui/Select'
import {
  CreateHolidayPlan as CreateHolidayPlanType,
  createHolidayPlanSchema,
} from './createHolidayPlanSchema'

interface CreateHolidayPlanProps {
  children: React.ReactElement
}

export const CreateHolidayPlan: React.FC<CreateHolidayPlanProps> = ({
  children,
}) => {
  const [hasActive, setHasActive] = useState(false)
  const [selectedParticipants, setSelectedParticipants] = useState<
    HolidayPlanParticipant[]
  >([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onAddHolidayPlan } = useHolidayPlans()
  const toast = useToast()
  const form = useForm<CreateHolidayPlanType>({
    defaultValues: {},
    resolver: zodResolver(createHolidayPlanSchema),
  })
  const { status, run } = useAsync(createHolidayPlan, {
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

  const handleSubmit = useCallback(
    async (values: CreateHolidayPlanType) => {
      const formattedSelectedParticipants = selectedParticipants.reduce(
        (acc, p) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, ...rest } = p
          acc.push(rest as unknown as HolidayPlanCreateOrUpdated)
          return [...acc]
        },
        [] as HolidayPlanCreateOrUpdated[],
      )

      await run({
        data: { ...values, participants: formattedSelectedParticipants },
      })
    },
    [run, selectedParticipants],
  )

  console.log(form.formState.errors)

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
        <Form form={form} onSubmit={handleSubmit}>
          <ModalContent paddingTop={6} paddingBottom={6}>
            <ModalHeader>
              HolidayPlan Create
              <ModalCloseButton display={{ base: 'none', sm: 'flex' }} />
            </ModalHeader>
            <ModalBody paddingBottom={4}>
              <Stack spacing={6}>
                <HStack width="full">
                  <Input
                    name="title"
                    label="Title"
                    placeholder="Adding title"
                  />
                  <Input name="date" label="Date" placeholder="Adding date" />
                </HStack>
                <Stack spacing={4}>
                  <Text as="strong" color="gray.600">
                    Description
                  </Text>
                  <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <chakra.textarea
                        name={field.name}
                        value={field.value}
                        height={{ base: '100px', sm: 24 }}
                        placeholder="Adding description"
                        overflowY="auto"
                        rows={1}
                        border="1px"
                        outline="none"
                        borderColor={!hasActive ? 'gray.200' : 'primary.500'}
                        paddingX={4}
                        paddingY={4}
                        rounded="md"
                        resize="none"
                        onFocus={() => setHasActive(true)}
                        onBlur={() => setHasActive(false)}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Stack>
                <Input
                  name="location"
                  label="Location"
                  placeholder="Adding location"
                />
                <Stack width="full">
                  <Text as="strong" color="gray.600">
                    Participants
                  </Text>
                  <Select
                    onSelect={(participants) =>
                      setSelectedParticipants(participants)
                    }
                  />
                </Stack>
              </Stack>
            </ModalBody>
            <ModalFooter paddingBottom={0}>
              <Button
                width="full"
                colorScheme="primary"
                isLoading={status === 'pending' || form.formState.isSubmitting}
                onClick={form.handleSubmit(handleSubmit)}
              >
                Create Plan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  )
}
