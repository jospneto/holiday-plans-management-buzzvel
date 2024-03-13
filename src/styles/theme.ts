import {
  ChakraTheme,
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react'

import { components } from './components'
import { foundations } from './foundations'
import { styles } from './styles'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'buzzvel',
}

export const theme = extendTheme(
  {
    config,
    ...foundations,
    components,
    styles,
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Radio', 'Switch', 'Checkbox', 'Tabs'],
  }),
) as ChakraTheme
