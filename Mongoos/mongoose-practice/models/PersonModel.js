const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
    hair: String,
    eyes: String,
    weight: Number,
    height: Number,
    salary: Number,
    numKids: Number,
    kids: []
})

const Person = mongoose.model("person", personSchema)




//1. Find all the people who are tall (>180) AND rich (>30000)
Person.find({$and: [{height: {'$gt': 180}}, {salary: {'$gt': 30000}}]}, function(err, people){{
    console.log(people)
}})



//2. Find all the people who are tall (>180) OR rich (>30000)
Person.find({$or: [{height: {'$gt': 180}}, {salary: {'$gt': 30000}}]}, function(err, people){{
    console.log(people)
}})



//3. Find all the people who have grey hair or eyes, and are skinny (<70)
Person.find({$and: [{$or: [{hair: 'grey'}, {eyes: 'grey'}]}, {weight: {'$lt': 70}}  ]}, function(err, people){
    console.log(people)
})



//4. Find people who have at least 1 kid with grey hair
Person.find({kids:{ $elemMatch: {hair: "grey"}}}, function(err,people){
    console.log(people)
})



//5. Find all the people who have at least one overweight kid, and are overweight themselves (>100)
Person.find().and( [{kids: {$elemMatch: {weight: {'$gt': 100}}}}, {weight: {'$gt': 100}}] ).exec(function(err, people){
    console.log(people)
})



module.exports = Person
