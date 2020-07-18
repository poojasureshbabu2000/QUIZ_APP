const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'CONGRATS!!'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which is used for styling?',
    answers: [
      { text: 'CSS', correct: true },
      { text: 'JAVA', correct: false }
    ]
  },
  {
    question: 'Which among this is the latest version og HTML?',
    answers: [
      { text: 'HTML', correct: false },
      { text: 'HTML5', correct: true },
      { text: 'JAVASCRIPT', correct: false },
      { text: 'BOOTSTRAP', correct: false }
    ]
  },
  {
    question: 'Expand CORS',
    answers: [
      { text: 'Correct Origin Resource Sharing', correct: false },
      { text: 'Cross Origin Resource Sharing', correct: true },
      { text: 'Correct Over Resource Sharing', correct: false },
      { text: 'Cross Over Rate Sharing', correct: false }
    ]
  },
  {
    question: 'Which of the following is code editor?',
    answers: [
      { text: 'Eclipse', correct: false },
      { text: 'VSCode', correct: true }
    ]
  }
]