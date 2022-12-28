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

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                {/* '/' 경로로 요청하면 App 컴포넌트(메인페이지)를 렌더링*/}
                <Route path="/" element={<AllPost/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                {/* '/new' 경로로 요청하면 NewPost 컴포넌트를 렌더링*/}
                <Route path="/new" element={<NewPost/>}/>
                {/* '/{postid}' 경로로 요청하면 NewPost 컴포넌트를 렌더링*/}
                <Route path="/:postId" element={<PostDetail/>}/>
                <Route element={<MyPageLayout/>}>
                    {/* '/mypost' 경로로 요청하면 MyPost 컴포넌트를 렌더링*/}
                    <Route path="/mypost" element={<MyPost/>}/>
                    <Route path="/mylike" element={<MyLike />}/>
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;