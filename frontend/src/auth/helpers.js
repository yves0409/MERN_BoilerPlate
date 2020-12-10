import cookie from 'js-cookie'

//set in cookie 
export const setCookie = (key,value) => {
    if(window !== 'undefined') {
        cookie.set(key,value,{expires:1})
    }
}

//remove from cookie 
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        cookie.remove(key,{expires:1})
    }
}

//get from cookie such as set in token ,usefull to make request to server
export const getCookie = (key) => {
    if(window !== 'undefined') {
       return  cookie.get(key)
    }
}

//set in localstorage
export const setLocalStorage = (key,value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key,JSON.stringify(value))
    }
}

//remove form localstorage
export const removeLocalStorage = (key) => {
    if(window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

//authenticating user by passing data to cookie and localstorage
export const authenticate =(response,next)=> {
  console.log('Authenticate helper on signin response',response)
  setCookie('token',response.data.token)
  setLocalStorage('user',response.data.user)
  next();
}

//access userinfo from localstorage
export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
               return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

//logout
export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next();
}

// export const updateUser = (response,next) => {
//     console.log("Information set in localStorage",response)
//     if(typeof window !== 'undefined') {
//        let auth = JSON.parse(localStorage.getItem('user'))
//        auth = response.data
//        localStorage.setItem('user',JSON.stringify(auth))
//     }
//     next();
// }

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};