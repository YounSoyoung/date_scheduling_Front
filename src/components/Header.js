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
        window.location.href = '/';
    }
    const button = USERNAME 
    ?
    <>
    <span>반갑습니다 {USERNAME}님!</span>
    <Button color="inherit" onClick={logoutHandler}>로그아웃</Button>
    </>
    :(
        <>
        <Link to = '/login' style = {{color : '#fff', marginRight : 20, textDecoration : 'none', fontSize: 18}}>로그인</Link>
        <Link to = '/join' style = {{color : '#fff', textDecoration : 'none', fontSize: 18}}>회원가입</Link>
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
                <span className ="menu-open" onClick={menuOpenHandler}>MENU</span>
            </div>
            <nav className="gnb">
                <a href="#" className="closes" >
                    <span className="close" onClick={menuCloseHandler}>닫기</span>
                </a>
                <ul>
                    <li><a href="/mypost">내 리뷰</a></li>
                    <li><a href="/mylike">내 좋아요</a></li>
                    <li><a href="/mybookmark">내 북마크</a></li>
                    <li><a href="/mydatecourse">내 데이트 코스</a></li>
                    <li><a href="/modify">개인정보 수정</a></li>
                    
                </ul>
        </nav>
        </header>            
    );
};

export default Header;