# Nextjs 13.4 버전의 자체 블로그 제작 입니다.

새롭게 작동하는 폴더 구조 (app route) 와, 서버 컴포넌트의 활용, 그리고 next 의 fetch, 새로운 문법의 api route 를 통하여 nextjs 의 새로운 버전과 서버 컴포넌트로 작성하는 프로그램의 이점을 학습하고, 구현 목록을에 따라 기존의 react 처럼 작성하던 코드 스타일을 어떻게 nextjs 그리고 서버컴포넌트 스타일로 작성할 수 있을지 연구합니다.

## 주요 라이브러리

- drizzle : typeorm
- react-markdown : 마크다운 뷰어 ( 블로그 글 작성 / 조회 )
- highlightjs : 문법 하이라이팅
- nodemailer : 이메일 전송
- next-auth : 세션관리

## 아키텍쳐

![프로그램 아키텍쳐](https://my--blog.s3.ap-northeast-2.amazonaws.com/%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90.png '아키텍쳐')

## 배포 링크

[ NEXTJS로 제작한 블로그 입니다. ](https://frontrecipe.com)

## 구현 기능

### 배포 방법

main 브랜치에 push 이벤트 발생시 깃헙 액션을 통하여 도커 이미지 빌드 이후 aws ecr 에 푸시합니다.  
aws ecs 에서 해당 이미지를 실행합니다.  
고정적인 배포 주소를 위하여 도메인을 route53 과 로드벨런서에 연결시켰습니다.

~~vercel 배포입니다.~~

### 컴포넌트 단위 promise 관리

서버컴포넌트가 브라우저에 전송되기 이전에 필요한 데이터를 가질수 있게 하였습니다.

### openai api 를 통한 챗

openai 의 api 를 사용하여 커스텀 되지 않은 챗을 이용할 수 있습니다.

# 로드맵

### ai chat 도중 3회이상 채팅 시도시 서버응답에러 발생 ->

해당 라이브러리에 http 통신 상태 코드에 대하여 200번대 번호 외의 처리가 없기 때문에 발생하는것.
라이브러리 pr 참조하여 수정 예정임. 그렇지만 왜 200번대가 아닌 다른상태의 코드를 반환하는지는 아직 의문.

### 개선사항

- [x] api 와 서비스 로직 관리 하기.
  - Api 라우트를 사용하지 않게 수정.
- [x] 서비스 클래스 / Api 라우트 에서 리턴값 또는 리다이렉트 고민해보기.
  - 서비스파일내 함수(서버함수)의 리턴값을 response builder 를 통해 통일
- [x] 클라이언트 컴포넌트의 함수호출을 상위 페이지에서 내려주고, 서버액션으로 처리하기
- [ ] 현재 댓글 하나하나가 마크다운 뷰어임. 댓글영역 자체를 마크다운 뷰어 하나로 하고, 댓글 표시 시도해보기.

### 포스트(마크다운) crud 에 최소한의 검증절차 추가하기.

- [x] 마크다운 게시할때 제목과 컨텐츠가 비어있나 확인하는 로직 추가하기.
- [x] 각 글쓰기 수정 삭제 버튼에 검증절차 추가 하기.
- [x] 서버에서 세션을 확인하여 유저를 검증.

### 레이아웃 (UI)

- [x] 로딩페이지의 레이아웃이 부자연 스러움.
- [x] 버튼 클릭시 로딩여부 추가 하기.
  - useTransition 사용.
- [ ] 모바일 환경에서 햄거버 메뉴버튼 적용하기.
- [ ] 마크다운 읽기 페이지에서도 삭제할수 있는 버튼 추가하기.

### 기능

- [ ] 마크다운 문법에 대해 안내하는 팝업추가
- [ ] 댓글 수정기능
- [ ] 마이페이지
- [ ] 마이 페이지 내에 포트폴리오 추가 생각해보기
- [ ] 사용자마다 개인의 블로그 페이지를 가지게
- [ ] CSS 속성 미리보기 템플릿 구현하기
- [ ] 3D?
