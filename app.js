//INITIALIZATION
var express = require("express"),
  methodOverride = require("method-override"),
  app = express(),
  expressSanitizer = require("express-sanitizer"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  port = 3000;

//requring routes
var blogRoutes = require("./routes/blogs"),
  indexRoutes = require("./routes/index");

//hiding password in an environment variable
var { dbURL } = require("./config");

//set up the connection

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to BlogApp DB.");
  })
  .catch((err) => {
    console.log("ERROR: ", err.message);
  });

//fixes warning from mongoose side
mongoose.set("useFindAndModify", false);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);

//LISTEN
app.listen(process.env.PORT || port, () => {
  console.log("BlogApp server is up and running");
});
