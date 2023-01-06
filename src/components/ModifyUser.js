import React, { useState } from "react";
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";

import { API_BASE_URL } from "../config/host-config";


const ModifyUser = () => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');


    const loginusername = localStorage.getItem('LOGIN_USERNAME');
    const loginuseremail = localStorage.getItem('LOGIN_EMAIL');
    // 회원정보 바꿀 때 입력 정보 상태관리
    const [user, setUser] = useState({
        loginId: `${loginusername}`,    // 중복 불가능
        email: `${loginuseremail}`,
        username: '',   // 중복 불가능
        password: '',
        passwordok: ''
    });
    
    console.log(user.email);
    // 검증 메시지 상태관리
    const [msg, setMsg] = useState({
        
        username: '',
        
        password: '',

        passwordok:''
    });

    // 검증 완료 여부 상태관리
    const [validate, setValidate] = useState({
        
        username: false,
        
        password: false,

        passwordok: false
    });



    // 닉네임을 입력처리 하는 이벤트 핸들러
    const usernameHandler = e => {
        console.log("user.username : " ,user.username);
        console.log(e.target.value);
        
        const userNameRegex = /^[가-힣]{2,8}$/;    // 2~8 글자. 한글로만

        // 닉네임이 정확히 쓰여진 닉네임인가? - 검증 로직
        let message;    // 입력 상황 메시지
        if (!e.target.value) {  // nickName 을 안 적음.
            message = '닉네임은 필수값입니다.';
            setValidate({...validate, username: false})
        } else if (!userNameRegex.test(e.target.value)) {  // 이름은 2~8글자 사이 한글로만. 처음엔 '정규표현식'을 검색해서 사용할 것
                    // 값이 이 정규표현식과 일치하는지 test.
            message = '2~8글자 사이의 한글로 입력해주세요.';
            setValidate({...validate, username: false})

        } else {
            checkUsername(e.target.value);
        }

        // console.log(message);
        setMsg({...msg, username: message}) 
        
        setUser({ ...user, username: e.target.value })
    };


    // 패스워드 입력값 검증
    const passwordHandler = (e) => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        console.log(e.target.value);
        let message;
        if (!e.target.value) {
            message = '비밀번호는 필수값입니다!';
            setValidate({...validate, password: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 특수문자, 숫자를 포함해주세요!';
            setValidate({...validate, password: false});
        } else {
            message = '사용할 수 있는 비밀번호입니다!';
            setValidate({...validate, password: true});
        }
        setMsg({...msg, password: message});

        setUser({...user, password: e.target.value})

    };

    
    // 패스워드 입력확인값 검증
    const passwordOkHandler = (e) => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        console.log(e.target.value);
        
        let message;
        if (!e.target.value) {
            message = '비밀번호확인은 필수값입니다!';
            setValidate({...validate, passwordok: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 특수문자, 숫자를 포함해주세요!';
            setValidate({...validate, passwordok: false});
        } else if (e.target.value !== user.password) {
            message = '비밀번호가 일치하지 않습니다.';
            setValidate({...validate, passwordok: false});
        } else {
            message = '비밀번호가 일치합니다.';
            setValidate({...validate, passwordok: true});
        }
        setMsg({...msg, passwordok: message});

        setUser({...user, passwordok: e.target.value})

    };

    // 닉네임 중복확인 서버통신
    const checkUsername = (username) => {
        console.log('checkUsername!!');
        fetch(`${API_BASE_URL}/auth/checkusername?username=${username}`)
            .then(res => res.json())
            .then(flag => {
                let message;
                if (flag) {
                    message = '중복된 닉네임입니다.';
                    setValidate({...validate, username: false});
                } else {
                    message = '사용가능한 닉네임입니다.';
                    setValidate({...validate, username: true});
                }
                setMsg({...msg, username: message});
            });
    };


    

    // 상태변수 validate 내부값이 모두 true인지 확인
    const isValid = () => {
        for (let key in validate) {
            if (!validate[key]) return false;
        }
        return true;
    };


    // 회원가입 처리 이벤트
    const joinHandler = e => {

        e.preventDefault();

        console.log('user: ', user);

        // 회원입력정보를 모두 읽어서 서버에 요청

        if(isValid()) { // validate값이 모두 true일 경우
            fetch(API_BASE_URL+'/auth/put', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                },
                body: JSON.stringify(user)
            }).then(res => {
                if (res.status === 200) {
                    alert('회원정보가 변경되었습니다!!');
                    window.location.href='/login';
                } else {
                    alert('서버에 문제가 생겼습니다. 다시 시도해주세요.');
                }
            })
        } else {
            alert('입력란을 다시 확인하세요!');
        }
    };









    return(
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={joinHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 설정 바꾸기
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="닉네임"
                            autoFocus
                            onChange={usernameHandler}
                        />
                        <span style={validate.username ? {color:'green'} : {color:'red'}}>{msg.username}</span>
                        
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordHandler}
                            
                        />
                        <span style={validate.password ? {color:'green'} : {color:'red'}}>{msg.password}</span>
                        
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드 확인"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordOkHandler}
                            
                        />
                        <span style={validate.passwordok ? {color:'green'} : {color:'red'}}>{msg.passwordok}</span>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" style={{backgroundColor: 'black'}}>
                            계정 수정
                        </Button>
                    </Grid>
                </Grid>
                {/* <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid> */}
            </form>
        </Container>
    );
    
}

export default ModifyUser;