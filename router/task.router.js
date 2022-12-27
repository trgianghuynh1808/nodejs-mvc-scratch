const { taskController } = require("../controller");
const { getBodyData } = require("../middleware");

module.exports = (id) => {
  return {
    GET: {
      controller: id ? taskController.getTaskById : taskController.getAllTasks,
      middleware: [],
    },
    POST: {
      controller: taskController.createTask,
      middleware: [getBodyData],
    },
    PATCH: {
      controller: taskController.updateTask,
      middleware: [getBodyData],
    },
    PUT: {
      controller: taskController.replaceTask,
      middleware: [getBodyData],
    },
    DELETE: {
      controller: taskController.deleteTask,
      middleware: [],
    },
  };
};
