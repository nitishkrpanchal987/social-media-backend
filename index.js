const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

let conn = async ()=>{
    let data = await mongoose.connect(process.env.MONGO_URL);
    console.log('connnected to database');
}
conn();

app.listen(port, ()=>{
    console.log(`connected with port ${port}`);
})

// Q5Jzon4qeqlJrksy