
import React, { useEffect, useState } from "react";
import "./MyPost.css";

import { API_BASE_URL } from "./config/host-config";
import Post from "./components/Post";
import { List } from "@mui/material";
import { json, Link } from "react-router-dom";

export const BASE_URL = API_BASE_URL + '/api/posts';

const MyPost = () => {
    //토큰 가져오기(임시)
    const ACCESS_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLri4nrhKTsnoQiLCJpc3MiOiJkYXRlX3NjaGVkdWxpbmcgYXBwIiwiaWF0IjoxNjcxODA3NzQ2LCJleHAiOjE2NzE4OTQxNDZ9.b9fe-4i_FVsCG8MeiFjYK2FBjpwN4K16VVOS-UZq_slwlk05e0VD7fKv5nThAnQYkqfQtmLTgmWF6w8DDpfBSQ";
    
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
        .then(json => {
            setPostCnt(json.count);
            setMyPostList(json.posts);
        });
    },[ACCESS_TOKEN]);


    const noPostPage = (
        <div className="nopost">
            <div>등록된 리뷰가 없습니다</div>
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
            {postCnt ? existPostPage : noPostPage}
        </>
    );
};

export default MyPost;