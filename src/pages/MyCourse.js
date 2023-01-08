import moment from "moment/moment";
import React, {useEffect, useRef, useState} from "react";
import Calendar from 'react-calendar';
import { useLocation, Link } from "react-router-dom";
import '../css/Calendar.css';
import '../css/NewDateCourse.css';
import { API_BASE_URL } from "../config/host-config";
import OneCourse from "../components/OneCourse";
export const BASE_URL = API_BASE_URL + '/api/mycourses';

const MyCourse = () => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    const [value, setValue] = useState(new Date());

    //선택한 날짜
    const dateRef = useRef(null);
    // const [meetingDate, setMeetingDate] = useState(null);

    const [myDateCourse, setMyDateCourse] = useState({
        postId: '',
        meetingDate: ''
    });


    //날짜를 선택한 후 받게 되는 POST 객체
    const [courseList, setCourseList] = useState([]);
    const [courseCnt, setCourseCnt] = useState(0);

    //날짜 선택 -> 전에 저장해놨던 일정을 조회(저장되어있는 POST)
    const clickDateHandler = e => {
        dateRef.current = e;
        console.log(moment(dateRef.current).format("YYYY-MM-DD"));
        let selectedDate = moment(dateRef.current).format("YYYY-MM-DD");
        setMyDateCourse({...myDateCourse, meetingDate: selectedDate});

        

        fetch(BASE_URL+`/mycourse/${selectedDate}`, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCourseCnt(json.count);
            setCourseList(json.responseCourses);
        });


    }

    //등록된 일정 삭제하기
    const deleteCourse = (courseId) => {
        console.log(courseId);
        console.log(myDateCourse);

        fetch(BASE_URL+`/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            },
            body: JSON.stringify(myDateCourse)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCourseCnt(json.count);
            setCourseList(json.responseCourses);
        })
        
    };

    

    const mycourseItems = courseList.map((course) => <OneCourse key={course.courseId} course={course} deleteCourse={deleteCourse}/>);
    



    //새로운 일정 등록하기
    const addCourseHandler = () => {
        console.log('myDateCourse: ', myDateCourse);

        fetch(BASE_URL+'/check', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'Bearer ' + ACCESS_TOKEN
            },
            body: JSON.stringify(myDateCourse)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(!json){
                fetch(BASE_URL, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'Authorization' : 'Bearer ' + ACCESS_TOKEN
                            },
                            body: JSON.stringify(myDateCourse)
                        })
                        .then(res => res.json())
                        .then(json => {
                            console.log(json);
                            setCourseCnt(json.count);
                            setCourseList(json.responseCourses);
                        })
            }
        })

        
    };

    const noLoginPage = (
        <div className="noLogin">
        <div style={{fontSize: 20}}>로그인이 필요한 페이지입니다</div>
        <Link to='/login'>
            <button className="newPostBtn">로그인</button>
        </Link>
    </div>
    );


    useEffect(() => {
        let today = moment(value).format("YYYY-MM-DD");
        setMyDateCourse({meetingDate: today});
        clickDateHandler();
    },[]);


    const noSchedule = (
        <div className="oneCourse">
            <div style={{fontSize: 20}}>등록된 일정이 없습니다</div>
        </div>
    );

    const mycoursePage = (
        <div className="wrapperMyCourse" style={{marginBottom: 50}}>
                <h5 style={{fontSize: 40, marginBottom: 40}}>내 일정</h5>
                <div style={{fontSize: 15}}>날짜를 선택해주세요</div>
                <div className="courseBox">
                    <Calendar onChange={setValue} onClickDay={clickDateHandler} value={value} className="react-calendar"/>
                    <div className="scheduleBox">
                        <div style={{fontWeight: 700, fontSize: 30}}>
                            {moment(value).format("YYYY년 MM월 DD일")} 
                        </div>
                        <box className="mySchedules">
                            {courseCnt ? mycourseItems : noSchedule}
                        </box>
                    </div>
                        
                </div>

            </div>
    );

    return(
        <>
            {ACCESS_TOKEN ? mycoursePage : noLoginPage}
        </>
    );
};

export default MyCourse;