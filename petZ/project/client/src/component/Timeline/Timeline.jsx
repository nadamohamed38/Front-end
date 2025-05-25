import { Avatar, Button, FileInput, Label, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';

export default function Timeline() {
    const [userPost, setUserPost] = useState([])
    let { mainUser, userName} = useContext(UserContext)
    const [file, setFile] = useState(null)
    const [addModal, setAddModal] = useState(false);
    let [message, setMessage] = useState(null);
    
    


    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get('http://localhost:5000/timeline');
                setUserPost(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        getPosts()
    }, [userPost])

    async function postPost(values) {
        const now = new Date();
        values.t = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
    const formData = new FormData();
    formData.append('caption', values.caption);
    formData.append('t', values.t);
    formData.append('img', file); // file from useState
    formData.append('name', values.name);

    try {
      const { data } = await axios.post("http://localhost:5000/timeline", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);
      setMessage(data.message)

    } catch (err) {
      console.log(err);
    }
  }

    let formik = useFormik({
        initialValues: {
            caption: '',
            img: file, //e.targer.file[0].name,
            user_id: mainUser,
            t : "",
            name:userName
        },
        enableReinitialize: true,
        onSubmit: values => {
            postPost(values);

        }
    })

    return (
        <>
            <div className="mt-16 p-15">

                <div className="flex justify-between my-10">

                    <div><h2 className='text-5xl font-extrabold'>Our <span className='text-5xl font-extrabold text-rose-800'>Community</span></h2>  </div>
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
                <div className="flex flex-wrap flex-col">
                    {userPost?.map((p)=>(
                        <div key={p._id}>
                             <ol className="relative border-s border-gray-200 lg:mx-50">
                                          <li className="mb-10 ms-6">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-rose-100 rounded-full -start-3 ring-8 ring-white ">
                                              <Avatar rounded />
                                            </span>
                                            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex ">
                                              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{p?.t}</time>
                                              <div className='flex'> 
                                                <div> <h4 className='m-5 font-bold text-rose-800'>{p?.name}</h4></div>
                                                 {p?.img?<img src={p?.img} className='max-w-50 max-h-50 m-3' alt="" />:null}
                                              <div className="text-md font-normal m-10">{p?.caption}</div>
                                              </div>
                                             
                                            </div>
                                          </li>
                                         
                                        </ol>
                        </div>
                    ))}
                </div>
            </div>

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
                                    <Label htmlFor="caption">Add captoin</Label>
                                </div>
                                <TextInput id="caption" type="text" onChange={formik.handleChange} value={formik.values.caption} placeholder="" required shadow />
                            </div>
                            <div className="flex items-center gap-2">
                                {message ? <div className="p-2 mb-2 text-sm text-rose-800 rounded-lg bg-rose-50" role="alert">{message}</div> : null}
                            </div>
                            <Button className="max-w-30 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-800 text-white hover:bg-gradient-to-br focus:ring-rose-300 " type='submit' onSubmit={() => setOpenModal(false)} >
                                Post
                            </Button>
                        </form>
                    </div>

                </ModalBody>

            </Modal>

        </>
    )
}
