const balloons = document.querySelector('.balloons');
console.log(balloons);

//Get random number
function random(num) {
    return Math.floor(Math.random() * num);
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

function getRandomStyles() {
    var mt = random(200);
    var ml = random(50);
    var dur = random(30) + 5;
    return ` 
    margin: ${mt}px 0 0 ${ml}px;
    opacity: ${randomNumber(0, 1)};
    animation: float ${dur}s ease-in infinite;
    `;
};

console.log(randomNumber(0, 1))
//Create ballons
function createBalloons (num) {
    for (let i = num; i > 0; i--) {
        const balloon = document.createElement('img');
        balloon.className = 'balloon';
        balloon.style.cssText = getRandomStyles();
        balloon.src = "./assets/balloon.png";
        balloons.append(balloon);
    }
};

//Start function
window.addEventListener("load", () => {
    createBalloons(25);
});