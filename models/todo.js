const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

let Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;