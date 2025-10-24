import React, {useState} from 'react';
import {Link} from 'react-router-dom'
const Result = ({score, question, questions, correctarray,reset}) => {
  return (
     <div className='h-full bg-neutral-100 flex flex-col gap-10 justify-start items-center'>
        <div className="w-4/6 p-5 bg-neutral-50 mt-10 flex flex-col rounded-2xl shadow-lg gap-5 max-lg:mt-15 max-lg:w-full max-lg:mx-5">
            <div className='w-full flex flex-col items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-17">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                <h1 className="font-bold text-3xl">Quiz Completed</h1>
            </div>
            <div className="w-full flex justify-center gap-10">
                <div className="bg-blue-300/20 p-5 rounded-xl flex flex-col items-center gap-3 text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <span className="font-bold text-xl">{score} / {question}</span>
                    <p>Questions Correct</p>
                </div>
                <div className="bg-violet-300/20 p-5 rounded-xl flex flex-col items-center gap-3 text-violet-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <span className="font-bold text-xl">{Math.floor((score/question)*100)}%</span>
                    <p>Score Percentage</p>
                </div>
            </div>
            <div className="h-90 overflow-scroll">
                {questions.map((quiz, numques)  => (
                    <div className={`p-3 rounded-xl mb-5 correct_question ${quiz.options[correctarray[numques]] === quiz.answer ? 'correct_question': 'incorrect_question'}`} key={numques} >
                        <div className='font-medium mb-3'>Câu {numques+1}: {quiz.question}</div>
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
                    </div>
                ) )}
            </div>

            <Link to='/quiz-start'>
                <button className='bg-sky-400 w-full'>Quay lại Trang Chủ</button>
            </Link>
        </div>
     </div>
  );
};
export default Result;

// <button className='result_return-top' onClick={reset}>Làm lại</button>