document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usuarioInput = document.getElementById("usuario");
  const senhaInput = document.getElementById("senha");
  const msg = document.getElementById("mensagem");

  form.onsubmit = (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value;

    if (!usuario || !senha) {
      msg.textContent = "⚠️ Preencha todos os campos!";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (!usuarios[usuario]) {
      usuarios[usuario] = senha;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioAtivo", usuario);
      msg.textContent = "✨ Conta criada com sucesso!";
      setTimeout(() => location.href = "index.html", 1000);
    } else if (usuarios[usuario] === senha) {
      localStorage.setItem("usuarioAtivo", usuario);
      msg.textContent = "✅ Login bem-sucedido!";
      setTimeout(() => location.href = "index.html", 1000);
    } else {
      msg.textContent = "❌ Senha incorreta!";
    }
  };
});
