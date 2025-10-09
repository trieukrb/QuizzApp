import React, {useState} from 'react';
import Quizz from "./Quizz.jsx";
import Login from "./Login.jsx";
import '../App.css'
import {Routes, Route,  Link} from "react-router-dom";

const Home = () => {
    // const [showquizz, setShowquizz] = useState(false)
    // const [showlogin, setShowlogin] = useState(false)
    // if(showquizz){
    //     return (
    //             <Quizz/>
    //     )
    // }
    // if (showlogin){
    //     return  (
    //         <Login/>
    //     )
    // }
    return (
        <div className='container'>
            <h1>Quizzlet</h1>
            <ul className='Home__menu'>
                {/*<li className='menu__option' onClick={() => setShowquizz(true)}>Play</li>*/}
                <li className='menu__option'>
                    <Link to='/quiz'>Play</Link>
                </li>
                {/*<li className='menu__option' onClick={() => setShowlogin(true)}>Quiz</li>*/}
                <li className='menu__option'>
                    <Link to='/login'>Login</Link>
                </li>
                <li className='menu__option'>Achieve</li>
                <li className='menu__option'>Setting</li>
            </ul>
            <Routes>
                <Route path='/quiz' element={<Quizz/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    );
};

export default Home;