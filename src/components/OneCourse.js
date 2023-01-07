import React, {useState} from "react";
import '../css/OneCourse.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { display } from "@mui/system";
import { yellow } from "@mui/material/colors";

const OneCourse = ({mypost}) => {
    const [mypostState, setMyPostState] = useState(mypost);


    const {postId, title} = mypostState;

    

    return(
        <div className="oneCourse">
            <div style={{fontSize: 20, flex: 1 }}>일정</div>
            <div className="savedPostTitle">
                <div className="courseTitle">{title}</div>
            </div>
            {/* <ClearOutlinedIcon style={{justifySelf: "flex-end" }}/> */}
            <div className="deleteIcon">
                <ClearOutlinedIcon />
            </div>
            
        </div>
    );
};

export default OneCourse;