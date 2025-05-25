import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios';

export default function Appointments() {
      let {mainUser,setMainUser} = useContext(UserContext)
      const [appoints, setAppoints] = useState([]);
      const [users, setUsers] = useState([]);
    
      useEffect(() => {
        async function getAppointments() {
      try {
        const response = await axios.get(`http://localhost:5000/book/${mainUser}`);
        setAppoints(response.data);
        console.log(response.data);
        
        
      } catch (error) {
        console.log(error);
      }
    }

    getAppointments();
      }, [mainUser])

useEffect(() => {
  async function fetchUsers() {
    if (appoints.length === 0) return;

    try {
      const userPromises = appoints.map(a =>
        axios.get(`http://localhost:5000/user/${a.user_id}`)
      );
      const results = await Promise.all(userPromises);

      const usersData = results.map(res => ({
        name: res.data.name,
        contact: res.data.phone_number,
      }));

      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  }
  fetchUsers();
}, [appoints]);


      
  return (
   <>
   <div className='mt-20 flex flex-col'>
          <h2 className='my-10 text-3xl font-extrabold'>
            Appointments:
          </h2>
          {appoints?.map((a,index) => (
            <div
              key={a?._id} on
              className='max-w-9/10 flex justify-between mx-20 my-5 p-2 transition delay-100 duration-500 ease-in-out hover:scale-110 border-2 border-rose-800 rounded-lg'
            >
              <div>
                <h3>
                  Pet owner : <span className='font-extrabold'>{users[index]?.name}</span>
                </h3>
                <h3>
                  Appointment :{' '}
                  <span className='font-extrabold'>{a.appointment.substring(0, 10)}</span>
                </h3>
                <h3>
                  Contact Info :{' '}
                  <span className='font-extrabold'>{users[index]?.contact}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
   </>
  )
}
