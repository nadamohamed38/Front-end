import React from 'react'
import './Footer.css'
import { Footer, FooterCopyright } from "flowbite-react";

export default function Footerr() {
  return (
    <Footer container className="flex flex-col justify-center bg-rose-100 py-20 mt-17">
      <div className='text-center text-2xl'>
         <FooterCopyright href="#" by="petZ™" year={2022} />
      </div>
     
      <div className='text-xl text-center text-rose-800'>
        <i className="fa-brands fa-facebook m-2"></i>
        <i className="fa-brands fa-whatsapp m-2"></i>
        <i className="fa-brands fa-square-x-twitter m-2"></i>
        <i className="fa-solid fa-share m-2"></i>
      </div>
    </Footer>
  )
}
