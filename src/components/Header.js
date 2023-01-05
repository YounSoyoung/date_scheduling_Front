import React from "react";
import '../css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../img/logo.png";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {AppBar, Toolbar, Grid, Typography, Button} from "@mui/material";
import { Link } from 'react-router-dom';

const Header = () => {

    const USERNAME = localStorage.getItem('LOGIN_USERNAME');
    const logoutHandler = e =>{
        //로컬스토리지 데이터 제거
        localStorage.removeItem('LOGIN_USERNAME');
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
    }
    const button = USERNAME 
    ?
    <>
    <span>반갑습니다 {USERNAME}님!</span>
    <Button color="inherit" onClick={logoutHandler}>로그아웃</Button>
    </>
    :(
        <>
        <Link to = '/login' style = {{color : '#fff', marginRight : 20, textDecoration : 'none'}}>{USERNAME}</Link>
        <Link to = '/join' style = {{color : '#000', textDecoration : 'none'}}>회원가입</Link>
        </>
    )
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
            <Button color="inherit">
                {button}                
            </Button>   
                <span className ="menu-open" onClick={menuOpenHandler}>menu</span>
            </div>
            <nav className="gnb">
                <a href="#" className="closes" >
                    <span className="close" onClick={menuCloseHandler}>닫기</span>
                </a>
                <ul>
                    <li><a href="/mypost">마이페이지</a></li>
                    <li><a href="/mylike">좋아요 목록</a></li>
                    <li><a href="/mybookmark">북마크한 목록</a></li>
                    <li><a href="/modify">개인정보 바꾸기</a></li>
                    
                </ul>
        </nav>
        </header>            
    );
};

export default Header;