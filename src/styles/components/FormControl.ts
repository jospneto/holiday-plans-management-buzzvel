import { cssVar, defineStyle } from '@chakra-ui/react'

const $fg = cssVar('form-control-color')

const baseStyleHelperText = defineStyle({
  mt: '2',
  [$fg.variable]: 'colors.gray.500',
  _dark: {
    [$fg.variable]: 'colors.whiteAlpha.600',
  },
  color: $fg.reference,
})

export default {
  baseStyle: {
    helperText: baseStyleHelperText,
  },
}
