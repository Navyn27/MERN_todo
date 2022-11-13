const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let TodoSchema = new Schema({
//   todo_description: {
//     type: String,
//   },
//   todo_responsible: {
//     type: String,
//   },
//   todo_priority: {
//     type: String,
//   },
//   todo_completed: {
//     type: Boolean,
//   },
// });

const TodoSchema = new Schema({
  action: {
    type: String,
    required: [true, "The todo text field is required"],
  },
});

module.exports = mongoose.model("todo", TodoSchema);
