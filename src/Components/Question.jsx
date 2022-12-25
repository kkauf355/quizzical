import React from 'react'

function Question(props) {
    const [allAnswers, setAllAnswers] = React.useState([...props.incorrectAnswers, props.correctAnswer])
    //console.log("allAnswers " + allAnswers)
    //console.log(`props = ${JSON.stringify(props)}`)

    const radioElements = allAnswers.map((ans, i)=>{
        let classList = "radio-button"
        if (!props.showAnswers) {
            if (ans === props.chosenAnswer) {
                classList += " radio-blue"
            }
        }
        if (props.showAnswers) { //quiz.step === 2
            if (ans === props.correctAnswer) {  //answer is the correct answer
                classList += " radio-green"
            }
            if (ans === props.chosenAnswer && props.chosenAnswer !== props.correctAnswer) { //checked and answer is incorrect
                classList += " radio-red"
            }
        }

        return (
            <label
                className={classList}
            >
                <input 
                    //id={props.qNumber}
                    type="radio" 
                    name={`answer${props.qNumber}`}
                    value={ans}
                    checked={ans === props.chosenAnswer}
                    className="form-answer-input"
                    onChange={handleChange}
                />
                {ans}
            </label>
        )
    })

    function handleChange(event) {
        const {value} = event.target
        console.log(event.target)
        props.setQuestions(prevQuestions => prevQuestions.map((quest, i)=>{
            console.log(`props.qNumber = ${props.qNumber}, value = ${value}, chosenAnswer = ${props.chosenAnswer}`)
            return props.qNumber === i + 1 ? {...quest, chosen_answer: value} : quest
        }))
        
    }

    return (
        <section className='question-block'>
            <h2 className='question'>{props.question}</h2>
            <div className='answer-section flex'>
                {radioElements} 
            </div>
        </section>
    )
}

export default Question