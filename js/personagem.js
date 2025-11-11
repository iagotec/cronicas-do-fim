const hair = document.getElementById("hair");
const body = document.getElementById("body");
const hairColor = document.getElementById("hairColor");
const outfitColor = document.getElementById("outfitColor");

hair.style.width = "80px";
hair.style.height = "30px";
hair.style.borderRadius = "10px";
hair.style.margin = "auto";

body.style.width = "100px";
body.style.height = "120px";
body.style.borderRadius = "20px";
body.style.margin = "auto";

function render() {
  hair.style.background = hairColor.value;
  body.style.background = outfitColor.value;
}

document.getElementById("salvar").onclick = () => {
  const personagem = {
    hair: hairColor.value,
    outfit: outfitColor.value,
  };
  localStorage.setItem("personagem", JSON.stringify(personagem));
  render();
};

const salvo = JSON.parse(localStorage.getItem("personagem"));
if (salvo) {
  hairColor.value = salvo.hair;
  outfitColor.value = salvo.outfit;
  render();
}
