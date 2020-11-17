import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import Layout from '../core/Layout'
import {authenticate, isAuth} from './helpers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signin = () => {
    const [values,setValues] = useState({
       
        email:'yves.loeys@gmail.com',
        password:'shady0409',
        buttonText:'Submit'
    })

    const {email,password,buttonText} = values

   const  handleChange=(name)=> (event)=> {
       console.log(event.target.value);
       setValues({...values,[name]:event.target.value})
    }

    const handleSubmit = event => {
      console.log('submitted');
      event.preventDefault();
      setValues({...values,buttonText:'Submitting'})
     
      axios({
          method: 'POST',
          url:`${process.env.REACT_APP_API}/signin`,
          data: {email,password}
        })
      .then(response => {
          console.log('Signin success',response);

          //save values(user,token) in localstorage/cookie
          authenticate(response, ()=> {
            setValues({...values,name:'',email:'',password:'',buttonText:'Submitted'})
            toast.success(`Welcome back ${response.data.user.name}`)
          })
          
      })
      .catch(error => {
          console.log(error);
          console.log('Signin error',error.response.data);
          setValues({...values,buttonText:'Submit'})
          toast.error(error.response.data.error)
      })
    }

    const signInForm =()=> (
        <form>
        

          <div className="form-group">
              <label className="text-muted">Email</label>
              <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
          </div>

          <div className="form-group">
              <label className="text-muted">Password</label>
              <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
          </div>

          <div>
              <button className="btn btn-primary" onClick={handleSubmit}>{buttonText}</button>
          </div>

        </form>
    )
    return (
        <Layout>
            {/* {JSON.stringify({email,password})} */}
            {/* {JSON.stringify(isAuth())} */}
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
           
            {isAuth() ? <Redirect to="/" /> : null}
             <h1 className="p-5 text-center" >SignIn</h1>
             {signInForm()}

            </div>
           
            
        </Layout>
    )
}

export default Signin
