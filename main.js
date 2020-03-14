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

// Begin rendering all the objects
env.begin(materials)

// Create multiple spheres
sphere = new PhyObject({
    'world': env.world, 
    'type': "Sphere", 
    'width': 50,
    'x': -400, 
    'y': 50, 
    'material': sphereMaterial
})
sphere.addHTML('page1', 1)
env.render(sphere)

sphere = new PhyObject({
    'world': env.world, 
    'type': "Sphere", 
    'width': 50,
    'x': 100, 
    'y': 1000, 
    'material': sphereMaterial
})
sphere.addHTML('page2', 2)
env.render(sphere)

let counter = 3
addObject = (num) => {
    // Add sphere2 after the fact
    sphere2 = new PhyObject({
        'world': env.world, 
        'type': "Sphere", 
        'width': 50,
        'x': 1, 
        'y': 300, 
        'material': sphereMaterial
    })
    sphere2.addHTML('page'+num, counter)
    env.render(sphere2)
    counter++
}

console.log(document.body)