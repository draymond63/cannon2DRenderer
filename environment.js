var world;

class Environment {
    constructor() {
        // Setup our this.world
        world = new CANNON.World()
        world.gravity.set(0, 0, -150) // m/s²
        
        this.body = document.getElementById('body')
        this.groundMaterial = new CANNON.Material("groundMaterial")
        this.entities = [];
        
        // Create a plane
        const groundBody = new CANNON.Body({
            mass: 0, // mass == 0 makes the body static
            position: new CANNON.Vec3(0, 0, 0),
            material: this.groundMaterial
        });

        const groundShape = new CANNON.Plane();
        groundBody.addShape(groundShape);
        world.addBody(groundBody);
        this.world = world // Let world be accessed
    }

    begin(mats) {
        // Store entities in object & bind this
        self = this
        // Add interactions (friction, restitution) between ground and the floor
        this.interactions = []
        var interaction
        for (let i = 0; i < mats.length; i++) {
            interaction = new CANNON.ContactMaterial(this.groundMaterial, mats[i], {
                friction: 0.5,
                restitution: 0.3,
                contactEquationStiffness: 1e8,
                contactEquationRelaxation: 3,
                frictionEquationStiffness: 1e8,
                frictionEquationRegularizationTime: 3,
            });
            this.interactions.unshift(interaction)
            world.addContactMaterial(this.interactions[0]);
        }

        const fixedTimeStep = 1.0 / 60.0 // seconds
        const maxSubSteps = 3
        var offsetX;
        var offsetY;
        var lastTime; // SEMICOLON NEEDED
        
        // Start the simulation loop
        (function simloop(time) {
            requestAnimationFrame(simloop) // Create async thread
            if(lastTime !== undefined) {
                var dt = (time - lastTime) / 1000
                window.world.step(fixedTimeStep, dt, maxSubSteps)
            }
            // Render each entity with it's one coordinates
            for (let i in self.entities) {
                // Determine offset based off shape
                if (self.entities[i].type == 'circle') {
                    offsetX = self.entities[i].radius
                    offsetY = self.entities[i].radius
                } else if (self.entities[i].type == 'box') {
                    offsetX = self.entities[i].width/2
                    offsetY = self.entities[i].height/2
                } else {
                    offsetX = 0
                    offsetY = 0
                }
                // Change physics coordinates if the user is touching the entity
                // if (self.entities[i].mouseDown && self.entities[i].grabbedX && self.entities[i].grabbedY) {
                //     let X = - window.innerWidth/2 + self.entities[i].grabbedX
                //     let Y = window.innerHeight - self.entities[i].grabbedY
                //     self.entities[i].body.position.x = X
                //     self.entities[i].body.position.z = Y
                //     console.log(self.entities[i].grabbedX + " " + self.entities[i].grabbedY)
                // }

                // Change position
                self.entities[i].obj.style.top = window.innerHeight - self.entities[i].body.position.z - offsetY + "px"
                self.entities[i].obj.style.left = window.innerWidth/2 + self.entities[i].body.position.x - offsetX + "px"
                // obj.style.angle = this.body.rotation.y // SOMETHING LIKE THIS
            }

            lastTime = time // Keep track of how long since last render
        })();
    }

    render(phyObj) {
        this.entities.push(phyObj)
    }
    resetWorld() {
        env.world.gravity.set(750, 0, 150)
        setTimeout(function() {
            env.world.gravity.set(0, 0, -150)
        }, 1500);
        
        // for (i in entities) {
        //     this.entities[i].applyImpulse(new CANNON.Vec3(50,0,0), new CANNON.Vec3(0,0,0))
        // }
    }
  }