const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
// import mongoose
const cors = require('cors');
const mongoose = require('mongoose');

// load env variables
const dotenv = require('dotenv');

//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

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
app.use( cors())

app.use("/api",postRoutes);
app.use("/api",authRoutes);
app.use("/api",userRoutes);        

const port = 8080;

app.listen(port,()=>{
    console.log(`A nodejs api is listening on port:${port}`)
});

app.get('/api',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err){
      res.status(400).json({
        error:err
      })
    }

    const docs = JSON.parse(data);
    res.json(docs);



  })

})


dotenv.config()


 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true,useFindAndModify:false}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//mongoose.connect(Config.database,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false});