const { app } = require("./server");

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`User app listening on port ${port}`);
});
