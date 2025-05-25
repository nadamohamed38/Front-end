import axios from 'axios';
import './Register.css'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown, DropdownItem } from 'flowbite-react';

export default function Register() {

  const [temp,setTemp] = useState(false)
  const [userMessage,setMessage] = useState(null)
  let navigat = useNavigate();
  const [show,setShow] = useState(false)
  const[isUser,setIsUser] = useState(false)
  const[isvet,setIsvet] = useState(false)


  async function emailExist(e){
    if(isUser){
      let emails = await axios.get("http://localhost:5000/user");
    for(var i =0 ; i < emails.data.length ; i++){
      if(emails.data[i].email == e){
        setTemp(true)
        return true;
      }
    }
    setTemp(false)
    }
    else{
      let emails = await axios.get("http://localhost:5000/vet");
    for(var i =0 ; i < emails.data.length ; i++){
      if(emails.data[i].email == e){
        setTemp(true)
        return true;
      }
    }
    setTemp(false)
    }
    
  }

  const validate = values => {
   const errors = {};
   if (!values.name) {
     errors.name = 'Required';
   } else if (values.name.length <= 3) {
     errors.name = 'Must be more than 3 characters';
   }

   if (!values.price && isvet) {
     errors.price = 'Required';
   }

   if (!values.password) {
     errors.password = 'Required';
   } else if (values.password.length < 8) {
     errors.password = 'Must be 8 characters or more';
   }

   if (!values.re_password) {
     errors.re_password = 'Required';
   } else if (values.re_password != values.password) {
     errors.re_password = 'Mismatch';
   }

   if (!values.phone_number) {
     errors.phone_number = 'Required';
   } else if (!/^(?:\+20|0020|0)?1[0125]\d{8}$/.test(values.phone_number) ) {
     errors.phone_number = 'Invalide phone number';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }else {
    emailExist(values.email)    
    if( temp == true){
    errors.email = 'email is already exist';
   }}
 
   return errors;
 };

  let formik = useFormik({
     initialValues: {
      name:'',
       email: '',
       password:'',
       phone_number:'',
       re_password:"",
       price:""
     },
     validate,
     onSubmit: values => {
      console.log(values);
       register(values)
     },
   })


    async function register(values) {
      if(isUser){
         return await axios.post("http://localhost:5000/user",values).then((data)=>{
      console.log(data);
      setMessage(data.data.message)
      navigat("/login")
      
    }).catch((err)=>{
      console.log(err);
      
    })
    }
    else{
       return await axios.post("http://localhost:5000/vet",values).then((data)=>{
      console.log(data);
      setMessage(data.data.message)
      navigat("/login")
      
    }).catch((err)=>{
      console.log(err);
      
    })
    }
   
    
   }
   
  
  return (
    <>
    <div className='mt-16'>
      <div className='flex justify-between  pt-20 mx-30'>
        <div>
        <h2 className='text-3xl font-extrabold'>Regesteration:</h2>
        </div>
        <div>
          <button  onClick={()=>{setShow(!show)}} className="text-white bg-rose-800 hover:bg-rose-900 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Role</button>
          {show?<div className='w-30 flex flex-col justify-items-center'>
            <div><button type="button" onClick={()=>{setIsUser(true); setIsvet(false); setShow(false)}} className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">user</button></div>
            <div><button type="button" onClick={()=>{setIsvet(true); setIsUser(false); setShow(false)}} className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">veterinarian</button></div>
          </div>:""}
        </div>
      </div>
      {(isUser || isvet) ? 
      <form className="max-w-sm mx-auto py-8" onSubmit={formik.handleSubmit}>
        {userMessage?
    <div className="p-4 mb-4 text-sm text-rose-800 rounded-lg bg-rose-50" role="alert">
      {userMessage}
    </div>:null}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">username</label>
          <input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 " placeholder="name" required />
        </div>

        {formik.touched.name&&formik.errors.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.name}</span>
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

        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
          <input name='re_password' type="password" id="repeat-password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.re_password} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 " required />
        </div>

        {formik.touched.re_password&&formik.errors.re_password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.re_password}</span>
        </div>:null}

        <div className="mb-5">
          <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">phone number</label>
          <input name='phone_number' id='phone_number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone_number} type="tel" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 " required />
        </div>

        {formik.touched.phone_number&&formik.errors.phone_number? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.phone_number}</span>
        </div>:null}
        {isvet?<> <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">price</label>
          <input name='price' id='price' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} type="number" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 " required />
        </div>

        {formik.touched.phone_number&&formik.errors.phone_number? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.phone_number}</span>
        </div>:null}</>:null}

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-rose-300" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 ">I agree with the <a href="#" className="text-rose-600 hover:underline">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Register new account</button>
      </form>
      :null}
      
    </div>
        
    </>
  )
}
