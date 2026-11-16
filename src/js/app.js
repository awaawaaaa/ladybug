
(() => {
    "use strict";

    // ==========================================
    // 1. HELPER
    // ==========================================

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const STORAGE_KEY = "ladybug_user_progress";

    function getSavedData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    }

    const saved = getSavedData();

    // ==========================================
    // 2. STATE / DATA PENGGUNA
    // ==========================================

    const state = {
        name: saved.name || "",
        xp: Number(saved.xp) || 0,
        lessons: Number(saved.lessons) || 0,
        quizzes: Number(saved.quizzes) || 0,
        quickCorrect: Number(saved.quickCorrect) || 0,

        course: "python",
        currentLesson: 0,

        quizQuestions: [],
        quizIndex: 0,
        quizScore: 0,
        selectedAnswer: null,

        quickQuestions: [],
        quickIndex: 0,
        quickScore: 0,
        quickTime: 30,
        quickTimer: null,
        quickRunning: false,

        reminder: localStorage.getItem("ladybug_reminder") === "true",
        sound: localStorage.getItem("ladybug_sound") !== "false"
    };

    // ==========================================
    // 3. DATA MATERI
    // ==========================================

    const lessonData = {
        python: [
            {
                title: "Introduction to Python",
                description: "Python adalah bahasa pemrograman yang mudah dipelajari oleh pemula.",
                content: `
                    <h2>Apa itu Python? 🐍</h2>
                    <p>Python adalah bahasa pemrograman yang digunakan untuk membuat aplikasi, website, analisis data, dan berbagai teknologi lainnya.</p>
                    <p>Python populer karena sintaksnya sederhana dan mudah dibaca.</p>
                    <h3>Contoh kode:</h3>
                    <pre><code>print("Hello World!")</code></pre>
                    <p>Fungsi <b>print()</b> digunakan untuk menampilkan teks ke layar.</p>
                `
            },
            {
                title: "Variables",
                description: "Mengenal variabel dalam Python.",
                content: `
                    <h2>Apa itu Variabel?</h2>
                    <p>Variabel adalah tempat untuk menyimpan sebuah data.</p>
                    <p>Contohnya:</p>
                    <pre><code>nama = "Nasywa"
umur = 20

print(nama)
print(umur)</code></pre>
                    <p>Variabel <b>nama</b> menyimpan teks, sedangkan <b>umur</b> menyimpan angka.</p>
                `
            },
            {
                title: "Data Types",
                description: "Mengenal jenis-jenis data.",
                content: `
                    <h2>Data Types</h2>
                    <p>Python memiliki beberapa jenis tipe data.</p>
                    <pre><code>nama = "LadyBug"
umur = 20
tinggi = 160.5
aktif = True</code></pre>
                    <p>String adalah teks, integer adalah bilangan bulat, float adalah bilangan desimal, dan boolean adalah True atau False.</p>
                `
            },
            {
                title: "Conditional",
                description: "Belajar percabangan kondisi.",
                content: `
                    <h2>Conditional Statement</h2>
                    <p>Conditional digunakan untuk menjalankan kode berdasarkan kondisi tertentu.</p>
                    <pre><code>umur = 18

if umur >= 17:
    print("Boleh membuat KTP")
else:
    print("Belum cukup umur")</code></pre>
                `
            },
            {
                title: "Loops",
                description: "Mengenal perulangan.",
                content: `
                    <h2>Looping</h2>
                    <p>Loop digunakan untuk menjalankan kode secara berulang.</p>
                    <pre><code>for i in range(5):
    print("Hello!")</code></pre>
                    <p>Kode tersebut akan menampilkan Hello sebanyak lima kali.</p>
                `
            }
        ],

        web: [
            {
                title: "Introduction to HTML",
                description: "Mengenal struktur dasar website.",
                content: `
                    <h2>Apa itu HTML?</h2>
                    <p>HTML merupakan bahasa markup yang digunakan untuk membuat struktur halaman website.</p>
                    <pre><code>&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;My first website&lt;/p&gt;</code></pre>
                `
            },
            {
                title: "HTML Elements",
                description: "Mengenal elemen HTML.",
                content: `
                    <h2>HTML Elements</h2>
                    <p>HTML terdiri dari berbagai elemen seperti heading, paragraph, image, dan link.</p>
                    <pre><code>&lt;h1&gt;Judul&lt;/h1&gt;
&lt;p&gt;Ini paragraf.&lt;/p&gt;
&lt;a href="#"&gt;Klik di sini&lt;/a&gt;</code></pre>
                `
            },
            {
                title: "Introduction to CSS",
                description: "Mengenal CSS untuk mempercantik website.",
                content: `
                    <h2>Apa itu CSS?</h2>
                    <p>CSS digunakan untuk mengatur tampilan website, seperti warna, ukuran, dan layout.</p>
                    <pre><code>h1 {
    color: red;
    font-size: 24px;
}</code></pre>
                `
            },
            {
                title: "CSS Layout",
                description: "Mengatur tata letak website.",
                content: `
                    <h2>CSS Layout</h2>
                    <p>Flexbox membantu mengatur posisi elemen dalam sebuah halaman.</p>
                    <pre><code>.container {
    display: flex;
    justify-content: center;
    align-items: center;
}</code></pre>
                `
            },
            {
                title: "Introduction to JavaScript",
                description: "Mengenal JavaScript.",
                content: `
                    <h2>Apa itu JavaScript?</h2>
                    <p>JavaScript membuat halaman website menjadi interaktif.</p>
                    <pre><code>let nama = "LadyBug";
alert("Hello " + nama);</code></pre>
                `
            }
        ]
    };

    // ==========================================
    // 4. DATA QUIZ
    // ==========================================

    const defaultQuestions = [
        {
            question: "Apa fungsi print() dalam Python?",
            options: [
                "Menghapus data",
                "Menampilkan output",
                "Menghitung angka",
                "Membuat variabel"
            ],
            answer: 1
        },
        {
            question: "Manakah contoh variabel yang benar?",
            options: [
                "print = 10",
                "10 = umur",
                "nama = 'Awa'",
                "var nama"
            ],
            answer: 2
        },
        {
            question: "Apa kepanjangan HTML?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Tool Main Language",
                "Home Text Markup Link"
            ],
            answer: 0
        },
        {
            question: "CSS digunakan untuk apa?",
            options: [
                "Mengatur database",
                "Mengatur tampilan website",
                "Menyimpan data",
                "Membuat server"
            ],
            answer: 1
        },
        {
            question: "Tipe data True dan False disebut?",
            options: [
                "String",
                "Integer",
                "Boolean",
                "Float"
            ],
            answer: 2
        }
    ];

    const quickQuestionData = [
        {
            question: "Apa output dari print(2 + 3)?",
            options: ["4", "5", "6", "23"],
            answer: 1
        },
        {
            question: "Tag HTML untuk paragraf adalah?",
            options: ["<h1>", "<p>", "<div>", "<img>"],
            answer: 1
        },
        {
            question: "Simbol komentar satu baris Python adalah?",
            options: ["//", "<!--", "#", "**"],
            answer: 2
        },
        {
            question: "Properti CSS untuk warna teks adalah?",
            options: ["background", "color", "font", "display"],
            answer: 1
        },
        {
            question: "Manakah tipe data angka bulat Python?",
            options: ["String", "Float", "Integer", "Boolean"],
            answer: 2
        },
        {
            question: "JavaScript biasa disimpan dalam file berekstensi?",
            options: [".css", ".html", ".js", ".py"],
            answer: 2
        }
    ];

    // ==========================================
    // 5. SAVE & UPDATE STATISTICS
    // ==========================================

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            name: state.name,
            xp: state.xp,
            lessons: state.lessons,
            quizzes: state.quizzes,
            quickCorrect: state.quickCorrect
        }));

        updateStats();
    }

    function getLevel() {
        return Math.floor(state.xp / 100) + 1;
    }

    function getProgress() {
        return Math.min(100, Math.round((state.lessons / 5) * 100));
    }

    function updateStats() {
        const level = getLevel();

        if ($("#welcome-name")) {
            $("#welcome-name").textContent = state.name || "Learner";
        }

        if ($("#home-xp")) {
            $("#home-xp").textContent = state.xp;
        }

        if ($("#home-level")) {
            $("#home-level").textContent = level;
        }

        if ($("#profile-name")) {
            $("#profile-name").textContent = state.name || "Learner";
        }

        if ($("#profile-level")) {
            $("#profile-level").textContent = level;
        }

        if ($("#profile-xp")) {
            $("#profile-xp").textContent = state.xp;
        }

        if ($("#profile-lessons")) {
            $("#profile-lessons").textContent = state.lessons;
        }

        if ($("#profile-streak")) {
            $("#profile-streak").textContent = state.lessons > 0 ? 1 : 0;
        }

        if ($("#progress-text")) {
            $("#progress-text").textContent = getProgress() + "%";
        }

        if ($("#progress-fill")) {
            $("#progress-fill").style.width = getProgress() + "%";
        }

        renderBadges();
    }

    // ==========================================
    // 6. BADGES
    // ==========================================

    const badges = [
        {
            name: "First Step",
            icon: "🌱",
            description: "Selesaikan 1 pelajaran",
            unlocked: () => state.lessons >= 1
        },
        {
            name: "Quiz Master",
            icon: "🧠",
            description: "Selesaikan 5 quiz",
            unlocked: () => state.quizzes >= 5
        },
        {
            name: "Speed Star",
            icon: "⚡",
            description: "Jawab 10 tantangan benar",
            unlocked: () => state.quickCorrect >= 10
        },
        {
            name: "Pythonista",
            icon: "🐍",
            description: "Selesaikan 3 pelajaran",
            unlocked: () => state.lessons >= 3
        },
        {
            name: "Web Explorer",
            icon: "🌐",
            description: "Selesaikan 5 pelajaran",
            unlocked: () => state.lessons >= 5
        },
        {
            name: "Rising Star",
            icon: "⭐",
            description: "Kumpulkan 100 XP",
            unlocked: () => state.xp >= 100
        },
        {
            name: "Champion",
            icon: "🏆",
            description: "Kumpulkan 500 XP",
            unlocked: () => state.xp >= 500
        },
        {
            name: "Legend",
            icon: "👑",
            description: "Kumpulkan 1000 XP",
            unlocked: () => state.xp >= 1000
        }
    ];

    function renderBadges() {
        const container = $("#profile-badges");
        if (!container) return;

        let earned = 0;

        container.innerHTML = badges.map((badge) => {
            const unlocked = badge.unlocked();

            if (unlocked) earned++;

            return `
                <div class="badge-card ${unlocked ? "earned" : "locked"}">
                    <span>${unlocked ? badge.icon : "🔒"}</span>
                    <b>${badge.name}</b>
                    <small>${badge.description}</small>
                </div>
            `;
        }).join("");

        if ($("#badge-count")) {
            $("#badge-count").textContent = `${earned}/8`;
        }
    }

    // ==========================================
    // 7. NAVIGATION
    // ==========================================

    function navScreenFor(screen) {
        if (["home", "course", "lesson"].includes(screen)) {
            return "home";
        }

        if ([
            "practice",
            "quick",
            "quiz",
            "quiz-result",
            "quick-result"
        ].includes(screen)) {
            return "practice";
        }

        if (screen === "leaderboard") {
            return "leaderboard";
        }

        if (screen === "profile") {
            return "profile";
        }

        return "";
    }

    function showScreen(name) {
        if (name === "home" && !state.name) {
            name = "splash";
        }

        $$(".screen").forEach((screen) => {
            screen.classList.remove("active");
        });

        const target = $("#screen-" + name);

        if (!target) return;

        target.classList.add("active");

        const nav = $("#bottom-nav");
        const navVisible = [
            "home",
            "course",
            "lesson",
            "practice",
            "quick",
            "quiz",
            "quiz-result",
            "quick-result",
            "leaderboard",
            "profile"
        ].includes(name);

        if (nav) {
            nav.style.display = navVisible ? "flex" : "none";
        }

        $$(".nav-item").forEach((item) => {
            item.classList.toggle(
                "active",
                item.dataset.screen === navScreenFor(name)
            );
        });

        if (name === "leaderboard") {
            renderLeaderboard();
        }

        if (name === "profile") {
            updateStats();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ==========================================
    // 8. GLOBAL BUTTON EVENTS
    // ==========================================

    document.addEventListener("click", (event) => {
        const screenButton = event.target.closest("[data-screen]");

        if (screenButton) {
            const target = screenButton.dataset.screen;

            if (target === "quiz") {
                startQuiz();
            } else {
                showScreen(target);
            }

            return;
        }

        const courseButton = event.target.closest("[data-course]");

        if (courseButton) {
            state.course = courseButton.dataset.course;
            state.currentLesson = 0;
            renderLesson();
            showScreen("lesson");
        }
    });

    // ==========================================
    // 9. LOGIN
    // ==========================================

    const loginForm = $("#login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = $("#username").value.trim();

            if (!name) return;

            state.name = name;
            save();

            showScreen("home");
        });
    }

    const headerAvatar = $("#header-avatar");

    if (headerAvatar) {
        headerAvatar.addEventListener("click", () => {
            if (state.name) {
                showScreen("profile");
            } else {
                showScreen("login");
            }
        });
    }

    // ==========================================
    // 10. LESSON
    // ==========================================

    function renderLesson() {
        const lessons = lessonData[state.course] || lessonData.python;
        const lesson = lessons[state.currentLesson];

        if (!lesson) return;

        const content = $("#lesson-content");

        if (!content) return;

        content.innerHTML = `
            <p class="eyebrow">${state.course.toUpperCase()} BASICS</p>
            <h1>${lesson.title}</h1>
            <p class="muted">${lesson.description}</p>
            <div class="panel">${lesson.content}</div>
            <p class="muted">
                Pelajaran ${state.currentLesson + 1} dari ${lessons.length}
            </p>
        `;

        const button = $("#complete-lesson");

        if (button) {
            button.textContent =
                state.currentLesson === lessons.length - 1
                    ? "Selesaikan Kursus"
                    : "Selesaikan Pelajaran";
        }
    }

    const completeLessonButton = $("#complete-lesson");

    if (completeLessonButton) {
        completeLessonButton.addEventListener("click", () => {
            const lessons = lessonData[state.course];

            state.xp += 20;
            state.lessons++;

            save();

            if (state.currentLesson < lessons.length - 1) {
                state.currentLesson++;
                renderLesson();
            } else {
                alert("Selamat! Kamu sudah menyelesaikan materi ini. 🎉");
                showScreen("course");
            }
        });
    }

    // ==========================================
    // 11. MINI QUIZ
    // ==========================================

    function startQuiz() {
        state.quizQuestions = [...defaultQuestions];
        state.quizIndex = 0;
        state.quizScore = 0;
        state.selectedAnswer = null;

        renderQuiz();
        showScreen("quiz");
    }

    function renderQuiz() {
        const question = state.quizQuestions[state.quizIndex];

        if (!question) return;

        if ($("#quiz-progress")) {
            $("#quiz-progress").textContent =
                `Pertanyaan ${state.quizIndex + 1} dari ${state.quizQuestions.length}`;
        }

        if ($("#quiz-question")) {
            $("#quiz-question").textContent = question.question;
        }

        if ($("#quiz-feedback")) {
            $("#quiz-feedback").textContent = "";
        }

        if ($("#next-question")) {
            $("#next-question").disabled = true;
        }

        const options = $("#quiz-options");

        if (!options) return;

        options.innerHTML = question.options.map((option, index) => `
            <button class="quiz-option" data-answer="${index}">
                ${option}
            </button>
        `).join("");

        options.querySelectorAll("[data-answer]").forEach((button) => {
            button.addEventListener("click", () => {
                selectQuizAnswer(Number(button.dataset.answer));
            });
        });
    }

    function selectQuizAnswer(answerIndex) {
        if (state.selectedAnswer !== null) return;

        state.selectedAnswer = answerIndex;

        const question = state.quizQuestions[state.quizIndex];
        const correct = answerIndex === question.answer;

        if (correct) {
            state.quizScore += 10;
            state.xp += 10;
        }

        $$(".quiz-option").forEach((button) => {
            const index = Number(button.dataset.answer);

            button.disabled = true;

            if (index === question.answer) {
                button.classList.add("correct");
            } else if (index === answerIndex) {
                button.classList.add("wrong");
            }
        });

        if ($("#quiz-feedback")) {
            $("#quiz-feedback").textContent = correct
                ? "Benar! Kamu mendapatkan 10 XP 🎉"
                : "Belum tepat, coba pelajari lagi ya!";
        }

        if ($("#next-question")) {
            $("#next-question").disabled = false;
        }

        save();
    }

    const nextQuestionButton = $("#next-question");

    if (nextQuestionButton) {
        nextQuestionButton.addEventListener("click", () => {
            state.quizIndex++;
            state.selectedAnswer = null;

            if (state.quizIndex < state.quizQuestions.length) {
                renderQuiz();
            } else {
                finishQuiz();
            }
        });
    }

    function finishQuiz() {
        state.quizzes++;
        save();

        if ($("#quiz-score")) {
            $("#quiz-score").textContent = `+${state.quizScore} XP`;
        }

        showScreen("quiz-result");
    }

    const retryQuizButton = $("#retry-quiz");

    if (retryQuizButton) {
        retryQuizButton.addEventListener("click", startQuiz);
    }

    // ==========================================
    // 12. PRACTICE
    // ==========================================

    const checkPracticeButton = $("#check-practice");

    if (checkPracticeButton) {
        checkPracticeButton.addEventListener("click", () => {
            const answer = ($("#practice-answer")?.value || "")
                .trim()
                .replace(/^["']|["']$/g, "");

            if (answer === "Hello LadyBug!") {
                if ($("#practice-feedback")) {
                    $("#practice-feedback").textContent =
                        "Benar! Kamu mendapatkan 10 XP 🎉";
                    $("#practice-feedback").style.color = "var(--green)";
                }

                state.xp += 10;
                save();

                checkPracticeButton.disabled = true;
                checkPracticeButton.textContent = "Selesai!";
            } else {
                if ($("#practice-feedback")) {
                    $("#practice-feedback").textContent =
                        "Belum tepat. Coba perhatikan output pada kode!";
                    $("#practice-feedback").style.color = "var(--red)";
                }
            }
        });
    }

    // ==========================================
    // 13. QUICK CHALLENGE
    // ==========================================

    function startQuick() {
        clearInterval(state.quickTimer);

        state.quickQuestions = [...quickQuestionData]
            .sort(() => Math.random() - 0.5);

        state.quickIndex = 0;
        state.quickScore = 0;
        state.quickTime = 30;
        state.quickRunning = true;

        if ($("#quick-timer")) {
            $("#quick-timer").textContent = state.quickTime;
        }

        if ($("#quick-score")) {
            $("#quick-score").textContent = "Score: 0";
        }

        const startButton = $("#start-quick");

        if (startButton) {
            startButton.disabled = true;
            startButton.textContent = "Challenge berlangsung...";
        }

        renderQuickQuestion();

        state.quickTimer = setInterval(() => {
            state.quickTime--;

            if ($("#quick-timer")) {
                $("#quick-timer").textContent = state.quickTime;
            }

            if (state.quickTime <= 0) {
                endQuick();
            }
        }, 1000);
    }

    function renderQuickQuestion() {
        const question = state.quickQuestions[state.quickIndex];

        if (!question) {
            endQuick();
            return;
        }

        if ($("#quick-question")) {
            $("#quick-question").textContent = question.question;
        }

        const options = $("#quick-options");

        if (!options) return;

        options.innerHTML = question.options.map((option, index) => `
            <button class="quiz-option" data-quick-answer="${index}">
                ${option}
            </button>
        `).join("");

        options.querySelectorAll("[data-quick-answer]").forEach((button) => {
            button.addEventListener("click", () => {
                answerQuick(Number(button.dataset.quickAnswer));
            });
        });
    }

    function answerQuick(answerIndex) {
        if (!state.quickRunning) return;

        const question = state.quickQuestions[state.quickIndex];

        if (answerIndex === question.answer) {
            state.quickScore++;
            state.quickCorrect++;
            state.xp += 10;

            if ($("#quick-score")) {
                $("#quick-score").textContent =
                    `Score: ${state.quickScore}`;
            }

            save();
        }

        state.quickIndex++;

        if (state.quickIndex >= state.quickQuestions.length) {
            endQuick();
        } else {
            renderQuickQuestion();
        }
    }

    function endQuick() {
        if (!state.quickRunning) return;

        state.quickRunning = false;
        clearInterval(state.quickTimer);

        if ($("#quick-final-score")) {
            $("#quick-final-score").textContent = state.quickScore;
        }

        const startButton = $("#start-quick");

        if (startButton) {
            startButton.disabled = false;
            startButton.textContent = "Mulai Tantangan";
        }

        save();
        showScreen("quick-result");
    }

    const startQuickButton = $("#start-quick");

    if (startQuickButton) {
        startQuickButton.addEventListener("click", startQuick);
    }

    const retryQuickButton = $("#retry-quick");

    if (retryQuickButton) {
        retryQuickButton.addEventListener("click", () => {
            showScreen("quick");
            startQuick();
        });
    }

    // ==========================================
    // 14. LEADERBOARD
    // ==========================================

    function renderLeaderboard() {
        const container = $("#leaderboard-list");

        if (!container) return;

        const players = [
            { name: "ByteBee", xp: 850 },
            { name: "CodeCat", xp: 720 },
            { name: "PixelFox", xp: 640 },
            {
                name: state.name || "Learner",
                xp: state.xp,
                current: true
            },
            { name: "DevDuck", xp: 250 }
        ];

        players.sort((a, b) => b.xp - a.xp);

        const medals = ["🥇", "🥈", "🥉"];

        container.innerHTML = players.map((player, index) => `
            <div class="leaderboard-item ${player.current ? "current-user" : ""}">
                <span class="rank">
                    ${medals[index] || index + 1}
                </span>
                <div class="player">
                    <b>${escapeHTML(player.name)}</b>
                    <small>${player.current ? "You" : "LadyBug Learner"}</small>
                </div>
                <span class="points">${player.xp} XP</span>
            </div>
        `).join("");
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    // ==========================================
    // 15. PROFILE SETTINGS
    // ==========================================

    const reminderToggle = $("#daily-reminder");

    if (reminderToggle) {
        reminderToggle.checked = state.reminder;

        reminderToggle.addEventListener("change", () => {
            state.reminder = reminderToggle.checked;

            localStorage.setItem(
                "ladybug_reminder",
                String(state.reminder)
            );

            alert(
                state.reminder
                    ? "Pengaturan pengingat harian diaktifkan."
                    : "Pengingat harian dinonaktifkan."
            );
        });
    }

    const soundToggle = $("#sound-effects");

    if (soundToggle) {
        soundToggle.checked = state.sound;

        soundToggle.addEventListener("change", () => {
            state.sound = soundToggle.checked;

            localStorage.setItem(
                "ladybug_sound",
                String(state.sound)
            );
        });
    }

    // ==========================================
    // 16. RESET PROGRESS
    // ==========================================

    const resetButton = $("#reset-progress");

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            const confirmed = confirm(
                "Yakin ingin menghapus semua progress belajar?"
            );

            if (!confirmed) return;

            state.xp = 0;
            state.lessons = 0;
            state.quizzes = 0;
            state.quickCorrect = 0;

            save();

            if ($("#practice-answer")) {
                $("#practice-answer").value = "";
            }

            if ($("#practice-feedback")) {
                $("#practice-feedback").textContent = "";
            }

            if (checkPracticeButton) {
                checkPracticeButton.disabled = false;
                checkPracticeButton.textContent = "Periksa Jawaban";
            }

            alert("Progress berhasil direset!");
            showScreen("profile");
        });
    }

    // ==========================================
    // 17. INITIALIZATION
    // ==========================================

    updateStats();

    if (state.name) {
        showScreen("home");
    } else {
        showScreen("splash");
    }

})();
