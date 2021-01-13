const bodyParser = require('body-parser');
const TaskModel = require('../models').Task;
module.exports = function (app) {
    app.post("/task", async (request, response) => {
        try {
            if (request.body.name && request.body.datetime && request.body.user) {
                var task = new TaskModel(request.body);
                var result = await task.save();
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
                var result = await TaskModel.find({user: request.params.uid});
                response.status(200).send(result);
            } else {
                response.status(400).end();
            }

        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });
    
    app.get("/task/:taskId", async (request, response) => {

        try {
            if(request.params.taskId){
                var result = await TaskModel.findOne({_id: request.params.taskId});
                response.send(result);
            } else {
                response.status(400).end();
            }

        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    app.delete("/task/:id", async (request, response) => {
        try {
            if (request.params.id.length < 5) {
                return;
            }
            var result = await TaskModel.deleteOne({_id: request.params.id}).exec();

            response.status(200).send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/", async (request, response) => {
        response.status(200).send("node js mongo db API 2");
    });
}
