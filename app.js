const path = require("path");

const express = require("express");

const blogRoutes = require("./routes/blog");
const db = require("./data/database");

const app = express();

// A big NOTE, here we will be using fetch() for our ajax code, if you have to cater for older browsers it would be best to use
// the axios package instead of the old and clunky XMLHttpRequest

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static("public")); // Serve static files (e.g. CSS files)

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
