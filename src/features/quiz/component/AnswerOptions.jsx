import React, {useEffect, useRef} from 'react';
import hoverSound from '../../../assets/sound/sharp-pop-328170.mp3'; // <-- THÊM DÒNG NÀY

const AnswerOptions = ({options,handleAnswer, selectedOptionIndex}) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.05;
        }
    }, []);
    const playHoverSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                console.error("Lỗi phát âm thanh:", error);
            });
        }
    };
    return (
        <div className="flex flex-col gap-3">
                {
                    /* Hiển thị các lựa chọn */
                    options.map((option, index) => (
                        <button className={`option outline-none ${selectedOptionIndex === index ? 'option-confirm' : 'hover:bg-sky-100/30 transition duration-500 hover:scale-101'} `}
                                key={index}
                                onClick={() => handleAnswer(option, index)}
                                onMouseEnter={playHoverSound}
                        >{option}</button>
                    ))
                }
                <audio ref={audioRef}
                          src={hoverSound}
                          preload="auto"/>
        </div>

    );
};

export default AnswerOptions;