const { v4: uuidv4 } = require("uuid");

let taskData = [
  {
    id: "1",
    title: "todo",
    isDone: true,
  },
  {
    id: "2",
    title: "todo 2",
    isDone: false,
  },
];

function getAllTasks(request, response) {
  return response.end(JSON.stringify(taskData));
}

function getTaskById(request, response) {
  const url = request.url;
  const taskId = url.split(/id=/gm).pop();
  const taskDetail = taskData.find((task) => {
    return task.id === taskId;
  });

  if (!taskDetail) {
    response.statusCode = 404;
  } else {
    response.statusCode = 200;
  }

  return response.end(JSON.stringify(taskDetail ? taskDetail : null));
}

function createTask(request, response) {
  let rawBodyData = "";
  request.on("data", function (chunkData) {
    rawBodyData += chunkData;
  });

  request.on("end", function () {
    const bodyData = JSON.parse(rawBodyData);
    const newTask = {
      id: uuidv4(),
      title: bodyData.title,
      isDone: bodyData.isDone,
    };
    taskData.push(newTask);

    return response.end(JSON.stringify(taskData));
  });
}

function updateTask(request, response) {
  let rawBodyData = "";
  const url = request.url;
  const [_, taskId] = url.split(/id=/gm);

  request.on("data", function (chunkData) {
    rawBodyData += chunkData;
  });

  request.on("end", function () {
    const bodyData = JSON.parse(rawBodyData);
    const foundTaskIndex = taskData.findIndex((item) => {
      return item.id === taskId;
    });
    const foundTask = taskData[foundTaskIndex];
    if (foundTaskIndex === -1) {
      return response.end(null);
    }

    taskData[foundTaskIndex] = {
      ...foundTask,
      ...bodyData,
      id: foundTask.id,
    };

    return response.end(JSON.stringify(taskData));
  });
}

function replaceTask(request, response) {
  let rawBodyData = "";
  const url = request.url;
  const [_, taskId] = url.split(/id=/gm);

  request.on("data", function (chunkData) {
    rawBodyData += chunkData;
  });

  request.on("end", function () {
    const bodyData = JSON.parse(rawBodyData);
    const foundTaskIndex = taskData.findIndex((item) => {
      return item.id === taskId;
    });
    if (foundTaskIndex === -1) {
      return response.end(null);
    }

    taskData[foundTaskIndex] = {
      ...bodyData,
      id: uuidv4(),
    };

    return response.end(JSON.stringify(taskData));
  });
}

function deleteTask(request, response) {
  const url = request.url;
  const [_, taskId] = url.split(/id=/gm);

  const filteredTaskData = taskData.filter((item) => {
    return item.id !== taskId;
  });
  taskData = filteredTaskData;

  return response.end(JSON.stringify(taskData));
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  replaceTask,
  deleteTask,
};
