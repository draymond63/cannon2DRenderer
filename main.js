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
sphere = new PhyObject(env.world, "Sphere", 50, null, 0, 50, sphereMaterial)
sphere.addHTML('sphere', '1')

sphere1 = new PhyObject(env.world, "Sphere", 50, null, 0, 500, sphereMaterial)
sphere1.addHTML('sphere', '2')


// Pack all the entities for simulation
let entities = [sphere, sphere1]
// Begin rendering all the objects
env.simulate(materials, entities)

// Add sphere2 after the fact
sphere2 = new PhyObject(env.world, "Sphere", 50, null, 1, 300, sphereMaterial)
sphere2.addHTML('sphere', '3')
env.add(sphere2)

console.log(document.body)