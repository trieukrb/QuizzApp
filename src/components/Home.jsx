import React, {useState} from 'react';
import Quizz from "./Quizz.jsx";
import '../App.css'
const Home = () => {
    const [showquizz, setShowquizz] = useState(false)

    if(showquizz){
        return (
                <Quizz/>
        )
    }
    return (
        <div className='container'>
            <h1>Quizzlet</h1>
            <ul className='Home__menu'>
                <li className='menu__option' onClick={() => setShowquizz(true)}>Play</li>
                <li className='menu__option'>Import Quiz</li>
                <li className='menu__option'>Achieve</li>
                <li className='menu__option'>Setting</li>
            </ul>
        </div>
    );
};

export default Home;