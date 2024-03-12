import React from "react";
import { Link, useLocation } from "react-router-dom";
import './QuizResults.css';

function QuizResults() {
  const { state } = useLocation();
  const scored  = React.useMemo(()=>{
    const answerSuccess = state.answerSuccess;
    const answerSelected = state.answerSelected;
    let count = 0;
    answerSuccess.forEach((e, i) => {
      if(e === answerSelected[i]){
        count++;
      }
    });
    return count;
  }, [state.answerSuccess, state.answerSelected]);
    return (
      <div className="quizResult">
        <h1>RESULTS</h1>
        {state.data.map((item, i) => <div key={i} className="questionsArea m-3">
            <span>{item.question}</span>
            <div>
              {item.answers.map((answer, idx) => (
                <span key={idx} className={`answer mt-3 ${state.answerSuccess[i] === idx || (state.answerSuccess[i] === idx && state.answerSelected[i] === idx) ? "answerCorrect" : state.answerSelected[i] === idx ? "answerFail" : ''}`}>{answer}</span>)
              )}
            </div>
        </div>
        )}
        <div>
          <span className={`notify ${scored < 2 ? 'stsDanger' : scored < 4 ? 'stsWarning': 'stsSucces'}`}>You scored {scored} out of 5</span>
        </div>
        <Link to="/"> 
          <button id="btnCreateQuiz" type="button" className="btn btn-secondary m-3">Create a new quiz</button>
        </Link>
      </div>
    );
  }
  export default QuizResults;
  