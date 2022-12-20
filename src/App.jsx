import React from 'react'
import Question from './Components/Question'

function App() {
  const [quizState, setQuizState] = React.useState(0) //0 no quiz, 1 quiz running, 2 show answers
  const [answers, setAnswers] = React.useState([])
  const [answerKey, setAnswerKey] = React.useState([])

  React.useEffect(() => {
    async function getQuestions() {
        const res = await fetch("https://opentdb.com/api.php?amount=10")
        const data = await res.json()
        const apiResponse = JSON.stringify(data.response_code)
        const stringData = JSON.stringify(data.results)
        //setAllMemes(data.data.memes)

        console.log(`getQuestions: data.response_code = ${apiResponse}, data.results = ${stringData}`)
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
        <Question />
        <button onClick={checkAnswers}>Check Answers</button>
      </div>}
    </div>
  )
}

export default App
