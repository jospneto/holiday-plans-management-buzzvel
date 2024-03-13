import { SystemStyleInterpolation } from '@chakra-ui/theme-tools'

import Input from './Input'

const variants: Record<string, SystemStyleInterpolation> = {
  filled: (props) => Input.variants.filled(props).field ?? {},
}

export default {
  variants,
  defaultProps: Input.defaultProps,
}
