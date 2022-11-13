const express = require("express");
const app = express();
const routes = require("./routes/api");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./models/todo");

require("dotenv").config();

const port = process.env.PORT || 5000;

//Connect to mongo database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// app.use("/api", routes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.get("/todos", (req, res, next) => {
  Todo.find({}, "action")
    .then((data) => res.json(data))
    .catch(next);
});

app.post("/todos", (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

app.delete("/todos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

app.use((req, res, next) => {
  res.send("Welcome to my first MERN stack app");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
