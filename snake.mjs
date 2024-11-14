import readline from 'readline';
import ansiEscapes from 'ansi-escapes';

const WIDTH = 30; 
const HEIGHT = 15;
const START_GAME = 'go';
const MOVEMENT = new Map([
    ['up', { x: 0, y: -1 }],
    ['down', { x: 0, y: 1 }],
    ['left', { x: -1, y: 0 }],
    ['right', { x: 1, y: 0 }]
]);

let rl, snake, direction, food, gameSpeed;

const initGame = () => {
    gameSpeed = 190;
    snake = [{ x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) }];
    direction = MOVEMENT.get('right');
    food = { x: WIDTH - 3, y: HEIGHT - 3 };
    promptStart();
};

const promptStart = () => {
    if (rl)
        rl.close();
    
    rl = readline.createInterface({ 
        input: process.stdin,
        output: process.stdout 
    });

    rl.question(`Type "${START_GAME}" to start the game: `, (answer) => {
        if (answer.toLowerCase() === START_GAME) {
            updateGame();
        } else {
            console.log('Game not started. Exiting...');
            process.exit();
        }
    });
};

const keypressListener = () => {  
    process.stdin.setRawMode(true);
    readline.emitKeypressEvents(process.stdin);

    process.stdin.on('keypress', (str, key) => {
        const newDirection = MOVEMENT.get(key.name);
        if (newDirection)
            direction = newDirection;
    });
};

const drawGame = () => {
    process.stdout.write(ansiEscapes.clearScreen);
    const display = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill('.'));
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
    setTimeout(updateGame, gameSpeed);
};

keypressListener();
initGame();
