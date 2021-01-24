const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.send("Hello world from nodejs");
})

const port = 8080;

app.listen(port,()=>{
    console.log(`A nodejs api is listening on port:${port}`)
});