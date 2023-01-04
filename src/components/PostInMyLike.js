import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

const PostInMyLike = ({mylike, remove}) => {
    const [mylikeState, setMyLikeState] = useState(mylike);
    const {postId, image, title, regDate} = mylikeState;

    const removeMyLike = e => {
        console.log(mylike);
        remove(mylike);
    };



    return (
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
    );
};

export default PostInMyLike;