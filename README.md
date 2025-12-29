# 🏛️ KOREA Culture Lens (한국 문화유산 디지털 갤러리)

**국립중앙박물관의 방대한 소장품을 고해상도로 감상하는 모던 웹 갤러리**

### [🌐 실시간 라이브 데모 (Live Demo)](https://jvibeschool.org/KR_MUSEUM/)

KOREA Culture Lens은 국립중앙박물관이 제공하는 공공데이터(Open API)를 활용하여, 한국의 아름다운 문화유산을 누구나 쉽고 직관적으로 탐색할 수 있도록 설계된 웹 애플리케이션입니다. 단순한 검색을 넘어, 큐레이션된 특별전과 심미적인 UI 경험을 제공합니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 🎨 동적 배경 슬라이더
- **4개 정사각형 이미지:** 화면 상단에 정사각형 비율의 배경 이미지 4개가 가로로 배치
- **자동 슬라이딩:** 4초마다 오른쪽에서 왼쪽으로 부드럽게 이동하는 무한 루프 애니메이션
- **오버레이 콘텐츠:** 배경 위에 타이틀, 검색창, 탭이 겹쳐서 표시되는 모던한 디자인

### 2. ⭐️ 큐레이션 특별전 (Curated Exhibitions)
단순 검색으로는 찾기 힘든 매력적인 테마 18가지를 엄선하여 제공합니다.
- **테마 예시:** '옛 선조들의 강아지 사랑 🐕', '백자 속 헤엄치는 물고기 🐟', '달을 품은 항아리 🌙' 등.
- **인터랙티브 UI:** 각 테마 카드에 마우스 오버 시(Hover), 관련 대표 이미지가 부드럽게 배경으로 나타나는 몰입형 디자인.
- **직관적 탐색:** 클릭 한 번으로 해당 테마의 유물 리스트로 즉시 연결.

### 3. 🔍 8개 카테고리 탐색 시스템
사용자가 원하는 기준에 따라 유물을 찾을 수 있도록 체계적인 분류를 제공합니다.
- **⭐️ 특별전:** 큐레이션된 테마 컬렉션
- **동물:** 개, 고양이, 말, 호랑이 등 동물 관련 유물
- **식물:** 포도, 석류, 소나무 등 식물 문양 유물
- **새/곤충:** 공작, 까치, 원앙 등 조류 관련 유물
- **상상의 동물:** 도깨비, 해태, 용, 봉황 등 신화적 존재
- **시대별:** 구석기부터 근대까지 시대순 분류
- **재질별:** 도자기, 금속, 목재, 서화 등 재료별 분류
- **용도별:** 식생활, 주거, 신앙, 예술 등 기능별 분류

### 4. 🖼️ 고해상도 딥 줌 (Deep Zoom)
- 상세 페이지에서 유물 이미지 위에 마우스를 올리면 **2.5배 확대**되는 돋보기 기능을 제공하여 유물의 미세한 질감과 문양까지 관찰할 수 있습니다.
- 고해상도 원본 이미지 다운로드 기능을 지원합니다.

### 5. 📊 실시간 API 상태 모니터링
- **상태 표시:** 헤더 우측에 API 연결 상태를 실시간으로 표시
- **응답시간:** 검색 시 API 응답시간을 밀리초 단위로 표시
- **시각적 피드백:** 깜빡이는 초록불로 정상 작동 상태 확인

### 6. 📝 풍부한 상세 메타데이터
유물의 깊이 있는 이해를 돕기 위해 8가지 핵심 정보를 구조화하여 보여줍니다.
- **기본 정보:** 명칭, 국적/시대, 분류.
- **상세 정보:** 재질, 작가, 크기, 소장품번호, 다른 명칭(이명).
- **소장처:** 국립중앙박물관 등 실제 소장 기관 표시.

---

## 🛠 기술 스택 (Tech Stack)

이 프로젝트는 외부 프레임워크 의존성을 최소화하고 웹 표준 기술을 활용하여 높은 성능과 유지보수성을 확보했습니다.

| 구분 | 기술 | 설명 |
|---|---|---|
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | **Vanilla JS (ES6+):** 상태 관리(State Management) 및 SPA 라우팅 로직을 직접 구현.<br>**Modern CSS:** Grid/Flexbox 레이아웃, CSS Variables, 동적 슬라이더 애니메이션, 푸른색 포인트 컬러 시스템. |
| **UI/UX** | ![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat-square&logo=lucide&logoColor=white) | **Lucide Icons:** 홈 버튼 등 UI 아이콘 시스템.<br>**반응형 디자인:** 모바일부터 데스크톱까지 최적화된 레이아웃. |
| **Backend** | ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white) | **API Proxy:** CORS 우회 및 API Key 보안을 위한 경량 프록시 구현. |
| **API** | **E-Museum Open API** | 국립중앙박물관 소장품 검색 및 상세 정보 API 연동. |
| **Server** | **Linux (Debian)** | AWS/Bitnami LAMP 스택 환경에서 운영. |

---

## 🏗 구현 방법 및 아키텍처

### 1. 보안 및 CORS 해결 (PHP Proxy)
클라이언트(브라우저)에서 직접 공공데이터포털 API를 호출할 때 발생하는 **CORS(Cross-Origin Resource Sharing)** 문제와 **API Key 노출** 문제를 해결하기 위해 백엔드 프록시 패턴을 도입했습니다.
- **구조:** `Client(JS)` ➡️ `proxy.php` ➡️ `Open API Server`
- `proxy.php`는 API Key를 서버 사이드에 은닉하고, 클라이언트 요청을 받아 대신 API를 호출한 뒤 XML/JSON 응답을 반환합니다.

### 2. 바닐라 자바스크립트 상태 관리
React나 Vue 같은 라이브러리 없이, 순수 자바스크립트 `Object`를 사용하여 애플리케이션의 상태(현재 탭, 검색어, 페이지, 검색 결과 등)를 관리합니다.
```javascript
let currentState = {
    view: 'home',      // 현재 화면 (home/search/detail)
    activeTab: '시대별', // 현재 선택된 탭
    results: [],       // 검색 결과 캐싱
    ...
};
```
상태가 변경되면 `render()` 함수가 호출되어 UI를 효율적으로 다시 그립니다.

### 3. XML 파싱 및 데이터 정제
공공데이터 API가 XML 형식으로 응답하므로, 브라우저의 `DOMParser`를 사용하여 XML을 파싱하고 JSON 객체로 변환하여 사용합니다.
- 불필요한 기관 구분 코드(예: "국립1")를 제거하고 깔끔한 데이터만 UI에 표시하도록 정제 로직이 포함되어 있습니다.

---

## 🔌 API 명세 (External Data)

본 프로젝트는 **공공데이터포털(data.go.kr)**의 국립중앙박물관 유물 정보를 활용합니다.

- **Source:** [국립중앙박물관_소장품조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15000372)
- **주요 Endpoints:**
    - `/openapi/relic/list`: 키워드 검색 및 목록 조회 (썸네일 포함).
    - `/openapi/relic/detail`: 유물 ID 기반 상세 정보 (고해상도 이미지, 메타데이터).

---

## 🏆 프로젝트의 장점 (Advantages)

1.  **혁신적인 UI/UX:** 정사각형 배경 슬라이더와 오버레이 콘텐츠로 구성된 독창적인 인터페이스 디자인
2.  **모던한 디자인 시스템:** 다크 모드와 푸른색 포인트 컬러(#4a9eff)를 활용한 세련된 시각적 경험
3.  **실시간 모니터링:** API 상태와 응답시간을 실시간으로 표시하여 시스템 투명성 제공
4.  **직관적인 네비게이션:** 8개 카테고리 탭과 Lucide Icons를 활용한 명확한 사용자 인터페이스
5.  **고성능 최적화:** 프레임워크 없는 Vanilla JS로 빠른 로딩과 부드러운 애니메이션 구현
6.  **교육적 가치:** 큐레이션된 특별전을 통한 스토리텔링 방식의 문화유산 학습 경험
7.  **접근성:** 별도 설치나 로그인 없이 웹 브라우저에서 즉시 이용 가능

---

## 📂 디렉토리 구조

```
E_MUSEUM_GALLERY/
├── index.html       # 메인 진입점 (SPA 구조)
├── css/
│   └── style.css    # 전체 스타일링 (반응형, 애니메이션)
├── js/
│   ├── app.js       # 메인 애플리케이션 로직 (상태관리, UI 렌더링)
│   └── api.js       # API 통신 및 데이터 파싱 모듈
├── img/             # 특별전 썸네일 및 에셋
└── proxy.php        # API 중계 및 보안을 위한 백엔드 프록시
```

---

Copyright © 2025 E-Museum Gallery Project. All rights reserved.
Data provided by National Museum of Korea.
