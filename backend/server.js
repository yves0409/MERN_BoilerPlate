const express = require('express')

const app = express()

//Import routes from the routes folder => notice  you import from the routes folder de auth file
const authRoutes = require('./routes/auth')

//apply middleware : ('use') method is part of express
app.use('/api',authRoutes)

const port = process.env.port || 8000

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})