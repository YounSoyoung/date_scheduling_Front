import React, {useState} from "react";
import '../css/OneCourse.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { display } from "@mui/system";

const OneCourse = ({mypost}) => {
    const [mypostState, setMyPostState] = useState(mypost);


    const {postId, title} = mypostState;

    

    return(
        <div className="oneCourse">
            <div style={{fontSize: 20 }}>일정</div>
            <div className="savedPostTitle">{title}</div>
            <ClearOutlinedIcon style={{justifySelf: "flex-end" }}/>
            {/* <div className="deleteIcon">
                <ClearOutlinedIcon />
            </div> */}
            
        </div>
    );
};

export default OneCourse;