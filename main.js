
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
let gameLost = false;
let timer = 0;
let life = 10;
let iFrame = 120;
const wompwomp = document.getElementById("wompwomp")

const game = {
    xGrid: 30,
    yGrid: 15,
    tileSize: 32,
    mapSkeleton: [
        //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 3
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 5
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 6
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 7
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 8
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 9
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,], // 10
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 11
        [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,], // 12
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 13
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 14
    ],
    draw: function () {
        ctx.clearRect(0, 0, 960, 480);
        for (let i = 0; i < this.yGrid; i++) {
            for (let j = 0; j < this.xGrid; j++) {
                if (this.mapSkeleton[i][j] == 1) {
                    ctx.fillStyle = "black"
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
                if (this.mapSkeleton[i][j] == 2) {
                    ctx.fillStyle = "orange"
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }
}

class Boolet {
    constructor() {
        this.position = {
            // x: Math.round(Math.random()) * 952,
            x: 0,
            y: 0,
        }
        this.size = 8;
        this.color = "grey";
    }
    update() {
        let deltaX = player.position.x + player.size / 2 - 4 - this.position.x;
        let deltaY = player.position.y + player.size / 2 - 4 - this.position.y;
        let unitX;
        let unitY;
        let random = Math.floor(Math.random() * 4) + 1
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            if (deltaX != 0) {
                unitX = random * Math.sign(deltaX);
                unitY = Math.abs(deltaY / deltaX) * Math.sign(deltaY) * random;
            } else {
                unitX = 0;
                unitY = 0;
            }
        } else {
            if (deltaY != 0) {
                unitY = random * Math.sign(deltaY);
                unitX = Math.abs(deltaX / deltaY) * Math.sign(deltaX) * random;
            } else {
                unitX = 0;
                unitY = 0;
            }
        }
        this.position.x += unitX;
        this.position.y += unitY;
        if (
            this.position.x + this.size >= player.position.x &&
            this.position.x <= player.position.x + player.size &&
            this.position.y + this.size >= player.position.y &&
            this.position.y <= player.position.y + player.size &&
            iFrame <= 0
        ) {
            life--;
            iFrame = 2 * 60;
            this.position.x = Math.round(Math.random()) * 952;
            this.position.y = 0;
            if (life == 0) {
                gameLost = true;
                console.log("YOU LOST");
            }
        }
        if (iFrame >= 0) {
            player.color = "yellow";
        } else {
            player.color = "red";
        }

    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
}

const player = {
    position: {
        x: 432,
        y: 288,
    },
    bind_pressed: {
        left: 0,
        right: 0,
        jump: 0,
    },
    color: "red",
    size: 32,
    horizontal_velocity: 4,
    verical_velocity: 0,
    gravity: 0.75,
    jump_velocity: -8,
    terminal_velocity: 10,
    jump_counter: 10,
    dobule_jump_count: 2,
    on_ground: true,
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    },
    update: function () {
        // check if on ground
        this.on_ground = checkIfOnGround();
        if (this.on_ground) {
            this.verical_velocity = 0;
            this.dobule_jump_count = 2;
        }
        // horizontal movement and check
        this.position.x += (this.bind_pressed.right - this.bind_pressed.left) * this.horizontal_velocity;
        horizontalCollisionCheck();
        // vertical movement and check
        if (!this.on_ground && this.dobule_jump_count == 2) {
            this.dobule_jump_count--;
        }
        if (this.dobule_jump_count && this.bind_pressed.jump == 1) {
            this.verical_velocity = this.jump_velocity;
            this.jump_counter = 10;
            this.dobule_jump_count--;
        }
        if (this.verical_velocity > this.terminal_velocity) {
            this.verical_velocity = this.terminal_velocity;
        }
        if (!this.on_ground && this.jump_counter < 0) {
            this.verical_velocity += this.gravity;
        }
        this.position.y += this.verical_velocity;
        this.jump_counter--;
        this.bind_pressed.jump = 0;
        iFrame--;
        checkIfBonk();
    }
}

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "KeyA":
            player.bind_pressed.left = 1;
            if (gameLost) {
                location.reload();
            }
            break;
        case "KeyD":
            player.bind_pressed.right = 1;
            if (gameLost) {
                location.reload();
            }
            break;
    }
})
window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "KeyA":
            player.bind_pressed.left = 0;
            if (gameLost) {
                location.reload();
            }
            break;
        case "KeyD":
            player.bind_pressed.right = 0;
            if (gameLost) {
                location.reload();
            }
            break;
    }
})

window.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        player.bind_pressed.jump = 1;
    }
    if (gameLost) {
        location.reload();
    }
})

function horizontalCollisionCheck() {
    let precisionCollision = .1;
    // right facing
    if (player.position.x < 0) {
        player.position.x = 0;
    }
    if (player.position.x + player.size > 960) {
        player.position.x = 960 - player.size;
    }
    while (
        game.mapSkeleton[Math.floor(player.position.y / game.tileSize)][Math.floor((player.position.x + player.size) / game.tileSize)] == 1 ||
        game.mapSkeleton[Math.floor((player.position.y + player.size - 1) / game.tileSize)][Math.floor((player.position.x + player.size) / game.tileSize)] == 1
    ) {
        player.position.x -= precisionCollision;
    }
    // left facing
    while (
        game.mapSkeleton[Math.floor(player.position.y / game.tileSize)][Math.floor(player.position.x / game.tileSize)] == 1 ||
        game.mapSkeleton[Math.floor((player.position.y + player.size - 1) / game.tileSize)][Math.floor(player.position.x / game.tileSize)] == 1
    ) {
        player.position.x += precisionCollision;
    }
}

function checkIfOnGround() {
    if (
        game.mapSkeleton[Math.floor((player.position.y + player.size) / game.tileSize)][Math.floor(player.position.x / game.tileSize)] == 2 ||
        game.mapSkeleton[Math.floor((player.position.y + player.size) / game.tileSize)][Math.floor((player.position.x + player.size) / game.tileSize)] == 2
    ) {
        console.log("YOU LOST");
        gameLost = true;
    }
    if (
        game.mapSkeleton[Math.floor((player.position.y + player.size) / game.tileSize)][Math.floor(player.position.x / game.tileSize)] == 1 ||
        game.mapSkeleton[Math.floor((player.position.y + player.size) / game.tileSize)][Math.floor((player.position.x + player.size) / game.tileSize)] == 1
    ) {
        player.position.y = (Math.floor((player.position.y + player.size) / game.tileSize - 1)) * game.tileSize;
        return true;
    } else {
        return false;
    }
}

function checkIfBonk() {
    if (player.position.y < 0) {
        player.position.y = 0;
        player.verical_velocity = 0;
        player.jump_counter = 0
    }
    if (
        game.mapSkeleton[Math.floor(player.position.y / game.tileSize)][Math.floor(player.position.x / game.tileSize)] == 1 ||
        game.mapSkeleton[Math.floor(player.position.y / game.tileSize)][Math.floor((player.position.x + player.size) / game.tileSize)] == 1
    ) {
        player.verical_velocity = 0;
        player.position.y = (Math.floor(player.position.y / game.tileSize) + 1) * game.tileSize;
        player.jump_counter = 0
    }
}

let enemy = [new Boolet()];

function drawGUI() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(`score: ${Math.floor(timer / 60)}`, 480, 15);
    ctx.fillText(`life: ${life}`, 480, 45);
}

function deathScreen() {
    ctx.clearRect(0, 0, 960, 480);
    ctx.drawImage(wompwomp, 280, 60, 400, 360);
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(`score: ${Math.floor(timer / 60)}`, 480, 15);
    ctx.fillText(`life: ${life}`, 480, 45);
}

function init() {
    game.draw();
    enemy[0].draw();
    player.draw();
    drawGUI();
    update();
}

function update() {
    if (!gameLost) {
        game.draw();
        player.update();
        player.draw();
        for (let i = 0; i < enemy.length; i++) {
            enemy[i].update();
            enemy[i].draw();
        }
        timer++;
        if (timer % (15 * 60) == 0) {
            enemy.push(new Boolet());
        }
        drawGUI();
        setInterval(requestAnimationFrame(update), 1000 / 60);
    } else {
        deathScreen();
    }
}

window.onload = init();
