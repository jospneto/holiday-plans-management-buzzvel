import { Avatar, HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'

interface SelectList {
  selectedParticipants: HolidayPlanParticipant[]
  onRemove?: (participantId: string) => void
}

export const SelectList: React.FC<SelectList> = ({ selectedParticipants, onRemove }) => {
  return (
    <HStack
      width="full"
      height={12}
      padding={4}
      bgColor="white"
      rounded="md"
      border="1px"
      borderColor="gray.200"
      >
      {selectedParticipants.map(s => (
        <Tag
          key={s.id}
          border="4px"
          borderColor="gray.100"
          borderRadius="full"
        >
          <Avatar
            src={s.avatar}
            name={s.email}
            size="xs"
            marginLeft={-2}
            marginRight={2}
          />
          <TagLabel>{s.name}</TagLabel>
          <TagCloseButton onClick={() => onRemove?.(s.id)}/>
        </Tag>
      ))}
    </HStack>
  )
}
