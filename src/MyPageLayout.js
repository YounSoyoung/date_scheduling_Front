import { fontWeight } from "@mui/system";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { NavLink, Outlet, Link } from "react-router-dom";
import './css/MyPageLayout.css';

const MyPageLayout = () => {

    const [btnStyle, setBtnStyle] = useState({
        mypost: false,
        mylike: false,
        mybookmark: false
    });

    //btnStyle = false면 defaultStyle
    //btenStyle = true면 activeStyle

        const activeStyle = {
            background: '#000',
            color: '#fff',
            fontWeight:'bold',

            marginRight: '15px',
            width: '170px',
            height: '50px',
            fontSize: '25px',
            borderRadius: '5px',
            border: '1px solid'
        };

        const defaultStyle = {
            background: '#fff',
            color:'#000',
            fontWeight: 'regular',
            marginRight: '15px',
            width: '150px',
            height: '40px',
            fontSize: '20px',
            borderRadius: '5px',
            border: '1px solid'
        };



    const moveMyPost = e => {
        e.preventDefault();
        setBtnStyle({mypost: true});
        window.location.href='/mypost';
    };

    const moveMyLike = e => {
        setBtnStyle({mylike: true});
        window.location.href='/mylike';
    };

    const moveMyBookMark = e => {
        setBtnStyle({mybookmark: true});
        window.location.href='/mybookmark';
    };

    const activeChange = e => {
        console.log('링크 클릭!: ', e.target);
        e.target.classList.add('active');
    };
 
    

    return(
        <div className="wrapper" style={{marginTop: 50}}>
            <div className="mypage" onClick={activeChange}>
                {/* <button id="mypost" onClick={moveMyPost} style={(btnStyle.mypost ? activeStyle : defaultStyle)}>내 리뷰</button> */}
                <Link id="mypost" to='/mypost'>내 리뷰</Link>
                {/* <button id="mylike" onClick={moveMyLike} style={(btnStyle.mylike ? activeStyle : defaultStyle)}>내 좋아요</button> */}
                <Link id="mylike" to='/mylike'>내 좋아요</Link>
                {/* <button id="mybookmark" onClick={moveMyBookMark} style={(btnStyle.mybookmark ? activeStyle : defaultStyle)}>내 북마크</button> */}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyPageLayout;