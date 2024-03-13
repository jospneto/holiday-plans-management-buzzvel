import { cloneElement } from 'react'

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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'

import { deleteHolidayPlan } from '../../api'
import { useAsync, useHolidayPlans } from '../../hooks'

interface DeleteHolidayPlanProps {
  children: React.ReactElement
  holidayPlanId: string
}

export const DeleteHolidayPlan: React.FC<DeleteHolidayPlanProps> = ({
  children,
  holidayPlanId,
}) => {
  const { onRemoveHolidayPlan } = useHolidayPlans()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const toast = useToast()
  const { status, run } = useAsync(deleteHolidayPlan, {
    onSuccess: (data) => {
      onRemoveHolidayPlan(data._id)

      toast({
        status: 'success',
        title: 'Success!',
        description: 'Plan successfully deleted.',
      })

      onClose()
    },
    onError: () => {
      toast({
        status: 'error',
        title: 'Oops, something happened!',
        description:
          'An error occurred while trying to delete the plan. Please try again later.',
      })
    },
  })

  return (
    <>
      {cloneElement(children, {
        ...children.props,
        onClick: callAllHandlers(children.props.onClick, onOpen),
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingX={4} paddingY={4}>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody paddingBottom={4}>
            <Stack
              data-testid="delete-holiday-plan-modal"
              width="full"
              spacing={6}
            >
              <Text
                as="span"
                fontWeight="medium"
                color="gray.600"
                fontSize="large"
                textAlign="center"
              >
                Are you sure you want to delete this plan?
              </Text>
              <HStack
                flex={1}
                alignItems="center"
                justifyContent="center"
                width="full"
              >
                <Button width="full" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  width="full"
                  colorScheme="red"
                  isLoading={status === 'pending'}
                  onClick={() => run({ holidayPlanId })}
                >
                  Delete
                </Button>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
