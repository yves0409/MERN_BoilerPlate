const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express()

//Import routes from the routes folder => notice  you import from the routes folder de auth file
const authRoutes = require('./routes/auth')

//Middleware used for app
app.use(morgan('dev'))
app.use(bodyParser.json())
//app.use(cors())  //allows acces from all origin
if (process.env.NODE_ENV = 'development') {
    app.use(cors({origin: `http://localhost:3000`}))
}


//Middleware used for routes
app.use('/api',authRoutes)

const port = process.env.PORT || 8000

app.listen(port , () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
})