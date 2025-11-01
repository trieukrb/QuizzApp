import React from 'react';

const AnswerOptions = ({options,handleAnswer, selectedOptionIndex}) => {
    return (
        <div className="flex flex-col gap-3">
            {
                /* Hiển thị các lựa chọn */
                options.map((option, index) => (
                    <button className={`option outline-none ${selectedOptionIndex === index ? 'option-confirm' : 'hover:bg-sky-100/30 transition duration-500 hover:scale-101'} `}
                            key={index}
                            onClick={() => handleAnswer(option, index)}
                    >{option}</button>
                ))
            }
        </div>

    );
};

export default AnswerOptions;