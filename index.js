const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const multer = require('multer');

require('dotenv').config({ path: '.env.development' });


// Set up storage for multer
const upload = multer({ dest: '/uploads' });


app.use(cors());
app.use(bodyParser())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', indexRouter);


// DB connection.
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("mongo connected");
}).catch(err => {
    console.error("mongo starting error:", err.message);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

