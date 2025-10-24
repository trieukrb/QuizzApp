import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import useUserStore from "../stores/userStore.js";
import Header from "./components/Header.jsx"
import Section from "./components/Section.jsx";

const Layout = () => {
    const userName = useUserStore(state => state.userName)
    const [nomarlinfo, setNomarlinfo] = useState(true)
    const shownavinfo = () => {
        setNomarlinfo(!nomarlinfo)
    }
    return (
        <>
            <Header
                shownavinfo={shownavinfo}
            />
            <Section
                nomarlinfo={nomarlinfo}
            />

        </>
    );
};

export default Layout;