// Initialize the enviroment (physics playground)
env = new Environment()
let counter = 0
let prevBody, prevHdr = undefined;

// Add material interaction to world
var materials = []
genMat = new CANNON.Material("genMat");
materials.push(genMat)

// Begin rendering all the objects
env.begin(materials)

// Add functionality to the add page buttons
addDefaultPage = (bodyHTML, hdrHTML) => {
    const bodyHeight = 0.85

    // Fade previous page
    if (prevBody && prevHdr) {
        console.log(prevBody)
        prevBody.obj.classList.add('fade-out')
        prevHdr.obj.classList.add('fade-out')
        delete prevBody, prevHdr
    }
    // Add body object to fall onto the screen
    body = new PhyObject({
        'world': env.world, 
        'type': "Box", 
        'width': window.innerWidth,
        'height': window.innerHeight * bodyHeight,
        'x': 0, 
        'y': window.innerHeight * (1 + bodyHeight/2) + 1, 
        'layer': counter,
        'material': genMat
    })
    body.addHTML(bodyHTML, counter)
    env.render(body)
    counter++
    // Add header object to fall onto the screen
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