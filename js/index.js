const audio = document.getElementById('miAudio');

// Función para reproducir el audio
function reproducirAudio() {
    audio.play();
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')  //c :context

//Propiedades canvas
canvas.width  =1280
canvas.height = 768
c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

//Arreglo bidiemnsional de todos los tiles (cada tile 64px)
const placementTilesData2D = []

//Conversion a arreglol bidimensional
for(let i = 0; i < placementTilesData.length; i+=20) {
    placementTilesData2D.push(placementTilesData.slice(i, i +20))
}   

//Ubicacion de tiles donde si se puede colocar una torre para defender
const placementTiles = []

//Creacion de arreglo placementTiles
placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 14) {
            //add builind placement tile here
            placementTiles.push(new placementTile({
                position: {
                    x: x* 64,
                    y: y* 64
                }
            }))
        }
    })
})

//console.log(placementTiles);

const image = new Image()
// image.onload = () => {
   
// }
image.src = 'img/map.png'


//en arreglo enemies se almacena los enemigos //49 enemigos
const enemies = []


function spawnEnemies(spawnCount) {
    for(let i = 1; i <spawnCount; i++) {
        const xOffset = i  * 300
        enemies.push(new Enemy({position: {x: waypoints[0].x - xOffset, y:waypoints[0].y} }));
    }
}

const builidngs = []
let activeTile = undefined
let enemyCount = 3
let hearts = 10
let coins = 100
let fase = 0.5;

const explosions = []
//apareceran 3 enemigos la 1 vez
spawnEnemies(enemyCount);


//loop del juego
function animate()  {
    const animationId = requestAnimationFrame(animate)
    c.drawImage(image, 0, 0)
    for(let i = enemies.length -1; i>=0;i--) {
        const enemy = enemies[i]
        enemy.update(fase);
        if(enemy.position.x > canvas.width) {
            hearts--;
            enemies.splice(i, 1);
            document.querySelector('#hearts').innerHTML = hearts;

            if(hearts == 0) {
                cancelAnimationFrame(animationId)
                document.querySelector('#gameover').style.display = 'flex'
                //console.log('game over');
                fase++;
            }
        }
    }
    
    for(let i = explosions.length - 1; i>=0; i--) {
            const explosion = explosions[i]
            explosion.draw();
            explosion.update()

            if(explosion.frames.current >= explosion.frames.max - 1) {
                explosions.splice(i,1)
            }
    }

    //tracking total amount of enemies
    if(enemies.length === 0) {
        fase++;
        enemyCount+= 8
        spawnEnemies(enemyCount)
    }
   

   placementTiles.forEach(tile => {
    tile.update(mouse)
   })

   builidngs.forEach(builidng => {
        builidng.update();
        builidng.target = null;
        const vaildEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - builidng.center.x
            const yDifference = enemy.center.y - builidng.center.y
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius + builidng.radius
        })
        builidng.target = vaildEnemies[0]
        //console.log(vaildEnemies);

        builidng.projectiles.forEach((projectile,i) => {
            projectile.update()

            const xDifference = projectile.enemy.center.x - projectile.position.x
            const yDifference = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            //this is when aproyectile hits an enemy
            if(distance < projectile.enemy.radius + projectile.radius) {
                //enemy health and enemy removal
                projectile.enemy.health -= 3
                if(projectile.enemy.health <= 0) {
                    const index = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })

                    if(index > -1)
                    {
                        enemies.splice(index, 1)
                        coins += 25
                        document.querySelector('#coins').innerHTML = coins
                    }
                }

              
                explosions.push(new Sprite(
                    {position : {x: projectile.position.x, y: projectile.position.y}, imageSrc: './img/explosion.png', frames : {max:4}, offset: {x:0, y:0}
                }))
                
                //console.log(projectile.enemy.health)
                builidng.projectiles.splice(i, 1)
            }
        })
   })
}


//MOUSE
const mouse = {
    x: undefined,
    y: undefined
}

//a hacer click
canvas.addEventListener('click', (event) => {
    if(activeTile && !activeTile.occupied && coins - 20 >= 0) {
        coins -= 20
        document.querySelector('#coins').innerHTML = coins
        builidngs.push(new Building({
            position: {
                x:activeTile.position.x,
                y:activeTile.position.y
            }
        }))
        activeTile.occupied = true;
        //PARA QUE LAS TORRES SE SUPERONGAN SOBRE OTRA TORRE BIEN
        builidngs.sort((a,b) => {
            return a.position.y - b.position.y
        })
    }
    console.log(builidngs);
    reproducirAudio();
})

window.addEventListener('mousemove',(event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null

    for(let i=0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if(mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size && mouse.y >tile.position.y && mouse.y < tile.position.y + tile.size)
        {
            activeTile = tile
            break
        }
    }
   
    //console.log(activeTile);
})

animate()

