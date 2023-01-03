import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

const ModifyPost = () => {

    const myPostLocation = useLocation();

    useEffect(() => {
        console.log(myPostLocation.pathname);
    },[]);

    return (
        <div>수정 페이지입니다</div>
        // <div className="wrapper">
        //      <div className = "letter">리뷰수정</div>
        //      <div className = "categories">
        //          <label className="category">카테고리</label>
        //          <Box sx={{ width: 150 }} style={{marginRight:15}}>
        //             <FormControl fullWidth onMouseEnter={searchAreaHandler}>
        //                 <InputLabel id="demo-simple-select-label">지역</InputLabel>
        //                 <Select
        //                 labelId="demo-simple-select-label"
        //                 id="demo-simple-select"
        //                 value={area}
        //                 label="area"
        //                 onChange={selectAreaHandler}
        //                 >
        //                 {areaItems}
        //                 </Select>
        //             </FormControl>
        //         </Box>
        //         <Box sx={{ width: 150 }}>
        //             <FormControl fullWidth onMouseEnter={searchAddressHandler}>
        //                 <InputLabel id="demo-simple-select-label">구</InputLabel>
        //                 <Select
        //                 labelId="demo-simple-select-label"
        //                 id="demo-simple-select"
        //                 value={address}
        //                 label="address"
        //                 onChange={selectAddressHandler}
        //                 >
        //                 {addressItems}
        //                 </Select>
        //             </FormControl>
        //         </Box>
        //      </div>
        //      <ul className = "title">
        //          <li className = "titlelabel" >제목</li>
        //          <TextField className = "titlewrite" placeholder = "제목을 입력하세요"  name = "title" onChange ={getValue}></TextField>
        //      </ul>

        //      <div className = "both">
        //         <label className = "imagelabel">사진과 경험을 공유해주세요!</label>
        //         <div className="newContent">
        //             <textarea className = "putimage"   name = "image" onChange ={getValue}>사진을 넣어주세요</textarea>
        //             <textarea className = "writecontent"  name = "content" onChange ={getValue} ></textarea>
        //         </div>
        //      </div>
        //      <button className = "postit"
        //      onClick={addClickHandler}
        //      >리뷰 수정하기</button>
        // </div>  
    );
};

export default ModifyPost;