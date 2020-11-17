import cookie from 'js-cookie'

//set in cookie 
export const setCookie = (key,value) => {
    if(window !== 'undefined') {
        cookie.set(key,value,{expires:'1'})
    }
}

//remove from cookie 
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        cookie.remove(key,{expires:'1'})
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
  setCookie('token',repsonse.data.token)
  setLocalStorage('user',repsonse.data.user)
  next();
}

//access userinfo from localstorage
export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked =getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}