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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const BASE_URL = API_BASE_URL + '/api/posts';

const PostDetail = () => {
    //토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    //카테고리 값
    const [category, setCategory] = useState({});
    const {area, address} = category;

    //프로필 사진 상태관리
    const [postImg, setPostImg] = useState(null);


    //리뷰 내용
    const [post, setPost] = useState({});
    const {postId, title, userId, image, content, regDate} = post;

    //현재 페이지 위치
   const location = useLocation();
   const [postDate, setPostDate] = useState();

   const [click, setClick] = useState(false);
    // const clickRef = useRef(false);

    ///////////////////////////
    const [postList, setPostList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);
    const postItems = postList.map(post => <PostInMain key={post.postId} post={post} />);

    

    const searchPost = () => {
        console.log("searchpost 안의 category:", category);
        fetch(BASE_URL+`/search${location.pathname}`, {
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


    ///////////////


   const clickLikeHandler = e => {

       if(!ACCESS_TOKEN){
        alert('로그인이 필요한 서비스입니다');
        window.location.href='/login';
       }

       if(ACCESS_TOKEN){
        console.log("하트 클릭: ", click);
        setClick((click) => !click);
        console.log('클릭후 하트 상태: ', click)
        // clickRef.current = !clickRef.current;
        // console.log('클릭 후 하트 상태: ', clickRef.current);
        }
        

        if(!click){ //if( clickRef.current )
            fetch(BASE_URL+`/mylike/${postId}`,{
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
        }else{
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
        if(!ACCESS_TOKEN){
            alert('로그인이 필요한 서비스입니다');
            window.location.href='/login';
       }

       if(ACCESS_TOKEN){
            window.location.href=`/newcourse/${postId}`;
       }
       
   };


    
    useEffect(() => {
        //게시글 내용 불러오기
        console.log(location.pathname);
        fetch(BASE_URL+`${location.pathname}`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}  
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log(json.category);
            setCategory(() => json.category);

            console.log(json.post);
            setPost(json.post);
            let savedDate = json.post.regDate;
            let date = savedDate.substring(0, 10);
            setPostDate(date);
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
                        <FontAwesomeIcon icon={faCalendar} size="2x" onClick={moveNewCoursePage}/>
                        <FontAwesomeIcon icon={faBookmark} size="2x"/>
                        <HeartButton like={click} onClick={clickLikeHandler}/>
                    </div>
                </div>
                <div className="date">{userId} | {postDate}</div>
                <figure className="postImage">
                    <div className="placeImg">
                        <img src={postImg} />
                    </div>
                </figure>
                <section className="content">
                    {content}
                </section>
                <div>
                    <Outlet />
                </div>
                <hr style={{width: "90%"}}/>
                
                <div className="wrapperInPostDetail" style={{marginTop: 50}}>
                    <label onClick={searchPost} style={{display: "flex"}}>
                        <span style={{fontSize: 25, fontWeight: "bold", marginLeft: 25}} >{category.area} {category.address}에 대한 리뷰들 더보기</span>
                        <ExpandMoreIcon style={{fontSize: "40"}}/>
                    </label>
                    <div className="myPosts" style={{marginBottom: 50}}>
                        {postItems}
                    </div>
                </div>
        </>            
    );
};


export default PostDetail;