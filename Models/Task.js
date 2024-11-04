const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    }, 
    IsDone:{
        type:Boolean,
        required:true
    },

    status:{
        type:String,
        enum: ['pending' , 'in-progress' , 'completed'],
        default:'pending'
    },

    dueDate: {
        type:Date
    },
    
   
})

module.exports = mongoose.model("Task",taskSchema);
