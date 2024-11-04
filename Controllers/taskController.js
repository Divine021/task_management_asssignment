const Task = require("../Models/Task");
const user = require("../Models/User");

// Controller for CreateTask
exports.createTask = async(req,res) => {

    const {title, Description, completed,assignedTo, dueDate} = req.body;

    try{
    
        const user =  await user.findById(assignedTo);       
        if( !user) {
            return res.status(404).json({
               message:"User not found"
            })
         }
    
        const task = new Task({
            title,
            Description,
            completed
    
        })
    
        await task.save();
        return res.status(201).json({
            success:true,
            message:"Task created  successfully",
            data:task
        })
    
    }
    
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"failed to create task",
    
        })
    }
}

// Update  tasks
exports.Updatetasks  = async(req,res) => {

    const {id} = req.params;
    const { title,description,completed,dueDate}  = req.body;

    try{
    const updatedtask = await Task.findByIdAndDelete(id,{title,description,completed,dueDate},{new:true});

    if(!updatedtask){
        return res.status(404).json({
            success:false,
            message:"Task not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedtask,
    });
}
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }



    }

// Delete Tasks
exports.DeleteTasks = async(req,res) => {
    const {id} = req.params;

    try{
        const deletedTask =  await Task.findByIdAndDelete(id);

        if(!deletedTask){
            return res.status(404).json({
                message:"Task not found",
                success:false
            })
        }

        res.status(200).json({
            success:true,
            message:"task Deleted Successfully"
        })
    }
        catch(err){
            console.log(err);
            message:"Something went wrong"
        }

        
    }
// Fetch all task
exports.getAllTasks = async(req,res) => {
  try{
    const tasks =  await Task.find();
    return res.status(200).json({
        success:true,
        message:"ALL Tasks recived Successfully" ,
        data:tasks
    })
}


catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"Something went wrong while fetching data "
    })

}

}













