class placementTile {
    constructor({position = {x:0, y:0}}) {
        this.position = position
        this.size = 64
        this.color = 'rgba(255, 255, 255, .2)'
        this.occupied  = false
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse) {
        this.draw()

        //muose collision with tile
        if(mouse.x > this.position.x && mouse.x < this.position.x + this.size && mouse.y >this.position.y && mouse.y < this.position.y + this.size) {
            console.log('aqui si puede ir un tanque para matar a los mounstruos')
            this.color = 'rgba(255, 255, 255, .74)'
        } else {
            this.color = 'rgba(255, 255, 255, .14)'
        }
    }
}