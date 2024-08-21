const cartas = document.querySelectorAll('.carta');
var cartaVirada = false;
var primeiraCarta, segundaCarta;
var bloquearTabuleiro = false; //bloqueia o tabuleiro enquanto confere cartas

function flipCard() {

  if (bloquearTabuleiro) return; //impede acoes
  if (this === primeiraCarta) return;
  if (this.classList.contains('matched')) return; //nao deixa pares achados continuarem

  this.classList.add('flip');
  if(!cartaVirada){
    cartaVirada = true;
    primeiraCarta = this;
  }
  else{
    cartaVirada = false;
    segundaCarta = this;

    checkMatch(); //verifica as duas cartas
  }
}
    function checkMatch(){
      bloquearTabuleiro = true;
     
      if(primeiraCarta.dataset.value === segundaCarta.dataset.value){
        disableCards(); //desativa as cartas se forem iguais
      }
      else{
        unFlipCards(); //desvira
      }
    }

    function disableCards(){
      primeiraCarta.classList.add('matched');
      segundaCarta.classList.add('matched');
      
      primeiraCarta.addEventListener('click', flipCard);
      segundaCarta.addEventListener('click', flipCard);

      resetBoard();
    }

    function unFlipCards() {
      setTimeout(() => {
        primeiraCarta.classList.remove('flip'); //desvira a primeira
        segundaCarta.classList.remove('flip'); //desvira a segunda

        resetBoard();
      }, 1000); //1s pra carta desvirar
    }

    function resetBoard(){ //reseta a jogada pra continuar
      [cartaVirada, bloquearTabuleiro, primeiraCarta, segundaCarta] = [false, false, null, null];
    }

  
cartas.forEach(carta => carta.addEventListener('click', flipCard));