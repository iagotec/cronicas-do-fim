// ======= feed.js =======

// Elementos principais
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const chatContainer = document.getElementById("chatContainer");

// Função para criar e adicionar uma nova mensagem no chat
function addMessage(text, side = "right") {
  if (!text.trim()) return; // impede mensagens vazias

  // Cria o elemento da mensagem
  const msg = document.createElement("div");
  msg.classList.add("msg", side);

  // Define o conteúdo (você pode mudar o nome do usuário aqui)
  const username = side === "right" ? "@Você" : "@OutroUsuário";
  msg.innerHTML = `<b>${username}</b><p>${text}</p>`;

  // Adiciona ao container
  chatContainer.appendChild(msg);

  // Mantém o scroll no final
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Enviar ao clicar no botão
sendBtn.addEventListener("click", () => {
  addMessage(msgInput.value, "right");
  msgInput.value = "";

  // Simula uma resposta automática
  setTimeout(() => {
    const respostas = [
      "Interessante 👀",
      "Concordo totalmente!",
      "Haha, verdade!",
      "Boa observação 📖",
      "Isso dá o que pensar..."
    ];
    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    addMessage(resposta, "left");
  }, 1000);
});

// Enviar com Enter
msgInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});
