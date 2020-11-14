const express = require('express')

const app = express()

app.get('/api/signup', (req,res) => {
    res.json({
        data: 'You hit the signup endpoint '
    })
})

const port = process.env.port || 8000

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})