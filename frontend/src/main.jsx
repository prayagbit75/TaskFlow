import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Entry from './page/Entry.jsx'
import './index.css'
import SignUp from './page/SignUp.jsx'
import Login from './page/Login.jsx'
import Profile from './page/profile.jsx'
import Dashboard from './page/Dashboard.jsx'
import { Provider } from "react-redux";
import { Store } from "./app/store.js";
import Edit from './page/Edit.jsx'
import ChangePassword from './page/ChangePassword.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AuthLoader from './components/AuthLoader.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<Layout/>}>
       <Route path='' element={<Entry/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/profile' element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }/>
       <Route path='/dashboard' element={ <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>}/>
       <Route path='/edit-profile' element={<ProtectedRoute>
            <Edit />
        </ProtectedRoute>}/>
       <Route path='/change-password' element={ <ProtectedRoute>
            <ChangePassword />
        </ProtectedRoute>}/>
   </Route> 
  )  
)

createRoot(document.getElementById("root")).render(

    <Provider store={Store}>

        <AuthLoader>

            <RouterProvider router={router} />

        </AuthLoader>

    </Provider>

);
