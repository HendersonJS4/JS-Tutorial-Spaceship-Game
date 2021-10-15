let KEY_SPACE = false;
let KEY_UP = false;
let KEY_DOWN = false;
let canvas;
let ctx;
let backgroundImage = new Image();

let rocket = {
    x: 3,
    y: 200,
    width: 150,
    height: 80,
    src: "rocket-g32a61d941_640.png"
};

let ufos = [];
let bullets = [];

document.onkeydown = function(e) {
    console.log(e.code);
    if (e.key == " ") { //e.code == "Space" vs. e.key == " "
        KEY_SPACE = true;
        createBullets();
    }
    if (e.key == "ArrowUp") {
        KEY_UP = true;
    }
    if (e.key == "ArrowDown") {
        KEY_DOWN = true;
    }
}

document.onkeyup = function(e) {
    console.log(e.code);
    if (e.key == " ") {
        KEY_SPACE = false;
    }
    if (e.key == "ArrowUp") {
        KEY_UP = false;
    }
    if (e.key == "ArrowDown") {
        KEY_DOWN = false;
    }
}

function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    loadImages();
    setInterval(update, 1000 / 50);
    setInterval(createUfos, 3000);
    setInterval(checkForCollision, 1000 / 100);
    draw();
}

function checkForCollision() {
    ufos.forEach(function(ufo) {
        if(rocket.x + rocket.width > ufo.x && rocket.y + rocket.height > ufo.y && rocket.x < ufo.x && rocket.y < ufo.y) {
            rocket.img.src = "explosion-g5cbaaf0b3_640.png";
            console.log("Collision!!!");
            ufos = ufos.filter(u => u != ufo);
        }
    bullets.forEach(function(bullet) {
        if(bullet.x + bullet.width > ufo.x && bullet.y + bullet.height > ufo.y && bullet.x < ufo.x && bullet.y < ufo.y) {
            ufo.hit = true;
            ufo.img.src = "iStock-846657166_Thinnapat.jpg.4777646.jpg";
            console.log("Hit!!!");
            setTimeout(() => {
            ufos = ufos.filter(u => u != ufo);
            }, 1000);
        }
    });
    });
}

function createUfos() {
    let ufo = {
        x: 800,
        y: Math.random() * 500,
        width: 100,
        height: 40,
        src: "aliens-gf9f9f5e6a_640.png",
        img: new Image()
    };
    ufo.img.src = ufo.src;
    ufos.push(ufo);
}

function createBullets() {
    if (KEY_SPACE) {
    let bullet = {
        x: rocket.x + rocket.width,
        y: rocket.y + 7,
        width: 70,
        height: 45,
        src: "armed-forces-gd3e78ab6c_640.png",
        img: new Image()
    };
    bullet.img.src = bullet.src;
    bullets.push(bullet);
    }
}

function update() {
    if(KEY_UP) {
        rocket.y -= 7;
    }
    if(KEY_DOWN) {
        rocket.y += 7;
    }

    ufos.forEach(function(ufo) {
        if(!ufo.hit) {
            ufo.x -= 5;
        }
    })

    bullets.forEach(function(bullet) {
            bullet.x += 3;
    });
}

function loadImages() {
    backgroundImage.src = "earth-gbbec7dad4_1920.jpg";
    rocket.img = new Image();
    rocket.img.src = rocket.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
    ufos.forEach(function(ufo) {
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });
    bullets.forEach(function(bullet) {
        ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
    })

    requestAnimationFrame(draw);
}