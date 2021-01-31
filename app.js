const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
// import mongoose
const mongoose = require('mongoose');

// load env variables
const dotenv = require('dotenv');

//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

const myOwnMiddleware = (req,res,next)=>{
    console.log("middleware applied!!!");
    next();
}

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(myOwnMiddleware)
app.use(expressValidator());

app.use("/",postRoutes);
app.use("/",authRoutes);        

const port = 8080;

app.listen(port,()=>{
    console.log(`A nodejs api is listening on port:${port}`)
});


dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});