import { FiPlus } from 'react-icons/fi'

import { IconButton, IconButtonProps } from '@chakra-ui/react'

import { CreateHolidayPlan } from './HolidayPlan'

interface CreateButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const CreateButton: React.FC<CreateButtonProps> = ({ ...rest }) => {
  return (
    <CreateHolidayPlan>
      <IconButton
        icon={<FiPlus />}
        color="white"
        bgColor="primary.500"
        size="lg"
        aria-label="create-event"
        rounded="full"
        {...rest}
      />
    </CreateHolidayPlan>
  )
}
