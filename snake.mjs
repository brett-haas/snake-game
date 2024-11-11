import readline from 'readline';
import ansiEscapes from 'ansi-escapes';

const WIDTH = 30; 
const HEIGHT = 15;
const START_GAME = 'go';

let snake, direction, food, gameSpeed, gameStarted = false;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const initGame = () => {
    gameSpeed = 190;
    snake = [{ x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) }];
    direction = { x: 1, y: 0 };
    food = { x: WIDTH - 3, y: HEIGHT - 3 };
    gameStarted = false;
    promptStart();
};

const promptStart = () => {
    rl.question(`Type "${START_GAME}" to start the game: `, (answer) => {
        if (answer.toLowerCase() === START_GAME) {
            gameStarted = true;
            gameLoop();
        } else {
            console.log('Game not started. Exiting...');
            process.exit();
        }
    });
};

const handleKeyPress = () => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'up' && direction.y === 0) direction = { x: 0, y: -1 };
        if (key.name === 'down' && direction.y === 0) direction = { x: 0, y: 1 };
        if (key.name === 'left' && direction.x === 0) direction = { x: -1, y: 0 };
        if (key.name === 'right' && direction.x === 0) direction = { x: 1, y: 0 };
    });
};

const drawGame = () => {
    process.stdout.write(ansiEscapes.clearScreen);
    let display = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill('.'));
    snake.forEach(segment => {
        display[segment.y][segment.x] = '*';
    });
    display[food.y][food.x] = '$';
    display.forEach(row => {
        process.stdout.write(row.join('') + '\n');
    });
};

const updateGame = () => {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT) };
        gameSpeed--;
    } else {
        snake.pop();
    }

    if (newHead.x < 0 || newHead.x >= WIDTH || newHead.y < 0 || newHead.y >= HEIGHT || 
        snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        console.log(`Game over! Your snake was this long: ${snake.length}`);
        initGame();
        return;
    }

    drawGame();
    setTimeout(gameLoop, gameSpeed);
};

const gameLoop = () => {
    if (gameStarted) updateGame();
};

handleKeyPress();
initGame();

