class Projectile extends Sprite {
    constructor({position = {x: 0, y:0}, enemy}) {
        //this.position = position
        super({position, imageSrc: 'img/projectile.png'})
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius =  10
    }
    // draw() {
    //     c.drawImage(this.image, this.position.x,this.position.y)
    //     //ESTO ES ANTES DE COLOCAR LA IMAGEN
    //     // c.beginPath()
    //     // c.arc(this.position.x,  this.position.y,  this.radius, 0, Math.PI * 2)
    //     // c.fillStyle = 'orange'
    //     // c.fill()
    // }

    update() {
        this.draw()
        const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x )
        this.velocity.x = Math.cos(angle) *10
        this.velocity.y = Math.sin(angle) *10

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}