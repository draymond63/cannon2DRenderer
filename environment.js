var world;

class Environment {
    constructor() {
        // Setup our this.world
        world = new CANNON.World()
        world.gravity.set(0, 0, -98.1) // m/s²
        
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

    simulate(mats) {
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
    }

    createSphere(ID, x, y, page) {
        self = this // Preserve 'this' or else it will refer to the window
        if (page != undefined) {
            $(function(){
                $("#container").load(page);
            });
            $(window).on('load', function() {
                self.createSphereLoaded(ID, x, y)
            })
        } else {
            self.createSphereLoaded(ID, x, y) // self could prolly be this
        }
    }

    createSphereLoaded(ID, x, y) {
        var fixedTimeStep = 1.0 / 60.0 // seconds
        var maxSubSteps = 3
        var lastTime

        var obj = document.getElementById(ID) // Grab ID
        obj.style.position = "absolute"
        // obj.class = "dot"

        // Create a sphere
        this.sphereMaterial = new CANNON.Material("sphereMaterial");
        var radius = 100 // m
        var sphereBody = new CANNON.Body({
            mass: 5, // kg
            position: new CANNON.Vec3(x, 0, y), // m
            shape: new CANNON.Sphere(radius),
            material: this.sphereMaterial, // Add specific interaction with floor
            angularDamping: 0.5 // Slow rotation naturally (since friction alone doesn't work)
        }); // NEED A SEMICOLON HERE
        world.addBody(sphereBody); // AND HERE

        // Start the simulation loop
        (function simloop(time){
            requestAnimationFrame(simloop) // Create async thread
            if(lastTime !== undefined) {
                var dt = (time - lastTime) / 1000
                world.step(fixedTimeStep, dt, maxSubSteps)
            }
            // Change position (& text)
            // obj.innerHTML = Math.round(sphereBody.position.z*100)/100
            obj.style.top = window.innerHeight - sphereBody.position.z + "px"
            obj.style.left = window.innerWidth/2 - sphereBody.position.x + "px"
            // obj.style.angle = sphereBody.rotation.y // SOMETHING LIKE THIS
            
            lastTime = time
        })();
    }
  }