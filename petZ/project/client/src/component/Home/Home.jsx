"use client";
import React, { useState } from 'react'
import photo from "../../assets/pet4.png"
import vet from "../../assets/vet2.png"
import surg from "../../assets/surg.png"
import care from "../../assets/care.png"
import adopt from "../../assets/adopt.png"
import dog from "../../assets/dog.png"
import {
  Avatar,
} from "flowbite-react";


export default function Home() {
  const [slide, setSlide] = useState(0)
  return (
    <>

      <div className='mt-16'>
        <div className=" flex items-center w-full h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${photo})` }} >
          <h2 className='px-6 font-extrabold text-8xl text-stone-700 tex' style={{ textShadow: '4px 4px 8px oklch(21.6% 0.006 56.043)' }}>We Care Your <br /><span className='text-8xl text-rose-800'>Pets</span></h2>
        </div>

        <div className='flex flex-wrap justify-center mt-20'>
          <div className="md:max-w-1/3 mx-10">
            <img src={vet} className='md:max-w-96 rounded-lg transition delay-100 duration-500 ease-in hover:scale-110' alt="" />
          </div>
          <div className='md:max-w-1/3  p-5'>
            <div>
              <span className='text-xs font-extrabold text-rose-800'>WELCOME TO PET Z</span>
              <h2 className='max-w-80 text-3xl font-extrabold'>We Are Best Agency For Your Pets</h2>
              <p className='text-zinc-500 my-4'>We treat your pets like family. With compassionate care, experienced vets, and a love for animals, we provide everything from check-ups to emergency services—ensuring your furry friends stay happy, healthy, and safe.</p>
            </div>
            <div className='text-lg '>
              <i className="fa-solid fa-check-circle mx-2 text-rose-800 hover:text-shadow-lg" />
              <span className='font-bold text-sm'>Over 20 Years of Experienced</span><br />
              <i className="fa-solid text-rose-800 fa-paw mx-2 hover:text-shadow-lg"></i>
              <span className='font-bold text-sm'>Animal Lover</span><br />
              <i className="fa-solid fa-shield-heart text-rose-800 mx-2 hover:text-shadow-lg"></i>
              <span className='font-bold text-sm'>Best Pet Care</span><br />
            </div>

          </div>
        </div>

        <div className='md:my-30 flex flex-col mt-15 bg-rose-100 p-10 '>
          <div className='text-center w-full'>
            <h2 className='text-4xl font-extrabold'>We Provide Best Services</h2>
            <span className='block max-w-2xl mx-auto text-zinc-500 text-sm'>Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering through animal welfare when people might depend.</span>
          </div>
          <div className="flex flex-wrap md:mx-50 mx-10">
            <div className='md:basis-1/3 flex flex-col justify-center p-2'>
              <div className="p-3" >
                <img src={surg} className='max-w-50 rounded-full object-cover mx-auto' rounded alt="" />
              </div>
              <div className='text-center'>
                <h3 className='text-2xl font-bold my-3'>Pet Surgeries</h3>
                <span className='text-zinc-500 text-sm'>Our free veterinary services are available to pets whose owners are on certain means-tested benefits.</span>
              </div>
            </div>
            <div className='md:basis-1/3 flex flex-col justify-center p-2'>
              <div className="p-3" >
                <img src={care} className='max-w-50 rounded-full object-cover mx-auto' rounded alt="" />
              </div>
              <div className='text-center'>
                <h3 className='text-2xl font-bold my-3'>Pet Care</h3>
                <span className='text-zinc-500 text-sm'>Our free veterinary services are available to pets whose owners are on certain means-tested benefits.</span>
              </div>
            </div>
            <div className='md:basis-1/3 flex flex-col justify-center p-2'>
              <div className="p-3" >
                <img src={adopt} className='max-w-50 rounded-full object-cover mx-auto' rounded alt="" />
              </div>
              <div className='text-center'>
                <h3 className='text-2xl font-bold my-3'>Pet Adoption</h3>
                <span className='text-zinc-500 text-sm'>Our free veterinary services are available to pets whose owners are on certain means-tested benefits.</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap justify-center my-20'>
          <div>
            <div className='mb-20'>
              <h2 className='text-4xl font-extrabold mb-4'>We need your help Adopt Us</h2>
              <span className='block max-w-xl mx-auto text-zinc-500 text-sm'>Working in conjunction with humanitarian aid agencies, we have supported programmes alleviate human.</span>
            </div>
            <div className="flex mb-20">
              <div className='mx-5'>
                <i className="fa-solid fa-shield-cat text-5xl text-rose-800 hover:text-shadow-lg"></i><br />
                <h2>50 +</h2>
                <span className='text-zinc-500 text-sm'>Pets Available</span>
              </div>
              <div>
                <i className="fa-solid fa-heart-circle-check text-5xl text-rose-800 hover:text-shadow-lg"></i><br />
                <h2>300 +</h2>
                <span className='text-zinc-500 text-sm'>Happy Clients</span>
              </div>
            </div>
          </div>

          <div>
            <img src={dog} className='max-w-100' alt="" />
          </div>

        </div>
        <div className='text-center px-20 py-20 bg-rose-100'>
          <h2 className='text-4xl font-extrabold mb-4'>Our Customers Feedbacks</h2>
          <div>
            <ol className="relative border-s border-gray-200">
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-rose-100 rounded-full -start-3 ring-8 ring-white ">
                  <Avatar rounded />
                </span>
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex ">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">May 2025</time>
                  <div className="text-sm font-normal text-gray-500">From food ordering to health tracking, this site does it all. I don’t need five different apps anymore. Highly recommend!</div>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-rose-100 rounded-full -start-3 ring-8 ring-white">
                  <Avatar rounded />
                </span>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xs">
                  <div className="items-center justify-between mb-3 sm:flex">
                    <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">Feb 2024</time>
                    <div className="text-sm font-normal text-gray-500 lex">Tracking meds and vet visits became so much easier with this platform. It really gave me peace of mind during a tough time.</div>
                  </div>
                </div>
              </li>
              <li className="ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-rose-100 rounded-full -start-3 ring-8 ring-white">
                  <Avatar rounded />
                </span>
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex ">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">Aug 2023</time>
                  <div className="text-sm font-normal text-gray-500 lex">I've tried so many apps that crashed or were confusing. This one just works. It’s sleek, fast, and has everything I need.</div>
                </div>
              </li>
            </ol>
          </div>



        </div>
        <div className='px-30 my-20'>
          <div className='text-center my-5'>
            <h2 className='text-4xl font-extrabold mb-4'>Contact Us</h2>
          </div>
          <div className='flex flex-wrap justify-center '>
            <div className='md:w-1/2 w-full'>
              <form className="max-w-md mx-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer" placeholder=" " required />
                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer" placeholder=" " required />
                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer" placeholder=" " required />
                  <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                  <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
              </form>

            </div>
            <div className='md:w-1/2 w-full md:px-40 px-15'>
              <div className='text-center'>
                <h2 className='text-3xl font-extrabold mb-4'>Contact Info</h2>
              </div>
              <div>
                <h5 className='font-extrabold'>Phone Number :</h5>
                <span className='text-gray-600 font-bold text-sm'>+20123456788</span>
              </div>
              <div className='mt-5'>
                <h5 className='font-extrabold'>Email :</h5>
                <span className='text-gray-600 font-bold text-sm'>pet_z@email.com</span>
              </div>

            </div>
          </div>
        </div>

      </div>

    </>
  )
}
