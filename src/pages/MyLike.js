import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "../config/host-config";
import "../MyPost.css";
import { Link } from "react-router-dom";
import PostInMyLike from "../components/PostInMyLike";

export const BASE_URL = API_BASE_URL + '/api/posts';

const MyLike = () => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    const [mylikeList, setMyLikeList] = useState([]);
    const [mylikeCnt, setMyLikeCnt] = useState(0);


    const remove = target => {
        console.log(target.postId);
        fetch(BASE_URL+`/mylike/${target.postId}`,{
            method: 'DELETE',
            headers:{
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(json => {
            setMyLikeCnt(json.count);
            setMyLikeList(json.posts);
        })

    };

    

    const myLikeItems = mylikeList.map(mylike => <PostInMyLike key={mylike.postId} mylike={mylike} remove={remove}/>)

    

    useEffect(() => {
        //사용자가 좋아요한 리뷰 목록 불러오기
        if(ACCESS_TOKEN !== null){
            fetch(BASE_URL+'/mylike', {
                method:'GET',
                headers:{
                    'Authorization' : 'Bearer ' + ACCESS_TOKEN
                }
            })
            .then(res => {
                console.log(res.status);
                if(res.status === 403) {
                    setTimeout(() => {
                        alert('로그인이 필요한 서비스입니다');
                        window.location.href='/login';
                    }, 1000)
                    return;
                }else {
                    return res.json();
                }
            })
            .then(json => {
                setMyLikeCnt(json.count);
                setMyLikeList(json.posts);
            });
        }
    },[ACCESS_TOKEN]);


    const noLoginPage = (
        <div className="noLogin">
            <div style={{fontSize: 20}}>로그인이 필요한 페이지입니다</div>
            <Link to='/login'>
                <button className="newPostBtn">로그인</button>
            </Link>
        </div>
    );


    const noLikePage = (
        <div className="noLike">
            <div style={{fontSize: 20}}>좋아요한 리뷰가 없습니다</div>
            <Link to='/'>
                <button className="newPostBtn">리뷰 보러가기</button>
            </Link>
        </div>
    );

    const existPostPage =(
        <>
            <div className="myLikes">
                {myLikeItems}
            </div>
        </>
    );



    return (
        <>
            {(!ACCESS_TOKEN) ? noLoginPage : mylikeCnt ? existPostPage : noLikePage}
        </>
    );
};

export default MyLike;