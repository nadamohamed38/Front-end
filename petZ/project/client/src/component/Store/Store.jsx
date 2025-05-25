import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Label,
  TextInput,
  FileInput
} from 'flowbite-react';
import { useFormik } from 'formik';
export default function Store() {
  const [store, setStore] = useState([])
  const [product, setProduct] = useState(null)
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(null)
  let [message, setMessage] = useState(null)
  const [file, setFile] = useState(null)
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    async function getStore() {
      try {
        const response = await axios.get('http://localhost:5000/store');
        setStore(response.data);

      } catch (error) {
        console.log(error);
      }
    }
    getStore()
  }, [message])

   async function sell(values) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('cost', values.cost);
    formData.append('amount', values.amount);
    formData.append('img', file); // file from useState

    try {
      const { data } = await axios.post("http://localhost:5000/store", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);
      setMessage(data.message)
      setAddModal(false)
    } catch (err) {
      console.log(err);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      cost: '',
      img: file, 
      amount: '',
    },
    enableReinitialize: true,
    onSubmit: values => {
      sell(values);

    }
  })
 async function buy(p) {
    setOpenModal(false)
    try {
      const { data } = await axios.put(`http://localhost:5000/store/${p}`, {amount:amount-1});

      console.log(data);
      setMessage(data.message)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="mt-16 p-15">

        <div className="flex justify-between my-10">
          <div><h2 className='text-5xl font-extrabold'>Supplies <span className='text-5xl font-extrabold text-rose-800'>Store</span></h2></div>
           <div>
                      <Button
                        onClick={() => {
                          setAddModal(true);
                        }}
                        className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-800 text-white hover:bg-gradient-to-br focus:ring-rose-300 ">
                        Add Yours
                      </Button>
                    </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {store?.map((product) => (
            <div key={product._id} className="max-w-80 bg-white border m-3 border-gray-200 rounded-lg shadow-sm transition delay-100 duration-500 ease-in-out hover:shadow-xl shadow-rose-800">
              <img className="rounded-t-lg" src={product?.img} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product?.name}</h5>
                <span className='mb-3 font-normal text-black '>Price : <span className='font-extrabold'>{product.cost} EG</span></span><br />
                <span className='mb-3 font-normal text-black '>Amount : <span className='font-extrabold'>{product.amount}</span></span>
              </div>
              <button
                onClick={() => {
                  setProduct(product?._id);
                  setAmount(product?.amount)
                  setOpenModal(true);
                }}
                className='relative inline-flex items-center justify-center p-0.5 m-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-rose-800 to-red-500 group-hover:from-rose-800 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-rose-300'
              >
                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent'>
                  Buy
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Enter Your Information:</ModalHeader>
        <ModalBody>
          <span className='font-extrabold'>Orders are delivered within two days.</span>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2">Your email</Label>
              </div>
              <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2">Your Phone Number</Label>
              </div>
              <TextInput id="password2" type="tel" required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password">Address</Label>
              </div>
              <TextInput id="repeat-password" type="text" required shadow />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className='text-black' onClick={() => buy(product)}>
            Buy
          </Button>
        </ModalFooter>
      </Modal>



<Modal show={addModal} onClose={() => setAddModal(false)}>
        <ModalHeader>Pet Information</ModalHeader>
        <ModalBody>
          <div className='my-5 '>
            <form className="flex max-w-md flex-col gap-4 mx-auto" onSubmit={formik.handleSubmit}>
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center 
        rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <FileInput id="dropzone-file" className="hidden" onChange={(e) => setFile(e.target.files[0])} required shadow />
                </Label>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name">Product Name</Label>
                </div>
                <TextInput id="name" type="text" onChange={formik.handleChange} value={formik.values.name} placeholder="name" required shadow />
              </div>
              <div className='mb-2 block'> 
                <Label htmlFor="cost">Price Per Each</Label>
                <TextInput id='cost' type='number' onChange={formik.handleChange} value={formik.values.cost} placeholder='ex: 50' required shadow/>
              </div>
              <div className='mb-2 block'> 
                <Label htmlFor="amount">Product Amount</Label>
                <TextInput id='amount' type='number' onChange={formik.handleChange} value={formik.values.amount} placeholder='ex: 5' required shadow/>
              </div>
              <div className="flex items-center gap-2">
                {message ? <div className="p-4 mb-4 text-sm text-rose-800 rounded-lg bg-rose-50" role="alert">{message}</div> : null}
              </div>
              <Button className="max-w-30 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-800 text-white hover:bg-gradient-to-br focus:ring-rose-300 " type='submit' onSubmit={() => setOpenModal(false)} >
                Add
              </Button>
            </form>
          </div>

        </ModalBody>

      </Modal>

    </>
  )
}
