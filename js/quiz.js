    document.addEventListener("DOMContentLoaded", () => {
    // -----------------------
    // QUIZ
    // -----------------------
    const quizForm = document.getElementById("quizForm");
    const resultado = document.getElementById("resultado");
    const roletaSecao = document.getElementById("roletaSecao");
    const btnGirar = document.getElementById("girar");
    const premio = document.getElementById("premio");

    let podeGirar = false; // controle de acesso à roleta

    quizForm.onsubmit = (e) => {
        e.preventDefault();

        const respostas = {
        q1: "Machado de Assis",
        q2: "1899",
        q3: "Bentinho"
        };

        const form = new FormData(e.target);
        let acertos = 0;

        for (let [key, value] of form.entries()) {
        if (value.trim().toLowerCase() === respostas[key].toLowerCase()) acertos++;
        }

        if (acertos >= 2) {
        resultado.textContent = "🎉 Parabéns! Você acertou e liberou a roleta!";
        roletaSecao.style.display = "block";
        podeGirar = true;
        } else {
        resultado.textContent = "❌ Você errou demais! Tente novamente.";
        roletaSecao.style.display = "none";
        podeGirar = false;
        }
    };

    // -----------------------
    // ROLETA
    // -----------------------
    const raridades = [
        { nome: "Chapéu Comum", tipo: "Comum", chance: 0.7 },
        { nome: "Capa Épica", tipo: "Épico", chance: 0.25 },
        { nome: "Espada Lendária", tipo: "Lendário", chance: 0.05 },
    ];

    btnGirar.onclick = () => {
        if (!podeGirar) {
        premio.textContent = "⚠️ Você precisa acertar o quiz antes de girar!";
        return;
        }

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

        premio.textContent = `🎁 Você ganhou: ${item.nome} (${item.tipo})`;

        // Salvar no localStorage
        const itens = JSON.parse(localStorage.getItem("itens") || "[]");
        itens.push(item.nome);
        localStorage.setItem("itens", JSON.stringify(itens));

        podeGirar = false;
    };
    });
