import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import {FetchQuizData, QuestionState} from  './API';
import {Difficulty} from './API';

const TOTAL_QUESTIONS = 10;


function App() {


 const[loading,setLoading ] = useState(false);
 const[questions,setQuestions] = useState<QuestionState[]>([]);
 const[number, setNumber] = useState(0);
 const[userAnswers,setUserAnswers] = useState([]);
 const[score,setScore] = useState(0);
 const[gameOver,setGameOver] = useState(true);


console.log(FetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY ));

  const stratTrivia = async () =>
  {

  };


  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>
  {

  } ;

  const nextQuestion = () =>
  {


  };
 

  return (
    <div className="App">
     <h1>quiz app</h1> 
     <button className="start" onClick={stratTrivia}>
       Start
     </button>

     <p className="score">Score: </p>
     <p>Loading questions</p>
    {/* <QuestionCard 
    questionNumber= {number +1}
    totalQuestions = {TOTAL_QUESTIONS} 
    question = {questions[number].question}
    answers = {questions[number].answers}
    userAnswer = {userAnswers ? userAnswers[number] : undefined}
    callback = {checkAnswer}
    /> */}
    <button className="next" onClick={nextQuestion}> 
    Next Question
    </button>

    </div>
  );
}

export default App;
