
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import Store from './component/Store/Store'
import Adopt from './component/Adopt/Adopt'
import Doctor from './component/Doctor/Doctor'
import Drug from './component/Drug/Drug'
import Home from './component/Home/Home'
import { ThemeConfig } from 'flowbite-react'
import UserContextProvider from './Context/UserContext'
import Protector from './component/Protector/Protector'
import Appointments from './component/Appointments/Appointments'
import Timeline from './component/Timeline/Timeline'
function App() {
  
  let routes = createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"store",element:<Protector><Store/></Protector>},
      {path:"drug_store",element:<Protector><Drug/></Protector>},
      {path:"doctors",element:<Protector><Doctor/></Protector>},
    {path:"adopt",element:<Protector><Adopt/></Protector>},
  {path:"appointments",element:<Protector><Appointments/></Protector>},
  {path:"timeline",element:<Protector><Timeline/></Protector>}]
  }])
  return (
    <>
    <ThemeConfig dark={false} />
    <UserContextProvider>
      <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>
    </>
  )
}

export default App
