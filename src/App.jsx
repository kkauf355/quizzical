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
    getQuestions()
  }, [])

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

  return (
    <div className="App">
      <div className='start-screen'>
        {quiz.step === 0 && <button onClick={startQuiz}>Start quiz</button>}
      </div>
      {quiz.step !== 0 && <div className='quiz-screen'>
        {questionElements}
        {quiz.step === 2 && <h3 className='grade'>{quiz.grade * 100} %</h3>}
        <button onClick={checkAnswers}>Check Answers</button>
      </div>}
    </div>
  )
}

export default App
