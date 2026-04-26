const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// main route
app.post("/add-asset", (req, res) => {
  const { name, location } = req.body;

  console.log("Received:", name, location);

  res.json({
    message: `Asset received: ${name} in ${location}`
  });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});