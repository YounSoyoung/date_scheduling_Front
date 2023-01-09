
import React, { useEffect, useState } from "react";
import "../css/AllPost.css";

import { API_BASE_URL } from "../config/host-config";
import PostInMain from "../components/PostInMain";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { json, Link } from "react-router-dom";


export const BASE_URL = API_BASE_URL + '/api/posts';

const AllPost = () => {
    //토큰 가져오기(임시)
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    const [postList, setPostList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);


    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');

    const [category, setCategory] = useState({
        area: '',
        address: ''
    });

   
    const [areaList, setAreaList] = useState([]);
    const [addressList, setAddressList] = useState([]);


    const selectAreaHandler = (event) => {
        console.log(event.target.value);
        setArea(event.target.value);
        setCategory({ ...category, area: event.target.value});
    };

   const searchAreaHandler = e => {
        e.preventDefault();
        console.log('지역 선택');
        fetch(BASE_URL+'/search')
        .then(res => res.json())
        .then(json => {
            console.log(json.categories);
            setAreaList(json.categories);
        })
   };

   const searchAddressHandler = e => {
    e.preventDefault();

    console.log('구 선택');
    fetch(BASE_URL+`/search/${category.area}`)
    .then(res => res.json())
    .then(json => {
        console.log(json.categories);
        setAddressList(json.categories);
    })
};

    const selectAddressHandler = (event) => {
        console.log(event.target.value);
        setAddress(event.target.value);
        setCategory({...category, address: event.target.value});
    };

    
    const postItems = postList.map(post => <PostInMain key={post.postId} post={post}/>)

    const areaItems = areaList.map(area => <MenuItem value={area.area}>{area.area}</MenuItem>)
    const addressItems = addressList.map(address => <MenuItem value={address.address}>{address.address}</MenuItem>)

    const [msg, setMsg] = useState('');
    const [validate, setValidate] = useState(true);

    const searchHandler = e => {
        e.preventDefault();

        let message;
        if(!category.area){
            message = '지역을 선택해주세요';
            setMsg(message);
            setValidate(false);
        } else if(!category.address){
            message = '구를 선택해주세요';
            setMsg(message);
            setValidate(false);
        } else {
            setMsg('');
            searchPost(category);
        }
    };

    const searchPost = (category) => {

        fetch(BASE_URL+'/search', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setPostList(json.posts);
            setPostCnt(json.count);
        })
    };


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

    const postHandler = e =>{
        if (ACCESS_TOKEN == null){
            alert("로그인이 필요한 서비스입니다.");
            window.location.href = '/login';
        }else{
            window.location.href = '/new';
        }
    };

    const noPostPage = (
        <div className="noPostInMain">
            <div style={{fontSize: 20}}>아직 등록된 리뷰가 없습니다</div>
            <div style={{fontSize: 20}}>첫번째 리뷰를 남겨주세요</div>
        </div>
    );

    
    const existAllPost = (
        <div className="allPosts">
                {postItems}
        </div>
    );
    

    
    return (
    <>
    <div className="wrapper"> 
        <div className="searchBox">
            <span className="msg">{msg}</span>
            <div className="searchCategory">
                <Box sx={{ width: 150 }} style={{marginRight:10}}>
                    <FormControl fullWidth onMouseEnter={searchAreaHandler}>
                        <InputLabel id="demo-simple-select-label">지역</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={area}
                        label="area"
                        onChange={selectAreaHandler}
                        >
                        {areaItems}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: 150 }}>
                    <FormControl fullWidth onMouseEnter={searchAddressHandler}>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={address}
                        label="address"
                        onChange={selectAddressHandler}
                        >
                        {addressItems}
                        </Select>
                    </FormControl>
                </Box>
                <button className="searchBtn" onClick={searchHandler}>검색</button>
                <div className="newBtnBox">
                    <button className="newPostBtn" onClick={postHandler}>리뷰 작성하기</button>
                </div>
            </div>
            
        </div>

            <div className="main" style={{marginTop: 50}}>
                <span style={{fontSize: 15, marginLeft: 30}}>총 {postCnt}개의 리뷰들</span>
                 {postCnt ? existAllPost : noPostPage}
            </div>

            
    </div>
    </>
        
    );
};

export default AllPost;