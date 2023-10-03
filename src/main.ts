const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 700;
const context = canvas.getContext('2d')!;
document.querySelector('#app')!.append(canvas);

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    w: 60,
    h: 60,
    color: 'orange'
}

type Block = {
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
};

const blocks: Block[] = [
    {
      x: 100,
      y: 100,
      w: 100,
      h: 200,
      color: 'lightgreen',
    },
    {
      x: 250,
      y: 450,
      w: 300,
      h: 150,
      color: 'lightblue',
    },
    {
      x: 650,
      y: 150,
      w: 200,
      h: 400,
      color: 'pink',
    },
];

let W: boolean = false;
let A: boolean = false;
let S: boolean = false;
let D: boolean = false;

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

requestAnimationFrame(gameLoop);

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
    checkCollision();
    drawPlayer(player.x, player.y, player.w, player.h, player.color);

    for(let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        drawBlocks(block.x, block.y, block.w, block.h, block.color)
    }

    requestAnimationFrame(gameLoop);
};

function drawPlayer(x: number, y: number, w: number, h: number, color: string) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h)
};

function drawBlocks(x: Block["x"], y: Block["y"], w: Block["w"], h: Block["h"], color: Block["color"]) {

    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h)
}

function onKeyDown(e: any) {
    if(e.key == "w") {
        W = true;
    };

    if(e.key == "a") {
        A = true;
    };

    if(e.key == "s") {
        S = true;
    };

    if(e.key == "d") {
        D = true;
    };
};

function onKeyUp(e: any) {
    if(e.key == "w") {
        W = false;
    };

    if(e.key == "a") {
        A = false;
    };

    if(e.key == "s") {
        S = false;
    };

    if(e.key == "d") {
        D = false;
    };
};

function update() {

    if(W) {
        context.fillRect(0, player.y -= 6, 0, 0);
        YCollides();
    };

    if(A) {
        context.fillRect(player.x -= 6, 0, 0, 0);
        XCollides();
    };

    if(S) {
        context.fillRect(0, player.y += 6, 0, 0);
        YCollides();
    };

    if(D) {
        context.fillRect(player.x += 6, 0, 0, 0);
        XCollides();
    };
};

function XCollides() {
    for(let i = 0; i < blocks.length; i++){

        let block = blocks[i];

        if (player.x < block.x + block.w && player.y > block.y - player.h && player.y < block.y + block.h && player.x + player.w > block.x) {

            if(player.x < block.x + block.w && A == true) {
                player.x = block.x + block.w;
                
            } else if(player.x + player.w > block.x && D == true) {
                player.x = block.x - player.w;

            } else if(player.y + player.h > block.y && S == true) {
                player.y = block.y - player.h;
                
            } else if(player.y < block.y + block.h && W == true) {
                player.y = block.y + block.h
            };
        };
    };
};

function YCollides() {
    for(let i = 0; i < blocks.length; i++){

        let block = blocks[i];

        if (player.x < block.x + block.w && player.y > block.y - player.h && player.y < block.y + block.h && player.x + player.w > block.x) {

            if(player.y + player.h > block.y && S == true) {
                player.y = block.y - player.h;
                
            } else if(player.y < block.y + block.h && W == true) {
                player.y = block.y + block.h
         
            } else if(player.x < block.x + block.w && A == true) {
                player.x = block.x + block.w;
                
            } else if(player.x + player.w > block.x && D == true) {
                player.x = block.x - player.w;
            };
        };
    };
};

function checkCollision() {
// Checks canvas edge collisions ( right, left, top, bottom )
    if (player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w;
    };

    if (player.x < 0) {
        player.x = 0;
    };

    if (player.y < 0) {
        player.y = 0;
    };
  
    if (player.y + player.w >= canvas.height) {
        player.y = canvas.height - player.w;
    };
};
    