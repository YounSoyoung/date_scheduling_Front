import React, {useEffect, useRef, useState} from "react";
import { API_BASE_URL } from "../config/host-config";
import { useLocation } from "react-router-dom";
import { Box, FormControl, InputLabel, Select, MenuItem,TextField, InputBase } from "@mui/material";
import "../css/ModifyPost.css";

export const BASE_URL = API_BASE_URL + '/api/posts';

const ModifyPost = () => {
    //파일 인풋 DOM 객체 useRef로 관리하기
    const $fileInput = useRef();

    //토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    //이미지 사진 상태관리
    const [postImg, setPostImg] = useState(null);

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


    const getContentValue = e => {
        console.log(e.target.value);
        setPost({...post, content: e.target.value});  
    };



    const areaItems = areaList.map(area => <MenuItem value={area.area}>{area.area}</MenuItem>)
    const addressItems = addressList.map(address => <MenuItem value={address.address}>{address.address}</MenuItem>)
    

    const updateHandler = e => {
        console.log('post:', post);
        console.log('cate:', category);

        //post 작성 정보 (JSON) + 리뷰 사진
        //서버에 여러가지 정보를 보낼 때 multipart/form-data
        const updateFormData = new FormData();

        const updateBlob = new Blob([JSON.stringify({post, category})], {type: "application/json"});

        //업데이트할 정보 JSON append(key, 값)
        updateFormData.append('updateInfo', updateBlob);
        updateFormData.append('updateImg', $fileInput.current.files[0]);

        fetch(BASE_URL+`${myPostLocation.pathname}`, {
            method: 'PUT',
            headers:{
                'Authorization': 'Bearer ' + ACCESS_TOKEN 
            },
            body: updateFormData
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
            
            fetch(BASE_URL+`/load-postimg/${json.post.postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            })
            .then(res => {
                if(res.status === 200){
                    return res.blob();
                }
                    return setPostImg(null);
                })
                .then(imageData => {
                        console.log('imageDate: ', imageData);
                        //서버가 보낸 순수 이미지 파일을 URL 형식으로 변환
                        const imgUrl = window.URL.createObjectURL(imageData);
                        setPostImg(imgUrl);
                })

        })
    },[myPostLocation]);


    //첨부파일 추가 이벤트
    const fileClickHandler = e => {
        $fileInput.current.click();
    }

    //이미지 썸네일 체인지 이벤트
    const showImageHandler = e => {
        //첨부파일의 데이터를 읽어온다
        const fileData = $fileInput.current.files[0];
        
        //첨부파일의 바이트데이터를 읽기 위한 객체
        const reader = new FileReader();
        //파일 바이트데이터를 img src나 a의 href에 넣기 위한 모양으로 바꿔서 로딩해줌
        reader.readAsDataURL(fileData);

        //첨부파일이 등록되는 순간에 이미지 셋팅
        reader.onloadend = e => {
            //이미지 src 등록
            setPostImg(reader.result);
        };
    }


    return (
        // <div>수정 페이지입니다</div>
        <div className="wrapperModify">
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
                        
                        <div className="postImg-box" onClick={fileClickHandler}>
                            <img src={postImg ? postImg : require("../assets/img/newPostImg.png")} />
                        </div>

                        <input id="postImg" type="file" accept="image/*" style={{display: "none"}} onChange={showImageHandler} ref={$fileInput}/>

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