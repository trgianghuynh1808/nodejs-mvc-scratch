const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DATA_FILE_PATH = path.join(__dirname, "data.json");

function getAll(routerPath, callback) {
  fs.readFile(DATA_FILE_PATH, (error, rawData) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(rawData);
    const routerData = data[routerPath];
    callback(routerData);
  });
}

function getDetail(routerPath, id, callback) {
  fs.readFile(DATA_FILE_PATH, (error, rawData) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(rawData);
    const routerData = data[routerPath];
    const routerDetailData = routerData.find((item) => item.id === id);

    callback(routerDetailData);
  });
}

function create(routerPath, bodyData, callback) {
  fs.readFile(DATA_FILE_PATH, (error, rawData) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(rawData);
    const routerData = data[routerPath];
    const newItemData = {
      id: uuidv4(),
      ...bodyData,
    };
    routerData.push(newItemData);

    data[routerPath] = routerData;

    fs.writeFile(DATA_FILE_PATH, JSON.stringify(data), (writeFileError) => {
      if (writeFileError) {
        throw writeFileError;
      }
      callback(newItemData);
    });
  });
}

function updateOrReplace(routerPath, bodyData, id, isReplace, callback) {
  fs.readFile(DATA_FILE_PATH, (error, rawData) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(rawData);
    const routerData = data[routerPath];
    const foundItemIndex = routerData.findIndex((item) => item.id === id);

    if (foundItemIndex === -1) {
      throw Error("Item not found");
    }
    const foundItem = routerData[foundItemIndex];
    let updatedItem;

    if (isReplace) {
      updatedItem = {
        id: uuidv4(),
        ...bodyData,
      };
    } else {
      updatedItem = {
        ...foundItem,
        ...bodyData,
        id: foundItem.id,
      };
    }

    routerData[foundItemIndex] = updatedItem;
    data[routerPath] = routerData;

    fs.writeFile(DATA_FILE_PATH, JSON.stringify(data), (writeFileError) => {
      if (writeFileError) {
        throw writeFileError;
      }
      callback(updatedItem);
    });
  });
}

function deleteData(routerPath, id, callback) {
  fs.readFile(DATA_FILE_PATH, (error, rawData) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(rawData);
    let routerData = data[routerPath];
    routerData = routerData.filter((item) => item.id !== id);
    data[routerPath] = routerData;

    fs.writeFile(DATA_FILE_PATH, JSON.stringify(data), (writeFileError) => {
      if (writeFileError) {
        throw writeFileError;
      }
      callback(routerData);
    });
  });
}

module.exports = {
  getAll,
  getDetail,
  create,
  updateOrReplace,
  deleteData,
};
