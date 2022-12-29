
import React, { useEffect, useState } from "react";
import "../css/AllPost.css";

import { API_BASE_URL } from "../config/host-config";
import PostInMain from "../components/PostInMain";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { json, Link } from "react-router-dom";


export const BASE_URL = API_BASE_URL + '/api/posts';

const AllPost = () => {
    //토큰 가져오기(임시)
    
    const [postList, setPostList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);


    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');

    const handleChange = (event) => {
        setArea(event.target.value);
    };

    //Post에게 보낼 삭제 함수
    //target: 내가 삭제할 리뷰, mypost: 배열에 저장된 사용자의 리뷰
    

    const postItems = postList.map(post => <PostInMain key={post.postId} post={post}/>)

    useEffect(() => {
        //사용자가 작성한 리뷰 목록 불러오기
        fetch(BASE_URL, {
            method: 'GET',
            headers: {'Content-type' : 'application/json' }
        })
        .then(res =>res.json())
        .then(json => {
            console.log(json);
            setPostCnt(json.count);
            setPostList(json.posts);
        });
    },[]);


    
    return (
        <>
            <div className="searchBox">
                <Box sx={{ width: 150 }} style={{marginRight:10}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">지역</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={area}
                        label="area"
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={10}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={address}
                        label="address"
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <button className="searchBtn">검색</button>
            </div>

            <div className="wrapper" style={{marginTop: 50}}>
                <div className="myPosts">
                    {postItems}
                </div>
            </div>
        </>
        
    );
};

export default AllPost;