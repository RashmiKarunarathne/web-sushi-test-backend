const todoModel = require('../model/todo')
// Create and Save a new task
exports.create = async (req, res) => {
    if (!req.body.heading && !req.body.description && !req.body.status) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const todo = new todoModel({
        heading: req.body.heading,
        description: req.body.description,
        status: req.body.status
    });
    
    await todo.save().then(data => {
        res.send({
            message:"Task created successfully!!",
            todo:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred"
        });
    });
};
// Retrieve all tasks from the database.
exports.findAll = async (req, res) => {
    try {
        const todo = await todoModel.find();
        res.status(200).json(todo);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Update a task by the id in the request
exports.update = async (req, res) => {
    if (!req.body || !req.params.id) {
        res.status(400).send({
            message: "Data to update or task id can not be empty!"
        });
        return;
    }
    
    const id = req.params.id;
    
    try {
        const updatedTask = await todoModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
        
        if (!updatedTask) {
            res.status(404).send({
                message: `Task not found.`
            });
        } else {
            res.send({ message: "Task updated successfully.", updatedTask });
        }
    } catch(err) {
        res.status(500).send({
            message: err.message || "Error occurred while updating task."
        });
    }
};
// Delete a task with the specified id in the request
exports.destroy = async (req, res) => {
    await todoModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Task not found.`
          });
        } else {
          res.send({
            message: "Task deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};