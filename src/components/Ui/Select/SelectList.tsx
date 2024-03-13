import { FiUserPlus } from 'react-icons/fi'

import {
  Avatar,
  Button,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react'

interface SelectList {
  selectedParticipants: HolidayPlanParticipant[]
  onOpen?: () => void
  onRemove?: (participantId: string) => void
}

export const SelectList: React.FC<SelectList> = ({
  selectedParticipants,
  onOpen,
  onRemove,
}) => {
  return (
    <Flex flexWrap="wrap" gap={2}>
      {selectedParticipants.map((s) => (
        <Tag
          key={s._id}
          border="4px"
          borderColor="gray.100"
          borderRadius="full"
          zIndex={999999999}
          minW={0}
        >
          <Avatar
            src={s.avatar}
            name={s.email}
            size="xs"
            marginLeft={-2}
            marginRight={2}
          />
          <TagLabel
            flex={1}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {s.name}
          </TagLabel>
          <TagCloseButton onClick={() => onRemove?.(s._id)} />
        </Tag>
      ))}
      <Button size="sm" rounded="md" leftIcon={<FiUserPlus />} onClick={onOpen}>
        Add participant
      </Button>
    </Flex>
  )
}
