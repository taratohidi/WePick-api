const express = require("express");
const router = express.Router();
const fs = require("fs");
const { loadData, postData } = require("../utilities/functions");

// Get all Products
router.get("/", (req, res) => {
  loadData("./data/products.json", (data) => {
    const products = JSON.parse(data);
    res.json(products);
  });
});

// Get a single Product by ID
router.get("/:id", (req, res) => {
  loadData("./data/products.json", (data) => {
    const products = JSON.parse(data);
    const foundProduct = products.find(
      (product) => product.id === req.params.id
    );
    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res
        .status(404)
        .send(`Product with the id ${req.params.id} was not found`);
    }
  });
});

// Post a new Product
router.post("/", (req, res) => {
  postData("./data/products.json", req.body, res);
});

// Post a new Comment

router.post("/:id", (req, res) => {
  // pass in req.body for comment
  loadData("./data/products.json", (data) => {
    const products = JSON.parse(data);
    // find index of product in JSON file
    const productIndex = products.findIndex(
      (product) => product.id === req.params.id
    );

    // make new comment from req.body
    const newComment = req.body;

    // push to array
    products[productIndex].comments.push(newComment);

    // write back to the JSON file
    // fs.writeFile with products data
    fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
      if (err) {
        res.send("error, file not written");
      } else {
        res.send("file written");
      }
    });
  });
});

// Delete an Product by ID
router.delete("/:id", (req, res) => {
  loadData("./data/products.json", (data) => {
    const products = JSON.parse(data);
    const foundIndex = products.findIndex(
      (product) => product.id === req.params.id
    );
    if (foundIndex === -1) {
      res
        .status(404)
        .send(`Product with the id ${req.params.id} was not found`);
    } else {
      products.splice(foundIndex, 1);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          throw err;
        } else {
          res.send("Product successfully deleted");
        }
      });
    }
  });
});

// Modify an Product by ID
router.put("/:id", (req, res) => {
  loadData("./data/products.json", (data) => {
    const products = JSON.parse(data);
    const foundIndex = products.findIndex(
      (product) => product.id === req.params.id
    );
    if (foundIndex === -1) {
      res
        .status(404)
        .send(`Product with the id ${req.params.id} was not found`);
    } else {
      products.splice(foundIndex, 1, req.body);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          throw err;
        } else {
          res.send("Product data updated");
        }
      });
    }
  });
});

module.exports = router;
