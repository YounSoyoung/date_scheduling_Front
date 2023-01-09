import {TextField, Paper, Button, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider} from "@mui/material";
import { API_BASE_URL } from "../config/host-config";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../css/PostDetail.css';
import OneComment from "./OneComment";
import { Link } from 'react-router-dom';


export const BASE_URL = API_BASE_URL + '/api/comments';

const Comment = () => {
    
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    
    
    const [commentList, setCommentList] = useState([]);
    const [commentCnt, setCommentCnt] = useState(0);

    const [comment,setComment] = useState({
            content : ''
    })

    // const [postAndCommentid, setPostAndCommentid] = useState({
    //     postid:'',
    //     commentid:''
    // })

    const location = useLocation();
    
    const getValue = e =>{
        const {name, value} = e.target;
        setComment({
            ...comment,
            [name] : value
        })
        
    }

    const add = (comment) => {
        if((comment.content!=='')&&(ACCESS_TOKEN !== null)){
            console.log('content:' + comment.content);
            fetch(BASE_URL + `${location.pathname}`,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                },
                body: JSON.stringify(comment)
            }).then(res => res.json())
            .then(json => {
                console.log(json);
                setCommentCnt(json.count);
                setCommentList(json.comments);
            })
        }else if(ACCESS_TOKEN==null){
            alert('로그인이 필요한 서비스입니다');
            window.location.href='/login';
        }else if(comment.content == ''){
            alert('내용을 입력해주세요');
        }
    };

    const addClickHandler  = e => {        
        console.log("add클릭");
        console.log('location: ', location);
        // let pageLocation = location.pathname;
        // let postid = pageLocation.substring(1);
        // console.log(postid);
        e.preventDefault();

        // console.log

        add(comment);
        setComment({content:''});
        
    };

    const remove = (commentItem) => {
        console.log('삭제 요청: ', commentItem);
        fetch(BASE_URL, {
            method: 'DELETE',
            headers: {
                'Content-type':'application/json',
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            },
            body: JSON.stringify(commentItem)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCommentCnt(json.count);
            setCommentList(json.comments);
        })
    };

    const noComment = (
        <div style={{display: "flex", justifyContent: "center", color: "gray"}}>등록된 댓글이 없습니다</div>
    );
    
    const commentItems = commentList.map(commentItem => <OneComment key={commentItem.commentid} commentItem={commentItem} remove={remove}/>);



    useEffect(()=>{
        //댓글 리스트 불러오기
        console.log(location.pathname);
        fetch(BASE_URL+`${location.pathname}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCommentCnt(json.count);
            setCommentList(json.comments);
        })
    },[commentCnt])





    return (
        <>  
        <div className="commentList">
            <Grid container style={{padding: 16 }}>
                <Grid xs={11} md={11} item style={{paddingRight: 16}}>
                    <TextField placeholder="댓글을 입력해주세요" fullWidth name = "content"  onChange={getValue} value={comment.content} />
                </Grid>
                <Grid xs={1} md={1} item>
                    <Button fullWidth color="secondary" variant="outlined" onClick={addClickHandler} >
                        댓글 추가
                    </Button>
                </Grid>
            </Grid>
            
            <List sx={{minWidth: 500, bgcolor: 'background.paper', marginBottom: 10}}>
                { commentCnt ? commentItems : noComment }
            </List>
        </div>
        </> 
    );
}

export default Comment;