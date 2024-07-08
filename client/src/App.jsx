import { Box } from '@mui/material'
import { useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'
import DataProvider from './context/DataProvider'
//components
import About from './components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <DataProvider>
      <BrowserRouter>
      <Box style={{ marginTop: 64}}>
        <Routes>
          <Route>
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>

      </Box>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
