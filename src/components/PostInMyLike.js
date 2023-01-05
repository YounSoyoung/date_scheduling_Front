import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

const PostInMyLike = ({mylike, remove}) => {
    const [mylikeState, setMyLikeState] = useState(mylike);
    const {postId, image, title, regDate} = mylikeState;

    const removeMyLike = e => {
        console.log(mylike);
        remove(mylike);
    };

    useEffect(()=>{
        let savedDate = mylikeState.regDate;
        let postDate = savedDate.substring(0, 10);
        setMyLikeState({...mylikeState, regDate: postDate})
    },[])


    return (
        <Card sx={{ width: 240 }} style={{marginRight: 45}}>
            <CardMedia
                sx={{ height: 140 }}
                image={image} //나중에 사진이 들어간다
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
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