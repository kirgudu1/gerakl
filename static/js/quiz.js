/* ===========================================
   КВИЗ «ПРОВЕРЬ СЕБЯ»
   =========================================== */
(function() {
    const container = document.querySelector('.quiz-container');
    if (!container) return;

    const quiz = JSON.parse(container.dataset.quiz);
    const questionEl = container.querySelector('.quiz-question');
    const optionsEl = container.querySelector('.quiz-options');
    const feedbackEl = container.querySelector('.quiz-feedback');
    const nextBtn = container.querySelector('.quiz-next');
    const resultEl = container.querySelector('.quiz-result');

    let current = 0;
    let score = 0;

    function showQuestion() {
        const q = quiz[current];
        questionEl.innerHTML = `<div class="quiz-counter">Вопрос ${current + 1} из ${quiz.length}</div>${q.question}`;
        optionsEl.innerHTML = '';
        feedbackEl.textContent = '';
        nextBtn.style.display = 'none';

        q.options.forEach(function(opt, i) {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', function() { selectAnswer(i); });
            optionsEl.appendChild(btn);
        });
    }

    function selectAnswer(idx) {
        const q = quiz[current];
        const buttons = optionsEl.querySelectorAll('.quiz-option');

        buttons.forEach(function(btn, i) {
            btn.disabled = true;
            if (i === q.correct) {
                btn.classList.add('correct');
            } else if (i === idx && idx !== q.correct) {
                btn.classList.add('wrong');
            }
        });

        if (idx === q.correct) {
            score++;
            feedbackEl.innerHTML = '<span style="color:#2c5f2d">✓ Правильно!</span>';
        } else {
            feedbackEl.innerHTML = '<span style="color:#c62828">✗ Неправильно</span>';
        }

        if (current < quiz.length - 1) {
            nextBtn.style.display = 'inline-block';
        } else {
            showResult();
        }
    }

    function showResult() {
        const pct = Math.round((score / quiz.length) * 100);
        let message = '';
        if (pct === 100) message = 'Отлично! Вы настоящий знаток мифологии! 🏆';
        else if (pct >= 75) message = 'Хороший результат! Вы хорошо знаете мифы 👏';
        else if (pct >= 50) message = 'Неплохо, но можно лучше. Перечитайте статью! 📖';
        else message = 'Стоит перечитать статью внимательнее 🤔';

        setTimeout(function() {
            resultEl.style.display = 'block';
            resultEl.innerHTML = `
                <div class="quiz-score">${score} из ${quiz.length}</div>
                <div class="quiz-message">${message}</div>
            `;
        }, 800);
    }

    nextBtn.addEventListener('click', function() {
        current++;
        showQuestion();
    });

    showQuestion();
})();
