import React from 'react';
import {Link, Outlet} from "react-router-dom";
import useUserStore from "../stores/userStore.js";
import AddQuestion from "./AddQuestion.jsx";


const Layout = () => {
    const userName = useUserStore(state => state.userName)
    return (
        <div className='container'>
            <h1>Quizlet {userName}</h1>
                <ul className='Home__menu'>
                    <Link to='/' className='option__link'><li className='menu__option'>Home</li></Link>
                    <Link to='/quiz' className='option__link'><li className='menu__option'>Play</li></Link>
                    <Link to='/login' className='option__link'><li className='menu__option'>Login</li></Link>
                    <Link to='/addquestion' className='option__link'><li className='menu__option'>AddQuestion</li></Link>
                </ul>
                <Outlet/>
        </div>
    );
};

export default Layout;