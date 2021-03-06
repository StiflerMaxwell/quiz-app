import React, {useState, useEffect} from 'react';
import QuestionCard from './components/QuestionCard';
import {FetchQuizData, QuestionState} from  './API';
import {Difficulty} from './API';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {

  question : string,
  answer : string,
  correct : boolean,
  correct_answer: string

}






function App() {

 
 const[loading,setLoading ] = useState(false);
 const[questions,setQuestions] = useState<QuestionState[]>([]);
 const[number, setNumber] = useState(0);
 const[userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
 const[score,setScore] = useState(0);
 const[gameOver,setGameOver] = useState(true);

 useEffect(() => {
  console.log(score);
});

 console.log(FetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY ));

  const stratTrivia = async () =>
  {
      setLoading(true);
      setGameOver(false);
 
      const newQuestions = await FetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY );
 
      setQuestions(newQuestions);
      setScore(0);
      setNumber(0);
      setLoading(false);
 
     
  };


  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>
  {

      if(!gameOver) 
      {
        //users answer
        const answer = e.currentTarget.value;

        const correct = questions[number].correct_answer === answer;
            
        // Add score if answer is correct
        if (correct) setScore((prev) => prev + 1);

        const answerObject = {
          question : questions[number].question,
          answer,
          correct,
          correct_answer :  questions[number].correct_answer,
        }

        setUserAnswers((prev) =>[...prev,answerObject]);
      
      }
  } ;

  const nextQuestion = () =>
  {

    // move to the next question if it's not the last one

    const nextQuestion = number +1;
    if(nextQuestion === TOTAL_QUESTIONS)
    {
      setGameOver(true);

    }

    else
    {
      setNumber(nextQuestion);
    }


  };
 

  return (
    <>

    <GlobalStyle />
      <Wrapper>
     <h1>quiz app</h1> 
     {gameOver|| userAnswers.length === TOTAL_QUESTIONS ? (

    <button className="start" onClick={stratTrivia}>
    Start
    </button>
     )
     :null}
  
     {!gameOver ? <p className="score">Score: {score}</p> : null}
      {  loading ? <p>Loading questions...</p> : null}
      {!loading && !gameOver && 
      (
     <QuestionCard 
    questionNumber= {number +1}
    totalQuestions = {TOTAL_QUESTIONS} 
    question = {questions[number].question}
    answers = {questions[number].answers}
    userAnswer = {userAnswers ? userAnswers[number] : undefined}
    callback = {checkAnswer}
    /> ) }

    {!gameOver && !loading && userAnswers.length  === number +1 && number !== TOTAL_QUESTIONS -1 ?

    (
    <button className="next" onClick={nextQuestion}> 
    Next Question
    </button>

    ) :null
    } 
   
    </Wrapper> 
    </>
  );
}

export default App;
