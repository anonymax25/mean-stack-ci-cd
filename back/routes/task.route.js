const TaskModel = require('../models').Task;

module.exports = function (app) {
    app.post("/task", async (request, response) => {
        try {
            if (request.body.name && request.body.datetime && request.body.user) {
                const task = new TaskModel(request.body);
                const result = await task.save();
                response.status(201).send(result);
            }else{
                return response.status(400).end();
            }
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/tasks/:uid", async (request, response) => {
        try {
            if(request.params.uid){
                const result = await TaskModel.find({user: request.params.uid});
                response.status(200).send(result);
            } else {
                response.status(400).end();
            }

        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    app.get("/task/:taskId", async (request, response) => {

        try {
            if(request.params.taskId){
                const result = await TaskModel.findOne({_id: request.params.taskId});
                response.send(result);
            } else {
                response.status(400).end();
            }
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.delete("/task/:id", async (request, response) => {
        try {
            if (request.params.id.length < 5) {
                return;
            }
            const result = await TaskModel.deleteOne({_id: request.params.id}).exec();
            response.status(200).send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
};
