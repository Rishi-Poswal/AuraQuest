import express from "express"
const app = express()

//cors config is remaining

app.get('/', (req,res)=>{
    res.send('ok')
});

export {app}