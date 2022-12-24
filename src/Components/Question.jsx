import React from 'react'

function Question(props) {
    //console.log("incorrectAnswer " + JSON.stringify(props.incorrectAnswers)) //currently undefined
    //console.log("correctAnswer " + typeof props.correctAnswer)
    const [allAnswers, setAllAnswers] = React.useState([...props.incorrectAnswers, props.correctAnswer])
    //console.log("allAnswers " + allAnswers)
    //console.log(`props = ${JSON.stringify(props)}`)

    //i pulled this from online. it doesn't seem to work
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const radioElements = allAnswers.map((ans, i)=>{
        return (
            <label>
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
        <section>
            <h2>{props.question}</h2>
            <div className='answer-section'>
                {radioElements} 
            </div>
        </section>
    )
}

export default Question