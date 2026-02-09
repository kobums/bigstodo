# BIGS TODO (빅스 투두)

**BIGS TODO**는 React, TypeScript, Vite를 사용하여 개발된 모던한 게시판 애플리케이션입니다. 사용자 인증, 게시글 CRUD, 이미지 업로드, 그리고 반응형 UI를 제공하여 직관적이고 효율적인 사용자 경험을 선사합니다.

## ✨ 주요 기능

### 1. 사용자 인증 (Auth)
- **회원가입**: 닉네임, 이메일, 비밀번호를 통한 안전한 계정 생성.
- **로그인**: JWT 기반의 인증 시스템으로 보안성 강화.
- **로그아웃**: 안전한 세션 종료.
- **보호된 라우트**: 로그인한 사용자만 접근 가능한 페이지 관리 (`ProtectedRoute`).

### 2. 게시판 (Board)
- **목록 조회**:
  - 게시글 번호, 제목, 카테고리, 작성일 표시.
  - **페이지네이션**: 10개 단위 블록 이동 (예: 1~10, 11~20)을 지원하여 대량의 데이터도 쉽게 탐색 가능.
  - **카테고리 배지**: 공지, 자유, Q&A 등 카테고리별 직관적인 색상 배지 적용.
- **상세 조회**:
  - 게시글 내용 및 첨부 이미지 확인.
  - 작성자 및 작성 시간 표시.
- **게시글 작성**:
  - 제목, 내용, 카테고리 선택 및 이미지 파일 업로드 지원.
- **게시글 수정**:
  - 기존 데이터(제목, 내용, 카테고리, 이미지)를 불러와 수정 가능.
  - 수정 완료 후 상세 페이지로 이동하며, 뒤로가기 시 수정 폼이 아닌 상세 페이지로 연결 (`replace: true`).
- **게시글 삭제**:
  - 본인이 작성한 게시글을 삭제할 수 있는 기능.

### 3. UI/UX 디자인
- **반응형 디자인**: 모바일, 태블릿, 데스크탑 등 다양한 화면 크기에 최적화된 레이아웃.
- **스타일 시스템**: `src/styles/constants.ts`를 통한 색상 상수 중앙 관리로 일관된 테마 적용.
- **직관적인 인터페이스**:
  - **Emotion**을 활용한 모던하고 깔끔한 스타일링.
  - 로딩 상태 및 에러 메시지 표시로 사용자 피드백 제공.

---

## 🛠 기술 스택

### Frontend
- **Core**: [React](https://react.dev/) (v18), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Emotion](https://emotion.sh/) (Styled Components)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v6)
- **API Client**: [Axios](https://axios-http.com/)

---

## 🚀 설치 및 실행 방법

이 프로젝트를 로컬 환경에서 실행하려면 다음 단계(Node.js 설치 필요)를 따르세요.

### 1. 저장소 클론 (Clone)
```bash
git clone https://github.com/kobums/bigstodo.git
cd bigstodo
```

### 2. 패키지 설치
```bash
npm install
# 또는
yarn install
```

### 3. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:5173` 으로 접속하여 애플리케이션을 확인하세요.

---

## 📂 프로젝트 구조

```
src/
├── api/            # API 요청 함수 모음 (auth, boards)
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── auth/       # 로그인, 회원가입 폼
│   ├── board/      # 게시판 관련 컴포넌트 (목록, 상세, 폼)
│   └── common/     # 공통 컴포넌트 (Button, Input, Badge 등)
├── pages/          # 페이지 단위 컴포넌트 (라우트 대응)
├── stores/         # Zustand 상태 관리 (authStore, boardStore)
├── styles/         # 전역 스타일 및 상수 정의 (constants.ts)
├── types/          # TypeScript 타입 정의
├── App.tsx         # 메인 앱 컴포넌트 및 라우팅 설정
└── main.tsx        # 진입점 (Entry Point)
```

---

## 📝 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.
