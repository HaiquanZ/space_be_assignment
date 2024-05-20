const db = require("../config/db");

exports.createAssignment = async (data) => {
  const [result] = await db
    .promise()
    .query(
      "INSERT INTO assignment (groupId, name, content, userId, createdAt, updatedAt, postId) VALUES (?, ?, ?, ?, ?,?,?)",
      [
        data.groupId,
        data.name,
        data.content,
        data.userId,
        new Date(),
        new Date(),
        data.postId,
      ]
    );

  return result;
};

exports.getDetailAssignment = async (data) => {
  const [info] = await db
    .promise()
    .query("SELECT * FROM assignment WHERE postId = ?", [data.assignmentId]);
  const [steps] = await db
    .promise()
    .query(
      "SELECT p.id, p.name, p.no, p.start, p.end FROM assignment a JOIN phrase p ON a.id = p.assignmentId WHERE a.id = ?",
      [info[0].id]
    );
  return { steps, info: info[0] };
};

exports.updatePharse = async (data) => {
  for (const element of data.steps) {
    let [check] = await db
      .promise()
      .query("SELECT * FROM phrase WHERE id = ?", [element.id]);
    if (check.length == 0) {
      await db
        .promise()
        .query(
          "INSERT INTO phrase (assignmentId, name, no, start, end) VALUES (?, ?, ?, ?, ?)",
          [
            element.assignmentId,
            element.name,
            element.no,
            element.start,
            element.end,
          ]
        );
    } else {
      await db
        .promise()
        .query(
          "UPDATE phrase SET name = ?, no = ?, start = ?, end = ? WHERE id = ?",
          [element.name, element.no, element.start, element.end, element.id]
        );
    }
  }
};

exports.getTask = async (data) => {
  const [result] = await db
    .promise()
    .query("SELECT * FROM task WHERE phraseId = ?", [data.stepId]);
  return result;
};

exports.addTask = async (data) => {
  const [result] = await db
    .promise()
    .query(
      "INSERT INTO task (pic, name, status, message, task_giver, phraseId, createdAt, updatedAt, dueto) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        data.pic,
        data.name,
        "waiting",
        "",
        data.task_giver,
        data.stepId,
        new Date(),
        new Date(),
        data.dueto,
      ]
    );
  return result;
};

exports.updateTask = async (data) => {
  const [result] = await db
    .promise()
    .query(
      "UPDATE task SET status = ?, message = ?, pic = ?, dueto =? WHERE id = ?",
      [data.status, data.message, data.pic, data.dueto, data.id]
    );
  return result;
};

exports.getTaskByUser = async (data) => {
  if (data.type != "all") {
    const [result] = await db
      .promise()
      .query(
        "SELECT task.id, task.status, task.dueto, assignment.postId, task.name FROM task RIGHT JOIN phrase ON task.phraseId = phrase.id RIGHT JOIN assignment ON phrase.assignmentId = assignment.id WHERE task.pic = ? AND task.status = ?",
        [data.pic, data.type]
      );
    return result;
  } else {
    const [result] = await db
      .promise()
      .query(
        "SELECT task.id, task.status, task.dueto, assignment.postId, task.name FROM task RIGHT JOIN phrase ON task.phraseId = phrase.id RIGHT JOIN assignment ON phrase.assignmentId = assignment.id WHERE task.pic = ?",
        [data.pic]
      );
    return result;
  }
};
