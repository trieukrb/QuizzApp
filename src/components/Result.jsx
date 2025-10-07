import React from 'react';
import {quizData} from './data.jsx'
const Result = ({score, question, correctarray,reset}) => {
  return (
     <>
         <div className='result__heading'>
             <button className='result_return-top' onClick={reset}>Làm lại</button>
             <h1 className='result__heading-title'>Kết quả</h1>
         </div>
        <p className='result_heading'> Tổng điểm của bạn là
            <span className='result result_score'>  {score} / {question}</span>
            {/*<span className='result'>/</span> */}
            {/*<span className='result result_question'>{question}</span> */}
        </p>
        {quizData.map((quiz, numques)  => (
            <div className='result_container' key={numques} >

                <div className='result_title'>Cau {numques+1}: {quiz.question}</div>
                {quiz.options.map((option, index) => (
                    <button
                        className={`result__option  
                            ${correctarray[numques] === index 
                            ? 
                            (quiz.options[correctarray[numques]] === quiz.answer ? 'correct_result' : 'incorrect_result') 
                            : quiz.answer === option ? 'correct_result': '' } `}
                        key={index}
                    >{option}</button>
                ))
                }
                {/*{*/}
                {/*    quiz.options[correctarray[numques]] === quiz.answer ?*/}
                {/*        (<p>Bạn đã trả lời đúng</p>) :*/}
                {/*        (<p>Bạn đã trả lời sai, đáp án đúng là {quiz.answer}</p> )*/}
                {/*}*/}
            </div>

        ) )}
         <button className='result_return' onClick={reset}>Làm lại</button>
    </>
  );
};

export default Result;