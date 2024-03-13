import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { anatomy, mode } from '@chakra-ui/theme-tools'

const parts = anatomy('cardcustom').parts(
  'container',
  'media',
  'header',
  'title',
  'subtitle',
  'body',
  'footer',
)

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    rounded: 'lg',
  },
  header: {
    p: 4,
  },
  media: {
    mb: 2,
  },
  title: {
    fontWeight: 'semibold',
  },
  subtitle: {
    color: 'gray.600',
    fontSize: 'sm',
    _dark: {
      color: 'gray.400',
    },
  },
  body: {
    p: 4,
  },
  footer: {
    p: 4,
  },
})

const variants = {
  solid: definePartsStyle((props) => {
    const { colorScheme: c } = props

    const bg = c
      ? mode(`${c}.500`, `${c}.500`)(props)
      : mode('white', 'whiteAlpha.100')(props)

    const borderColor = c
      ? mode(`${c}.500`, `${c}.500`)(props)
      : mode('blackAlpha.200', 'whiteAlpha.200')(props)

    const color = c ? 'white' : 'inherit'

    return {
      container: {
        bg,
        color,
        borderColor,
        borderWidth: '1px',
        boxShadow: 'sm',
      },
    }
  }),
  outline: definePartsStyle((props) => {
    const { colorScheme: c } = props

    const borderColor = c
      ? mode(`${c}.500`, `${c}.500`)(props)
      : mode('blackAlpha.200', 'whiteAlpha.200')(props)

    return {
      container: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor,
      },
    }
  }),
  filled: definePartsStyle((props) => {
    return {
      container: {
        bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
      },
    }
  }),
}

export default defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: 'solid',
  },
})
