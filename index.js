const http = require("http");

// INFO: status code
// 200: success
// 400: bad request
// 401: unauthorize
// 404: not found

const hostname = "127.0.0.1";
const port = 3001;

const taskData = [
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

const server = http.createServer(function (request, response) {
  const method = request.method;
  const url = request.url;
  const taskId = url.split(/id=/gm).pop();

  if (method === "GET" && url === "/tasks") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    return response.end(JSON.stringify(taskData));
  }

  if (method === "GET" && url.includes("/tasks") && taskId) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    const taskDetail = taskData.find((task) => {
      return task.id === taskId;
    });

    return response.end(JSON.stringify(taskDetail ? taskDetail : null));
  }

  return response.end("Hello");
});

server.listen(port, hostname, function () {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});
