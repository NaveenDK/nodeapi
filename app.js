const express = require('express');
const app = express();
const morgan = require("morgan");
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');

//bring in routes
const postRoutes = require('./routes/post');

const myOwnMiddleware = (req,res,next)=>{
    console.log("middleware applied!!!");
    next();
}

//middleware
app.use(morgan("dev"));
app.use(myOwnMiddleware)

app.use("/",postRoutes);

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