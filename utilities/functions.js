const fs = require("fs");

// Load file data using fs.readfile()
function loadData(fileName, callback) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      throw new Error("Could not read this file");
    } else {
      callback(data);
    }
  });
}

// Function for pushing new Data to the json file
function postData(fileName, newData, res) {
  // start be reading the file, to get previous data, before overwriting
  loadData(fileName, (data) => {
    const items = JSON.parse(data);
    items.push(newData);

    fs.writeFile(fileName, JSON.stringify(items), (err) => {
      if (err) {
        res.send("error, file not written");
      } else {
        res.send("file written");
      }
    });
  });
}

module.exports = { loadData, postData };
