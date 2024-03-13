import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { anatomy } from '@chakra-ui/theme-tools'

const parts = anatomy('persona').parts(
  'container',
  'avatar',
  'content',
  'title',
  'subtitle',
  'description',
)

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {},
  avatar: {},
  content: {},
  title: {
    display: 'block',
    maxWidth: '100%',
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'gray.700',
    _dark: {
      color: 'whiteAlpha.600',
    },
  },
  subtitle: {
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'gray.600',
    _dark: {
      color: 'whiteAlpha.600',
    },
  },
  description: {
    color: 'gray.600',
    _dark: {
      color: 'whiteAlpha.600',
    },
  },
})

const sizes = {
  '2xs': definePartsStyle({
    content: {
      marginStart: 2,
    },
    title: {
      fontSize: 'xs',
    },
    subtitle: {
      fontSize: 'xs',
    },
    description: {
      fontSize: 'xs',
    },
  }),
  xs: definePartsStyle({
    content: {
      marginStart: 2,
    },
    title: {
      fontSize: 'sm',
    },
    subtitle: {
      fontSize: 'sm',
    },
    description: {
      fontSize: 'xs',
    },
  }),
  sm: definePartsStyle({
    content: {
      marginStart: 4,
    },
    title: {
      fontSize: 'md',
    },
    subtitle: {
      fontSize: 'sm',
    },
    description: {
      fontSize: 'sm',
    },
  }),
  md: definePartsStyle({
    content: {
      marginStart: 4,
    },
    title: {
      fontSize: 'md',
    },
    subtitle: {
      fontSize: 'md',
    },
    description: {
      fontSize: 'sm',
    },
  }),
  lg: definePartsStyle({
    content: {
      marginStart: 4,
    },
    title: {
      fontSize: 'lg',
    },
    subtitle: {
      fontSize: 'md',
    },
    description: {
      fontSize: 'md',
    },
  }),
  xl: definePartsStyle({
    content: {
      marginStart: 4,
    },
    title: {
      fontSize: 'xl',
    },
    subtitle: {
      fontSize: 'lg',
    },
    description: {
      fontSize: 'lg',
    },
  }),
  '2xl': definePartsStyle({
    content: {
      marginStart: 6,
    },
    title: {
      fontSize: '2xl',
    },
    subtitle: {
      fontSize: 'xl',
    },
    description: {
      fontSize: 'xl',
    },
  }),
}

export default defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'md',
  },
})
