import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

const PostInMain = ({post}) => {


    const [postState, setPostList] = useState(post);

    const {image, title, regDate} = postState;



    return (
        <Card sx={{ maxWidth: 345 }} style={{marginRight: 45}}>
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
    </Card>
    );
};

export default PostInMain;