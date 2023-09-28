const options = {
    ready: false,
    enemy: '',
    symbol: '',
};

const balloons = document.querySelector('.balloons');

//Get random number
function random(num) {
    return Math.floor(Math.random() * num);
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

function randomStylesBallons() {
    var mt = random(200);
    var ml = random(50);
    var dur = random(30) + 5;
    return ` 
    margin: ${mt}px 0 0 ${ml}px;
    opacity: ${randomNumber(0, 1)};
    animation: float ${dur}s ease-in infinite;
    `;
};

//Create ballons
function createBalloons (num) {
    for (let i = num; i > 0; i--) {
        const balloon = document.createElement('img');
        balloon.className = 'balloon';
        balloon.style.cssText = randomStylesBallons();
        balloon.src = "./assets/balloon.png";
        balloons.appendChild(balloon);
    }
};

//Start function
window.addEventListener("load", () => {
    createBalloons(50);
});

// ==============================================

const optionBtns = document.querySelectorAll('.opponent-btn');

const numberOfDrops = 12;
    
function createDrops(num, el) {
    for (let i = num; i > 0; i--) {
        const drop = document.createElement('span');
        drop.className = 'drop';
        drop.style.cssText = randomStylesDrops();
        el.appendChild(drop);
    }
};

function randomStylesDrops() {
    var mt = random(6);
    var dur = randomNumber(0.4, 1);
    var width = randomNumber(10, 80);
    return ` 
    bottom: ${mt}px;
    left: ${width}%;
    animation: drop ${dur}s ease-in infinite both;
    `;
};

function chooseOpponent(e) {
    optionBtns.forEach(el => {
        el.innerHTML = el.innerText;
        el.classList.remove('active');
    });

    if (!e.classList.contains('active')) {
        e.classList.add('active');
        e.innerHTML = e.innerText;
        options.enemy = e.innerText;
        createDrops(numberOfDrops, e);
    } else {
        e.innerHTML = e.innerText;
        e.classList.remove('active');
    }
    console.log(options);
    readyForGame();
};

const symbolBtns = document.querySelectorAll('.symbol-btn');

// 
function chooseSymbol(e) {
    symbolBtns.forEach(el => {
        el.innerHTML = el.innerText;
        el.classList.remove('active');
    });

    if (!e.classList.contains('active')) {
        e.classList.add('active');
        e.innerHTML = e.innerText;
        options.symbol = e.innerText;
        createDrops(numberOfDrops, e);
    } else {
        e.innerHTML = e.innerText;
        e.classList.remove('active');
    }
    console.log(options);
    readyForGame();
};

// Show play button with animation
function readyForGame () {
    const playBtn = document.querySelector('.play');
    const wave = document.querySelector('.wave');

    // Check if every option is present to show button
    if (options.enemy && options.symbol) {
        playBtn.style.cssText += 'animation:boat 3.5s both';
        wave.style.cssText += 'animation-name: ripple;-moz-animation-delay: 3.5s;-webkit-animation-delay: 3.5s;animation-delay: 3.5s;-moz-animation-duration: 2s;-webkit-animation-duration: 2s;animation-duration: 2s;-moz-animation-iteration-count: infinite;-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;'
    }
};

readyForGame();

// ===============================================

const hands = [
    {
        name: '1',
        img: '',
    },
    {
        name: '2',
        img: '',
    },
    {
        name: '3',
        img: '',
    },
    {
        name: '4',
        img: '',
    },
    {
        name: '5',
        img: '',
    },
    {
        name: '6',
        img: '',
    },
    {
        name: '7',
        img: '',
    },
    {
        name: '8',
        img: '',
    },
    {
        name: '9',
        img: '',
    },
    {
        name: '10',
        img: '',
    },
];

let rows = 4;
window.addEventListener("resize", () => renderHands(hands, rows));

function renderHands(arr, rows) {
    let height = 140;
    rows = Math.ceil(window.innerHeight / height);
    document.querySelector('.hands').innerHTML = '';


    for (let i = 0; i < rows; i++) {
        let width = 0;
        const row = document.createElement('div');
        row.className = `row`;
        row.style.cssText = `height: ${height}` + 'px';
        document.querySelector('.hands').appendChild(row);

        for (let j = 0; j < arr.length; j++){
            const item = document.createElement('div');
            item.className = 'item';
            item.style.cssText = randomStyleForHands(width);
            item.textContent = arr[j].name;
            row.appendChild(item);
            width += 120;
        }
    }
};

renderHands(hands, rows);

function randomStyleForHands(w) {
    return `
        position: absolute;
        top: ${randomNumber(-10, -30)}px;
        left: ${w}px;
        transform: rotate(${randomNumber(9, -9)}deg);
        z-index: ${randomNumber(-1, 1)};
    `;
};