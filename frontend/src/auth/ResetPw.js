import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Layout from '../core/Layout'
import jwt from'jsonwebtoken'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ResetPw = ({match}) => {   //destructured from props.match from react router dom
    const [values,setValues] = useState({
        name:'',
        token:'',
        newPassword:'',
        buttonText:'Reset password'
    })

    useEffect(()=> {
       let token = match.params.token
       let {name} =jwt.decode(token)
       if(token){
           setValues({...values,name,token})
       }
    },[])

    const {name,token,newPassword,buttonText} = values   //destructuring the values

   const  handleChange= (event)=> {
        setValues({...values,newPassword:event.target.value})
    }

    const handleSubmit = event => {
      event.preventDefault();
      setValues({...values,buttonText:'Submitting'})

      axios({
          method: 'PUT',
          url:`${process.env.REACT_APP_API}/reset-password`,
          data: {newPassword,resetPasswordLink:token}
        })
      .then(response => {
          console.log('reset password success',response);
          toast.success(response.data.message)
          setValues({...values,buttonText:'Reset succes'})
       
          
          
      })
      .catch(error => {
          console.log('reset password error',error.response.data);
          toast.error(error.response.data.error)
          setValues({...values,buttonText:'Reset password'})
      })
    }

    const resetPaswordForm =()=> (
        <form>
          <div className="form-group">
              <label className="text-muted">New Password</label>
              <input 
                onChange={handleChange} 
                value={newPassword} 
                type="password" 
                className="form-control" 
                placeholder="Enter New Password" 
                required/>
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
                <h1 className="p-5 text-center" >Hi {name} , Enter your new password</h1>
                {/* decode the name from backend/controllers/auth/forgot-password/jwt.sign */}
             {resetPaswordForm()}
            </div>
        </Layout>
    )
}

export default ResetPw
