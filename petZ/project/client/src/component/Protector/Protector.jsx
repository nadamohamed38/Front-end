import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protector(props) {
    if(localStorage.getItem("mainUser") || localStorage.getItem("mainVet")){
        return props.children
    }else{
        return <Navigate to = "/login"></Navigate>
    }
}
