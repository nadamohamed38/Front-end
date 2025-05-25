import React from 'react'
import Navbarr from '../Navbarr/Navbarr'
import { Outlet } from 'react-router-dom'
import Footerr from '../Footerr/Footerr'

export default function Layout() {
  return (
    <>
    <Navbarr/>
    <Outlet/>
    <Footerr/>
    </>
  )
}
