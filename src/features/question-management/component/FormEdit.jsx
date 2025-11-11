import React from 'react';

const FormEdit = ({showfalse,
                  handleSubmitEditForm,
                  questiondata,optionsdata,
                  handleEditQuestionChange,
                  answerdata,
                  handleEditOptionChange,
                  handlestopPropagation
                }) => {
    return (
        <div className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-500/30 flex justify-center items-center' onClick={showfalse}>
            <form action="" className="bg-n-50 p-5 rounded-xl  shadow-xl sm:min-w-100 md:min-w-120 lg:min-w-150 " onSubmit={handleSubmitEditForm} onClick={handlestopPropagation}>
                <div className='flex justify-between font-bold text-lg pb-1 mb-2 border-b-2 border-solid border-neutral-200'>
                    <h1 className='edit-header-title'>Edit question</h1>
                    <div className="cursor-pointer" onClick={showfalse}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='block mb-1 font-medium'>Edit Question</label>
                    <input type="text"
                           placeholder='question'
                           className='border-1 border-solid border-neutral-400 px-2 py-3 rounded-lg w-full placeholder:text-neutral-400/90 outline-none'
                           name='question'
                           required
                           value={questiondata}
                           onChange={handleEditQuestionChange}
                    />
                </div>
                {optionsdata.map((option, index) => (
                    <div key={index}>
                        <label className='font-medium block mb-1'>Edit option {index + 1}</label>
                        <div className={`w-full mb-2 flex justify-between border-2 border-solid  rounded-lg ${option === answerdata ? 'border-green-400 bg-green-100': 'border-neutral-300'}`}>
                            <input type="text"
                                   value={option}
                                   className={`w-full py-3 px-2 border-r-2 border-solid  placeholder:text-neutral-400/90 outline-none ${option === answerdata ? 'border-green-400' : 'border-neutral-300'}`}
                                   required
                                   placeholder='edit option'
                                   onChange={(e) => handleEditOptionChange(e, index)}
                            />
                            <input type="radio"
                                   name='answer'
                                   className='mx-3'
                                   value={option}
                                   onChange={handleEditQuestionChange}
                                   checked={option === answerdata}
                            />
                        </div>
                    </div>

                ))
                }
                <div className="flex justify-end gap-3 mt-8">
                    <button onClick={showfalse} className="bg-neutral-200 px-3 py-1 rounded-md hover:opacity-40 cursor-pointer">Quit</button>
                    <button type='submit' className="bg-blue-950 text-neutral-100 px-3 py-1 rounded-md hover:opacity-40 cursor-pointer">Save</button>
                </div>
            </form>
        </div>
    );
};

export default FormEdit;