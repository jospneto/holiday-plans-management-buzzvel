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
  Text
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { cloneElement, useState } from 'react'
import { Form, Input } from '../Ui'
import { useForm } from 'react-hook-form'
import { CreateHolidayPlan as CreateHolidayPlanType, createHolidayPlanSchema } from './createHolidayPlanSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '../Ui/Select'

interface CreateHolidayPlanProps {
  children: React.ReactElement
}

export const CreateHolidayPlan: React.FC<CreateHolidayPlanProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const form = useForm<CreateHolidayPlanType>({
    defaultValues: {},
    resolver: zodResolver(createHolidayPlanSchema)
  })
  const [hasActive, setHasActive] = useState(false)

  return (
    <>
      {cloneElement(children, {
        ...children.props,
        onClick: callAllHandlers(children.props.onClick, onOpen)
      })}
      <Modal isOpen={isOpen} size={{ base: 'full', sm: '2xl' }} autoFocus allowPinchZoom onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingTop={6} paddingBottom={6}>
          <ModalHeader>
            HolidayPlan Create
            <ModalCloseButton display={{ base: 'none', sm: 'flex' }} />
          </ModalHeader>
          <ModalBody paddingBottom={4}>
            <Form form={form} onSubmit={() => console.log('teste')}>
              <Stack spacing={6} >
                <HStack width="full">
                  <Input name='title' label='Title' />
                  <Input name='date' label='Date' />
                </HStack>
                <Stack spacing={4}>
                  <Text as="strong" color="gray.600">Description</Text>
                  <chakra.textarea
                    name="description"
                    height={{ base: '100px', sm: 24 }}
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
                   />
                </Stack>
                <Input name='location' label='Location' />
                <Stack width="full">
                  <Text as="strong" color="gray.600">Participants</Text>
                  <Select />
                </Stack>
              </Stack>
            </Form>
          </ModalBody>
          <ModalFooter paddingBottom={0}>
            <Button width="full" colorScheme="primary">Create Plan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
