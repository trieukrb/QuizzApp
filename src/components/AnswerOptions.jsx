import React from 'react';

const AnswerOptions = ({options,handleAnswer, selectedOptionIndex}) => {
    return (
        <>
            {
                /* Hiển thị các lựa chọn */
                options.map((option, index) => (
                    <button className={`option ${selectedOptionIndex === index ? 'confirm' : ''} `}
                            key={index}
                            onClick={() => handleAnswer(option, index)}
                    >{option}</button>
                ))
            }
        </>
    );
};

export default AnswerOptions;