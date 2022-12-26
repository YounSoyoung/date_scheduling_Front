import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import PostDetail from "../pages/PostDetail";

const PostInMain = ({post, getTargetId}) => {


    const [postState, setPostList] = useState(post);
    // const [targetId, setTargetId] = useState('');

    const {postId, image, title, regDate} = postState;

    const movePageHandler = e => {
        console.log(post.postId);
        // setPostList({...postState, postId: post.postId})
        // getTargetId(postId);

        getTargetId(post);
        window.location.href='/post';
        
    };



    return (
        <Card sx={{ maxWidth: 345 }} style={{marginRight: 45}}>
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
    </Card>
    );
};

export default PostInMain;