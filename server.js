const express = require('express')
const PORT = 7000
const app = express()



app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`)
})