import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Header from "../components/Header";
import MyPost from "../MyPost";

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                {/* '/' 경로로 요청하면 App 컴포넌트(메인페이지)를 렌더링*/}
                <Route path="/" element={App}/>
                {/* '/mypost' 경로로 요청하면 MyPost 컴포넌트를 렌더링*/}
                <Route path="/mypost" element={<MyPost/>}/>
            </Routes>
        </>
    );
};

export default AppRouter;