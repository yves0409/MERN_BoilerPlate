import React from 'react'
import axios from 'axios'
import {authenticate, isAuth} from './helpers'
import GoogleLogin from 'react-google-login'


const Google = ()=> {
    const responseGoogle = (response) => {
        console.log(response);
    }
    return(
        <div className="pb-3">
        
        <GoogleLogin
    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-danger btn-lg btn-block">
          <i className="fab fa-google pr-2"></i>Login With Google
          </button>
    )}
    cookiePolicy={'single_host_origin'}
  />
  
        </div>
    )
}

export default Google
