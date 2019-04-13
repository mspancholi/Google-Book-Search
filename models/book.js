const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  login: {type: String, required: true},
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  description: String,
  image: String,
  link: String,
  googleId: {type: String, required: true}
});

bookSchema.index({
  login: 1, 
  googleId: 1,
},  {
  unique: true,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
