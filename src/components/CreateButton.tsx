import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { FiPlus } from 'react-icons/fi'

interface CreateButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  onCreate: () => void
}

export const CreateButton: React.FC<CreateButtonProps> = ({ onCreate, ...rest }) => {
  return (
    <IconButton
      {...rest}
      icon={<FiPlus />}
      color="white"
      bgColor='primary.500'
      size="lg"
      aria-label='create-event'
      rounded="full"
      onClick={callAllHandlers(rest.onClick, onCreate)}
    />
  )
}
