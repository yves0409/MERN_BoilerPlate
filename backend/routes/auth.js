const express = require('express')
const router = express.Router()

router.get('/signup', (req,res) => {
    res.json({
        data: 'You hit the signup endpoint '
    })
})

module.exports = router // is  by default an empty {}