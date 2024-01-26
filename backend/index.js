const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { bugRouter } = require('./routes/bug.routes');

const app = express()
app.use(express.json())

app.use('/', userRouter)
app.use('/bugs', bugRouter)

app.listen(8080, async()=>{
    try {
        await connection
        console.log('server running at 8080');
    } catch (error) {
        console.log(error);
    }
})