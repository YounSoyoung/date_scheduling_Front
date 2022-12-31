import React, { useEffect, useState } from "react";
import "../css/PostDetail.css";
import { API_BASE_URL } from "../config/host-config";
import PostInMain from "../components/PostInMain";
import { useLocation } from "react-router-dom";

export const BASE_URL = API_BASE_URL + '/api/posts';

const PostDetail = () => {


    //카테고리 값
    const [category, setCategory] = useState({});
    const {area, address} = category;

    //리뷰 내용
    const [post, setPost] = useState({});
    const {title, userId, image, content, regDate} = post;

   const location = useLocation();

    
    useEffect(() => {
        //게시글 내용 불러오기
        // console.log(location.pathname);
        fetch(BASE_URL+`${location.pathname}`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}  
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log(json.category);
            setCategory(json.category);
            console.log(json.post);
            setPost(json.post);
        });
    },[location]);

    return(
            <>
                <div className="postCategory">
                    <h2 className="area">{area}</h2>
                    <h2 className="address">{address}</h2>
                </div>
                <h1 className="postTitle">{title}</h1>
                <div className="date">{userId} | {regDate}</div>
                <figure class="postImage">
                    <div class="placeImg">{image}</div>
                </figure>
                <section className="content">
                    {content}
                </section>
        </>            
    );
};


export default PostDetail;