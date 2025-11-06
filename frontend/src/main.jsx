import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Home from '../pages/home.jsx';
import Matches from '../pages/Matches.jsx';
import Explore from '../pages/Explore.jsx';
import Profile from '../pages/Profile.jsx';
import Setting from '../pages/Setting.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route path="" element={<Home/>}/>
        <Route path="matches" element={<Matches/>}/>
        <Route path="explore" element={<Explore/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="settings" element={<Setting/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
