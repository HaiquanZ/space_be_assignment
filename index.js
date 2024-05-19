const express = require('express');
const errorHandler = require('./api/middlewares/handle-error')
const assignmentRouter = require('./api/routes/assignmentRoute')
const app = express();

app.use(express.json());
// app.use('/', (req, res, next) => {
//     return res.status(200).json({"msg": "Assignment service"})
// })
app.use('/', assignmentRouter);
app.use(errorHandler)

app.listen(8003, () => {
    console.log('Assignment service listening on 8003')
})