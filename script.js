const quizData = [
  {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
  },
  {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correct: 0
  },
  {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
      correct: 1
  },
  {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: 3
  },
  {
      question: "Which country is home to the kangaroo?",
      options: ["New Zealand", "South Africa", "Australia", "Brazil"],
      correct: 2
  },
  {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correct: 1
  },
  {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: 1
  },
  {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Brain", "Liver", "Skin"],
      correct: 3
  },
  {
      question: "Which year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      correct: 1
  },
  {
      question: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionNumber = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const question = quizData[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";
  question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option");
      if (userAnswers[currentQuestion] === index) {
          button.classList.add("selected");
      }
      button.addEventListener("click", () => selectOption(index));
      optionsEl.appendChild(button);
  });
  updateNavButtons();
}

function selectOption(index) {
  userAnswers[currentQuestion] = index;
  const options = optionsEl.children;
  for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("selected");
  }
  options[index].classList.add("selected");
  nextBtn.disabled = false;
}

function updateNavButtons() {
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finish" : "Next";
}

prevBtn.addEventListener("click", () => {
  currentQuestion--;
  loadQuestion();
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
  } else {
      showResult();
  }
});

function showResult() {
  score = userAnswers.filter((answer, index) => answer === quizData[index].correct).length;
  resultEl.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your score: ${score} out of ${quizData.length}</p>
      <button onclick="location.reload()">Restart Quiz</button>
  `;
  document.getElementById("quiz").style.display = "none";
  resultEl.style.display = "block";
}

loadQuestion();
