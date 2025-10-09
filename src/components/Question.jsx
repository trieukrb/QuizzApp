import React from 'react';

const Question = ({question, questionData}) => {
    return (
        <>
            <p className="quizz__content">Question {question}: {questionData}</p>
        </>
    );
};

export default Question;