import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Header from "../components/Header";
import MyPageLayout from "../MyPageLayout";
import MyPost from "../MyPost";
import AllPost from "../pages/AllPosts";
import MyLike from "../pages/MyLike";
import NewPost from "../components/NewPost";
import PostDetail from "../pages/PostDetail";
import Join from "../components/Join";
import Login from "../components/Login";
import MyBookmark from "../pages/MyBookmark";
import Comment from "../components/Comment";
import ModifyPost from "../pages/ModifyPost";
import NewDateCourse from "../pages/NewDateCourse";
import ModifyUser from "../components/ModifyUser";
import MyCourse from "../pages/MyCourse";
import Footer from "../components/Footer";

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                {/* '/' 경로로 요청하면 App 컴포넌트(메인페이지)를 렌더링*/}
                <Route path="/" element={<AllPost/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/modify" element={<ModifyUser />}/>
                {/* '/new' 경로로 요청하면 NewPost 컴포넌트를 렌더링*/}
                <Route path="/new" element={<NewPost/>}/>
                {/* '/:postId/newcourse' 경로로 요청하면 NewDateCourse 컴포넌트를 렌더링*/}
                <Route path="/newcourse/:postId" element={<NewDateCourse />}/>
                {/* '//mypost/{postId}' 경로로 요청하면 ModifyPost 컴포넌트를 렌더링*/}
                <Route path="/mypost/:postId" element={<ModifyPost/>}/>
                {/* '/{postid}' 경로로 요청하면 NewPost 컴포넌트를 렌더링*/}
                <Route path="/:postId" element={<PostDetail/>}>
                    {/* '/{postid}' 경로로 요청하면 NewPost 컴포넌트를 렌더링*/}
                    <Route path="/:postId" element={<Comment/>}/>
                </Route>
                <Route element={<MyPageLayout/>}>
                    {/* '/mypost' 경로로 요청하면 MyPost 컴포넌트를 렌더링*/}
                    <Route path="/mypost" element={<MyPost/>}/>
                    <Route path="/mylike" element={<MyLike />}/>
                    <Route path="/mybookmark" element={<MyBookmark />}/>
                    <Route path="/mydatecourse" element={<MyCourse />}/>
                </Route>
            </Routes>
            <Footer/>
        </>
    );
};

export default AppRouter;