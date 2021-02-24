import * as React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ChakraProvider>
)
