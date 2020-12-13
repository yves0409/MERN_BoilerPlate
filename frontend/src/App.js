import React from 'react'
import Layout from './core/Layout'

const App = () => {
 
 return (
    <Layout>
      <div className="col-md-6 offset-md-3 text-center">
        <h1 classname="p-5">BoilerPlate Authentication</h1>
        <h2>Made with M.E.R.N.</h2>
        <hr/>
        <p className="lead">
          A ready to use full stack boilerplate that includes all functionalities to use in your projects and allows
          you to sign up, sign in as a user and with your google account, email verification and reset passwords 
        </p>

      </div>
    </Layout>
  )
};

export default App

