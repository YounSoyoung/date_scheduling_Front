import React, { useEffect, useState } from "react";
import "../css/PostDetail.css";
import { API_BASE_URL } from "../config/host-config";
import PostInMain from "../components/PostInMain";

export const BASE_URL = API_BASE_URL + '/api/posts';

const PostDetail = ({targetId}) => {

    let postId = targetId;

    //카테고리 값
    const [category, setCategory] = useState({});
    const {area, address} = category;

    //리뷰 내용
    const [post, setPost] = useState({});
    const {title, userId, image, content, regDate} = post;

    // const [postId, setPostId] = useState('');
   

    // const a = target => {
    //     let postId = target.postId;
    // };

    // <PostInMain key={post.postId} a={a}></PostInMain>

    
    //실제로는 Post 하나가 클릭이 되었을 때 페이지가 이동이 되고 정보를 불러와야한다
    //remove, add 함수 참고하기
    //버튼이 눌렀을 때 만들어놓은 함수에 선택된 Post의 ID를 전달하여 여기서 fetch
    useEffect(() => {
        //게시글 내용 불러오기
        fetch(BASE_URL+`/post/${postId}`, {
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
    },[postId]);

    return(
            <>
                <div className="category">
                    <h2 className="area">{area}</h2>
                    <h2 className="address">{address}</h2>
                </div>
                <h1 className="title">{title}</h1>
                <div className="date">{userId} | {regDate}</div>
                <figure class="image">
                    <div class="placeImg">{image}</div>
                </figure>
                <section className="content">
                    {content}
                </section>
        </>            
    );
};


export default PostDetail;