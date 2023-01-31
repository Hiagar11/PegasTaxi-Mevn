const mongoose = require('mongoose');
const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();


app.use(cors()) // to allow cross origin requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.set('strictQuery', false);

app.use('/users', require('./routes/api/users'))
app.use('/login', require('./routes/api/login'))
app.use('/colors', require('./routes/api/colors'))
app.use('/trips', require('./routes/api/trips'))

app.use('/', express.static(path.join(__dirname, '../client/dist')));


app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))