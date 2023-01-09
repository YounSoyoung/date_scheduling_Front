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
import { color } from "@mui/system";

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

   //하트를 클릭 여부
   const [click, setClick] = useState(false);

   const [search, setSearch] = useState(0);


    const [postList, setPostList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);
    const postItems = postList.map(post => <PostInMain key={post.postId} post={post} />);

    

    const searchPost = () => {

        setSearch(1);

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




   const clickLikeHandler = e => {

       if(!ACCESS_TOKEN){
        alert('로그인이 필요한 서비스입니다');
        window.location.href='/login';
       }

       if(ACCESS_TOKEN){
        console.log("하트 클릭: ", click);
        setClick((click) => !click);
        console.log('클릭후 하트 상태: ', click);
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

   //로그인을 안한 상태에서 하트를 클릭했을 때
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
        fetch(BASE_URL+`${location.pathname}`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}  
        })
        .then(res => res.json())
        .then(json => {
            setCategory(() => json.category);

            setPost(json.post);
            let savedDate = json.post.regDate;
            let date = savedDate.substring(0, 10);
            setPostDate(date);

            //하트를 전에 선택했었는지 정보 가져오기
            fetch(BASE_URL+`/mylike/${json.post.postId}`, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + ACCESS_TOKEN}
            }).then(res => res.json())
            .then(json => {
                console.log('하트 저장여부: ', json);
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

    const img = postImg ? <img src={postImg } /> : <></>;
    
    const noPostPage = (
        search ? <div style={{fontSize: 15, display: 'flex',
                            justifyContent: 'center',
                            marginTop: 30,
                            color: 'gray' }}>등록된 다른 리뷰가 없습니다</div> : <></>
    );

    const morePost = (
        <div className="myPosts" style={{marginBottom: 50}}>
            {postItems}
        </div>
    );
    

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
                        {/* <FontAwesomeIcon icon={faBookmark} size="2x"/> */}
                        <HeartButton like={click} onClick={clickLikeHandler}/>
                    </div>
                </div>
                <div className="date">{userId} | {postDate}</div>
                <div className="postDetailContent">
                    <figure className="postImage">
                        <div className="placeImg">
                            {img}
                        </div>
                    </figure>
                    <section className="content">
                        {content}
                    </section>
                </div>
                
                <div>
                    <Outlet />
                </div>
                <hr style={{width: "90%"}}/>
                
                <div className="wrapperInPostDetail" style={{marginTop: 50}}>
                    <label onClick={searchPost} style={{display: "flex"}}>
                        <span style={{fontSize: 25, fontWeight: "bold", marginLeft: 25}} >{category.area} {category.address}에 대한 리뷰들 더보기</span>
                        <ExpandMoreIcon style={{fontSize: "40"}}/>
                    </label>
                    {postCnt ? morePost : noPostPage}
                </div>
        </>            
    );
};


export default PostDetail;