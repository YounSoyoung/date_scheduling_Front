import React from "react";
import '../css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../img/logo.png";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
    return (
        <header position="fixed">
            <h1 className="logo">
                DATE SCHEDULING
            </h1>
            <a className="account" href="#">
                <FontAwesomeIcon icon={faUser} />
                <span className="nickname">닉네임</span>
            </a>
        </header>        
    );
};

export default Header;