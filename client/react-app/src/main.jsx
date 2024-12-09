import React from 'react'
import ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import ResponseForm from './components/ResponseForm/ResponseForm.jsx'
import UserFeedback from './components/UserFeedback/UserFeedback.jsx'
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path="/submit-feedback/:linkId" element={<ResponseForm />} />
      <Route path="/user-feedback" element={<UserFeedback />} />
  </Route>
))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
