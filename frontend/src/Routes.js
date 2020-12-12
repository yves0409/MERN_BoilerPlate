import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import  App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import Private from './core/Private'
import Admin from './core/Admin'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import ForgotPw from './auth/ForgotPw'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/auth/activate/:token" component={Activate}/>
                <PrivateRoute path="/private" component={Private}/>
                <AdminRoute path="/admin" component={Admin}/>
                <Route path="/auth/password/forgot-pw" exact component={ForgotPw}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
