env = new Environment()

var materials = []
genMat = new CANNON.Material("genMat");
materials.push(genMat)

// Begin rendering all the objects
env.begin(materials)

sphere = new PhyObject({
    'world': env.world, 
    'type': "Circle", 
    'radius': 50,
    'x': -50, 
    'y': 400, 
    'layer': 0,
    'material': genMat
})
sphere.addHTML('projects', 1)
env.render(sphere)

second = new PhyObject({
    'world': env.world, 
    'type': "Box", 
    'width': 100,
    'height': 50,
    'x': 95, 
    'y': 700, 
    'layer': 0,
    'material': genMat
})
second.addHTML('aboutMe', 3)
env.render(second)

let counter = 3
addObject = (num) => {
    
}

// Throw everything off the screen to the right
reset = () => {
    env.resetWorld()
}