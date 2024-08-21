const cards = document.querySelectorAll('.carta');

let cartaVirada = false;
let bloquearTabuleiro = false;
let primeiraCarta, segundaCarta;

function flipCard() {
    if (bloquearTabuleiro) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (!cartaVirada) {
        // first click
        cartaVirada = true;
        primeiraCarta = this;

        return;
    }

    // second click
    segundaCarta = this;

    confirmarDupla();
}

function confirmarDupla() {
    let isMatch = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

    isMatch ? tirarJogo() : unflipCards();
}

function tirarJogo() {
    primeiraCarta.removeEventListener('click', flipCard);
    segundaCarta.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    bloquearTabuleiro = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [cartaVirada, bloquearTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let posAleatoria = Math.floor(Math.random() * 12);
        card.style.order = posAleatoria;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));