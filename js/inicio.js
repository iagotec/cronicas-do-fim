// Redireciona ao clicar no botão
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCoragem");

  btn.addEventListener("click", () => {
    // Exemplo: redireciona para a comunidade
    window.location.href = "quiz.html";
  });
});
