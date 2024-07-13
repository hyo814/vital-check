# AITRICS Frontend assignment

## 과제 안내

https://aitrics.notion.site/Frontend-latest-74bac2856f5e459da0ac1fce942d38a3?pvs=4

## 과제 설명
# Hospital Dashboard

본 대시보드는 병원에 입원한 환자의 최신 관측 데이터를 모니터링하기 위해 개발되었습니다. Typescript와 React.js, Next.js를 활용하여 구현되었으며, json-server를 사용하여 REST API mock server가 구축되었습니다.

## 주요 기능

- **환자 데이터 모니터링**: 실시간으로 환자의 최신 상태 정보를 확인할 수 있습니다.
- **데이터 필터링**: 환자의 상태 별로 데이터를 필터링할 수 있습니다.
- **데이터 정렬**: 환자 정보, 관측 일자, 혈압 등 다양한 기준으로 데이터를 정렬할 수 있습니다.
- **사용자 인터페이스**: TailwindCSS를 사용하여 개발된 깔끔하고 직관적인 UI를 제공합니다.

## 설치 및 실행 방법

1. 이 저장소를 클론합니다.
   ```
   git clone [https://github.com/hyo814/AITRICS]
   ```
2. 필요한 npm 패키지들을 설치합니다.
   ```
   npm install
   ```
3. 개발 서버를 실행합니다.
   ```
   npm run dev
   ```
4. 하단에 있는 "기타 : 추가 설정" 백엔드 개발 서버(json-server)를 연동시킵니다.
5. 프론트 개발 서버가 실행이 되면 http://localhost:3000으로 진입합니다.

## 기술 스택

- **Frontend**: React.js, Next.js, TailwindCSS
- **Backend**: json-server
- **Programming Language**: TypeScript

## 요구사항 TODO LIST
- [X] 이미지를 참고하여 UI를 구성합니다.
- [X] 제공한 tailwind.config를 사용하여 color를 지정합니다.
- [X] 제공한 icon을 사용합니다.
- [X] 인터랙션을 포함하여 구현해 주세요.
- [X] 테이블 헤더는 고정하고 리스트만 스크롤 할 수 있도록 구현합니다.
- [X] 무한 스크롤로 구현합니다.
- [X] 환자 id를 복사할 수 있습니다.
- [X] 환자 row 호버 시 백그라운드 컬러를 파란색으로 변경합니다.
- [X] 소수점이 있는 value는 첫째 자리까지 반올림해서 노출합니다.
- [X] 환자의 status 별로 테이블 리스트를 필터링할 수 있습니다.
- [X] 체크박스로 구성합니다.
- [X] 테이블 default 정렬은 screened date(관측 일자) 내림차순입니다.
- [X] 테이블 헤더가 정렬 버튼으로 동작합니다.
- [X] 정렬하고 싶은 컬럼은 다음과 같습니다.
- [X] 정렬 버튼은 내림차순-오름차순으로 동작해야 합니다.

## 프로젝트 파일 구조

- **public**
    - **assets**            
        - **icon**
    - **mocks**
- **src**
    - **api**
        - **api.ts**
    - **app**             
        - **favicon.ico**
        - **globals.css**
        - **layout.tsx**
        - **metadata.ts**
        - **page.tsx**
    - **components**
        - **PatientTable.tsx** - 테이블 데이터를 렌더링하고 정렬 기능과 무한 스크롤 기능을 포함
        - **SortIcon.tsx** - 정렬 상태에 따라 아이콘을 표시
        - **StatusFilter.tsx** - 체크박스로 상태를 필터링
        - **TableCellComponent.tsx** - 환자 데이터를 테이블 셀에 렌더링하고 복사 기능을 포함
    - **hooks**             
        - **usePatientStatusCounts.ts** - react-query로 환자 상태별 개수 계산
        - **usePatientsData.ts** - react-query로 환자 데이터를 가져오고 무한 스크롤을 관리
    - **recoil**
        - **atoms.ts** - 전역 상태 관리를 위해 Recoil 사용
    - **type**
        - **type.ts**
    - **utils**
        - **utils.ts**


## 프로젝트 설명 (기본)
1. UI 구성 및 Tailwind CSS 사용
   UI 구성: 제공된 이미지를 참고하여 필요한 UI 컴포넌트를 구현했습니다.
   Tailwind CSS: 제공된 tailwind.config를 사용하여 색상을 지정했습니다.

 
2. 아이콘 사용
   아이콘: 제공된 아이콘 파일을 public/assets/icon 폴더에 추가하고, Image 컴포넌트를 사용하여 아이콘을 렌더링했습니다.
   정렬 아이콘: icon-state_up.svg, icon-state_none.svg, icon-state_down.svg
   복사 아이콘: icon-copy.svg

 
3. 인터랙션 구현
   테이블 정렬: 테이블 헤더를 클릭하면 해당 컬럼을 기준으로 내림차순, 오름차순, 정렬 해제를 순차적으로 변경합니다.
   무한 스크롤: 무한 스크롤 기능을 위해 Intersection Observer API를 사용하여 마지막 환자 행이 뷰포트에 들어오면 추가 데이터를 불러옵니다.
   복사 기능: 환자 ID를 복사할 수 있도록 복사 아이콘을 클릭하면 navigator.clipboard.writeText를 사용하여 복사 기능을 구현했습니다.


4. 테이블 헤더 고정 및 리스트 스크롤
   고정 헤더: TableContainer의 스타일을 지정하여 테이블 헤더를 고정하고, 테이블 바디만 스크롤되도록 구현했습니다.

 
5. 환자 row 호버 시 백그라운드 컬러 변경
   호버 시 배경색 변경: hover:bg-blue1 클래스를 사용하여 환자 행을 호버할 때 배경색을 파란색으로 변경했습니다.


6. 소수점 반올림
   소수점 반올림: roundToOne 유틸리티 함수를 사용하여 소수점을 첫째 자리까지 반올림하여 표시했습니다.


7. 환자 status 필터링
   필터링 기능: StatusFilter 컴포넌트를 사용하여 체크박스로 필터링 기능을 구현했습니다. 선택된 상태에 따라 테이블 데이터를 필터링합니다.


8. 기본 정렬 및 정렬 기능
   기본 정렬: 기본 정렬을 관측 일자(alert.date) 내림차순으로 설정했습니다.
   정렬 버튼: 테이블 헤더를 정렬 버튼으로 사용하여, 클릭 시 정렬 상태를 변경하도록 구현했습니다. 정렬 상태는 내림차순(desc), 오름차순(asc), 정렬 해제(none)로 순차적으로 변경됩니다.


9. patientsState, orderState, orderByState, filterStatusState와 같은 Recoil atom을 사용하여 전역 상태를 관리합니다.


10. 컴포넌트를 작은 단위로 분리하여 관리합니다.


## 프로젝트 함수 목록(심화)
- React 및 Recoil 상태 관리 관련 함수
  - useRecoilState: Recoil의 atom 상태를 읽고 쓰기 위한 훅입니다. 예시: patientsState, orderState, orderByState, filterStatusState.
  - useEffect: React의 훅으로 컴포넌트가 렌더링될 때와 상태가 변경될 때 부수효과를 처리합니다.
  - useCallback: React의 훅으로, 함수 컴포넌트 내에서 함수를 메모이제이션하여 성능을 최적화합니다.


- React Query 관련 함수
  - useInfiniteQuery: React Query에서 제공하는 훅으로, 무한 스크롤 기능을 구현하기 위해 사용합니다. fetchPatients API를 사용하여 페이지네이션을 처리합니다.
    - data: 쿼리에서 반환된 데이터를 포함하는 객체입니다.
    - fetchNextPage: 다음 페이지의 데이터를 불러오는 함수입니다.
    - hasNextPage: 다음 페이지가 있는지 여부를 나타내는 불리언 값입니다.
    - isFetchingNextPage: 다음 페이지 데이터를 불러오는 중인지 여부를 나타내는 불리언 값입니다.
    - getNextPageParam: 다음 페이지를 가져오는 데 사용되는 파라미터를 정의하는 함수입니다.
  - fetchPatients: 서버로부터 환자 데이터를 가져오는 비동기 함수입니다. 이 함수는 페이지 번호를 인자로 받아 해당 페이지의 환자 데이터를 반환합니다.


- Intersection Observer API 관련 함수
  - IntersectionObserver: 마지막 환자 행이 뷰포트에 들어올 때 새로운 데이터를 불러오기 위해 사용됩니다. useRef와 useCallback을 함께 사용하여 구현됩니다.


- 테이블 관련 함수
  - handleSort: 테이블 헤더 클릭 시 호출되어 정렬 상태를 변경하고, 데이터를 정렬하는 함수입니다. 정렬 순서는 내림차순, 오름차순, 정렬 해제의 순서로 변경됩니다.
  - handleStatusChange: 필터링 기능을 위해 상태 변경 시 호출되는 함수로, 체크박스를 클릭하여 필터링 상태를 변경합니다.
  - handleResetSort: 정렬을 초기 상태로 리셋하는 함수입니다. 기본 정렬 상태로 돌아가도록 합니다.
  - TableCellComponent : 개별 테이블 셀 컴포넌트로, 각 환자 데이터를 테이블 행으로 렌더링합니다. 마지막 환자 행을 감지하여 무한 스크롤을 트리거하는 역할을 합니다.
  - SortIcon : 정렬 상태를 시각적으로 표시하는 아이콘을 렌더링합니다. 현재 정렬 상태 (오름차순, 내림차순, 정렬 해제)를 반영합니다.
  - StatusFilter : 환자의 상태를 필터링하는 기능을 제공합니다. 체크박스를 통해 필터 상태를 변경하고, 이에 따라 테이블 데이터를 필터링합니다.
  - convertStatus : 환자의 상태를 특정 형식으로 변환하여 UI에 표시합니다.


- 유틸리티 함수
  - roundToOne: 소수점을 첫째 자리까지 반올림하여 반환하는 함수입니다.
  - getStatusClass: 환자의 상태에 따라 CSS 클래스를 반환하는 함수입니다.
  - convertStatus: 환자의 상태를 변환하는 함수입니다.
  - formatDate: 날짜 문자열을 "YYYY.MM.DD" 형식으로 변환하는 함수입니다.
  - formatAlertDate: 날짜 문자열을 "MM.DD HH" 형식으로 변환하는 함수입니다.
  - formatPatientData: 환자 데이터를 형식화하는 함수입니다.


## 기타 : 추가 설정

- `json-server`를 사용하여 가짜 REST API를 구축합니다. 서버 실행 방법:
   ```
   cd public/mocks
   json-server --watch ScreeningData.json --port 4000
   ```

