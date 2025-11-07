import React from 'react';

const Question = ({question, questionData}) => {
    return (
                <p className="p-3 w-full font-medium text-center text-3xl rounded-2xl  ">{questionData}</p>
    );
};

export default Question