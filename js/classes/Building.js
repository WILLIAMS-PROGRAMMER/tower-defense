class Building extends Sprite {
    constructor({position = {x:0 , y:0}}) {
        super({
            position,
            imageSrc:'img/tower.png',
             frames: {
                max: 19
            },
            offset: {
                x: 0,
                y: -80
            },
            hold: 4
        })
        //this.position = position
        this.width = 64*2
        this.height = 64;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = [
          
        ]
        this.radius = 240
        this.target //solo lo definire, se usa en index
        //this. elapsedSpawnTime = 0  //frecuencia de disparo  , ya no es necesario
    }

    draw() {
        super.draw()
        // c.fillStyle = ' blue'
        // c.fillRect(this.position.x, this.position.y,this.width, 64)

        //ZONA EN LA CUAL LA TORRE PUEDE ATACAR A ENEMIGOS
        // c.beginPath()
        // c.arc(this.center.x, this.center.y, this.radius , 0 , Math.PI * 2)
        // c.fillStyle = 'rgba(0,0,255, .2)'
        // c.fill()
    }

    update() {
        this.draw()
        if(this.target || (!this.target && this.frames.current )!== 0)
        super.update()
        // if(this.elapsedSpawnTime % 20 === 0 && this.target) {
        //     this.projectiles.push( 
        //         new Projectile({
        //             position: {
        //                 x: this.center.x,
        //                 y: this.center.y
        //             },
        //             enemy: this.target
        //         }))
        // }
        if(this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0)
        this.shoot()

        //this.elapsedSpawnTime++;  // ya no es necesario, el projectil sera disparado cuando la aniamcion de torre llege a freme 6
    }

    shoot() {
        this.projectiles.push( 
            new Projectile({
                position: {
                    x: this.center.x -20,
                    y: this.center.y -110
                },
                enemy: this.target
        }))
    }
}