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

sphere = new PhyObject(env.world, "Sphere", 100, null, 0, 500, sphereMaterial)
sphere.addHTML('sphere', '1')

sphere1 = new PhyObject(env.world, "Sphere", 100, null, 10, 200, sphereMaterial)
sphere1.addHTML('sphere', '2')

sphere.run()
sphere1.run()


env.simulate(materials)

console.log(document.body)

console.log(sphere.ID)
console.log(sphere1.ID)