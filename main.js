const playerColor = ['red', 'blue'];

const options = {
    ready: false,
    enemy: '',
    symbol: 'x',
    color: playerColor[random(playerColor.length)],
};

const balloons = document.querySelector('.balloons');

// Get random number.
function random(num) {
    return Math.floor(Math.random() * num);
};

// Get random numbers in the between of two.
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

// Style ballons with random values.
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

// Create ballons.
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
    // Numbers of ballons on the main page.
    createBalloons(50);
});

// ==============================================

const optionBtns = document.querySelectorAll('.opponent-btn');
// Blood drops in button animation
const numberOfDrops = 12;

// Rendering blood drops
function createDrops(num, el) {
    for (let i = num; i > 0; i--) {
        const drop = document.createElement('span');
        drop.className = 'drop';
        drop.style.cssText = randomStylesDrops();
        el.appendChild(drop);
    }
};

// Random style drops so they never the same.
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

// Choose opponent and add value to the object. Set the selected button to active.
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

// Choose symbol and add value to the object. Set the selected button to active.
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

    // Check if every option is present to show button and wave animation.
    // Emeny & symbol should be selected to start.
    if (options.enemy && options.symbol) {
        playBtn.style.cssText += 'animation:boat 3.5s both';
        wave.style.cssText += 'animation-name: ripple;-moz-animation-delay: 3.5s;-webkit-animation-delay: 3.5s;animation-delay: 3.5s;-moz-animation-duration: 2s;-webkit-animation-duration: 2s;animation-duration: 2s;-moz-animation-iteration-count: infinite;-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;'
    }
};

readyForGame();

// ===============================================

// Array of pics for the loading animation.
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

// Min nubmer of hands (cards) rows on loading screen.
let rows = 4;
window.addEventListener("resize", () => renderHands(hands, rows));

// Rander hands (cards) on loading screen.
function renderHands(arr, rows) {
    // One card heaight
    let height = 140;
    // Change number of rows depends on the screen height
    rows = Math.ceil(window.innerHeight / height);
    document.querySelector('.hands').innerHTML = '';

    // Creating row with hands (cards).
    for (let i = 0; i < rows; i++) {
        let width = 0;
        const row = document.createElement('div');
        row.className = `row`;
        row.style.cssText = `height: ${height}` + 'px';
        document.querySelector('.hands').appendChild(row);
        // Creating single hand (card) with some styles.
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

// renderHands(hands, rows);

// Set some random styles for every hand (card) in the row.
// Every reload it`s going to be different. 
function randomStyleForHands(w) {
    return `
        position: absolute;
        top: ${randomNumber(-10, -30)}px;
        left: ${w}px;
        transform: rotate(${randomNumber(9, -9)}deg);
        z-index: ${randomNumber(-1, 1)};
    `;
};

//==============================================================
// Треба переробити щоб щапуск був після анімації
window.addEventListener('load', start);

// Визначити гравців і символи
// Визначити чия черга
// Записати хід в масив
// Перевірити чи хтось виграв або чи нічья

// Player turn
let turn = options.symbol;

const playerOne = {
    symbol: options.symbol,
    color: options.color,
};

const playerTwo = {
    symbol: playerOne.symbol == 'x' ? 'o' : 'x',
    color: playerOne.color == 'red' ? 'blue' : 'red',
};

// Empty game board.
const gameBoard = ['','','','','','','','',''];
// Winning combinations, all posible.
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const gameTable = document.querySelector('.game-table');

// Rander board and add click to it.
function randerBoard () {
    gameBoard.forEach((el, index) => {
        const div = document.createElement('div');
        div.className = 'cell';
        div.setAttribute('data-number', index);
        div.addEventListener('click', go, { once: true });
        gameTable.appendChild(div);
    });
};

const thePlayer = document.querySelector('.player-one');
const theEnemy = document.querySelector('.player-two');

let playerScore = document.querySelector('.player-one-wins');
let enemyScore = document.querySelector('.player-two-wins');
// Score counter
let playerWins = 0;
let enemyWins = 0;

// Set rendom color to each player
function setGameColors(options) {
    if (options.color && options.color !== '') {
        thePlayer.classList.add(`player-${options.color}`);
        theEnemy.classList.add(`player-` + playerColor.filter(item => item != options.color).toString()); // playerOne.color == 'red' ? 'blue' : 'red',
    }
};

// 
function go() {
    this.classList.add(turn);

    // Check if we win
    if (checkWin(turn)) {
        alert('Winner is ' + turn.toUpperCase());
        updateScore(turn);
        start(turn);
    }

    // Check whos turn it is and draw symbol
    if (turn == 'o') {
        const div = document.createElement('div');
        div.className = `circle circle-${playerOne.color}`;
        this.appendChild(div);
        let dataIndex = this.getAttribute('data-number');
        gameBoard.splice(dataIndex, 1, 'o');

        turn = 'x';
        showColorBaseOnTurn(turn);
    } else {
        const div = document.createElement('div');
        div.className = `cross cross-${playerTwo.color}`;
        this.appendChild(div);
        let dataIndex = this.getAttribute('data-number');
        gameBoard.splice(dataIndex, 1, 'x');

        turn = 'o';
        showColorBaseOnTurn(turn);
    }
    hoverTheCell(turn, this);
};

// Updating the score
function updateScore(turn) {
    turn == 'x' ? playerScore.innerHTML = playerWins += 1 : enemyScore.innerHTML = enemyWins += 1;
};

// Notify the Player thats it`s his turn by color of avatar.
function showColorBaseOnTurn(turn) {
    if (turn == 'x') {
        thePlayer.style.filter = 'grayscale(0.8)';
        theEnemy.style.filter = 'grayscale(0)';
    } else {
        theEnemy.style.filter = 'grayscale(0.8)';
        thePlayer.style.filter = 'grayscale(0)';
    }
};

// Hover cell depending on the symbol wich go next.
function hoverTheCell(turn, item) {
    gameTable.classList.remove('o');
    gameTable.classList.remove('x');

    gameTable.classList.add(turn);
};

// 
function checkWin(turn) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            let cellEl = document.querySelectorAll('.cell');
            return cellEl[index].classList.contains(turn);
        })
    })
};

// Start function
function start() {
    gameTable.innerHTML = '';
    randerBoard();
    setGameColors(options);
    hoverTheCell(turn);
};