import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizMarker from './pages/quizMarker/QuizMarker';
import QuizResults from './pages/quizResults/QuizResults';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizMarker />} />
        <Route path="/results" element={<QuizResults />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
