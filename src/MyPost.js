
import React, { useEffect, useState } from "react";
import "./MyPost.css";

import { API_BASE_URL } from "./config/host-config";
import Post from "./components/Post";
import { List } from "@mui/material";
import { json } from "react-router-dom";
export const BASE_URL = API_BASE_URL + '/api/posts';

const MyPost = () => {
    //토큰 가져오기(임시)
    const ACCESS_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLri4nrhKTsnoQiLCJpc3MiOiJkYXRlX3NjaGVkdWxpbmcgYXBwIiwiaWF0IjoxNjcxNjg1NjM3LCJleHAiOjE2NzE3NzIwMzd9.M1w6mdoGZr54q7WHRUZtplbn5nkb-wYHm3hzgDkl5rDBzvtqnOAn2EjmJVoQ_5u_sG16DWFe1yIZwgiQA05oqw";
    
    const [mypostList, setMyPostList] = useState([]);

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

    const mypostItems = mypostList.map(mypost => <Post key={mypost.postId} mypost={mypost} remove={remove}/>)

    useEffect(() => {
        //사용자가 작성한 리뷰 목록 불러오기
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
        .then(json => setMyPostList(json.posts));
    },[ACCESS_TOKEN]);



    return (
        <div className="wrapper" style={{marginTop: 50}}>
            <div className="mypage">
                <button className="my myReviewPage">내 리뷰</button>
                <button className="my myLikePage">내 좋아요</button>
                <button className="my mySavePage">내 북마크</button>
            </div>
            <div className="myPosts">
                {mypostItems}
            </div>

        </div>
            
       
        
    );
};

export default MyPost;