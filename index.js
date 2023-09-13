const express = require('express')
const app = express()
const port = 7050
const mongoose = require('mongoose')
const router = require('./src/routes/index')
const cors = require('cors')
require('dotenv').config()
var url = process.env.db

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url)
        console.log("MongoDB connected:  ", conn.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(router)

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is starting at port ${port}`)
    })
})
