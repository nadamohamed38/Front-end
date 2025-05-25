import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Drug() {

  const [drugs,setDrugs] = useState([])
 

  useEffect(() => {
     async function getDrugs() {
     try {
        const response = await axios.get('http://localhost:5000/medicine');
        setDrugs(response.data);
        
      } catch (error) {
        console.log(error);
      }
  }
    getDrugs()
  }, [])
  

  return (
    <>
      <div className="mt-16 p-15">

        <div className="my-10">
          <h2 className='text-5xl font-extrabold'>Drug <span className='text-5xl font-extrabold text-rose-800'>Store</span></h2>
        </div>
        <div className="flex flex-wrap justify-center">
           {drugs?.map((drug)=>(
          <div key={drug._id} className="max-w-80 bg-white border m-3 border-gray-200 rounded-lg shadow-sm transition delay-100 duration-500 ease-in-out hover:shadow-xl shadow-rose-800">
          <a href="#">
            <img className="rounded-t-lg" src={drug?.img} alt="" />
          </a>
          <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{drug?.name}</h5>
              <p className="mb-3 font-normal text-gray-700 ">{drug?.description}</p>
              <span className='mb-3 font-normal text-black '>Price : <span className='font-extrabold'>{drug.price} EG</span></span><br />
              <span className='mb-3 font-normal text-black '>for : <span className='font-extrabold'>{drug.pet_type}</span></span>
          </div>
        </div>
        ))}
        </div>
       
        

      </div>
    </>
  )
}
