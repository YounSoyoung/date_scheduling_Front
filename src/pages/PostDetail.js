import React, { useEffect, useRef, useState } from "react";
import "../css/PostDetail.css";
import { API_BASE_URL } from "../config/host-config";
import PostInMain from "../components/PostInMain";
import { json, useLocation, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { TurnedIn } from "@mui/icons-material";
import HeartButton from "../components/HeartButton";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const BASE_URL = API_BASE_URL + '/api/posts';

const PostDetail = () => {
    //토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');


    //카테고리 값
    const [category, setCategory] = useState({});
    const {area, address} = category;

    //리뷰 내용
    const [post, setPost] = useState({});
    const {postId, title, userId, image, content, regDate} = post;

   const location = useLocation();

   const [click, setClick] = useState(false);
    // const clickRef = useRef(false);

   const clickLikeHandler = e => {
        console.log("하트 클릭: ", click);
        setClick((click) => !click);
        console.log('클릭후 하트 상태: ', click)
        // clickRef.current = !clickRef.current;
        // console.log('클릭 후 하트 상태: ', clickRef.current);
        

        if(!click){ //if( clickRef.current )
            fetch(BASE_URL+`/${postId}`,{
                method: 'POST',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('좋아요 추가: ', json);
            })
        }
        
        if(click){
            fetch(BASE_URL+`/mylike/${postId}`,{
                method: 'DELETE',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('좋아요 삭제: ', json);
            })
        }

   };

   const moveNewCoursePage = e => {
        window.location.href=`/newcourse/${postId}`
   };


    
    useEffect(() => {
        //게시글 내용 불러오기
        // console.log(location.pathname);
        fetch(BASE_URL+`${location.pathname}`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}  
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log(json.category);
            setCategory(json.category);
            console.log(json.post);
            setPost(json.post);
            console.log('postId: ', json.post.postId);
          

            fetch(BASE_URL+`/mylike/${json.post.postId}`, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + ACCESS_TOKEN}
            }).then(res => res.json())
            .then(json => {
                console.log('하트 저장여부: ', json);
                // clickRef.current = json;
                // console.log('checkLike: ', clickRef.current);
                setClick(json);
            })
        });
    },[]);

    return(
            <>
                <div className="postCategory">
                    <h2 className="area">{area}</h2>
                    <h2 className="address">{address}</h2>
                </div>
                <div className="titleAndIcons">
                    <h1 className="postTitle">{title}</h1>
                    <div className="postIcons">
                        {/* <button className="calendarBtn" href={`/newcourse/${postId}`} > */}
                        <FontAwesomeIcon icon={faCalendar} size="2x" onClick={moveNewCoursePage}/>

                        <FontAwesomeIcon icon={faBookmark} size="2x"/>
                        <HeartButton like={click} onClick={clickLikeHandler}/>
                    </div>
                </div>
                <div className="date">{userId} | {regDate}</div>
                <figure class="postImage">
                    <div class="placeImg">{image}</div>
                </figure>
                <section className="content">
                    {content}
                </section>
                <div>
                    <Outlet />
                </div>
        </>            
    );
};


export default PostDetail;