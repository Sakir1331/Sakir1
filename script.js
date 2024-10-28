const questions = [
    { question: "كم عدد افراد العائله؟", options: ["6", "7", "8", "9"], answer: "7" },
    { question: "من اكثر واحد عنده اصحاب؟", options: ["صقر", "علي", "محمد"], answer: "علي" },
    { question: "من اكثر واحد يقرا كتب؟", options: ["ام يزن", "علي", "ام صقر"], answer: "ام يزن" },
    { question: "من هو اخر العنقود؟", options: ["براءه", "محمد", "صقر"], answer: "محمد" },
    { question: "من هو الرسام في العائله؟", options: ["محمد", "براءه", "ام يزن"], answer: "ام يزن" },
    { question: "من هي التي ذكر اسمها في القران؟", options: ["ام يزن", "براءه", "ام صقر"], answer: "براءه" },
    { question: "من هو المهندس في العائله؟", options: ["علي", "محمد او صقر", "براءه"], answer: "محمد او صقر" },
    { question: "من هو عقيد القوم؟", options: ["علي", "ابو صقر", "محمد"], answer: "ابو صقر" },
    { question: "من هي ست الحبايب؟", options: ["براءه", "ام صقر", "ام يزن"], answer: "ام صقر" },
    { question: "كم عدد اولاد ام يزن؟", options: ["20 هههههههههههه", "2", "1"], answer: "2" },
    { question: "من هو اول حفيد للعائله؟", options: ["محمد", "راكان", "يزن"], answer: "يزن" },
    { question: "من هو اصغر فرد في العائله؟", options: ["محمد", "يزن", "راكان"], answer: "راكان" }
];

let currentQuestion = 0;
let score = 0;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
}

function startQuiz() {
    const familyMember = document.getElementById("familyMember").value;

    if (!familyMember) {
        alert("يجب اختيار اسم.");
        return;
    }

    if (familyMember === "يزن" || familyMember === "راكان") {
        document.querySelector(".welcome").classList.remove("show");
        document.querySelector(".not-allowed").classList.add("show");
        return;
    }

    document.getElementById("greeting").textContent = `مرحباً بك يا ${familyMember}! لنبدأ اللعبة!`;
    document.querySelector(".welcome").classList.remove("show");
    document.querySelector(".question-container").classList.add("show");

    shuffleQuestions();
    showQuestion();
}

function goBack() {
    document.querySelector(".not-allowed").classList.remove("show");
    document.querySelector(".welcome").classList.add("show");
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("questionText").textContent = question.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    shuffleOptions(question.options);
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(button, option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button, option) {
    const isCorrect = option === questions[currentQuestion].answer;
    if (isCorrect) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    document.querySelector(".question-container").classList.remove("show");
    document.querySelector(".result-container").classList.add("show");

    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById("finalResult").textContent = `لقد أجبت على ${percentage}% من الأسئلة بشكل صحيح!`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector(".result-container").classList.remove("show");
    document.querySelector(".welcome").classList.add("show");
}

function closeApp() {
    alert("شكراً لمشاركتك في اللعبة! إلى اللقاء.");
    window.close();
}