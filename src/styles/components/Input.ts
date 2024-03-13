import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import type { PartsStyleFunction } from '@chakra-ui/theme-tools'
import { mode } from '@chakra-ui/theme-tools'

const variantFilled: PartsStyleFunction<typeof parts> = (props) => ({
  field: {
    bg: mode('gray.100', 'gray.900')(props),
    _hover: {
      bg: mode('gray.100', 'gray.900')(props),
      borderColor: 'primary.500',
    },
    _focus: {
      bg: mode('gray.100', 'gray.900')(props),
    },
  },
})

const variants = {
  filled: variantFilled,
}

const defaultProps = {
  variant: 'filled',
  focusBorderColor: 'primary.500',
}

export default {
  variants,
  defaultProps,
}
