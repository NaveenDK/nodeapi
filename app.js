const express = require('express');
const app = express();
const morgan = require("morgan");

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