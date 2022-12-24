import React, { useState } from "react";
import "../css/PostDetail.css";



const PostDetail = () => {

    

    return(
            <>
                <div className="category">
                    <h2 className="area">서울</h2>
                    <h2 className="address">용산구</h2>
                </div>
                <h1 className="title">분위기 좋은 레스토랑</h1>
                <div className="date">Posted on December 23, 2022 by Joon</div>
                <figure class="image">
                    <img class="placeImg" src="https://ldb-phinf.pstatic.net/20221127_285/16695232164828Vg4O_JPEG/KakaoTalk_20221116_183035554_27.jpg" alt="..." />
                </figure>
                <section className="content">
                    한남동 맛집 '퓨그릴' 입니다~~~~
                </section>
        </>            
    );
};


export default PostDetail;