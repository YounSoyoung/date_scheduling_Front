import { Box, FormControl, InputLabel, Select, MenuItem,TextField } from "@mui/material";
import React from "react";
import { useRef, useState } from "react";
import '../css/NewPost.css';
import { API_BASE_URL } from "../config/host-config";
export const BASE_URL = API_BASE_URL + '/api/posts';


const NewPost = () => {
    //파일 인풋 DOM 객체 useRef로 관리하기
    const $fileInput = useRef();

    //이미지 파일 정보 상태관리
    const [imgFile, setImgFile] = useState(null);
    
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    

    const [post,setPost] = useState({
        
        title : '',
        image : '',
        content : ''
            
        })
        
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    
    const [category, setCategory] = useState({
        area: '',
        address: ''
    });
    
    const [postCateDTO,setPostCateDTO] = useState({post,category});
   
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
    
    
    
    const getValue = e =>{
        const {name, value} = e.target;
        // console.log('text:', value);
        setPost({
            ...post,
            [name] : value
        });
        // console.log('post:', post);
        // setPostCateDTO({post,category});
        // console.log('dto:', postCateDTO);
    }

   
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
            
        }
    };

    

    const addClickHandler  = e => {

        // console.log('post:', post);
        // console.log('cate:', category);
        
        // setPostCateDTO({post,category});
        // console.log(postCateDTO);
        // add(postCateDTO);
        // window.location.href = '/';

        fetch(`${BASE_URL}/new`, {
            method: 'POST',
            headers: { 
                'content-type':'application/json',
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            },
            body: JSON.stringify({post, category})
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                window.location.href='/';
            } else {
                console.log('등록 실패!!');
            }
        });

   
    }

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
            setImgFile(reader.result);
        };
    }


    return (
       <div className="wrapperNewPost">
             <div className = "letter">리뷰작성</div>
             <div className = "categories">
                 <label className="category">카테고리</label>
                 <Box sx={{ width: 150 }} style={{marginRight:15}}>
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
             </div>
             <ul className = "title">
                 <li className = "titlelabel" >제목</li>
                 <TextField className = "titlewrite" placeholder = "제목을 입력하세요"  name = "title" onChange ={getValue}></TextField>
             </ul>

             <div className = "both">
                <label className = "imagelabel">사진과 경험을 공유해주세요!</label>

                {/* 사진 넣기 */}
                <div className="newContent">
                    <div className="thumbnail-box" onClick={fileClickHandler}>
                        <img src={imgFile ? imgFile : require("../assets/img/addImg.png")} />
                        <span style={{fontSize: 15}}>사진 추가</span>
                    </div>

                    <input id="postImg" type="file" accept="image/*" style={{display: "none"}} onChange={showImageHandler} ref={$fileInput}/>


                    
                    <textarea className = "writecontent"  name = "content" onChange ={getValue} ></textarea>
                </div>
             </div>
             <button className = "postit"
             onClick={addClickHandler}
             >리뷰 등록하기</button>
        </div>  
    );
}

export default NewPost;