const raridades = [
  { nome: "Chapéu Comum", tipo: "Comum", chance: 0.7 },
  { nome: "Capa Épica", tipo: "Épico", chance: 0.25 },
  { nome: "Espada Lendária", tipo: "Lendário", chance: 0.05 },
];

const btn = document.getElementById("girar");
const res = document.getElementById("resultado");

btn.onclick = () => {
  const aprovado = localStorage.getItem("quizAprovado");
  if (!aprovado) return alert("Você precisa passar no quiz primeiro!");

  const sorteio = Math.random();
  let acumulado = 0;
  let item = raridades[0];

  for (let r of raridades) {
    acumulado += r.chance;
    if (sorteio <= acumulado) {
      item = r;
      break;
    }
  }

  res.textContent = `🎁 Você ganhou: ${item.nome} (${item.tipo})`;

  const itens = JSON.parse(localStorage.getItem("itens") || "[]");
  itens.push(item.nome);
  localStorage.setItem("itens", JSON.stringify(itens));
};
