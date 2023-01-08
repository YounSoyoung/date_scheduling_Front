import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { API_BASE_URL } from "../config/host-config";

const Post = ({mypost, remove}) => {
    //프로필 사진 상태관리
    const [postImg, setPostImg] = useState(null);

    const [mypostState, setMyPostState] = useState(mypost);


    const {postId, image, title, regDate} = mypostState;

    const movePageHandler = e => {
        console.log(mypost);

        window.location.href=`/${postId}`;
        
    };

    //수정 이벤트 핸들러
    const modifyHandler = e => {
        console.log(mypost);
        window.location.href=`/mypost/${postId}`;
    };

    //삭제 이벤트 핸들러
    const removeHandler = e => {
        // console.log(mypost);
        remove(mypost);
    };

    useEffect(()=>{
        let savedDate = mypostState.regDate;
        let postDate = savedDate.substring(0, 10);
        setMyPostState({...mypostState, regDate: postDate});

       

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
                component="img"
                sx={{ height: 140 }}
                image={postImg}
                //나중에 사진이 들어간다
            >
                {/* <img src={postImg} art="게시글사진"/> */}
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" onClick={movePageHandler}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {regDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={modifyHandler}>수정</Button>
                <Button size="small" onClick={removeHandler}>삭제</Button>
            </CardActions>
    </Card>
    );
};

export default Post;