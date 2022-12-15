const http = require("http");
const { taskRouter } = require("./router");

// INFO: status code
// 200: success
// 400: bad request
// 401: unauthorize
// 404: not found

const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer(function (request, response) {
  const method = request.method;
  response.setHeader("Content-Type", "text/plain");

  const router = getRouter(request);
  const controller = router[method];
  controller(request, response);
});

server.listen(port, hostname, function () {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});

function getRouter(request) {
  const url = request.url;
  const [_, id] = url.split(/id=/gm);

  if (url.includes("/tasks")) {
    return taskRouter(id);
  }

  return {};
}
