const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let upPressed = false;
let downPressed = false;
let gameSpeed = 3;
let frame = 0;
let score = 0;

const background = new Image();
background.src = '../images/bg-1.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground(){
    if(BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if(BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleObstacles();
    ninja.update();
    ninja.draw();
    ctx.fillStyle = 'red';
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 0, 70);
    ctx.fillText(score, 0, 70);
    handleCollisions();
    if(handleCollisions()) return;
    requestAnimationFrame(animate);
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if(e.keyCode === 38) {upPressed = true}
})
window.addEventListener('keyup', function(e){
    if(e.keyCode === 38) {upPressed = false};
})
window.addEventListener('keydown', function(e){
    if(e.keyCode === 40) {downPressed = true};
})
window.addEventListener('keyup', function(e){
    if(e.keyCode === 40) {downPressed = false};
})

function handleCollisions(){
    for(let i = 0; i < obstaclesArray.length; i++){
        if (ninja.x < obstaclesArray[i].x + obstaclesArray[i].width &&
        ninja.x + ninja.width > obstaclesArray[i].x &&
        ninja.y < obstaclesArray[i].y + obstaclesArray[i].height &&
        ninja.y + ninja.height > obstaclesArray[i].y){
            ctx.font ="25px Georgia";
            ctx.fillStyle = 'black';
            ctx.fillText('Game Over ' + score, 160, canvas.height/2 - 10);
            return true;
        }
    }
}

