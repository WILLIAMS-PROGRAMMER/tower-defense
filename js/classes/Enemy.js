class Enemy extends Sprite {
    constructor({position = { x: 0, y: 0 }}) { 
        super({position, imageSrc: 'img/orc.png', frames: {
            max: 7
        },hold: 40}) // para pasare los argumentos de esta clase a la clase Sprite
        //this.position = position
        this.width = 90
        this.height = 90
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2 ,
            y: this.position.y + this.height / 2
        }
        this.radius = 50
        this.health = 100
        this.velocity = {
            x:0,
            y:0
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // c.beginPath()
        // c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2)
        // c.fill()

        super.draw() // de Sprite

        //health bar
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y - 25, this.width, 12 )

        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y - 25, this.width* this.health/100, 12 )
    }

    update(fase = 1) {
        this.draw()
        super.update()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y -  this.center.y
        const xDistance = waypoint.x -  this.center.x
        const angle = Math.atan2(yDistance, xDistance)

        this.velocity.x = Math.cos(angle) *fase
        this.velocity.y = Math.sin(angle) *fase

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        this.center = {
            x: this.position.x + this.width / 2 ,
            y: this.position.y + this.height / 2
        }

        if(Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
           Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
            this.waypointIndex < waypoints.length - 1 ) {
            this.waypointIndex++;
        }
    }
}