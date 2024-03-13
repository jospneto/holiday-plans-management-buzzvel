import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    content: {
      boxShadow: 'lg',
    },
  }
}

export default {
  baseStyle,
}
