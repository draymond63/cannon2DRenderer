env = new Environment()

var materials = []
genMat = new CANNON.Material("genMat");
materials.push(genMat)

// Begin rendering all the objects
env.begin(materials)

// Create multiple spheres
sphere = new PhyObject({
    'world': env.world, 
    'type': "Circle", 
    'width': 50,
    'x': 20, 
    'y': 100, 
    'material': genMat
})
sphere.addHTML('page1', 1)
env.render(sphere)

first = new PhyObject({
    'world': env.world, 
    'type': "Box", 
    'width': 100,
    'height': 50,
    'x': 100, 
    'y': 300, 
    'material': genMat
})
first.addHTML('page2', 2)
env.render(first)

let counter = 3
addObject = (num) => {
    // Add sphere2 after the fact
    sphere2 = new PhyObject({
        'world': env.world, 
        'type': "Circle", 
        'width': 50,
        'x': 1, 
        'y': 300, 
        'material': genMat
    })
    sphere2.addHTML('page'+num, counter)
    env.render(sphere2)
    counter++
}

console.log(document.body)