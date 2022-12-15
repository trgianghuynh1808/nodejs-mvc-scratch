const { taskController } = require("../controller");

module.exports = (id) => {
  return {
    GET: id ? taskController.getTaskById : taskController.getAllTasks,
    POST: taskController.createTask,
    PATCH: taskController.updateTask,
    PUT: taskController.replaceTask,
    DELETE: taskController.deleteTask,
  };
};
