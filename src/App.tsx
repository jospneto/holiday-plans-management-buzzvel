import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { HolidayPlanProvider } from './contexts'
import { Routes } from './routes'
import { theme } from './styles/theme'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: { position: 'top-right' },
        }}
      >
        <HolidayPlanProvider>
          <Routes />
        </HolidayPlanProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
