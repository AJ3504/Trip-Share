# React 팀 프로젝트 "Trip Share"

## 🖥️ 프로젝트 소개

#### - Kakao Maps의 위치 서비스를 기반으로 여행지 정보를 공유하는 프로젝트입니다.

    1. Kakao Maps을 사용하여 관광명소/음식점/카페/숙소의 위치 및 상세정보를 가져온다.
    2. 가져온 정보를 이용하여 회원이 특정 장소에 관한 추천 게시글을 작성한다.
    3. 회원이 작성한 장소 추천 게시글을 다른 사용자들과 공유 할 수 있다.

## 📜 [S.A(Starting Assignments)](https://teamsparta.notion.site/5-125-77bf26509f0c4c7f9abbe32b76df6fec)

## 🎬 구현 사이트

- 배포 링크 : https://tripshare-theta.vercel.app/

## ⏰ 개발 기간

- 23.07.17일(월) - 23.07.24일(월)

## 🧑‍🤝‍🧑 맴버 구성 및 역할 분담

|이름||역할|
|------|---|---|
|조진명|팀장||
|박제이|팀원|회원가입, 로그인, 로그아웃, 유저 정보 수정|
|원유길|팀원|Google Map API, 검색, 주변 관광지 추천|
|이안진|팀원|게시글 Detail 페이지, 내가 쓴 게시글 수정 & 삭제|
|이혜영|팀원|위치 기반 주변 정보 + 카테고리 분류, 게시글 작성|

## 🖨️ 개발 프로세스 가이드

1.  CRA 프로젝트 셋업
2.  .prettierrc 파일 만들기
3.  Firebase 셋업 (서버 및 DB 셋업)
4.  환경변수(.env) 셋업
5.  git 브렌치 관리 권장사항

- main 또는 dev 브랜치에 직접 push 지양

## 🛠️ 화면 구성

- Main page
  > 장소 검색, 관련 장소 목록<br/>
  > 주변 장소 카테고리별 게시글
- My page
  > 회원 정보 수정<br/>
  > 작성한 게시글
- Detail page
  > 게시글 세부 내용 (작성자, 제목, 사진 내용)
- Modal
  > 회원가입<br/>
  > 로그인<br/>
  > 글작성 (Main)

## ❗ Commit Convention

`Commit message 작성 예시) “Feat/first commit”`

- `Feat`: 새로운 기능, 특징 추가
- `Fix`: 버그 수정
- `Design`: UI Design 변경
- `Style`: 코드 포맷 변경, 세미 콜론 누락 (코드 수정X)
- `Refactor`: 리팩토링
- `Comment`: 필요한 주석 추가 및 변경
- `Docs`: 문서 수정
- `Test`: 테스트 코드 (프로덕션 코드 수정X)
- `Chore`: 빌드 업무 & 패키지 매니저 수정, 패키지 관리자 구성 업데이트 등 (프로덕션 코드 수정X)
- `Rename`: 폴더 & 파일 이름 수정 및 옮기는 작업
- `Remove`: 파일 삭제하는 작업만 수행한 경우

## ⚙️ 개발 환경 / 기술스택

- Kakao Maps API
- React
- Redux-Toolkit
  - thunk
- Firebase
  - firestore
  - auth
  - S3
- Styled-components
- JavaScript
- HTML

## 🛠️ Trouble Shooting

- Main page
  > 
- Detail page
  > 변수가 가끔 undefined되며 발생하는 invalid data issue
- My page
  > 
