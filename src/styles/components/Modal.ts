import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    closeButton: {
      top: 4,
      insetEnd: 4,
    },
    dialogContainer: {
      flexWrap: 'wrap',
      // '@supports(height: -webkit-fill-available)': {},
    },
    overlay: {
      backdropFilter: 'blur(10px)',
    },
    footer: {
      paddingBottom: 6,
    },
  }
}

export default {
  baseStyle,
  defaultProps: {
    isCentered: true,
  },
}
