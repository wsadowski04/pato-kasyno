const reels = document.querySelectorAll('.reel');
const spinBtn = document.getElementById('spin-btn');
const tokensDisplay = document.getElementById('tokens');
const betInput = document.getElementById('bet');
const message = document.getElementById('message');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');

let tokens = 1000;
const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐'];

// Update tokens display
function updateTokens() {
    tokensDisplay.textContent = tokens;
}

// Spin the reels
function spinReels() {
    spinSound.play();
    spinBtn.disabled = true;
    message.textContent = 'Spinning...';

    const spins = [];
    for (let i = 0; i < 3; i++) {
        spins.push(Math.floor(Math.random() * symbols.length));
    }

    // Animate reels
    reels.forEach((reel, index) => {
        let spinCount = 0;
        const spinInterval = setInterval(() => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            spinCount++;
            if (spinCount > 10) {
                clearInterval(spinInterval);
                reel.textContent = symbols[spins[index]];
                if (index === 2) {
                    checkWin(spins);
                }
            }
        }, 100);
    });
}

// Check if the user won
function checkWin(spins) {
    const bet = parseInt(betInput.value);
    tokens -= bet;
    updateTokens();

    if (spins[0] === spins[1] && spins[1] === spins[2]) {
        const winAmount = bet * 10;
        tokens += winAmount;
        message.textContent = `You won ${winAmount} tokens!`;
        winSound.play();
    } else {
        message.textContent = 'Try again!';
    }

    if (tokens < 10) {
        message.textContent = 'Out of tokens! Follow w.sadowski_ on Instagram to get more.';
    } else {
        spinBtn.disabled = false;
    }
}

// Event listener for spin button
spinBtn.addEventListener('click', () => {
    const bet = parseInt(betInput.value);
    if (bet < 10 || bet > 500) {
        message.textContent = 'Bet must be between 10 and 500 tokens.';
        return;
    }
    if (tokens < bet) {
        message.textContent = 'Not enough tokens!';
        return;
    }
    spinReels();
});

// Initialize
updateTokens();