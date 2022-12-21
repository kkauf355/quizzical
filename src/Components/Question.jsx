import React from 'react'

function Question(props) {
    const allAnswers = props.incorrectAnswer.join(props.correctAnswer)

    function handleChange(event) {
        console.log("handleRadioChange")
    }

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

    return (
        <section>
            <h2>{props.question}</h2>
            <div className='answer-section'>
                <label>
                    <input 
                        type="radio" 
                        name="answer"
                        value="answer1"
                        checked={true}
                        className="form-answer-input"
                        onChange={handleChange}
                        />
                    answer1
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="answer"
                        value="answer1"
                        checked={false}
                        className="form-answer-input"
                        onChange={handleChange}
                        />
                    answer1
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="answer"
                        value="answer1"
                        checked={false}
                        className="form-answer-input"
                        onChange={handleChange}
                        />
                    answer1
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="answer"
                        value="answer1"
                        checked={false}
                        className="form-answer-input"
                        onChange={handleChange}
                        />
                    answer1
                </label>
            </div>
        </section>
    )
}

export default Question