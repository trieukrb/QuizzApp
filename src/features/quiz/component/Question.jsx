import React from 'react';

const Question = ({question, questionData}) => {
    return (
            <p className="p-3 font-bold w-full">Question {question}: {questionData}</p>
    );
};

export default Question