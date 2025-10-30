import React from 'react';

const Question = ({question, questionData}) => {
    return (
            <p className="p-3 font-medium w-full text-center text-3xl ">{questionData}</p>
    );
};

export default Question