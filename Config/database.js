const mongoose = require("mongoose");
 
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL ,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => {
        console.log("Db coonect");
    })
    .catch((err) => {
        console.log("db connection issues");
        console.log(err);
        process.exit(1);
    })
}