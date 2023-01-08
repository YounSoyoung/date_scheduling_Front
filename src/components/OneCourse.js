import React, {useState} from "react";
import '../css/OneCourse.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


const OneCourse = ({course, deleteCourse}) => {
    const [mycourseState, setMyCourseState] = useState(course);
    const {courseId, postId, title} = mycourseState;



    const deleteCourseHandler = e => {
        console.log(course);

        deleteCourse(courseId);
    };

    

    return(
        <div className="oneCourse">
            <div style={{fontSize: 20, flex: 1 }}>일정</div>
            <div className="savedPostTitle">
                <div className="courseTitle">{title}</div>
            </div>
            {/* <ClearOutlinedIcon style={{justifySelf: "flex-end" }}/> */}
            <div className="deleteIcon" onClick={deleteCourseHandler}>
                <ClearOutlinedIcon />
            </div>
            
        </div>
    );
};

export default OneCourse;