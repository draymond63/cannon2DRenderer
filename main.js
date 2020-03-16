env = new Environment()
let counter = 0

var materials = []
genMat = new CANNON.Material("genMat");
materials.push(genMat)

// Begin rendering all the objects
env.begin(materials)

// object = new PhyObject({
//     'world': env.world, 
//     'type': "Circle", 
//     'radius': 50,
//     'x': -50, 
//     'y': 800, 
//     'layer': 0,
//     'material': genMat
// })
// object.addHTML('projects', 1)
// env.render(object)
let prevBody, prevHdr = undefined;

addPage = (bodyHTML, hdrHTML) => {
    const bodyWidth = 0.89
    const bodyHeight = 0.85

    if (prevBody && prevHdr) { // Doesn't fully work (only gets rid of the first one?)
        console.log(prevBody)
        prevBody.obj.classList.add('fade-out')
        prevHdr.obj.classList.add('fade-out')
    }
    // Add body object to fall onto the screen
    body = new PhyObject({
        'world': env.world, 
        'type': "Box", 
        'width': window.innerWidth * bodyWidth,
        'height': window.innerHeight * bodyHeight,
        'x': window.innerWidth * (1 - bodyWidth)/2, 
        'y': window.innerHeight * (1 + bodyHeight/2) + 1, 
        'layer': counter,
        'material': genMat
    })
    body.addHTML(bodyHTML, counter)
    env.render(body)
    counter++
    // Add header object ot fall onto the screen
    header = new PhyObject({
        'world': env.world, 
        'type': "Box", 
        'width': window.innerWidth,
        'height': window.innerHeight * (1 - bodyHeight),
        'x': 0, 
        'y': window.innerHeight * (1 + bodyHeight * 1.5), 
        'layer': counter - 1, // Stay on the same level as the body
        'material': genMat
    })
    header.addHTML(hdrHTML, counter)
    env.render(header)
    counter++

    prevBody = body
    prevHdr = header
}

// Throw everything off the screen to the right
reset = () => {
    env.resetWorld()
}