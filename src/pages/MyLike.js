import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "../config/host-config";
import "../MyPost.css";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

export const BASE_URL = API_BASE_URL + '/api/posts';

const MyLike = () => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    const [mylikeList, setMyLikeList] = useState([]);
    const [mylikeCnt, setMyLikeCnt] = useState(0);


    const removeMyLike = target => {
        fetch(BASE_URL+`/mylike/${target.postId}`,{
            method: 'DELETE',
            headers:{
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(json => {
            setMyLikeList(json.posts);
        })

    };


    const myLikeItems = mylikeList.map(mylike => 
        <Card sx={{ width: 242 }} style={{marginRight: 45}}>
            <CardMedia
                sx={{ height: 140 }}
                image={mylike.image} //나중에 사진이 들어간다
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {mylike.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {mylike.regDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={removeMyLike}>삭제</Button>
            </CardActions>
        </Card>
        )


    

    useEffect(() => {
        //사용자가 좋아요한 리뷰 목록 불러오기
        console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);
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
    },[ACCESS_TOKEN]);


    const noLoginPage = (
        <div className="noLike">
        <div>로그인이 필요한 페이지입니다</div>
        <Link to='/login'>
            <button className="newPostBtn">로그인</button>
        </Link>
    </div>
    );


    const noLikePage = (
        <div className="noLike">
            <div>좋아요한 리뷰가 없습니다</div>
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
            {mylikeCnt ? existPostPage : noLikePage}
        </>
    );
};

export default MyLike;