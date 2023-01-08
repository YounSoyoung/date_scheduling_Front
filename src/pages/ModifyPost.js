import React, {useEffect, useState} from "react";
import { API_BASE_URL } from "../config/host-config";
import { useLocation } from "react-router-dom";
import { Box, FormControl, InputLabel, Select, MenuItem,TextField, InputBase } from "@mui/material";
import "../css/ModifyPost.css";

export const BASE_URL = API_BASE_URL + '/api/posts';

const ModifyPost = () => {
    //토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    //카테고리 값
    const [category, setCategory] = useState({});
    const {area, address} = category;

    //리뷰 내용
    const [post, setPost] = useState({});
    const {postId, title, userId, image, content, regDate} = post;

    const [postCateDTO,setPostCateDTO] = useState({post,category});

        
    const [modifyArea, setModifyArea] = useState('');
    const [modifyAddress, setModifyAddress] = useState('');
    
    const [modifyCategory, setModifyCategory] = useState({
        area: '',
        address: ''
    });

    const [areaList, setAreaList] = useState([]);
    const [addressList, setAddressList] = useState([]);

    

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

   const selectAreaHandler = (event) => {
        console.log(event.target.value);
        setCategory({...category, area: event.target.value});
        // setModifyCategory({ ...modifyCategory, area: event.target.value});
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
        setCategory({...category, address: event.target.value});
        // setModifyCategory({...modifyCategory, address: event.target.value});
    };


    
    const getTitleValue = e => {
        console.log(e.target.value);
        setPost({...post, title: e.target.value});  
    };

    const getImageValue = e => {
        console.log(e.target.value);
        setPost({...post, image: e.target.value});  
    };

    const getContentValue = e => {
        console.log(e.target.value);
        setPost({...post, content: e.target.value});  
    };

    // const getTitleValue = e => {
    //     console.log(e.target.value);
    //     setModifyPost({...modifyPost, title: e.target.value});  
    // };

    // const getValue = e =>{
    //     const {name, value} = e.target;
    //     // console.log('text:', value);
    //     setPost({
    //         ...post,
    //         [name] : value
    //     });
    //     // console.log('post:', post);
    //     // setPostCateDTO({post,category});
    //     // console.log('dto:', postCateDTO);
    // }

    const areaItems = areaList.map(area => <MenuItem value={area.area}>{area.area}</MenuItem>)
    const addressItems = addressList.map(address => <MenuItem value={address.address}>{address.address}</MenuItem>)
    

    const updateHandler = e => {
        console.log('post:', post);
        console.log('cate:', category);

        fetch(BASE_URL+`${myPostLocation.pathname}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization': 'Bearer ' + ACCESS_TOKEN 
            },
            body: JSON.stringify({post, category})
        })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
            window.location.href='/mypost';
        } else {
            console.log('수정 실패!!');
        }
        })
    };

    const myPostLocation = useLocation();

    useEffect(() => {
        console.log(myPostLocation.pathname);
        fetch(BASE_URL+`${myPostLocation.pathname}`, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCategory(json.category);
            setPost(json.post);
            // setModifyPost({...modifyPost, title: json.post.title});
            // console.log(modifyPost);
            // console.log(post.title);

        })
    },[myPostLocation]);

    return (
        // <div>수정 페이지입니다</div>
        <div className="wrapper">
             <div className = "letter">리뷰수정</div>
             <div className = "categories">
                 <label className="category">카테고리</label>
                 <Box sx={{ width: 150 }} style={{marginRight:15}}>
                    <FormControl fullWidth onMouseEnter={searchAreaHandler}>
                        <InputLabel id="demo-simple-select-label">{area}</InputLabel>
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
                        <InputLabel id="demo-simple-select-label">{address}</InputLabel>
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
             </div>
             <ul className = "title">
                 <li className = "titlelabel" >제목</li>
                 {/* <TextField className = "titlewrite"  name = "title" onChange ={getValue}>{title}</TextField> */}
                 <div className="contentBox">
                    <InputBase
                        inputProps={{
                            "aria-label" : "naked",
                            readOnly: false
                        }}
                        onChange={getTitleValue}
                        type="text"
                        value={title}
                        
                    />
                 </div>
             </ul>

             <div className = "both">
                <label className = "imagelabel">사진과 경험을 공유해주세요!</label>
                <div className="newContent">
                    <content className = "updateImage">
                        <InputBase
                            inputProps={{
                                "aria-label" : "naked",
                                readOnly: false
                            }}
                            onChange={getImageValue}
                            type="text"
                            value={image}
                        />
                    </content>
                    <content className = "updateContent">
                        <InputBase
                            inputProps={{
                                "aria-label" : "naked",
                                readOnly: false
                            }}
                            onChange={getContentValue}
                            type="text"
                            value={content}
                        />
                    </content>
                </div>
             </div>
             <button className = "postit"
             onClick={updateHandler}
             >리뷰 수정하기</button>
        </div>  
    );
};

export default ModifyPost;