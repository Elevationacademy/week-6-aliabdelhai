const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect("mongodb://localhost/pop")


const SolarSystemSchema  = new Schema({
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
    starName: String
})

const PlanetSchema  = new Schema({
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'SolarSystem'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
})

const VisitorSchema  = new Schema({
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planet'}]
})

const SolarSystem = mongoose.model("SolarSystem", SolarSystemSchema)
const Planet = mongoose.model("planet", PlanetSchema)
const Visitor = mongoose.model("visitor", VisitorSchema)

let s = new SolarSystem({planets: [],starName: 'sun'})
let p1 = new Planet({name: 'earth', system: s, visitors: []})
let p2 = new Planet({name: 'mars', system: s, visitors: []})
let p3 = new Planet({name: 'uranus', system: s, visitors: []})
let v1 = new Visitor({name: 'ali', homePlanet: p2, visitedPlanets: []})
let v2 = new Visitor({name: 'ali', homePlanet: p3, visitedPlanets: []})


// s.planets.push(p1)
// s.planets.push(p2)
// s.planets.push(p3)

// p1.visitors.push(v1)
// p1.visitors.push(v2)

// p3.visitors.push(v1)
// v2.visitedPlanets.push(p1)

// v1.visitedPlanets.push(p3)
// v1.visitedPlanets.push(p1)


// s.save()
// p1.save()
// p2.save()
// p3.save()

// v1.save()
// v2.save()


// Find a visitor's list of visited planets
Visitor.findOne({}).populate("visitedPlanets").exec(function(err, visitor){
    visitor.visitedPlanets.forEach(vp => console.log(vp.name))
}) 


//Find all the visitors on a planet
Planet.findOne({}).populate("visitors").exec(function(err, planet){
	planet.visitors.forEach(v => console.log(v.name))
})


//Find all the visitors in a system (subdocuments!)
SolarSystem.findOne({}).populate({
	path: "planets",
	populate: {
	    path: "visitors"
	}}).exec(function (err, solarSystem){      
	    for(planet of solarSystem.planets) {
	        planet.visitors.forEach(v => console.log(v.name))
	    }
}) 

//Find the name of the star in the system of a visitor's home planet
Visitor.findOne({}).populate({
    path: "homePlanet",
    populate: {
        path: "system",
    }
}).exec(function(err, visitor) {
    console.log(visitor.homePlanet.system.starName)
})


//Find a planet's system's star name as well as its visitors
Planet.findOne({}).populate("system visitors").exec(function(err, planet) {
    console.log(planet.system.starName)
    planet.visitors.forEach(v => console.log(v.name))
})

