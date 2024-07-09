import { Box } from '@mui/material'
import { useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'
import DataProvider from './context/DataProvider'
//components
import About from './components/About'
import Login from './components/Login'
import Home from './components/home/Home'
import CreatePost from './components/CreatePost'
import Header from './components/Header'
import Contact from './components/Contact'
import Update from './components/Update'
import DetailView from './components/details/DetailView'
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
    
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      <Box style={{ marginTop: 64}}>
      <Header />
      <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
{/*             
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} > */}
              <Route path='/' element={<Home />} />
            {/* </Route> */}

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

              <Route path='/about' element={<About />} />
           

            {/* <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} > */}
              <Route path='/contact' element={<Contact />} />
            {/* </Route> */}
          </Routes>
      </Box>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
