
import React, { useEffect, useState } from "react";
import "./MyPost.css";

import { API_BASE_URL } from "./config/host-config";
import Post from "./components/Post";
import { List } from "@mui/material";
import { json, Link } from "react-router-dom";

export const BASE_URL = API_BASE_URL + '/api/posts';

const MyPost = () => {
    //토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    //프로필 사진 상태관리
    const [postImg, setPostImg] = useState(null);

    //사진 저장
    const [mypostList, setMyPostList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);

    //Post에게 보낼 삭제 함수
    //target: 내가 삭제할 리뷰, mypost: 배열에 저장된 사용자의 리뷰
    const remove = target => {
        fetch(BASE_URL+`/mypost/${target.postId}`,{
            method: 'DELETE',
            headers:{
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(json => {
            setMyPostList(json.posts);
        })

    };

    // const getPostImg = (postId) => {

    //     //요청 URL
    //     const url = API_BASE_URL + `/api/posts/load-postImg/${postId}`;

    //     //액세스 토큰

    //     //화면이 렌더링될 때 서버에서 사진을 요청하여 가져옴
    //     fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + ACCESS_TOKEN
    //         }
    //     })
    //     .then(res => {
    //         if(res.status === 200){
    //             return res.blob();
    //         }
    //         return setPostImg(null);
    //     })
    //     .then(imageData => {
    //         //서버가 보낸 순수 이미지 파일을 URL 형식으로 변환
    //         const imgUrl = window.URL.createObjectURL(imageData);
    //         setPostImg(imgUrl);
    //     })
    // };

    const mypostItems = mypostList.map(mypost => <Post key={mypost.postId} mypost={mypost} remove={remove} />)

    useEffect(() => {
        //사용자가 작성한 리뷰 목록 불러오기
        if(ACCESS_TOKEN !== null){
            fetch(BASE_URL+'/mypost', {
                method:'GET',
                headers:{
                    'Authorization' : 'Bearer ' + ACCESS_TOKEN
                }
            })
            .then(res => {
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
                setPostCnt(json.count);
                setMyPostList(json.posts);
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


    const noPostPage = (
        <div className="nopost">
            <div style={{fontSize: 20}}>등록된 리뷰가 없습니다</div>
            <Link to='/new'>
                <button className="newPostBtn">리뷰 작성하기</button>
            </Link>
        </div>
    );

    const existPostPage =(
        <>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'flex-end', marginTop:"15px"}}>
                <Link to='/new'>
                    <button className="newPostBtn">리뷰 작성하기</button>
                </Link>
            </div>
            <div className="myPosts">
                {mypostItems}
            </div>
        </>
    );

    
    return (
        <>
            {(!ACCESS_TOKEN) ? noLoginPage : postCnt ? existPostPage : noPostPage}
        </>
    );
};

export default MyPost;