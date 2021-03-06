class PhyObject {
    constructor(dict) {
        const   world = dict['world']
        ,       type = dict['type']
        ,       width = dict['width']
        ,       height = dict['height']
        ,       radius = dict['radius']
        ,       x = dict['x']
        ,       y = dict['y']
        ,       layer = dict['layer']
        ,       material = dict['material'];

        this.mat = material
        this.type = type.toLowerCase()
        // this.mouseDown = false;
        // this.grabbedX = 0;
        // this.grabbedY = 0;

        switch(this.type) {
            case "circle":
                this.radius = radius;
                this.body = new CANNON.Body({
                    mass: Math.PI * radius * radius/1000, // Dependent on area
                    position: new CANNON.Vec3(x, layer*1000, y), // m
                    shape: new CANNON.Sphere(radius),
                    material: this.mat, // Add specific interaction with floor
                    angularDamping: 0.75 // Slow rotation naturally (since friction alone doesn't work)
                }); // NEED A SEMICOLON HERE
                world.addBody(this.body);

                this.cStyle = `
                    position: absolute;
                    height: `+ radius*2 +`px;
                    width: `+ radius*2 +`px;
                    background-color: #bbb;
                    border-color: black;
                    border-radius: 50%;
                    display: inline-block;
                `
                break
            case "box":
                this.width = width;
                this.height = height;
                this.body = new CANNON.Body({
                    mass: width * height/1000,
                    position: new CANNON.Vec3(x, layer*1000, y),
                    shape: new CANNON.Box(
                        new CANNON.Vec3(width/2, 100, height/2)
                    ).convexPolyhedronRepresentation,
                    material: this.mat,
                    fixedRotation: true,
                });
                world.addBody(this.body);
                this.cStyle = `
                    position: absolute;
                    height: `+ height +`px;
                    width: `+ width +`px;
                    background-color: #bbb;
                    border-width: 5%;
                    border: black;
                    display: inline-block;
                `
                break
            default:
                throw "Type of phyObject not found"
        }
    }

    addHTML(type, ID) {        
        const templates = document.querySelectorAll("template")
        // let self = this
        let template;
        for (let i = 0; i<templates.length; i++) {
            if (templates[i].id == type) {
                template = templates[i]
            }
        }
        // Create unique ID for new object
        let span = template.content.querySelector("span")
        span.id = ID
        this.ID = ID // Save for later
        // Add template to HTML site
        const node = document.importNode(template.content, true)
        const container = document.getElementById("container")
        container.appendChild(node)
        // Grab new object and add renderability
        this.obj = document.getElementById(ID)
        this.obj.style = this.cStyle

        // // Add touch down boolean
        // this.obj.onmousedown = function() { 
        //     self.mouseDown = true;
        // }
        // this.obj.onmouseup = function() {
        //     self.mouseDown = false;
        // }
        // this.obj.onmouseover = function(event) {
        //     if (self.mouseDown) {
        //         self.grabbedX = event.clientX
        //         self.grabbedY = event.clientY
        //     }
        // }
    }

    reset() {
        this.body.position.set(200, 0, 50);
        this.body.velocity.set(0, 0, 0)
    }
}

