const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const timer = document.querySelector('#timer');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeLeft = 50;

const max_questions= 5;
const score_points = 100;


let questions = [

	{
		question: "How do you create a flexbox?",
		choice1: "display: flex;",
		choice2: "display: flexbox;",
		choice3: "display: box;",
		answer: 2,
	},
	{
		question: "Which is an example of a vendor prefix?",
		choice1: "#024e76",
		choice2: "::before",
		choice3: "-webkit-",
		answer: 3,
	},
	{
		question: "What is an example of a pseudo-element?",
		choice1: "::after",
		choice2: "::first-letter",
		choice3: "All of the above.",
		answer: 3,
	},
	{
		question: "What does the z-index property do?",
		choice1: "Changes the stacking order of elements.",
		choice2: "Changes the opacity of an element.",
		choice3: "Removes an element from the DOM.",
		answer: 1,
	},
	{
		question: "How would you console log the computer's RAM?",
		choice1: "console.log(computer.ram);",
		choice2: "console.log(computer(ram));",
		choice3: "console.log(computer->ram);",
		answer: 1,
	},
]
function startGame() {
	score = 0;
	questionCounter = 0;
	availableQuestions = [...questions];
	getNewQuestion()
}

function getNewQuestion() {
	if(availableQuestions.length === 0 || questionCounter > max_questions) {
		localStorage.setItem("mostRecentScore", score);

		return window.location.assign('/end.html')
	}
	questionCounter++
	progressText.innerText =`Question ${questionCounter} of ${max_questions}`;
	progressBarFull.style.width = `${(questionCounter * 20)}%`;

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	question.innerText = currentQuestion.question;
	console.log(questionsIndex);

	var timeInterval = setInterval(function(){
		if (timeLeft > 1) {
			timer.textContent = "Time: "+ timeLeft;
			timeLeft--;
		} else {
			timer.textContent = "";
			clearInterval(timeInterval);
			return window.location.assign('/end.html');
		}
	}, 1000);

	choices.forEach(choice => {
		const number = choice.dataset.number;
		choice.innerText = currentQuestion["choice" + number]
	});
	availableQuestions.splice(questionsIndex, 1);
	acceptingAnswers = true;
}

choices.forEach(choice => {
	choice.addEventListener("click", e => {
		if(!acceptingAnswers) return

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if(classToApply === 'correct') {
			incrementScore(score_points)
		}
		selectedChoice.parentElement.classList.add(classToApply)

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000)
	})
})

incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}
startGame();
