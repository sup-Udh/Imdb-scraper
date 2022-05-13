const express = require("express"),
  app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

//route for index page
app.get("/", function (req: any, res: any) {
  res.render("views/index");
});

//route for magic page
app.get("/magic", function (req: any, res: any) {
  res.render("magic");
});

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
});