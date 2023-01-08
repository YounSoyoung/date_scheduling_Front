import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { API_BASE_URL } from "../config/host-config";

const PostInMyLike = ({mylike, remove}) => {
    //프로필 사진 상태관리
    const [postImg, setPostImg] = useState(null);

    const [mylikeState, setMyLikeState] = useState(mylike);
    const {postId, image, title, regDate} = mylikeState;

    const removeMyLike = e => {
        console.log(mylike);
        remove(mylike);
    };

    const movePageHandler = e => {
        console.log(mylike);

        window.location.href=`/${postId}`;
        
    };

    useEffect(()=>{
        let savedDate = mylikeState.regDate;
        let postDate = savedDate.substring(0, 10);
        setMyLikeState({...mylikeState, regDate: postDate});

        // //요청 URL
        const url = API_BASE_URL + `/api/posts/load-postimg/${postId}`;

        //액세스 토큰
        const token = localStorage.getItem('ACCESS_TOKEN');

        //화면이 렌더링될 때 서버에서 사진을 요청하여 가져옴
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if(res.status === 200){
                return res.blob();
            }
            return setPostImg(null);
        })
        .then(imageData => {
            //서버가 보낸 순수 이미지 파일을 URL 형식으로 변환
            const imgUrl = window.URL.createObjectURL(imageData);
            setPostImg(imgUrl);
        })
    },[])


    return (
        <Card sx={{ width: 240 }} style={{marginRight: 45}}>
            <CardMedia
                sx={{ height: 140 }}
                image={postImg} //나중에 사진이 들어간다
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" onClick={movePageHandler}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {regDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={removeMyLike}>삭제</Button>
            </CardActions>
        </Card>
    );
};

export default PostInMyLike;