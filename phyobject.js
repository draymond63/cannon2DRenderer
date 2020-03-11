class PhyObject {
    constructor(world, type, width, height, x, y, material) {
        this.mat = material
        self = this

        switch(type) {
            case "Sphere":
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
                height: `+ width +`px;
                width: `+ width +`px;
                background-color: #bbb;
                border-color: black;
                border-radius: 50%;
                display: inline-block;
                `
                break
            case "Case":
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
        this.world = world // XXX Save world internally?
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
        
        // $(function(){
        //     $("#container").load(page);
        // });
        // $(window).on('load', function() {
        //     document.getElementById("BASE").id = ID
        //     self.obj = document.getElementById(ID)
        //     self.obj.style = self.cStyle
        // })
    }

    run() {
        self = this
        const fixedTimeStep = 1.0 / 60.0 // seconds
        const maxSubSteps = 3
        var object = this.obj;
        var lastTime;

        console.log(self.ID);
        
        // Start the simulation loop
        (function simloop(time) {
            requestAnimationFrame(simloop) // Create async thread
            if(lastTime !== undefined) {
                var dt = (time - lastTime) / 1000
                self.world.step(fixedTimeStep, dt, maxSubSteps)
            }
            // Change position
            if (object != null) {
                // object.innerHTML = Math.round(self.body.position.z*100)/100
                if (self.ID =='1') {
                    console.log("object")
                    console.log(self.body.position.x)
                }
                object.style.top = window.innerHeight - self.body.position.z + "px"
                object.style.left = window.innerWidth/2 - self.body.position.x + "px"
                // obj.style.angle = this.body.rotation.y // SOMETHING LIKE THIS
            }
            lastTime = time
        })();
    }
}