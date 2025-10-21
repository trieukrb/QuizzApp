import React from 'react';

const FormAdd = ({showfalse,
                 handleSubmit,
                 handlestopPropagation,
                 inputAddRef,
                 setCorrectAnswerValue,
                 questionValue,
                 setQuestionValue,
                 correctAnswerValue,
                 answerValue1,
                 answerValue2,
                 answerValue3,
                 answerValue4,
                 setAnswerValue1,
                 setAnswerValue2,
                 setAnswerValue3,
                 setAnswerValue4,
                }) => {
    return (
        <div className='form_add' onClick={showfalse} >
            <form onSubmit={handleSubmit} className='form_edit_add' onClick={handlestopPropagation}>
                <div className='form__add-header'>
                    <h1 className='add-header-title'>Create question</h1>
                    <p className='add-header-icon' onClick={showfalse}>X</p>
                </div>
                {/*Add Question*/}
                <div className="question">
                    <label className='answer-label'>Question</label>
                    <input type="text" placeholder='Nhập câu hỏi'
                           className='question-input'
                           required
                           ref={inputAddRef}
                           value={questionValue}
                           onChange={setQuestionValue}
                    />
                </div>
                {/*Add Option*/}
                <div className="edit__answer">
                    <label className='answer-label'>Answer 1</label>
                    <div className='input-answer input-answer1 '>
                        <input type="text" placeholder='Nhập câu trả lời'
                               className='answer-input'
                               required
                               value={answerValue1}
                               onChange={setAnswerValue1}
                        />
                        <input type="radio"
                               name='option'
                               className='answer-radio-input'
                               value='1'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '1'}
                        />
                    </div>
                    <label className='answer-label'>Answer 2</label>
                    <div className='input-answer input-answer2 '>
                        <input type="text" placeholder='Nhập câu trả lời'
                               className='answer-input'
                               required
                               value={answerValue2}
                               onChange={setAnswerValue2}
                        />
                        <input type="radio"
                               name='option'
                               className='answer-radio-input'
                               value='2'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '2'}
                        />
                    </div>
                    <label className='answer-label'>Answer 3</label>
                    <div className='input-answer input-answer3 '>
                        <input type="text" placeholder='Nhập câu trả lời'
                               className='answer-input'
                               required
                               value={answerValue3}
                               onChange={setAnswerValue3}
                        />
                        <input type="radio"
                               name='option'
                               className='answer-radio-input'
                               value='3'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '3'}
                        />
                    </div>
                    <label className='answer-label'>Answer 4</label>
                    <div className='input-answer input-answer4'>
                        <input type="text" placeholder='Nhập câu trả lời'
                               className='answer-input'
                               required
                               value={answerValue4}
                               onChange={setAnswerValue4}
                        />
                        <input type="radio"
                               name='option'
                               className='answer-radio-input'
                               value='4'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '4'}
                        />
                    </div>
                </div>
                <div className='model__nav-add'>
                    <button onClick={showfalse} className='model__btn-add model__btn-add-quit'>Quit</button>
                    <button type='submit' className='model__btn-add model__btn-add-submit'>Add Question</button>
                </div>
            </form>
        </div>
    );
};

export default FormAdd;