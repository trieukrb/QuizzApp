import React from 'react';

const AnswerOptions = ({options,handleAnswer, selectedOptionIndex}) => {
    return (
        <div className="flex flex-col gap-3">
            {
                /* Hiển thị các lựa chọn */
                options.map((option, index) => (
                    <button className={`option ${selectedOptionIndex === index ? 'option-confirm' : ''} `}
                            key={index}
                            onClick={() => handleAnswer(option, index)}
                    >{option}</button>
                ))
            }
        </div>

    );
};

export default AnswerOptions;