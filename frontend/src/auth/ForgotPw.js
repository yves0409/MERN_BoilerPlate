import React,{useState} from 'react'
import axios from 'axios'
import Layout from '../core/Layout'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ForgotPw = ({history}) => {
    const [values,setValues] = useState({
       
        email:'',
        buttonText:'Reset password'
    })

    const {email,buttonText} = values

   const  handleChange=(name)=> (event)=> {
       //console.log(event.target.value);
       setValues({...values,[name]:event.target.value})
    }

    const handleSubmit = event => {
     // console.log('submitted');
      event.preventDefault();
      setValues({...values,buttonText:'Submitting'})

      axios({
          method: 'PUT',
          url:`${process.env.REACT_APP_API}/forgot-password`,
          data: {email}
        })
      .then(response => {
          console.log('forgot password success',response);
          toast.success(response.data.message)
          setValues({...values,buttonText:'Request Made'})
       
          
          
      })
      .catch(error => {
          
          console.log('forgot password error',error.response.data);
          toast.error(error.response.data.error)
          setValues({...values,buttonText:'Reset password'})
      })
    }

    const forgotPaswordForm =()=> (
        <form>
        

          <div className="form-group">
              <label className="text-muted">Email</label>
              <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
          </div>

         <div>
              <button className="btn btn-primary" onClick={handleSubmit}>{buttonText}</button>
          </div>

        </form>
    )
    return (
        <Layout>
          
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
                <h1 className="p-5 text-center" >Forgot Password</h1>
             {forgotPaswordForm()}
            </div>
        </Layout>
    )
}

export default ForgotPw
