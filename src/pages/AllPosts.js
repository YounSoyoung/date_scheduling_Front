
import React, { useEffect, useState } from "react";
import "../css/AllPost.css";

import { API_BASE_URL } from "../config/host-config";
import PostInMain from "../components/PostInMain";
import { List } from "@mui/material";
import { json, Link } from "react-router-dom";

export const BASE_URL = API_BASE_URL + '/api/posts';

const AllPost = () => {
    //토큰 가져오기(임시)
    
    const [postList, setPostList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);

    //Post에게 보낼 삭제 함수
    //target: 내가 삭제할 리뷰, mypost: 배열에 저장된 사용자의 리뷰
    

    const postItems = postList.map(post => <PostInMain key={post.postId} post={post}/>)

    useEffect(() => {
        //사용자가 작성한 리뷰 목록 불러오기
        fetch(BASE_URL, {
            method: 'GET',
            headers: {'Content-type' : 'application/json' }
        })
        .then(res =>res.json())
        .then(json => {
            console.log(json);
            setPostCnt(json.count);
            setPostList(json.posts);
        });
    },[]);


    
    return (
        <div className="wrapper" style={{marginTop: 50}}>
    
            <div className="myPosts">
                {postItems}
            </div>

        </div>
        
    );
};

export default AllPost;