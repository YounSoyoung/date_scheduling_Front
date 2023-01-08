import React, { useEffect, useState } from "react";
import {TextField, Paper, Button, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider} from "@mui/material";
import '../css/OneComment.css';
import { API_BASE_URL } from "../config/host-config";


const OneComment = ({commentItem, remove}) => {
    const [commentState, setCommenState] = useState(commentItem);

    const {commentid, postid, userid, content, regdate} = commentState;

    //프로필 사진 상태관리
    const [profile, setProfile] = useState(null);


    const USERNAME = localStorage.getItem('LOGIN_USERNAME');
    

    const [account, setAccout] = useState(false);

    const deleteCommentHandler = e => {
        remove(commentItem);
    };


    const deleteBtn = (
        <button className="deleteComment" onClick={deleteCommentHandler}>삭제</button>
    );


    useEffect(()=> {
        if(USERNAME == userid){
            console.log(userid);
            setAccout(true);
        }

        console.log('댓글: ', userid);

        const url = API_BASE_URL + `/auth/load-profile/${userid}`;

        //화면이 렌더링될 때 서버에서 프로필사진을 요청해서 가져옴
        fetch(url)
        .then(res =>{
            if(res.status === 200){
                console.log(res.blob);
                return res.blob();
            }  
            return setProfile(null);
        })
        .then(imageData =>{
            // 서버가 보낸 순수 이미지파일을 url형식으로 변환
            const imgUrl = window.URL.createObjectURL(imageData);
            setProfile(imgUrl);
            console.log(imgUrl);
        })    

    },[USERNAME]);


    return(
        <>
            <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src={profile ? profile : "/broken-image.jpg"} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={content}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {userid}
                            </Typography>
                             {'  |  ' + regdate}
                        </React.Fragment>
                    }
                    />
                    {account ? deleteBtn : <></>}
            </ListItem>
            <Divider variant="inset" component="li" />
        </>    
    );
};

export default OneComment;