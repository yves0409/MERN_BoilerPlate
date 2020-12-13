import React from 'react'
import axios from 'axios'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const Facebook = ({informParent = f => f})=> {
    const responseFacebook = (response) => {
        console.log(response);
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,  
            data:{userID: response.userID,accessToken:response.accesToken}   //sending data we get from FB to backend
        })
        .then(response => {
            console.log('FACEBOOK_LOGIN_SUCCESS',response)
            informParent(response)
        })
        .catch(error => {
            console.log('FACEBOOK_LOGIN_ERROR',error.response)
        })
    }
    return(
        <div className="pb-3">
        
        <FacebookLogin
  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT_ID}`}
  autoLoad={false}
  callback={responseFacebook}
  render={renderProps => (
    <button onClick={renderProps.onClick} className="btn btn-primary btn-lg btn-block">
          <i className="fab fa-facebook pr-2"></i>Login With Facebook</button>
  )}
/>
  
        </div>
    )
}

export default Facebook
