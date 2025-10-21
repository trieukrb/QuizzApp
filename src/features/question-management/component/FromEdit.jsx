import React from 'react';

const FromEdit = ({showfalse,
                  handleSubmitEditForm,
                  questiondata,optionsdata,
                  handleEditQuestionChange,
                  answerdata,
                  handleEditOptionChange,
                  handlestopPropagation
                }) => {
    return (
        <div className='form_edit' onClick={showfalse}>
            <form action="" className="form_edit_submit" onSubmit={handleSubmitEditForm} onClick={handlestopPropagation}>
                <div className='form__edit-header'>
                    <h1 className='edit-header-title'>Edit question</h1>
                    <p className='edit-header-icon' onClick={showfalse}>X</p>
                </div>
                <div className='question-edit'>
                    <label className='quesion-edit-label'>Edit Question</label>
                    <input type="text"
                           placeholder='question'
                           className='add-question-input'
                           name='question'
                           required
                           value={questiondata}
                           onChange={handleEditQuestionChange}
                    />
                </div>
                {optionsdata.map((option, index) => (
                    <div key={index}>
                        <label className='quesion-edit-label'>Edit option {index + 1}</label>
                        <div className='input-answer input-answer1 '>
                            <input type="text"
                                   value={option}
                                   className='answer-input'
                                   required
                                   placeholder='edit option'
                                   onChange={handleEditOptionChange}
                            />
                            <input type="radio"
                                   name='answer'
                                   className='answer-radio-input'
                                   value={option}
                                   onChange={handleEditQuestionChange}
                                   checked={option === answerdata}
                            />
                        </div>
                    </div>

                ))
                }
                <div className="model__nav-add">
                    <button className="model__btn-add model__btn-add-quit"
                            onClick={showfalse}
                    >Quit</button>
                    <button className="model__btn-add model__btn-add-submit"
                            type='submit'
                    >Save</button>
                </div>
            </form>
        </div>
    );
};

export default FromEdit;