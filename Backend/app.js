const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
