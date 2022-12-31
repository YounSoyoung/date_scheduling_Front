import { fontWeight } from "@mui/system";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import './css/MyPageLayout.css';

const MyPageLayout = () => {

    const mypageLocation = useLocation();

    const activeChange = e => {
        console.log('링크 클릭!: ', e.target);

        const $myPage = document.querySelector('.mypage');
        for (let $link of [...$myPage.children]) {
            if($link.classList.contains('active')) {
                $link.classList.remove('active');
            }
        }
        e.target.classList.add('active');

    };

    useEffect(() => {
        let pageLocation = mypageLocation.pathname;
        let pageId = pageLocation.substring(1);
        console.log(pageId);
    
        const $myPage = document.querySelector('.mypage');
        for (let $link of [...$myPage.children]) {
            if($link.id == pageId) {
                $link.classList.add('active');
            }
        }
    });
 

    return(
        <div className="wrapper" style={{marginTop: 50}}>
            <div className="mypage" onClick={activeChange}>
                <Link id="mypost" to='/mypost'>내 리뷰</Link>
                <Link id="mylike" to='/mylike'>내 좋아요</Link>
                <Link id="mybookmark" to='/mybookmark'>내 북마크</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyPageLayout;