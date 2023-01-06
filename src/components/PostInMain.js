import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import PostDetail from "../pages/PostDetail";

const PostInMain = ({post}) => {


    const [postState, setPostState] = useState(post);
    // const [targetId, setTargetId] = useState('');

    const {postId, image, title, regDate} = postState;

    const movePageHandler = e => {
        console.log(post);
        
        window.location.href=`/${postId}`;
        
    };

    useEffect(()=>{
        let savedDate = postState.regDate;
        let postDate = savedDate.substring(0, 10);
        setPostState({...postState, regDate: postDate})
    },[])



    return (
        <Card sx={{ width:240 }} style={{marginLeft: 35, marginRight: 25, marginBottom: 20, marginTop: 20}}>
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