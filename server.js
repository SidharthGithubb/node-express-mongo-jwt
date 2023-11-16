const express=require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
require('dotenv').config();
connectDb();
app.use(bodyParser.json());
app.use(errorHandler);
//app.use('/',express.static(path.join(__dirname,'static')))

// app.post('/api/register', async(req,res)=>{
//     console.log(req.body);
//     res.json({
//         status:"Ok"
//     })
// })
app.use('/api/contacts',require('./routes/contactRoutes'))

app.use('/api/users',require("./routes/userRoutes"));
app.listen(9999,()=>{
    console.log('Server up at 9999');
})