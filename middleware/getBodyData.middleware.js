function getBodyData(request, callback) {
  let rawBodyData = "";
  request.on("data", function (chunkData) {
    rawBodyData += chunkData;
  });

  request.on("end", function () {
    const bodyData = JSON.parse(rawBodyData);
    request.bodyData = bodyData;
    callback();
  });
}

module.exports = getBodyData;
