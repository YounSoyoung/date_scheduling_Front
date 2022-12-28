import React from "react";
import '../css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../img/logo.png";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Header = () => {

    const menuOpenHandler = e => {
        const $gnb = document.querySelector('.gnb');
        $gnb.style.right = '0';
    };
    
    const menuCloseHandler = e => {
        const $gnb = document.querySelector('.gnb');
        $gnb.style.right = '-100%';
    }

    const changePageHandler = e => {
        window.location.href='/';
    }

    return (  
        <header position="fixed">
            <h1 className="logo" onClick={changePageHandler}>
                DATE SCHEDULING
            </h1>
            <div className ="leftmenu">
                <a className="account" href="#">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="nickname">닉네임</span>
                </a>    
                <span className ="menu-open" onClick={menuOpenHandler}>menu</span>
            </div>
            <nav className="gnb">
                <a href="#" className="closes" >
                    <span className="close" onClick={menuCloseHandler}>닫기</span>
                </a>
                <ul>
                    <li><a href="/mypost">마이페이지</a></li>
                    <li><a href="/mylike">좋아요 목록</a></li>
                    <li><a href="#">북마크한 목록</a></li>
                    <li><a href="#">설정</a></li>
                    
                </ul>
        </nav>
        </header>            
    );
};

export default Header;