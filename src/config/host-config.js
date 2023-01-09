
//브라우저가 현재의 클라이언트 호스트 이름을 얻어오는 방법
const hostname = window && window.location && window.location.hostname; //window: 브라우저 창

console.log('현재 호스트: ', hostname);

let backendHost; //백엔드 호스트 이름
if(hostname === 'localhost'){
    backendHost = "http://localhost:8181";
}else if(hostname === 'datescheduling-react.s3-website.ap-northeast-2.amazonaws.com'){
    backendHost = 'http://ec2-13-125-27-77.ap-northeast-2.compute.amazonaws.com';
}

export const API_BASE_URL = `${backendHost}`;