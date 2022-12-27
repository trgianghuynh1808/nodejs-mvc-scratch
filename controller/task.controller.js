const dataSource = require("../datasource");

const ROUTER_PATH = "tasks";

function getAllTasks(request, response) {
  return dataSource.getAll(ROUTER_PATH, (tasks) => {
    return response.end(JSON.stringify(tasks));
  });
}

function getTaskById(request, response) {
  const url = request.url;
  const taskId = url.split(/id=/gm).pop();

  return dataSource.getDetail(ROUTER_PATH, taskId, (taskDetail) => {
    if (!taskDetail) {
      response.statusCode = 404;
    } else {
      response.statusCode = 200;
    }

    return response.end(JSON.stringify(taskDetail ? taskDetail : null));
  });
}

function createTask(request, response) {
  const bodyData = request.bodyData;

  return dataSource.create(ROUTER_PATH, bodyData, (newTask) => {
    return response.end(JSON.stringify(newTask));
  });
}

function updateTask(request, response) {
  const url = request.url;
  const bodyData = request.bodyData;
  const [_, taskId] = url.split(/id=/gm);

  return dataSource.updateOrReplace(
    ROUTER_PATH,
    bodyData,
    taskId,
    false,
    (updatedTask) => {
      return response.end(JSON.stringify(updatedTask));
    }
  );
}

function replaceTask(request, response) {
  const url = request.url;
  const bodyData = request.bodyData;
  const [_, taskId] = url.split(/id=/gm);

  return dataSource.updateOrReplace(
    ROUTER_PATH,
    bodyData,
    taskId,
    true,
    (updatedTask) => {
      return response.end(JSON.stringify(updatedTask));
    }
  );
}

function deleteTask(request, response) {
  const url = request.url;
  const [_, taskId] = url.split(/id=/gm);

  return dataSource.deleteData(ROUTER_PATH, taskId, (newTasks) => {
    return response.end(JSON.stringify(newTasks));
  });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  replaceTask,
  deleteTask,
};
