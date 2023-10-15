const taskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
    try {
        // Extract the request body, which likely contains the task information.
        let reqBody = req.body;

        // Get the email address from the request headers and add it to the task data.
        reqBody.email = req.headers["email"];

        // Use the taskModel (presumably a Mongoose model) to create a new task in the database.
        let result = await taskModel.create(reqBody);

        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.readTask = async (req, res) => {
    try {
        // Retrieve the user's email from the request headers.
        let email = req.headers["email"];

        // Use the taskModel (presumably a Mongoose model) to find tasks that belong to the specified user by matching their email.
        let data = await taskModel.find({ email: email });

        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.readTaskByStatus = async (req, res) => {
    try {
        // Extract the task status from the request parameters.
        let status = req.params.status;

        // Retrieve the user's email from the request headers.
        let email = req.headers["email"];

        // Use the taskModel (presumably a Mongoose model) to find tasks that match the specified status and user's email.
        let result = await taskModel.find({ status: status, email: email });

        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.readTaskByDate = async (req, res) => {
    try {
        // Retrieve the user's email from the request headers.
        let email = req.headers["email"];

        // Extract the fromDate and toDate from the request body, presumably specifying the date range for task retrieval.
        let fromDate = req.body["fromDate"];
        let toDate = req.body["toDate"];

        // Use the taskModel (presumably a Mongoose model) to find tasks that belong to the specified user and fall within the specified date range.
        let data = await taskModel.find({ email: email, createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) } });

        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        // Extract the request body, title, description, and task ID from the request.
        const reqBody = req.body;
        let title = reqBody["title"];
        let description = reqBody["description"];
        let id = req.params.id;

        // Define the query to find the task by its unique ID (_id).
        let query = { _id: id };

        // Create an object (postBody) containing the fields to be updated.
        let postBody = {
            title: title,
            description: description
        };

        // Use the taskModel (presumably a Mongoose model) to update the task.
        // The $set operator is used to update specific fields. The upsert option
        // is set to true, which means if the task doesn't exist, it will be created.
        let result = await taskModel.updateOne(
            query,
            { $set: postBody },
            { upsert: true }
        );

        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        // Extract the task ID and the new status from the request parameters.
        let id = req.params.id;
        let status = req.params.status;

        // Define the query to find the task to be updated by its unique ID (_id).
        let query = { _id: id };

        // Create a request body object to update the task's status.
        let reqBody = { status: status };

        // Use the taskModel (presumably a Mongoose model) to update the task's status.
        let result = await taskModel.updateOne(query, reqBody);

        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        // Extract the task ID from the request parameters.
        let id = req.params.id;

        // Define the query to find the task to be deleted by its unique ID (_id).
        let query = { _id: id };

        // Use the taskModel (presumably a Mongoose model) to delete the task that matches the query.
        let result = await taskModel.deleteOne(query);

        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

exports.countTaskStatus = async (req, res) => {
    try {
        // Retrieve the user's email from the request headers.
        let email = req.headers["email"];

        // Use the taskModel (presumably a Mongoose model) and the `aggregate` method to perform aggregation operations.
        let result = await taskModel.aggregate([
            {
                $match: { email: email } // Match tasks that belong to the specified user by their email.
            },
            {
                $group: {
                    _id: "$status", // Group tasks by their status field.
                    sum: { $sum: 1 } // Calculate the count of tasks in each group.
                }
            }
        ]);

        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        });
    }
};

