import React from 'react'
import Question from './Components/Question'

function App() {
  const [quizState, setQuizState] = React.useState(0) //0 no quiz, 1 quiz running, 2 show answers
  const [answers, setAnswers] = React.useState([])
  const [questions, setQuestions] = React.useState([])

  const questionElements = questions.map((q, i) => {
    console.log(`q = ${q} :: what is q's type? ${typeof q}`)
    return (
      <Question 
        key={i}
        question={q.question}
        correctAnswer={q.correct_answer}
        incorrectAnswer={q.incorrect_answer}
      />
    )
  })

  React.useEffect(() => {
    async function getQuestions() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const data = await res.json()
        const responseCode = JSON.stringify(data.response_code)
        const dataResults = data.results
        setQuestions(dataResults)

        //console.log(`getQuestions: type of data.results = ${typeof dataResults}, data.results = ${dataResults}`)
    }
    getQuestions()
  }, [])

  function checkAnswers() {

  }

  function startQuiz() {
    console.log("startQuiz")
    setQuizState(1)
  }

  return (
    <div className="App">
      <div className='start-screen'>
        <button onClick={startQuiz}>Start quiz</button>
      </div>
      {quizState !== 0 && <div className='quiz-screen'>
        {questionElements}
        <button onClick={checkAnswers}>Check Answers</button>
      </div>}
    </div>
  )
}

export default App
