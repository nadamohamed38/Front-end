import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  
   const [temp,setTemp] = useState(null)
  let navigat = useNavigate();
  let {mainUser,setMainUser,userName,setUserName,vetName,setvetName} = useContext(UserContext)
   const [show,setShow] = useState(false)
  const[isUser,setIsUser] = useState(false)
  const[isvet,setIsvet] = useState(false)

  async function login(e,p){
    if(isUser){
      let emails = await axios.get("http://localhost:5000/user");
    for(var i =0 ; i < emails.data.length ; i++){
      if(emails.data[i].email == e && emails.data[i].password == p){
        setMainUser(emails.data[i]._id)
        localStorage.setItem("mainUser",emails.data[i]._id);
        localStorage.setItem("userName",emails.data[i].name);
        setUserName(emails.data[i].name)
        navigat('/')
      } 
    }
    setTemp("invalid email or password");
    }
    else{
      let emails = await axios.get("http://localhost:5000/vet");
    for(var i =0 ; i < emails.data.length ; i++){
      if(emails.data[i].email == e && emails.data[i].password == p){
        setMainUser(emails.data[i]._id)
        localStorage.setItem("mainVet",emails.data[i]._id);
        localStorage.setItem("userName","DR."+emails.data[i].name);
        setvetName(emails.data[i].name)
        navigat('/')
      }
    }
    setTemp("invalid email or password");
    }
    
  }


    const validate = values => {
     const errors = {};
   
     if (!values.password) {
       errors.password = 'Required';
     } 
   
     if (!values.email) {
       errors.email = 'Required';
     } 
     return errors;
   };
  
    let formik = useFormik({
       initialValues: {
         email: '',
         password:'',
       },
       validate,
       onSubmit: values => {
         login(values.email,values.password)
         
       },
     })
     
    return (
      <>
  
  <div className="mt-16">
    <div className='flex justify-between  pt-20 mx-30'>
        <div>
        <h2 className='text-3xl font-extrabold'>Login:</h2>
        </div>
        <div>
          <button  onClick={()=>{setShow(!show)}} className="text-white bg-rose-800 hover:bg-rose-900 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Role</button>
          {show?<div className='w-30 flex flex-col justify-items-center'>
            <div><button type="button" onClick={()=>{setIsUser(true); setIsvet(false); setShow(false)}} className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">user</button></div>
            <div><button type="button" onClick={()=>{setIsvet(true); setIsUser(false); setShow(false)}} className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">veterinarian</button></div>
          </div>:""}
        </div>
      </div>
      {isUser || isvet ? <form className="max-w-sm mx-auto py-8 mt-16" onSubmit={formik.handleSubmit}>  
          {temp?
    <div className="p-4 mb-4 text-sm text-rose-800 rounded-lg bg-rose-50" role="alert">
      {temp}
    </div>:null}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
            <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 " placeholder="name@email.com" required />
          </div>
  
          {formik.touched.email&&formik.errors.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.email}</span>
          </div>:null}
  
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
            <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 " required />
          </div>
  
          {formik.touched.password&&formik.errors.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.password}</span>
          </div>:null}
  
          <button type="submit" className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
        </form>:null}
    
  </div>
       
      </>
    )
}
