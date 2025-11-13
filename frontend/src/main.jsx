import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Home from '../pages/home.jsx';
import Matches from '../pages/Matches.jsx';
import Profile from '../pages/Profile.jsx';
import Setting from '../pages/Setting.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import AuthenticatedRoute from '../components/AuthenticatedRoute.jsx';
import More from '../pages/More.jsx';
import Message from '../pages/Message.jsx';

const router = createBrowserRouter(
  createRoutesFromElements( 
    <Route path='/' element={<App />}>
        <Route path="" element={<Home/>}/>
        <Route path="matches" element={<AuthenticatedRoute auth={true}><Matches/></AuthenticatedRoute>}/>
        <Route path="matches/moredetails" element={<AuthenticatedRoute auth={true}><More/></AuthenticatedRoute>}/>
        <Route path="message" element={<AuthenticatedRoute auth={true}><Message/></AuthenticatedRoute>}/>
        <Route path="profile" element={<AuthenticatedRoute auth={true}><Profile/></AuthenticatedRoute>}/>
        <Route path="settings" element={<AuthenticatedRoute auth={true}><Setting/></AuthenticatedRoute>}/>
        <Route path="login" element={<AuthenticatedRoute auth={false}><Login/></AuthenticatedRoute> }/>
        <Route path="signup" element={<AuthenticatedRoute auth={false}><Signup/></AuthenticatedRoute>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render( 
  // <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  // </StrictMode>,
)
