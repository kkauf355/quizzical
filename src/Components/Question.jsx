import React from 'react'

function Question() {

    function handleChange(event) {
        console.log("handleRadioChange")
    }

    return (
        <section>
            <h2>Question 1</h2>
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