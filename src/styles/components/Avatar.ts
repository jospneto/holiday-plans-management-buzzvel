import { avatarAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import { randomColor } from '@chakra-ui/theme-tools'

const { definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyleContainer = defineStyle((props) => {
  const { src, name } = props
  const bg = name ? randomColor({ string: name }) : 'colors.gray.400'

  if (!src) {
    return {}
  }

  return {
    zIndex: 1,
    _before: {
      content: "''",
      bg,
      position: 'absolute',
      width: '100%',
      height: '100%',
      rounded: 'full',
      zIndex: -1,
    },
  }
})

const baseStyle = definePartsStyle((props) => ({
  container: baseStyleContainer(props),
}))

export default {
  baseStyle,
}
