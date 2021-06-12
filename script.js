const imagem = document.querySelector('img'); //capturar os elementos/document - palavra chave para achar o documento
const input = document.querySelector('input'); //tudo que esta antes do '=' é a caixa e o que esta depois do '=' é o que vai ser guardado na caixa
const botao = document.querySelector('button'); //querySelector - é responsavel por buscar a tags no html
const pontuacaoContainer = document.querySelector('.pontuacao-container'); //colocando o ponto antes da palavra para capturar uma 'classe' expecifica 
const pontuacao = document.querySelector('#pontuacao'); //colocando o # antes da palavra para capturar um 'id' expecifico
const campoErro = document.querySelector('#campo-erro'); //colocando esse elemento que vem da api (html/script)

let pontos = 0;
let nomeDoPersonagem;

gerarValorAleatorio = () => {
    return Math.floor(Math.random() * 671);
} //gerar numeros aleatorios - floor - aredonda o valor

//pedido permissao para acessar a api
//função para pegar personagem na api - fetch - vai pegar a resposta na api - then - verifica se tem a resposta outro then verifica se dentro da resposta tem uma data, se encontrar altera a imagem
pegarPersonagem = () => {
    let numeroAleatorio = gerarValorAleatorio();
    return fetch(`https://rickandmortyapi.com/api/character/${numeroAleatorio}`, {
        method:'GET',
        headers: {
            Accept: 'application/json',
            "Content-type": 'application/json'
        }
    }).then((response) => response.json()).then((data) => {
        imagem.src = data.image;
        imagem.alt = data.name; //saber qual o nome do personagem 
        nomeDoPersonagem = data.name;
    });
}

jogar = () => {
    pegarPersonagem();
    pontuacaoContainer.style.display = 'flex'; //agora a pontuação aparece 
    botao.innerHTML = 'Jogar';//muda do inciar jogo para jogar 
    input.style.opacity = 1; //volta a funcionar a caixa de texto 
    nomeDoPersonagem = nomeDoPersonagem.toLowerCase(); //toLowerCase - faz com que todo o nome do personagem fique em minusculo

    let nomeDigitado = input.value.toLowerCase();

    if(nomeDoPersonagem == nomeDigitado){
        pontos = pontos+1;
    }else{
        campoErro.innerHTML = `Errou, o nome era ${nomeDoPersonagem}`;
    }

        pontuacao.innerHTML = pontos;
    
}

botao.onclick = jogar;
