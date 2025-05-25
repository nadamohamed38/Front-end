import React, { useContext } from 'react'
import { Avatar, Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import photo from '../../assets/avatar.png'
import { UserContext } from '../../Context/UserContext';
export default function Navbarr() {
  let {mainUser,setMainUser,userName,setUserName,vetName,setvetName} = useContext(UserContext)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem("mainUser")
    localStorage.removeItem("mainVet")
    localStorage.removeItem("userName")
    setMainUser(null);
    setvetName(null);
    setUserName(null)
    navigate("login");
  }
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className='flex'>
            <Avatar img={photo} alt="avatar of Jese" className='rounded-full' rounded />
              <span className="self-center text-rose-800 mx-4 text-3xl font-extrabold whitespace-nowrap">pet Z</span>
          </div>
             
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {mainUser ?
            <>
            <h2 className='mx-10 text-lg font-extrabold text-rose-800 transition delay-100 duration-500 ease-in-out hover:text-shadow-lg'>{localStorage.getItem("userName")}</h2>
            <a className='px-2 md:hover:text-rose-700 cursor-pointer' onClick={logout}>Logout</a>
            </>
            
            :<>
            <Link className='px-2 md:hover:text-rose-700' to="register">Register</Link>
            <Link className='px-2 md:hover:text-rose-700' to="login">Login</Link> </>}
          
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
              <li>
                <Link to="/" className="block py-2 px-3 text-black bg-rose-700 rounded-sm md:bg-transparent md:text-rose-700 md:p-0" aria-current="page">Home</Link>
              </li>
              {mainUser && !localStorage.getItem("mainVet")? <>
              <li>
                <Link to="doctors" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-700 md:p-0 ">Veterinarians</Link>
              </li>
              <li>
                <Link to="drug_store" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-700 md:p-0">Drug store</Link>
              </li>
              <li>
                <Link to="store" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-700 md:p-0">Store</Link>
              </li>
               <li>
                <Link to="adopt" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-700 md:p-0">Adopt</Link>
              </li>
              <li>
                <Link to="timeline" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-700 md:p-0">Timeline</Link>
              </li>
              </>: mainUser && localStorage.getItem("mainVet")?
              <li>
                <Link to="appointments" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-700 md:p-0">Appointments</Link>
              </li>:null}
             
            </ul>
          </div>
        </div>
      </nav>

    </>

  )
}

