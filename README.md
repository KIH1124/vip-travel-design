# 여정 PRIVATE JOURNEY — 메인 페이지 디자인 시안

React 18 + Vite 6 + Tailwind CSS 4 (JavaScript)

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/ 생성
npm run preview   # 빌드 결과 확인 (http://localhost:4173)
```

## 페이지

- `/` — 메인 페이지 (`index.html` → `src/main.jsx` → `src/App.jsx`)
- `/courses/` — 여행 코스 목록 (`courses/index.html` → `src/courses.jsx` → `src/pages/CoursesPage.jsx`)
  - 필터는 기존 서비스와 같은 주소 쿼리를 씁니다: `?region=seoul|gangwon`, `?type=day|course|food|cafe|program`
- `/courses/{slug}/` — 코스 상세 · 예약 옵션 (`course/index.html` 템플릿 → `src/course.jsx` → `src/pages/CoursePage.jsx`)
  - 예상 금액 규칙: `src/lib/pricing.js` (기존 서비스에서 확인한 규칙만 사용)
  - 상담 신청은 서버에 연결하지 않고 고른 조건만 화면에 보여 줍니다.
- `/saved/` — 담은 코스 (`saved/index.html` → `src/saved.jsx` → `src/pages/SavedPage.jsx`)
  - 브라우저 localStorage(`yeojeong:saved-courses`)에만 저장 — `src/lib/savedCourses.js`

- `/coming-soon/` — 사전예약 (`coming-soon/index.html` → `src/reserve.jsx` → `src/pages/ReservePage.jsx`, 폼 `src/components/ReserveForm.jsx`)
  - 문구·항목·오류 문구는 기존 서비스 사전예약 페이지와 같습니다 (`reservePage` — `src/data/site.js`).
  - 시안에서는 필수 항목(성함·휴대폰·개인정보 동의)만 화면에서 검사하고 아무것도 전송·저장하지 않습니다.
    실제 접수는 `src/lib/reservation.js` 의 `submitReservation` 에 연결하세요.
- 없는 주소 — 404 페이지 (`404.html` → `src/notfound.jsx` → `src/pages/NotFoundPage.jsx`)
  - `/courses/{없는 코스}` 는 '여행 코스를 찾을 수 없습니다', 그 밖의 주소는 '페이지를 찾을 수 없습니다'

## 주소 규칙

라우터 라이브러리 없이 Vite 멀티 페이지 빌드로 구성했습니다 (`vite.config.js` 의 `pageRoutes`).
**SPA fallback 은 쓰지 않습니다** (`appType: 'mpa'`). 잘못된 주소에 메인 페이지가 보이지 않게 하기 위해서입니다.

| 요청 | 결과 |
| --- | --- |
| `/courses/gangneung/` | 코스 상세 (200) |
| `/courses/gangneung` | `/courses/gangneung/` 로 이동 (쿼리 유지) |
| `/courses`, `/saved` | `/courses/`, `/saved/` 로 이동 |
| `/courses/없는-코스`, `/courses/없는-코스/` | 404 페이지 — 여행 코스를 찾을 수 없습니다 (404) |
| 그 밖의 없는 주소 | 404 페이지 — 페이지를 찾을 수 없습니다 (404) |

`npm run dev` 와 `npm run preview` 는 위 규칙을 그대로 따릅니다 (개발용이라 이동은 302).
빌드하면 `dist/` 에 다음 파일이 생깁니다.

```
dist/index.html                    /
dist/courses/index.html            /courses/
dist/courses/{slug}/index.html     /courses/{slug}/   ← 코스마다 1개 (빌드 때 자동 생성)
dist/saved/index.html              /saved/
dist/404.html                      없는 주소
```

## 배포 설정

정적 호스팅이면 됩니다. 필요한 것은 두 가지입니다.

1. **끝 슬래시 리디렉션** — `/courses/gangneung` → `/courses/gangneung/` (301)
2. **404 페이지** — 없는 주소에 `dist/404.html` 을 404 상태로 응답

그리고 **SPA fallback(모든 주소 → `/index.html`) 규칙은 넣지 마세요.** 넣으면 없는 코스 주소에 메인 페이지가 보입니다.
404 페이지가 주소를 보고 문구를 고르므로, 없는 코스를 위한 별도 rewrite 는 필요 없습니다.

**Vercel** — `vercel.json`

```json
{ "trailingSlash": true }
```

`404.html` 은 자동으로 사용됩니다. 프레임워크 프리셋은 Vite, 출력 폴더는 `dist` 로 두고, SPA용 `rewrites` 는 추가하지 않습니다.

**Netlify** — 폴더 주소의 끝 슬래시 정리와 `404.html` 응답이 기본 동작이라 추가 설정이 없습니다.
`_redirects` 에 `/* /index.html 200` 같은 SPA 규칙을 넣지 마세요.

**Cloudflare Pages · GitHub Pages** — 둘 다 폴더 주소를 끝 슬래시 주소로 보내고 `404.html` 을 자동으로 씁니다. 추가 설정 없음.

**nginx**

```nginx
root /var/www/yeojeong/dist;

location / {
  try_files $uri $uri/ =404;   # 폴더면 끝 슬래시 주소로 301 이동
}
error_page 404 /404.html;
```

## 구조

- `src/index.css` — 디자인 토큰(색·서체), 타이포 스케일, 필름 톤
- `src/data/site.js` — 모든 문구·일정·가격·이미지 경로 (콘텐츠는 이 파일만 수정)
- `src/components/` — Photo, Timetable, PriceNote, Button, SectionHeading 등 공용 컴포넌트
- `src/sections/` — 페이지 섹션 (Header, Hero, Inquiry, FeaturedCourses, OtherCourses, About, Vehicles, Program, Footer)
- `src/pages/` — 메인 외 페이지 (CoursesPage, CoursePage, SavedPage, NotFoundPage)
- `src/lib/` — 예상 금액 계산(`pricing.js`), 담은 코스 저장(`savedCourses.js`)

## 이미지 교체

`src/data/site.js` 에서 `image.src` 를 바꾸면 됩니다. `src: null` 이면 자리표시가 나옵니다.

| 위치 | 현재 | 데이터 경로 |
| --- | --- | --- |
| 로고 (손글씨) | `logo-white.png.png`, `logo-dark.png.png` 적용 (파일명 확장자 중복) | `brand.logo.light / dark / crop` |
| Hero | 직접 제공 `hero.jpg` (가로 3:2, 촬영자 표기 확인 필요) | `hero.image` |
| 추천 코스 3곳 | 기존 사이트 사진 (위키미디어 공용) | `courses.gangneung / seorak / seoulPalace` |
| 다른 코스 4곳 | 기존 사이트 사진, 춘천은 자리표시 | `courses.pyeongchang / seoulNight / chuncheon / gangwonCafe` |
| 모시는 방법 대표 사진 1장 | 직접 제공 `about/chauffeur-view.jpg` (필름 효과 제외) | `about.image` |
| 차량 4종 | 카니발·스타리아는 위키미디어 공용 사진, 쏠라티·스프린터는 자리표시 | `vehicles.items[].image` |

사진별 출처·라이선스·차량 확인 근거는 [IMAGE_CREDITS.md](IMAGE_CREDITS.md) 에 정리했습니다.
사진 한 장만 필름 효과를 빼려면 그 `image` 에 `filmTone: false` 를 넣습니다.
같은 파일 이름으로 사진을 덮어쓰면 브라우저 캐시 때문에 예전 사진이 보일 수 있으니, 주소 끝의 `?v=` 값을 올려 주세요 (Hero: `site.js` 와 `index.html` preload 두 곳).
| 고궁 음악 산책 | 기존 사이트 사진 (위키미디어 공용) | `program.image` |

실제 필름 사진으로 바꾼 뒤에는 `filmTone` 을 `false` 로 바꿔 CSS 필름 효과를 끄세요.
Hero 크롭 위치는 `hero.image.position`(데스크톱·태블릿)과 `positionMobile`(모바일)로 조절합니다.
