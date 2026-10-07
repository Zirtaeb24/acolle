(function () {
  "use strict";

  var root = document.documentElement;

  /* =========================================================
     1. TAMANHO DE FONTE
     ========================================================= */
  var FONT_STEP = 0.1;
  var FONT_MIN = 0.85;
  var FONT_MAX = 1.5;
  var fontScale = parseFloat(localStorage.getItem("acolle-font-scale")) || 1;

  function applyFontScale() {
    fontScale = Math.min(FONT_MAX, Math.max(FONT_MIN, fontScale));
    root.style.setProperty("--fs-scale", fontScale.toFixed(2));
    localStorage.setItem("acolle-font-scale", fontScale.toFixed(2));
  }
  applyFontScale();

  var btnDecrease = document.getElementById("btn-font-decrease");
  var btnReset = document.getElementById("btn-font-reset");
  var btnIncrease = document.getElementById("btn-font-increase");

  if (btnDecrease) {
    btnDecrease.addEventListener("click", function () {
      fontScale -= FONT_STEP;
      applyFontScale();
    });
  }
  if (btnReset) {
    btnReset.addEventListener("click", function () {
      fontScale = 1;
      applyFontScale();
    });
  }
  if (btnIncrease) {
    btnIncrease.addEventListener("click", function () {
      fontScale += FONT_STEP;
      applyFontScale();
    });
  }

  /* =========================================================
     2. ALTO CONTRASTE
     ========================================================= */
  var btnContrast = document.getElementById("btn-contrast");
  var contrastOn = localStorage.getItem("acolle-contrast") === "true";

  function applyContrast() {
    root.classList.toggle("high-contrast", contrastOn);
    if (btnContrast) btnContrast.setAttribute("aria-pressed", String(contrastOn));
  }
  applyContrast();

  if (btnContrast) {
    btnContrast.addEventListener("click", function () {
      contrastOn = !contrastOn;
      localStorage.setItem("acolle-contrast", String(contrastOn));
      applyContrast();
    });
  }

  /* =========================================================
     3. LEITURA EM VOZ ALTA
     ========================================================= */
  var btnRead = document.getElementById("btn-read");
  var btnReadLabel = document.getElementById("btn-read-label");
  var synth = window.speechSynthesis;
  var isReading = false;

  function stopReading() {
    if (synth) synth.cancel();
    isReading = false;
    if (btnRead) btnRead.setAttribute("aria-pressed", "false");
    if (btnReadLabel) btnReadLabel.textContent = "Ouvir a página";
  }

  if (btnRead) {
    if (!synth) {
      btnRead.setAttribute("hidden", "true");
    } else {
      btnRead.addEventListener("click", function () {
        if (isReading) {
          stopReading();
          return;
        }
        var main = document.getElementById("conteudo-principal");
        var text = main ? main.innerText : document.body.innerText;
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        utterance.rate = 0.95;
        utterance.onend = stopReading;
        utterance.onerror = stopReading;
        synth.cancel();
        synth.speak(utterance);
        isReading = true;
        btnRead.setAttribute("aria-pressed", "true");
        if (btnReadLabel) btnReadLabel.textContent = "Parar leitura";
      });
    }
  }

  /* =========================================================
     4. MENU MOBILE
     ========================================================= */
  var menuToggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu-principal");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     5. CARROSSEL DA EQUIPE
     ========================================================= */
  var track = document.getElementById("team-track");
  var prevBtn = document.getElementById("team-prev");
  var nextBtn = document.getElementById("team-next");
  var dotsWrap = document.getElementById("team-dots");

  if (track && prevBtn && nextBtn) {
    var cards = track.querySelectorAll(".team-card");

    if (dotsWrap) {
      cards.forEach(function (_, i) {
        var dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " is-active" : "");
        dotsWrap.appendChild(dot);
      });
    }

    function scrollByCard(direction) {
      var card = track.querySelector(".team-card");
      if (!card) return;
      var gap = 22;
      var distance = card.offsetWidth + gap;
      track.scrollBy({ left: direction * distance, behavior: "smooth" });
    }

    prevBtn.addEventListener("click", function () { scrollByCard(-1); });
    nextBtn.addEventListener("click", function () { scrollByCard(1); });

    var scrollTimeout;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        if (!dotsWrap) return;
        var card = track.querySelector(".team-card");
        if (!card) return;
        var gap = 22;
        var distance = card.offsetWidth + gap;
        var index = Math.round(track.scrollLeft / distance);
        dotsWrap.querySelectorAll(".dot").forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === index);
        });
      }, 100);
    });
  }

  /* =========================================================
     6. ASSISTENTE FLUTUANTE (FAB)
     ========================================================= */
  var fabButton = document.getElementById("fab-button");
  var fabMenu = document.getElementById("fab-menu");

  if (fabButton && fabMenu) {
    fabButton.addEventListener("click", function () {
      var isOpen = fabMenu.classList.toggle("is-open");
      fabButton.setAttribute("aria-expanded", String(isOpen));
      fabButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-robot" aria-hidden="true"></i>';
    });

    document.addEventListener("click", function (event) {
      var isClickInside = fabMenu.contains(event.target) || fabButton.contains(event.target);
      if (!isClickInside && fabMenu.classList.contains("is-open")) {
        fabMenu.classList.remove("is-open");
        fabButton.setAttribute("aria-expanded", "false");
        fabButton.innerHTML = '<i class="fa-solid fa-robot" aria-hidden="true"></i>';
      }
    });
  }

  /* =========================================================
     7. FORMULÁRIO DE CONTATO
     ========================================================= */
  var form = document.getElementById("contact-form");

  if (form) {
    var status = document.getElementById("form-status");

    function setError(fieldId, message) {
      var el = document.getElementById("erro-" + fieldId);
      if (el) el.textContent = message || "";
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nome = document.getElementById("nome");
      var email = document.getElementById("email");
      var mensagem = document.getElementById("mensagem");
      var valid = true;

      setError("nome", "");
      setError("email", "");
      setError("mensagem", "");

      if (!nome.value.trim()) {
        setError("nome", "Por favor, informe seu nome.");
        valid = false;
      }
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        setError("email", "Por favor, informe um e-mail válido.");
        valid = false;
      }
      if (!mensagem.value.trim()) {
        setError("mensagem", "Por favor, escreva sua mensagem.");
        valid = false;
      }

      if (!valid) {
        if (status) {
          status.textContent = "Verifique os campos destacados acima.";
          status.classList.remove("is-success");
        }
        return;
      }

      // NOTA PARA DESENVOLVEDORES:
      // Este formulário ainda não está conectado a um backend real.
      // Para receber as mensagens de fato, integre um serviço como
      // Formspree, EmailJS ou uma rota própria de back-end.
      if (status) {
        status.textContent = "Mensagem registrada! Assim que o formulário estiver conectado ao nosso atendimento, retornaremos em breve.";
        status.classList.add("is-success");
      }
      form.reset();
    });
  }

})();
