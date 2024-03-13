import { useCallback, useEffect, useState } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Stack,
  Flex,
  Avatar,
  Checkbox,
  HStack,
  Button,
  ModalFooter,
  Box,
} from '@chakra-ui/react'

import { select } from '../../../constants'
import { SelectList } from './SelectList'

interface SelectProps {
  defaultValues?: HolidayPlanParticipant[]
  onSelect: (holidayPlanParticipant: HolidayPlanParticipant[]) => void
}

interface FormattedParticipantsListProps extends HolidayPlanParticipant {
  isChecked?: boolean
}

export const Select: React.FC<SelectProps> = ({ defaultValues, onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedParticipants, setSelectedParticipants] = useState<
    HolidayPlanParticipant[]
  >(defaultValues ?? [])

  const onSelected = useCallback(
    (holidayPlanParticipant: HolidayPlanParticipant) => {
      const updateSelectedParticipant = [...selectedParticipants]

      const nextValue = updateSelectedParticipant.find(
        (item) => item._id === holidayPlanParticipant._id,
      )
        ? updateSelectedParticipant.filter(
            (item) => item._id !== holidayPlanParticipant._id,
          )
        : [holidayPlanParticipant, ...updateSelectedParticipant]

      setSelectedParticipants(nextValue)
    },
    [selectedParticipants],
  )

  const onRemove = useCallback((participantId: string) => {
    setSelectedParticipants((state) =>
      state.filter((s) => s._id !== participantId),
    )
  }, [])

  const selectedArray = defaultValues ? [...select, ...defaultValues] : select
  const formattedParticipants: FormattedParticipantsListProps[] = select
    ? selectedArray.map((p) =>
        selectedParticipants.find((selected) => selected.name === p.name)
          ? { ...p, isChecked: true }
          : p,
      )
    : []

  useEffect(() => {
    onSelect(selectedParticipants)
  }, [onSelect, selectedParticipants])

  return (
    <>
      {!selectedParticipants.length && (
        <Box
          display="flex"
          width="full"
          height={12}
          bgColor="gray.100"
          rounded="md"
          border="1px"
          borderColor="transparent"
          alignItems="center"
          justifyContent="flex-start"
          cursor="pointer"
          paddingLeft={4}
          onClick={onOpen}
          data-testid="open-select-participants-any"
        >
          <Text as="span" color="gray.500">
            Click for adding participants
          </Text>
        </Box>
      )}
      {!!selectedParticipants.length && (
        <SelectList
          selectedParticipants={selectedParticipants}
          onOpen={onOpen}
          onRemove={onRemove}
        />
      )}
      <Modal
        isOpen={isOpen}
        size={{ base: 'full', sm: 'lg' }}
        autoFocus
        allowPinchZoom
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent paddingTop={6} paddingBottom={6}>
          <ModalHeader>
            <Text as="span" fontWeight="medium" color="gray.600">
              Selected participants
            </Text>
            <ModalCloseButton display={{ base: 'none', sm: 'flex' }} />
          </ModalHeader>
          <ModalBody flex={1} minHeight={0} paddingX={0} paddingBottom={0}>
            <Stack
              data-testid="selected-participants-modal"
              flex={1}
              minHeight={0}
              spacing={4}
            >
              <Flex
                flex={1}
                flexDirection="column"
                overflow="auto"
                maxHeight={{ base: 'none', sm: '400px' }}
                width="full"
              >
                {formattedParticipants.map((s) => (
                  <HStack
                    key={s?._id}
                    data-testid="selected-participants"
                    spacing={4}
                    paddingY={4}
                    paddingX={{ base: 4, sm: 6 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      bg: 'gray.100',
                    }}
                    onClick={() => onSelected(s)}
                  >
                    <HStack>
                      <Avatar src={s?.avatar} name={s?.name} size="sm" />
                      <Text
                        as="span"
                        fontWeight="bold"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        display="block"
                      >
                        {s?.name}
                      </Text>
                    </HStack>
                    <Checkbox isChecked={s?.isChecked} />
                  </HStack>
                ))}
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter
            data-testid="selected-participants-modal-footer"
            paddingBottom={0}
          >
            <Button width="full" colorScheme="primary" onClick={onClose}>
              Selected
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
