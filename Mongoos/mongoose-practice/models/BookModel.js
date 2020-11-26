const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: String,
    author: String,
    pages: Number,
    genres: [String],
    rating: Number
})

const Book = mongoose.model("book", bookSchema)


//1. Find books with fewer than 500 but more than 200 pages
Book.find(({pages:{"$lt":500, "$gt":200}}), function(err, books){
    console.log(books)
})



//2. Find books whose rating is less than 5, and sort by the author's name
Book.find({rating: {"$lt": 5}}, null, {sort: {author: 1}}, function(err, books){
    console.log(books)
})



//3. Find all the Fiction books, skip the first 2, and display only 3 of them
Book.find({genres: 'Fiction'}, function(err, books){
    console.log(books)
}).skip(2).limit(3)



module.exports = Book
