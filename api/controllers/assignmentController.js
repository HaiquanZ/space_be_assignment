const assignmentModel = require('../models/assignment');

exports.createAssignment = async(req, res, next) => {
    try{
        const result = await assignmentModel.createAssignment({
            groupId: req.body.groupId,
            name: req.body.name,
            content: req.body.content,
            userId: req.body.user.id,
            postId: req.body.postId
        })

        if(result.insertId){
            return res.status(201).json({
                status: 'success',
                data: {
                    message: 'Assignment created successfully'
                }
            })
        }else throw new Error('Assignment creation failed');
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.getDetailAssignment = async(req, res, next) => {
    try{
        const result = await assignmentModel.getDetailAssignment({assignmentId: req.query.assignmentId})
        return res.status(200).json({
            status:'success',
            data: {
                assignment: result
            }
        })
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.updatePhase = async(req, res, next) => {
    try{
        await assignmentModel.updatePharse(req.body)
        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Phase updated successfully'
            }
        });
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.addTask = async(req, res, next) => {
    try{
        const result = await assignmentModel.addTask(
            {pic: req.body.pic, name: req.body.name, task_giver: req.body.user.id, stepId: req.body.stepId, dueto: req.body.dueto }
        )

        if(result.insertId){
            return res.status(201).json({
                status: 'success',
                data: {
                    message: 'Add task in this step successfully'
                }
            })
        }
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.getTask = async(req, res, next) => {
    try{
        const result = await assignmentModel.getTask({stepId: req.query.stepId})

        return res.status(200).json({
            status: 'success',
            data: {
                tasks: result
            }
        });
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.updateTask = async(req, res, next) => {
    try{
        const result = await assignmentModel.updateTask({
            pic: req.body.pic,
            message: req.body.message,
            status: req.body.status,
            dueto: req.body.dueto,
            id: req.body.id
        })
        return res.status(200).json({
            status: 'success',
            data: {
                result
            }
        })
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.getTaskByuser = async(req, res, next) => {
    try{
        const result = await assignmentModel.getTaskByUser({pic: req.query.pic, type: req.query.type});
        return res.status(200).json({
            status: 'success',
            data: {
                tasks: result
            }
        });
    }catch(err){
        console.log(err);
        next(err);
    }
}

