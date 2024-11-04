const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 9000;

app.use(express.json());

require('./Config/database').connect();

// route import
const user  = require('./routes/user')
app.use('/api/v1',user)

// activation
app.listen(PORT,() => {
    console.log(`app is listening on the Port ${PORT}`)
})