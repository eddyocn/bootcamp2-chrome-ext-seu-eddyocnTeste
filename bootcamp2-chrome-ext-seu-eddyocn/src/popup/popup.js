document.addEventListener("DOMContentLoaded", () => {
  const contadorEl = document.getElementById("contador");
  const botao = document.getElementById("btnContar");
  const resetBtn = document.getElementById("btnReset");
  const container = document.getElementById("particles");

  // Carregar contador salvo
  chrome.storage.local.get(["contador"], (result) => {
    contadorEl.textContent = result.contador || 0;
  });

  // Clique no botão de contar
  botao.addEventListener("click", () => {
    chrome.storage.local.get(["contador"], (result) => {
      let novoValor = (result.contador || 0) + 1;
      chrome.storage.local.set({ contador: novoValor }, () => {
        contadorEl.textContent = novoValor;

        // animação do número
        contadorEl.style.transform = "scale(1.2)";
        setTimeout(() => (contadorEl.style.transform = "scale(1)"), 200);

        // criar várias partículas aleatórias no popup
        for (let i = 0; i < 6; i++) {
          criarParticula();
        }
      });
    });
  });

  // Clique no botão de resetar
  resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({ contador: 0 }, () => {
      contadorEl.textContent = 0;
    });
  });

  function criarParticula() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const popupRect = container.getBoundingClientRect();

    // posição aleatória dentro do popup
    const startX = Math.random() * (popupRect.width - 24);
    const startY = Math.random() * (popupRect.height - 24);

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    // tamanhos e rotações aleatórias
    const tamanho = 16 + Math.random() * 16;
    particle.style.width = `${tamanho}px`;
    particle.style.height = `${tamanho}px`;

    const rotacao = Math.random() * 360;
    const deslocX = (Math.random() - 0.5) * 60;
    const deslocY = -50 - Math.random() * 50; // sobe para cima
    const duracao = 900 + Math.random() * 400;

    container.appendChild(particle);

    particle.animate(
      [
        { transform: `translate(0, 0) rotate(${rotacao}deg) scale(1)`, opacity: 1 },
        {
          transform: `translate(${deslocX}px, ${deslocY}px) rotate(${rotacao + 180}deg) scale(0.5)`,
          opacity: 0,
        },
      ],
      {
        duration: duracao,
        easing: "ease-out",
      }
    );

    setTimeout(() => particle.remove(), duracao);
  }
});
