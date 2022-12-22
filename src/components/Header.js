import React from "react";
import '../css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../img/logo.png";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
    return (
        <header>
            <h1 className="logo">
                <img src={logo} alt="로고"/>
            </h1>
            <div className="account">
                <FontAwesomeIcon icon={faUser} />
                <span className="nickname">닉네임</span>
            </div>
        </header>        
    );
};

export default Header;