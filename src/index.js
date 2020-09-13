const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ server: true });
});

require("./controllers/index")(app);

app.listen(process.env.PORT || 3001, () => {
  console.log("🤩🤩🤩running application");
});
