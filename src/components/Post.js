import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

const Post = ({mypost, remove}) => {

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
        setMyPostState({...mypostState, regDate: postDate})
    },[])

    return (
        <Card sx={{ width: 240 }} style={{marginRight: 45}}>
            <CardMedia
                sx={{ height: 140 }}
                image={image} //나중에 사진이 들어간다
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
                <Button size="small" onClick={modifyHandler}>수정</Button>
                <Button size="small" onClick={removeHandler}>삭제</Button>
            </CardActions>
    </Card>
    );
};

export default Post;