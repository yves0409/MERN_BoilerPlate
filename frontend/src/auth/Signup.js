import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import Layout from '../core/Layout'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    return (
        <Layout>
            <ToastContainer/>
             <h1>SignUp</h1>
        </Layout>
    )
}

export default Signup
