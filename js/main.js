const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const chatContainer = document.getElementById("chatContainer");

let messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");

function renderMessages() {
  chatContainer.innerHTML = messages.map(m => `
    <div class="msg right">
      <b>@Você</b>
      <p>${m}</p>
    </div>
  `).join("");
}

sendBtn.onclick = () => {
  const text = msgInput.value.trim();
  if (text) {
    messages.push(text);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    renderMessages();
    msgInput.value = "";
  }
};

renderMessages();
