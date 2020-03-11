var world;

class Environment {
    constructor() {
        // Setup our this.world
        world = new CANNON.World()
        world.gravity.set(0, 0, -150) // m/s²
        
        this.body = document.getElementById('body')
        this.groundMaterial = new CANNON.Material("groundMaterial")
        
        // Create a plane
        var groundBody = new CANNON.Body({
            mass: 0, // mass == 0 makes the body static
            position: new CANNON.Vec3(0, 0, 0),
            material: this.groundMaterial
        });

        var groundShape = new CANNON.Plane();
        groundBody.addShape(groundShape);
        world.addBody(groundBody);
        this.world = world // Let world be accessed
    }

    simulate(mats, entities) {
        // Add interactions (friction, restitution) between ground and the floor
        this.interactions = []
        var interaction
        for (let i = 0; i < mats.length; i++) {
            interaction = new CANNON.ContactMaterial(this.groundMaterial, mats[i], {
                friction: 1,
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
        var lastTime; // SEMICOLON NEEDED
        
        // Start the simulation loop
        (function simloop(time) {
            requestAnimationFrame(simloop) // Create async thread
            if(lastTime !== undefined) {
                var dt = (time - lastTime) / 1000
                self.world.step(fixedTimeStep, dt, maxSubSteps)
            }
            // Render each entity with it's one coordinates
            for (let i in entities) {
                // Change position
                // console.log(entities[i])
                // if (entities[i].ID =='1') {
                //     console.log(entities[i].obj.style.left)
                // }

                // object.innerHTML = Math.round(self.body.position.z*100)/100
                entities[i].obj.style.top = window.innerHeight - entities[i].body.position.z - entities[i].radius + "px"
                entities[i].obj.style.left = window.innerWidth/2 + entities[i].body.position.x - entities[i].radius + "px"
                // obj.style.angle = this.body.rotation.y // SOMETHING LIKE THIS

                // console.log(entities[i].body.shapes[0]["radius"])
                
            }

            lastTime = time // Keep track of how long since last render
        })();
    }
  }