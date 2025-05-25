import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import photo from '../../assets/vet.png';
import {
  Button,
  Datepicker,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ThemeConfig,
} from 'flowbite-react';
import { UserContext } from '../../Context/UserContext';

export default function Doctor() {
  const [vets, setDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  let {mainUser,setMainUser} = useContext(UserContext)

  useEffect(() => {
    async function getDoctors() {
      try {
        const response = await axios.get('http://localhost:5000/vet');
        setDoctors(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getDoctors();
  }, []);

  async function book() {
    setOpenModal(false);
    var temp = {
      appointment:selectedDate,
      vet_id:selectedDoctorId,
      user_id:mainUser
    }
    return await axios.post("http://localhost:5000/book",temp).then((data)=>{
      console.log(data);
      setMessage(data.data.message)
      navigat("/login")
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  return (
    <>
      <div className='mt-16 p-20'>
        <div className='mb-15'>
          <h2 className='font-extrabold text-5xl'>
            Our <span className='text-rose-800'>Veterinarians</span>
          </h2>
        </div>

        <div className='flex flex-wrap mt-5 justify-center'>
          <div className='lg:w-1/3 me-10'>
            <img
              src={photo}
              className='max-w-110 border rounded-lg transition delay-100 duration-500 ease-in-out hover:scale-110 hover:shadow-xl shadow-rose-800'
              alt=''
            />
          </div>
          <div className='lg:w-1/3 text-lg transition delay-100 duration-500 ease-in-out hover:scale-110 border-2 border-rose-800 rounded-lg'>
            <p className='p-3'>
              Our team of skilled and caring veterinarians is at the heart of
              everything we do. Each doctor brings years of experience, a deep
              love for animals, and a commitment to providing the highest
              quality care. From preventive health and vaccinations to advanced
              diagnostics and emergency treatments, our vets are here to
              support your pet at every stage of life. We understand that your
              pet is a beloved member of your family, and we treat them with the
              same care and respect as we would our own. Whether you're visiting
              for a routine check-up or a complex medical concern, our doctors
              take the time to listen, explain, and create a treatment plan
              tailored to your pet’s unique needs.
            </p>
          </div>
        </div>

        <div className='mt-20 flex flex-col'>
          <h2 className='my-10 text-3xl font-extrabold'>
            Book your appointment:
          </h2>
          {vets?.map((doctor) => (
            <div
              key={doctor?._id}
              className='max-w-9/10 flex justify-between m-3 p-2 transition delay-100 duration-500 ease-in-out hover:scale-110 border-2 border-rose-800 rounded-lg'
            >
              <div>
                <h3>
                  Name : <span className='font-extrabold'>{doctor?.name}</span>
                </h3>
                <h3>
                  Appointment Price :{' '}
                  <span className='font-extrabold'>{doctor?.price}</span>
                </h3>
                <h3>
                  Contact Info :{' '}
                  <span className='font-extrabold'>{doctor?.email}</span>
                </h3>
              </div>
              <div className='fmx-5'>
                <button
                  onClick={() => {
                    setSelectedDoctorId(doctor?._id);
                    setOpenModal(true);
                  }}
                  className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-rose-800 to-red-500 group-hover:from-rose-800 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'
                >
                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent'>
                    Book
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Modal */}
      <ThemeConfig dark={false} />
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Choose your appointment</ModalHeader>
        <ModalBody>
          <Datepicker
            selected={selectedDate}
            onChange={(date) => {setSelectedDate(date)}}
            title='Date picker'
          />
          <div className='mt-4 text-sm text-gray-700'>
            Booking for:{' '}
            <strong>
              DR.{vets.find((v) => v._id === selectedDoctorId)?.name || '...'}
            </strong>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className='text-black' onClick={book}>
            Book
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}


