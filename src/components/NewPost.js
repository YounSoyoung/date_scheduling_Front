import { Box, FormControl, InputLabel, Select, MenuItem,TextField } from "@mui/material";
import { useState } from "react";
import '../css/NewPost.css';
import { API_BASE_URL } from "../config/host-config";
export const BASE_URL = API_BASE_URL + '/api/posts';

function NewPost(){
    
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
            headers: { 'content-type':'application/json' },
            body: JSON.stringify({post, category})
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                window.location.href='/';
            } else {
                console.log('등록 실패!!');
            }
        });
        
    }
    return (
       <div className="wrapper">
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
                <div className="newContent">
                    <textarea className = "putimage"   name = "image" onChange ={getValue}>사진을 넣어주세요</textarea>
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