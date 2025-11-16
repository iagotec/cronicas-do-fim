// Exemplo de interação simples
document.querySelectorAll('.produto button').forEach(botao => {
    botao.addEventListener('click', () => {
        alert('Produto adicionado ao carrinho!');
    });
});
