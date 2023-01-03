import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

const Post = ({mypost, remove}) => {

    const [mypostState, setMyPostState] = useState(mypost);


    const {image, title, regDate} = mypostState;

    //삭제 이벤트 핸들러
    const removeHandler = e => {
        // console.log(mypost);
        remove(mypost);
    };

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
            <CardActions>
                <Button size="small">수정</Button>
                <Button size="small" onClick={removeHandler}>삭제</Button>
            </CardActions>
    </Card>
    );
};

export default Post;