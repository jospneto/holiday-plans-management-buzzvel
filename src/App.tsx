import { ChakraProvider } from '@chakra-ui/react'
import { Routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './styles/theme'
import { HolidayPlanProvider } from './contexts'

function App () {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <HolidayPlanProvider>
          <Routes />
        </HolidayPlanProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
