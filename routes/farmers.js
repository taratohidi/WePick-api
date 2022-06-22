const express = require("express");
const router = express.Router();
const fs = require("fs");
const { loadData, postData } = require("../utilities/functions");

// Get all Farmers
router.get("/", (req, res) => {
  loadData("./data/farmers.json", (data) => {
    const farmers = JSON.parse(data);
    res.json(farmers);
  });
});

// Get a single Farmer by ID
router.get("/:id", (req, res) => {
  loadData("./data/farmers.json", (data) => {
    const farmers = JSON.parse(data);
    const foundFarmer = farmers.find((farmer) => farmer.id === req.params.id);
    if (foundFarmer) {
      res.json(foundFarmer);
    } else {
      res.status(404).send(`Farmer with the id ${req.params.id} was not found`);
    }
  });
});

// Post a new Farmer
router.post("/", (req, res) => {
  postData("./data/farmers.json", req.body, res);
});

// Delete a Farmer by ID
router.delete("/:id", (req, res) => {
  loadData("./data/farmers.json", (data) => {
    const farmers = JSON.parse(data);
    const foundIndex = farmers.findIndex(
      (farmer) => farmer.id === req.params.id
    );
    if (foundIndex === -1) {
      res.status(404).send(`Farmer with the id ${req.params.id} was not found`);
    } else {
      farmers.splice(foundIndex, 1);
      fs.writeFile("./data/farmers.json", JSON.stringify(farmers), (err) => {
        if (err) {
          throw err;
        } else {
          res.send("Farmer successfully deleted");
        }
      });
    }
  });
});

// Modify a Farmer
router.put("/:id", (req, res) => {
  loadData("./data/farmers.json", (data) => {
    const farmers = JSON.parse(data);
    const foundIndex = farmers.findIndex(
      (farmer) => farmer.id === req.params.id
    );
    if (foundIndex === -1) {
      res.status(404).send(`Farmer with the id ${req.params.id} was not found`);
    } else {
      farmers.splice(foundIndex, 1, req.body);
      fs.writeFile("./data/farmers.json", JSON.stringify(farmers), (err) => {
        if (err) {
          throw err;
        } else {
          res.send("Farmer data updated");
        }
      });
    }
  });
});

module.exports = router;
