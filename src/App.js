import { useState } from 'react'
import { spaceQuiz } from './quizzes/space';
import { Timer } from './components/Timer';
import './App.css';

//3 minutes per question
const TIME_PER_QUESTION = 1000 * 60 * 3

function App() {
  const [pageIndex, setPageIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const quiz = spaceQuiz

  const handleNext = (e) => {
    e.preventDefault()
    if (pageIndex < quiz.length - 1) {
      setPageIndex(prev => prev + 1)
    } else {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setPageIndex(0)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!submitted ?
          (<div className="form">
            <Timer
              initialTimeInMs={TIME_PER_QUESTION}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              setSubmitted={setSubmitted}
              numQuestions={quiz.length - 1}
            />
            <label>{quiz[pageIndex].question}</label>
            <input placeholder="Fill in your answer here" />
            <button onClick={handleNext}>Next</button>
          </div>) :
          (
            <div className="form">
              <label>Submitted!</label>
              <button onClick={handleReset}>Reset</button>
            </div>
          )
        }
      </header>
    </div>
  );
}

export default App;
