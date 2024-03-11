import { ChakraProvider } from '@chakra-ui/react'
import { Routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './styles/theme'

function App () {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
