import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import Layout from '../core/Layout'
import {isAuth} from './helpers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    const [values,setValues] = useState({
        name:'Yves',
        email:'yves.loeys@gmail.com',
        password:'shady0409',
        buttonText:'Submit'
    })

    const {name,email,password,buttonText} = values

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
          url:`${process.env.REACT_APP_API}/signup`,
          data: {name,email,password}
        })
      .then(response => {
          console.log('Signup success',response);
          setValues({...values,name:'',email:'',password:'',buttonText:'Submitted'})
          toast.success(response.data.message)
      })
      .catch(error => {
          console.log(error);
          console.log('Signup error',error.response.data);
          setValues({...values,buttonText:'Submit'})
          toast.error(error.response.data.error)
      })
    }

    const signUpForm =()=> (
        <form>
          <div className="form-group">
              <label className="text-muted">Name</label>
              <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
          </div>

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
            {/* {JSON.stringify({name,email,password})} */}
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
              {isAuth() ? <Redirect to="/"/> : null}
             <h1 className="p-5 text-center" >SignUp</h1>
             {signUpForm()}
             <br/>
             <Link to="/auth/password/forgot-pw" className="btn btn-sm btn-outline-danger">Forgot Password</Link>


            </div>
           
            
        </Layout>
    )
}

export default Signup
