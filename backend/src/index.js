const app = require("./app");
const path = require("path");
const dbConnection = require("./db/config");

(async function () {
  await dbConnection();
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server is running on port: ${port}`));
})();
