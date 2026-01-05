// =============================
// Helpers
// =============================
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
    start: $("screen-start"),
    intro: $("screen-intro"),
    rules: $("screen-rules"),
    game: $("screen-game"),
    feedback: $("screen-feedback"),
    end: $("screen-end"),
};

function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("screen-active"));
    screens[name].classList.add("screen-active");
}

// =============================
// DOM refs
// =============================

// Intro
const introImg = $("intro-character-img");
const introText = $("intro-dialog-text");
const introName = $("intro-character-name");

// Juego
const roundIndicator = $("round-indicator");
const scoreLabel = $("score-label");
const newsTitle = $("news-title");
const newsText = $("news-text");
const newsSource = $("news-source");
const choiceButtons = $$(".btn-choice");

// Feedback
const feedbackTitle = $("feedback-title");
const feedbackText = $("feedback-text");
const reflectionQuestion = $("reflection-question");
const reflectionOptions = $("reflection-options");
const btnNextQuestion = $("btn-next-question");

// Final
const finalScore = $("final-score");
const finalMessage = $("final-message");
const resultsBody = $("results-body");

// Audio
const soundCorrect = $("sound-correct");
const soundWrong = $("sound-wrong");

// Overlay Baba
const babaOverlay = $("baba-overlay");
const babaOverlayImg = $("baba-overlay-img");
const babaOverlayText = $("baba-overlay-text");

// =============================
// Data
// =============================

// Diálogos intro
const introScenes = [
    {
        img: "assets/baba-neutral.png",
        name: "Baba",
        text: "Je, je, je… Soy la baba de la desinformación. ¡A ver si puedes detenerme!",
    },
    {
        img: "assets/nona.png",
        name: "Nona",
        text: "¡Hola! Últimamente me llegan muchas cosas raras en mis grupos y redes. No sé qué creer.",
    },
    {
        img: "assets/santi.png",
        name: "Santi",
        text: "A mí también. Algunas noticias se ven confiables, pero igual sospecho.",
    },
    {
        img: "assets/nona.png",
        name: "Nona",
        text: "¿Nos ayudas a revisar qué es cierto y qué es pura desinformación?",
    },
];

// Preguntas base
const questionsBase = [
    {
        title: "«Estudio demuestra que comer helado reduce el estrés en un 90%»",
        text: "Un titular viral asegura que consumir helado reduce el estrés en un 90%, citando un supuesto estudio científico sin mencionar la institución ni el contexto.",
        source: "Cadena de WhatsApp",
        truth: "enganoso",
        explanation:
            "La noticia exagera los resultados y no identifica el estudio ni la institución. Aunque puede haber investigaciones sobre alimentación y bienestar, el titular promete mucho más de lo que los datos permiten afirmar.",
        reflectionQ: "¿Qué pista te ayuda a ver que esto es más bien engañoso?",
        reflectionOptions: [
            { text: "Toma un dato posible, pero lo exagera y lo saca de contexto.", correct: true },
            { text: "Todo lo que circula por WhatsApp es falso automáticamente.", correct: false },
            { text: "Habla de helado, y nada que incluya helado puede ser negativo.", correct: false },
        ],
    },
    {
        title: "«El próximo mes se eliminará el IVA en todos los productos en Chile»",
        text: "Una publicación en redes asegura que, por una nueva ley, el IVA se eliminará por completo en todos los productos a partir del próximo mes.",
        source: "Publicación viral en redes",
        truth: "falso",
        explanation:
            "No existe ninguna norma aprobada que elimine el IVA en todos los productos. Cambios de este tipo se tramitan públicamente y son cubiertos por medios confiables.",
        reflectionQ: "¿Qué podrías hacer para verificar si una medida tributaria así es real?",
        reflectionOptions: [
            { text: "Revisar medios confiables y el sitio oficial del Gobierno o el Congreso.", correct: true },
            { text: "Ver si el post tiene muchos likes y comentarios.", correct: false },
            { text: "Preguntar en un grupo de WhatsApp qué opinan.", correct: false },
        ],
    },
    {
        title: "«El 69% de quienes viven en campamentos está inscrito en comités de vivienda»",
        text: "Una autoridad asegura en una entrevista que un 69% de las personas que viven en campamentos forma parte de comités de vivienda.",
        source: "Declaración pública en medios",
        truth: "enganoso",
        explanation:
            "El porcentaje corresponde a campamentos que tienen comités de vivienda, no a personas inscritas. Se usa un dato real, pero se interpreta de forma incorrecta.",
        reflectionQ: "¿Por qué la afirmación se considera engañosa y no simplemente verdadera?",
        reflectionOptions: [
            { text: "Usa un dato real, pero lo presenta de forma que cambia su significado.", correct: true },
            { text: "Porque cualquier cifra sobre campamentos es falsa.", correct: false },
            { text: "Porque las entrevistas nunca son confiables.", correct: false },
        ],
    },
    {
        title: "«Municipalidad amplía horario de vacunatorios durante el fin de semana»",
        text: "La información se anuncia en el sitio oficial de la municipalidad y en sus redes verificadas, con horarios y direcciones específicos.",
        source: "Página oficial municipal",
        truth: "real",
        explanation:
            "La información proviene de canales oficiales y se puede contrastar en fuentes públicas confiables. Detalla lugar, horario y vigencia.",
        reflectionQ: "¿Qué elementos hacen que esta noticia sea más confiable?",
        reflectionOptions: [
            { text: "Tiene fuente oficial clara y datos concretos verificables.", correct: true },
            { text: "Fue reenviada muchas veces en grupos de chat.", correct: false },
            { text: "El diseño del afiche se ve muy profesional.", correct: false },
        ],
    },
    {
        title: "«Nuevo medicamento elimina por completo el riesgo de infarto en jóvenes»",
        text: "Una nota en un blog asegura que un nuevo medicamento elimina por completo el riesgo de infarto en personas menores de 30 años.",
        source: "Blog anónimo de salud",
        truth: "falso",
        explanation:
            "No existen medicamentos que eliminen totalmente el riesgo de infarto. La afirmación es absoluta, no cita estudios revisados por pares y no identifica instituciones serias.",
        reflectionQ: "¿Qué característica del titular debería hacerte dudar de inmediato?",
        reflectionOptions: [
            { text: "Promete un efecto absoluto («elimina por completo») sin matices.", correct: true },
            { text: "Menciona a personas menores de 30 años.", correct: false },
            { text: "Utiliza la palabra «nuevo».", correct: false },
        ],
    },
];

// =============================
// State
// =============================
let introIndex = 0;
let questions = [];
let currentIndex = 0;
let score = 0;
let acceptingChoice = false;
let reflectionAnswered = false;
let results = []; // para la tabla final

// =============================
// Init
// =============================
function initGame() {
    // Pre-cargar imágenes de la baba
    ["assets/baba-neutral.png", "assets/baba-hit.png", "assets/baba-laugh.png"].forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    // Eventos
    $("btn-start").addEventListener("click", startIntro);
    $("btn-next-dialog").addEventListener("click", nextIntroDialog);
    $("btn-go-to-game").addEventListener("click", startMainGame);
    $("btn-restart").addEventListener("click", restartGame);
    btnNextQuestion.addEventListener("click", handleNextQuestion);

    choiceButtons.forEach((btn) => {
        btn.addEventListener("click", () => handleChoice(btn.dataset.choice, btn));
    });

    showScreen("start");
}

document.addEventListener("DOMContentLoaded", initGame);

// =============================
// Intro
// =============================
function startIntro() {
    introIndex = 0;
    renderIntro();
    showScreen("intro");
}

function renderIntro() {
    const scene = introScenes[introIndex];
    introImg.src = scene.img;
    introName.textContent = scene.name;
    introText.textContent = scene.text;
}

function nextIntroDialog() {
    introIndex++;
    if (introIndex >= introScenes.length) {
        showScreen("rules");
    } else {
        renderIntro();
    }
}

// =============================
// Main game
// =============================
function startMainGame() {
    // clonar y mezclar preguntas
    questions = [...questionsBase];
    shuffleArray(questions);
    currentIndex = 0;
    score = 0;
    results = [];
    updateScoreUI();
    loadCurrentQuestion();
    showScreen("game");
}

function restartGame() {
    // reseteamos todo y volvemos a los diálogos de inicio
    questions = [];
    currentIndex = 0;
    score = 0;
    results = [];
    updateScoreUI();
    startIntro();
}

function loadCurrentQuestion() {
    const q = questions[currentIndex];
    if (!q) {
        // si por cualquier razón no hay pregunta, terminamos
        return endGame();
    }

    roundIndicator.textContent = `Ronda ${currentIndex + 1}/${questions.length}`;
    newsTitle.textContent = q.title;
    newsText.textContent = q.text;
    newsSource.textContent = q.source ? `Fuente: ${q.source}` : "";

    // reset visual de botones de categoría
    choiceButtons.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("chosen");
    });

    acceptingChoice = true;
}

// =============================
// Elección Real / Engañosa / Falsa
// =============================
function handleChoice(choice, buttonEl) {
    if (!acceptingChoice) return;
    acceptingChoice = false;

    const q = questions[currentIndex];
    const isCorrect = choice === q.truth;

    // guardamos resultado base
    results[currentIndex] = {
        title: q.title,
        truth: q.truth,
        userChoice: choice,
        classifiedCorrect: isCorrect,
        reflectionCorrect: null,
    };

    buttonEl.classList.add("chosen");

    playResultAnimation(isCorrect, () => {
        showFeedback(q);
    });
}

function playResultAnimation(isCorrect, callback) {
    if (isCorrect) {
        score++;
        updateScoreUI();
        playSound(soundCorrect);
        showBabaOverlay("hit", callback);
    } else {
        playSound(soundWrong);
        showBabaOverlay("laugh", callback);
    }
}

function playSound(audioEl) {
    if (!audioEl) return;
    audioEl.currentTime = 0;
    audioEl
        .play()
        .then(() => { })
        .catch(() => { });
}

function updateScoreUI() {
    scoreLabel.textContent = score;
}

// =============================
// Baba overlay
// =============================
function showBabaOverlay(mode, callback) {
    if (!babaOverlay || !babaOverlayImg) {
        if (callback) callback();
        return;
    }

    babaOverlay.classList.add("active");
    babaOverlayImg.classList.remove("baba-hit", "baba-laugh");
    babaOverlayText.textContent = "";

    if (mode === "hit") {
        babaOverlayImg.src = "assets/baba-hit.png";
        babaOverlayImg.classList.add("baba-hit");
        babaOverlayText.textContent = "¡AY!";
    } else {
        babaOverlayImg.src = "assets/baba-laugh.png";
        babaOverlayImg.classList.add("baba-laugh");
        babaOverlayText.textContent = "je je je";
    }

    setTimeout(() => {
        babaOverlay.classList.remove("active");
        babaOverlayImg.classList.remove("baba-hit", "baba-laugh");
        babaOverlayImg.src = "assets/baba-neutral.png";
        babaOverlayText.textContent = "";
        if (callback) callback();
    }, 900);
}

// =============================
// Feedback + reflexión
// =============================
function showFeedback(question) {
    const label =
        question.truth === "real"
            ? "REAL"
            : question.truth === "enganoso"
                ? "ENGAÑOSA"
                : "FALSA";

    feedbackTitle.textContent = `Era ${label}`;
    feedbackText.textContent = question.explanation;
    reflectionQuestion.textContent = question.reflectionQ || "";

    // Construir opciones de reflexión
    reflectionOptions.innerHTML = "";
    question.reflectionOptions.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = opt.text;
        btn.dataset.correct = opt.correct ? "1" : "0";
        btn.dataset.index = String(idx);

        btn.addEventListener("click", () => handleReflectionClick(btn));

        reflectionOptions.appendChild(btn);
    });

    // bloquear siguiente hasta responder reflexión
    reflectionAnswered = false;
    btnNextQuestion.disabled = true;
    btnNextQuestion.classList.add("disabled");

    showScreen("feedback");
}

function handleReflectionClick(button) {
    if (reflectionAnswered) return;
    reflectionAnswered = true;

    const isCorrect = button.dataset.correct === "1";

    // guardamos cómo le fue en la reflexión
    if (results[currentIndex]) {
        results[currentIndex].reflectionCorrect = isCorrect;
    }

    if (isCorrect) {
        playSound(soundCorrect);
        showBabaOverlay("hit", () => {
            markReflectionButtons(button);
            enableNextQuestion();
        });
    } else {
        playSound(soundWrong);
        showBabaOverlay("laugh", () => {
            markReflectionButtons(button);
            enableNextQuestion();
        });
    }
}

function markReflectionButtons(selected) {
    const buttons = reflectionOptions.querySelectorAll("button");
    buttons.forEach((btn) => {
        const correct = btn.dataset.correct === "1";
        btn.disabled = true;
        btn.classList.remove("correct", "wrong");
        if (correct) {
            btn.classList.add("correct");
        }
        if (btn === selected && !correct) {
            btn.classList.add("wrong");
        }
    });
}

function enableNextQuestion() {
    btnNextQuestion.disabled = false;
    btnNextQuestion.classList.remove("disabled");
}

// =============================
// Avanzar / terminar
// =============================
function handleNextQuestion() {
    if (!reflectionAnswered) return;
    currentIndex++;

    if (currentIndex >= questions.length) {
        endGame();
    } else {
        loadCurrentQuestion();
        showScreen("game");
    }
}

function endGame() {
    finalScore.textContent = `${score}/${questions.length}`;

    if (score === questions.length) {
        finalMessage.textContent = "¡Excelente! Derrotaste a la baba de la desinformación.";
    } else if (score >= Math.ceil(questions.length * 0.6)) {
        finalMessage.textContent =
            "Muy bien. Tienes buen ojo, pero aún puedes afinar más tu radar.";
    } else {
        finalMessage.textContent =
            "La baba sigue fuerte… pero cada partida te ayuda a detectar mejor la desinformación.";
    }

    renderResultsTable();
    showScreen("end");
}

// =============================
// Tabla de resultados
// =============================
function renderResultsTable() {
    if (!resultsBody) return;
    resultsBody.innerHTML = "";

    const labelPretty = {
        real: "Real",
        enganoso: "Engañosa",
        falso: "Falsa",
    };

    results.forEach((r, idx) => {
        if (!r) return;
        const tr = document.createElement("tr");
        const correctRow = r.classifiedCorrect === true;
        tr.className = correctRow ? "correct-row" : "wrong-row";

        const tdIndex = document.createElement("td");
        tdIndex.textContent = String(idx + 1);

        const tdTitle = document.createElement("td");
        tdTitle.textContent = r.title;

        const tdTruth = document.createElement("td");
        tdTruth.textContent = labelPretty[r.truth] || r.truth;

        const tdUser = document.createElement("td");
        tdUser.textContent = labelPretty[r.userChoice] || r.userChoice || "-";

        const tdOk = document.createElement("td");
        tdOk.textContent = r.classifiedCorrect ? "✔" : "✘";

        tr.appendChild(tdIndex);
        tr.appendChild(tdTitle);
        tr.appendChild(tdTruth);
        tr.appendChild(tdUser);
        tr.appendChild(tdOk);

        resultsBody.appendChild(tr);
    });
}

// =============================
// Utils
// =============================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
