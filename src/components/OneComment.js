import React, { useEffect, useState } from "react";
import {TextField, Paper, Button, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider} from "@mui/material";
import '../css/OneComment.css';


const OneComment = ({commentItem, remove}) => {
    const [commentState, setCommenState] = useState(commentItem);

    const {commentid, postid, userid, content, regdate} = commentState;

    // const [idsState, setIdsState] = useState(postAndCommentid);
    // const {commentid, postid} = idsState;


    const USERNAME = localStorage.getItem('LOGIN_USERNAME');

    const [account, setAccout] = useState(false);

    const deleteCommentHandler = e => {
        console.log('삭제 버튼 클릭: ', commentItem);
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
    },[USERNAME])


    return(
        <>
            <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src="/broken-image.jpg" />
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