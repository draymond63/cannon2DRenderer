class PhyObject {
    constructor(world, type, width, height, x, y, material) {
        this.mat = material
        this.type = type.toLowerCase()

        switch(this.type) {
            case "sphere":
                this.radius = width;
                this.body = new CANNON.Body({
                    mass: 5, // kg
                    position: new CANNON.Vec3(x, 0, y), // m
                    shape: new CANNON.Sphere(width),
                    material: this.mat, // Add specific interaction with floor
                    angularDamping: 0.5 // Slow rotation naturally (since friction alone doesn't work)
                }); // NEED A SEMICOLON HERE
                world.addBody(this.body);

                this.cStyle = `
                position: absolute;
                height: `+ width*2 +`px;
                width: `+ width*2 +`px;
                background-color: #bbb;
                border-color: black;
                border-radius: 50%;
                display: inline-block;
                `
                break
            case "case":
                this.width = width;
                this.height = height;
                this.body = new CANNON.Body({
                    mass: 5,
                    position: new CANNON.Vec3(x, 0, y),
                    shape: new CANNON.ConvexPolyhedron(
                        []
                    ),
                    material: this.mat,
                });
                break
            }
        // this.world = world // XXX Save world internally?
    }

    addHTML(type, ID) {        
        const templates = document.querySelectorAll("template")
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
    }
}