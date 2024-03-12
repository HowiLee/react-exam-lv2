import React from "react";
import { Link } from "react-router-dom";
import './QuizMarker.css';
import { getCategory, getQuestions } from "../../services/quiz.services";

function QuizMarker() {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [answerSelected, setAnswerSelected] = React.useState(answerDefault);
  const [answerSuccess, setAnswerSuccess] = React.useState(answerDefault);

  React.useEffect(() => {
    getCategory()
      .then((response) => response.json())
      .then((data) => setCategories(data["trivia_categories"] || []));
  }, []);

  const handleCreactQuiz = () => {
    setQuestions([]);
    setAnswerSelected(answerDefault);
    getQuestions(category, difficulty)
      .then((response) => response.json())
      .then((data) => {
        const results = data["results" || []];
        const answerSuccessIdx = [];
        if (results.length > 0) {
          results.forEach((item) => {
            item.answers = [...item.incorrect_answers];
            const pos = (item.answers.length + 1) * Math.random() | 0;
            item.answers.splice(pos, 0, item.correct_answer);
            answerSuccessIdx.push(pos);
          });
          setAnswerSuccess(answerSuccessIdx);
        }
        setQuestions(results);
      });
  };
  const isDisplaySubmit = React.useMemo(() => {
    if(answerSelected.some((e)=> e < 0)) {
      return false;
    }
    return true;
  }, [answerSelected]);

  return (
    <div className="quiz">
      <h1>Quiz Marker</h1>
      <div className="selectArea">
        <select
          id="categorySelect"
          className="form-select m-1 quizSelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
        <select
          id="difficultySelect"
          className="form-select m-1 quizSelect"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button id="createBtn" className="btn btn btn-outline-dark" type="button" onClick={handleCreactQuiz}>
          Create
        </button>
      </div>
      { questions?.length > 0 ?
        questions.map((item, i) => 
          <div key={i} className="questionsArea m-3">
            <span>{item.question}</span>
            <div>
              {item.answers.map((answer, idx) => (
                <button key={'answer'+idx} className={`btn btn btn-outline-success mt-3 ${answerSelected[i] === idx ? "btnSelected" : "btnUnSelected"}`} type="button"
                  onClick={()=>{
                    const ans = [...answerSelected];
                    ans[i] = idx;
                    setAnswerSelected(ans);
                  }}
                >{answer}</button>)
              )}
            </div>
          </div>
        )
        : <></>
      }
      { isDisplaySubmit && 
        <Link to="/results" state={{data: questions, answerSuccess, answerSelected}}> 
          <button id="btnSubmit" type="button" className="btn btn-secondary">Submit</button>
        </Link>
      }
    </div>
  );
}
export default QuizMarker;

const answerDefault = [-1, -1, -1, -1, -1];