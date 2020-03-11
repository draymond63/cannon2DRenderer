// env = new Environment()

// var page = 'test.html'

// // env.createSphere('item', 0, 200)
// env.createSphere('item2', 1, 100)
// env.createSphere('item3', 0, 1000, 'test.html')

// // Create interactions
// env.simulate()

env = new Environment()
var materials = []

sphereMaterial = new CANNON.Material("sphereMaterial");
materials.push(sphereMaterial)

// Create multiple spheres
sphere = new PhyObject(env.world, "Sphere", 50, null, 0, 20, sphereMaterial)
sphere.addHTML('sphere', '1')

sphere1 = new PhyObject(env.world, "Sphere", 100, null, 10, 500, sphereMaterial)
sphere1.addHTML('sphere', '2')

// Pack all the entities for simulation
let entities = [sphere, sphere1]
// Begin rendering all the objects
env.simulate(materials, entities)

// console.log(sphere.body.shapes[0]["radius"])
// console.log(sphere1.body.shapes[0]["radius"])

console.log(document.body)