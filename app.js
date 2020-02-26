const cards = Array.from(document.querySelectorAll('.memory-card'));
const overlays = Array.from(document.getElementsByClassName('overlay-text'));
const flips = document.querySelector("#flips");
let flip = Number(flips.textContent); // Returns 0 currently
let countdown = document.querySelector('#time-remaining');
let countDownText = Number(countdown.textContent);
let matchedCards = [];

let hasFlippcardCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(e) {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippcardCard) {
        //first click
        hasFlippcardCard = true;
        firstCard = this;
        flip++;
        flips.textContent = flip;
        return;
    }

        //second click
        hasFlippcardCard = false;
        secondCard = this;
        flip++;
        flips.textContent = flip;
        checkForMatch();

        
    
}

(function startCountDown() {
    let interval = setInterval(() => {
        countDownText--;
        countdown.textContent = countDownText;
        if(countDownText === 0 || matchedCards.length === cards.length) {
            gameOver();
            clearInterval(interval);
        }
        },1000) 
})();

function gameOver() {
    
    document.getElementById('game-over-text').classList.add('visible');

}



function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? cardMatch() : unFlipCards();
}

function cardMatch() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedCards.push(firstCard, secondCard);

      
    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
    // not a match.
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
    }

function resetBoard() {
    [hasFlippcardCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}



(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;

    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
    });
});

