import React from 'react'
import Question from './Components/Question'

function App() {
  const [quiz, setQuiz] = React.useState(generateQuiz()) 
  const [questions, setQuestions] = React.useState([])

  function generateQuiz() {
    return {
      step: 0, //0 no quiz, 1 quiz running, 2 show answers
      numCorrect: 0,
      numIncorrect: 0,
      grade: 0,
      answers: []
    }
  }

  const questionElements = questions.map((q, i) => {
    return (
      <Question 
        key={q.question_id}
        qNumber={q.question_id}
        question={q.question}
        correctAnswer={q.correct_answer}
        incorrectAnswers={q.incorrect_answers}
        chosenAnswer={q.chosen_answer}
        showAnswers={quiz.step === 2}

        setQuestions={setQuestions}
      />
    )
  })

  // React.useEffect(() => {
  //   console.log(`useEffect: questions = ${JSON.stringify(questions)}`)
  // },[questions])

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  React.useEffect(() => {
    async function getQuestions() {
        //a question returns as
        // {"category":"Science & Nature",
        // "type":"multiple",
        // "difficulty":"medium",
        // "question":"What is the colour of unoxidized blood?",
        // "correct_answer":"Red",
        // "incorrect_answers":["Blue","Purple","Green"]}
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const data = await res.json()
        const responseCode = JSON.stringify(data.response_code)
        const dataResults = data.results
        setQuestions(createQuestions(dataResults))

        //console.log(`getQuestions: data.results = ${JSON.stringify(dataResults)}`)
    }
    if (quiz.step === 0) {
      getQuestions()
    }
  }, [quiz.step])

  function createQuestions(data) {
    const newQuestions = []
    for (let i = 0; i < 5; i++) {
      newQuestions.push(generateNewQuestion(data, i))
    }
    console.log(`newQuestions = ${JSON.stringify(newQuestions)}`)
    return newQuestions
  }

  function generateNewQuestion(data, i) {
    return {
      question_id: i + 1,
      category: data[i].category,
      type: data[i].type,
      difficulty: data[i].difficulty,
      question: decodeHtml(data[i].question),
      correct_answer: decodeHtml(data[i].correct_answer),
      incorrect_answers: data[i].incorrect_answers.map(ans=>decodeHtml(ans)),
      chosen_answer: "" 
    }
  }

  function checkAnswers() {
    let correct = 0
    let incorrect = 0
    let calcGrade = 0
    const correctArray = []

    questions.forEach(question => {
      if (question.correct_answer === question.chosen_answer) {
        correct++
        correctArray.push("Correct")
      } 
      else {
        incorrect++
        correctArray.push("Incorrect")
      }
    })

    calcGrade = correct / (correct + incorrect)

    setQuiz(prevQuiz => {
      return {...prevQuiz, step: 2, numCorrect: correct, numIncorrect: incorrect, grade: calcGrade, answers: correctArray}
    })
    console.log(`checkAnswers: quiz = ${JSON.stringify(quiz)}`)
  }

  function startQuiz() {
    console.log("startQuiz")

    setQuiz(prevQuiz => {
      return {...prevQuiz, step: 1}
    })
  }

  function newQuiz() {
    setQuiz(generateQuiz())
  }

  return (
    <div className="App flex">
      {quiz.step === 0 && 
      <div className='start-screen flex'>
        <h1 className='title'>Quizzical</h1>
        <p className='welcome-message'>Probably should include some text about how to play the game here. Or maybe to have fun or something.</p>
        <button onClick={startQuiz} className='start-button button'>Start quiz</button>
      </div>}
      {quiz.step !== 0 && 
      <div className='quiz-screen flex'>
        {questionElements}
        {quiz.step === 1 &&
        <button onClick={checkAnswers} className='check-button button'>Check Answers</button>}
        {quiz.step === 2 &&
        <div className='footer flex'>
          <h3 className='grade'>{quiz.grade * 100} %</h3>
          <button onClick={newQuiz} className='new-game-button button'>New Game</button>
        </div>}
      </div>}
    </div>
  )
}

export default App
