import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    list: {
      boxShadow: 'lg',
    },
  }
}

export default {
  baseStyle,
}
