const express = require("express");
const app = express();
const products = require("./routes/products");
const farmers = require("./routes/farmers");
const cors = require("cors");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json()); //allows posting req.body

app.use(express.static("public")); //allows public folder to share

// Welcome Page
app.get("/", (req, res) => {
  res.send("welcome to my API server");
});

// Check Api Server Status
app.get("/status", (req, res) => {
  res.send("Server is online");
});

app.use("/products", products);
app.use("/farmers", farmers);

app.listen(PORT, () => {
  console.log(`server running at ${BACKEND_URL}:${PORT}`);
});
