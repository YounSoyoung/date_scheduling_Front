import { TextField } from "@mui/material";
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

    const [category, setCategory] = useState({
        
        area: '서울',
        address: '용산구'
    
    })
    
    const [postCateDTO,setPostCateDTO] = useState({post,category});
    
    
    const getValue = e =>{
        const {name, value} = e.target;
        setPost({
            ...post,
            [name] : value
        })
        console.log(post);
        setPostCateDTO({post,category});
        console.log(postCateDTO);
    }

    const add = (postCateDTO) => {
        // setPostCateDTO({post,category});
        fetch(BASE_URL + '/new',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            },
            body: JSON.stringify(postCateDTO)
        })
        
    };
    
    const addClickHandler  = e => {
        
        setPostCateDTO({post,category});
        console.log(postCateDTO);
        add(postCateDTO);
        window.location.href = '/';
        
    }
    return (
       <div className="wrapper">
             <div className = "letter">리뷰작성</div>
             <div className = "categories">
                 <label className="category">카테고리</label>
                 <button className="area">지역</button>
                 <button className="address">구</button>
             </div>
             <ul className = "title">
                 <li className = "titlelabel" >제목</li>
                 <TextField className = "titlewrite" placeholder = "제목을 입력하세요"  name = "title" onChange ={getValue}></TextField>
             </ul>

             <div className = "both">
                 <ul className = "image">
                    <label className = "imagelabel">사진과 경험을 공유해주세요!</label>
                     <textarea className = "putimage"   name = "image" onChange ={getValue}>사진을 넣어주세요</textarea>
                 </ul>
                 <textarea className = "writecontent"  name = "content" onChange ={getValue} ></textarea>
             </div>
             <button className = "postit"
             onClick={addClickHandler}
             >리뷰 등록하기</button>
         </div>  
    );
}

export default NewPost;