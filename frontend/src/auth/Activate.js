import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import Layout from '../core/Layout'
import jwt from 'jsonwebtoken'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Activate = ({match}) => {
    const [values,setValues] = useState({
        name:'',
        token:'',
        show: true
    })

    useEffect(()=>{
        console.log('change in state');
        let token = match.params.token
        //console.log(token);
        let {name} = jwt.decode(token)
        if(token) {
            setValues({...values,name,token})
        }
    },[])

    const {name,token,show} = values

   

 
    const handleSubmit = event => {
      console.log('submitted');
      event.preventDefault();
      
     
      axios({
          method: 'POST',
          url:`${process.env.REACT_APP_API}/account-activation`,
          data: {token}
        })
      .then(response => {
          console.log('Activation account',response);

          //save values(user,token) in localstorage/cookie
          setValues({...values,show:false})
          toast.success(response.data.message)
      })
      .catch(error => {
          console.log(error);
          console.log('Activation account error',error.response.data.error);
          
          toast.error(error.response.data.error)
      })
    }

   const activationLink = () => (
       <div className="text-center">
       <h1 className="p-5 " >Hi {name}!, Click to activate your account</h1>
       <button className="btn btn-outline-primary" onClick={handleSubmit}>Activate Account</button>
       </div>
   )
    
    return (
        <Layout>
            {/* {JSON.stringify({email,password})} */}
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
             
             {activationLink()}

            </div>
           
            
        </Layout>
    )
}

export default Activate
