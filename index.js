const express = require('express')
const app = express()
const port = 4000
require('./connection/connection');
const bookRoute = require('./routes/bookRoutes')
const userRoute = require('./routes/userRoutes');
app.use(express.json())
app.use('/api/v1', bookRoute);
app.use('/api/user', userRoute);
app.listen(port, () => {
    console.log(`Your Server is listening in port ${port}`)
})