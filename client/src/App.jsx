import { Box } from '@mui/material'
import { useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'
import DataProvider from './context/DataProvider'
//components
import About from './components/About'
import Login from './components/Login'
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      <Box style={{ marginTop: 64}}>
        <Routes>
          <Route  path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />}/>
          <Route>

          </Route>
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
