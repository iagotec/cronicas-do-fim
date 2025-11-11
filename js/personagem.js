document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ personagem.js carregado e DOM pronto!");

  // ======= ELEMENTOS =======
  const hair = document.getElementById("hair");
  const body = document.getElementById("body");
  const hairColor = document.getElementById("hairColor");
  const outfitColor = document.getElementById("outfitColor");
  const salvarBtn = document.getElementById("salvar");
  const listaSkins = document.getElementById("listaSkins");
  const skinAtivaSpan = document.getElementById("skinAtiva");

  if (!hair || !body) {
    console.error("❌ Elementos do personagem não encontrados no HTML.");
    return;
  }

  // ======= SISTEMA DE SKINS =======
  const skinsDisponiveis = [
    { id: "padrao", nome: "Padrão", corCabelo: "#5a3e1b", corRoupa: "#2d2d2d" },
    { id: "lendario", nome: "Lendário", corCabelo: "#f1c40f", corRoupa: "#8e44ad" },
    { id: "sombrio", nome: "Sombrio", corCabelo: "#000000", corRoupa: "#4a148c" },
    { id: "epico", nome: "Épico", corCabelo: "#ff0000", corRoupa: "#222" }
  ];

  let skinsDesbloqueadas = JSON.parse(localStorage.getItem("skins")) || ["padrao"];
  let skinAtiva = localStorage.getItem("skinAtiva") || "padrao";

  // ======= RENDERIZA PERSONAGEM =======
  function renderPersonagem(cabelo, roupa) {
    hair.style.background = cabelo;
    body.style.background = roupa;
  }

  // ======= EQUIPAR SKIN =======
  function equiparSkin(id) {
    skinAtiva = id;
    localStorage.setItem("skinAtiva", id);
    renderSkins();
  }

  // ======= MOSTRAR SKINS =======
  function renderSkins() {
    listaSkins.innerHTML = "";

    skinsDisponiveis.forEach(skin => {
      const card = document.createElement("div");
      card.classList.add("skin-card");
      card.textContent = skin.nome;

      if (skin.id === skinAtiva) {
        card.classList.add("equipada");
      }

      if (!skinsDesbloqueadas.includes(skin.id)) {
        card.style.opacity = "0.3";
        card.textContent = "🔒 Bloqueada";
      } else {
        card.onclick = () => equiparSkin(skin.id);
      }

      listaSkins.appendChild(card);
    });

    const atual = skinsDisponiveis.find(s => s.id === skinAtiva);
    if (atual) {
      skinAtivaSpan.textContent = atual.nome;
      renderPersonagem(atual.corCabelo, atual.corRoupa);
    }
  }

  // ======= SALVAR PERSONALIZAÇÃO =======
  salvarBtn.addEventListener("click", () => {
    const personagem = {
      hair: hairColor.value,
      outfit: outfitColor.value
    };
    localStorage.setItem("personagem", JSON.stringify(personagem));
    renderPersonagem(personagem.hair, personagem.outfit);
    alert("✨ Aparência personalizada salva!");
  });

  // ======= APLICAR PERSONALIZAÇÃO SALVA =======
  const salvo = JSON.parse(localStorage.getItem("personagem"));
  if (salvo) renderPersonagem(salvo.hair, salvo.outfit);
  renderSkins();

  // ======= DESBLOQUEAR SKINS DO QUIZ =======
  const skinPendente = localStorage.getItem("skinDesbloquear");
  if (skinPendente) {
    const idMap = {
      "Chapéu Comum": "padrao",
      "Capa Épica": "epico",
      "Espada Lendária": "lendario"
    };
    const skinId = idMap[skinPendente];
    if (skinId) desbloquearSkin(skinId);
    localStorage.removeItem("skinDesbloquear");
  }

  // ======= FUNÇÃO PARA DESBLOQUEAR SKINS (usada pelo quiz) =======
  window.desbloquearSkin = function (id) {
    if (!skinsDesbloqueadas.includes(id)) {
      skinsDesbloqueadas.push(id);
      localStorage.setItem("skins", JSON.stringify(skinsDesbloqueadas));
      alert(`🎉 Você desbloqueou a skin "${id.toUpperCase()}"!`);
      renderSkins();
    }
  };
});
