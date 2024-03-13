import { GlobalStyleProps, Styles, mode } from '@chakra-ui/theme-tools'

export const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    '::-webkit-scrollbar': {
      width: { base: '0.125rem', md: '0.5rem' },
      height: { base: '0.25rem', md: '0.5rem' },
      marginRight: '10px',
    },
    '::-webkit-scrollbar-corner': {
      border: 'none',
      background: 'none',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: mode('blackAlpha.400', 'whiteAlpha.400')(props),
      borderRadius: { base: '0.125rem', md: '0.25rem' },
      cursor: 'move',
    },
    body: {
      bg: mode('gray.100', 'gray.900')(props),
      color: mode('gray.700', 'gray.100')(props),
    },
  }),
}
