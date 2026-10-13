/*
 * 여정 메인 페이지 콘텐츠
 *
 * 모든 문구·일정·가격은 기존 서비스(https://vip-travel-mu.vercel.app/ko)와
 * 각 코스 상세 페이지에서 그대로 옮겼습니다 (2026-10-13 확인).
 * 사진을 바꾸려면 public/images 의 파일을 교체하거나 아래 image.src 경로를 수정하세요.
 * image.src 가 null 이면 자리표시(플레이스홀더)가 표시됩니다.
 */

// 실제 필름 사진으로 교체한 뒤에는 false 로 바꾸면 CSS 필름 톤·입자가 꺼집니다.
export const filmTone = true

// 상세 페이지는 이번 시안 범위 밖이므로 기존 서비스의 상세 페이지로 연결합니다.
const LEGACY = 'https://vip-travel-mu.vercel.app/ko'

// 이 시안 안의 페이지 경로
export const pages = {
  home: '/',
  courses: '/courses/',
  saved: '/saved/',
  reserve: '/coming-soon/',
}

/*
 * 언어 선택 — 디자인 시안에서는 한국어로 고정하고, English 를 골라도 아무것도 바뀌지 않습니다.
 * 실제 전환을 연결할 때: options 의 ready 를 true 로 바꾸고, Header 에 onLanguageChange 를 넘겨
 * 이동·번역 로직을 연결하세요 (예: 아래 englishHref 의 주소로 이동).
 */
export const languages = {
  current: 'ko',
  label: '언어 선택',
  options: [
    { code: 'ko', label: '한국어', short: 'KO', ready: true },
    { code: 'en', label: 'English', short: 'EN', ready: false },
  ],
  notReady: '준비 중',
}

// 기존 서비스의 영문 페이지 주소 — 실제 언어 전환을 연결할 때 참고용 (지금은 쓰지 않음)
export const englishHref = {
  home: 'https://vip-travel-mu.vercel.app/en',
  courses: 'https://vip-travel-mu.vercel.app/en/courses',
  saved: 'https://vip-travel-mu.vercel.app/en/saved',
  course: (slug) => `https://vip-travel-mu.vercel.app/en/courses/${slug}`,
}

export const brand = {
  name: '여정',
  latin: 'PRIVATE JOURNEY',
  // 손글씨 로고 이미지. 값을 null 로 두면 명조체 워드마크로 대신 표시됩니다.
  // light: 사진 위(투명 헤더)용 흰색 로고, dark: 아이보리 배경(스크롤 후 헤더·푸터)용 검은색 로고
  // 참고: 받은 파일 이름이 확장자가 두 번 붙은 '.png.png' 그대로입니다.
  logo: {
    light: '/images/logo-white.png.png',
    dark: '/images/logo-dark.png.png',
    // 원본(2172×724) 중 실제 글자가 있는 영역 — 투명 여백을 빼고 이 영역 기준으로 크기를 맞춥니다.
    // 로고 파일을 바꾸면 이 값도 새 이미지에 맞게 고쳐 주세요. (null 이면 원본 전체 사용)
    crop: { width: 2172, height: 724, x: 621, y: 83, w: 1249, h: 571 },
  },
}

// 상단 메뉴 — 기존 서비스와 같은 두 항목. 모든 페이지의 헤더가 이 목록을 씁니다.
// (언어 선택은 메뉴와 별도로 헤더 오른쪽에 둡니다.)
export const nav = [
  { label: '여행 코스', href: pages.courses },
  { label: '담은 코스', href: pages.saved },
]

export const hero = {
  eyebrow: '서울 · 강원 소그룹 프라이빗 여행',
  titleLines: ['운전도, 계획도', '저희가 하겠습니다'],
  body: '부모님과, 오랜 친구들과. 교육받은 기사가 운전하는 차 한 대로 일행만 타고 갑니다. 일정은 저희가 짜고, 운전은 저희가 하고, 여러분은 창밖만 보시면 됩니다.',
  image: {
    // 파일을 같은 이름으로 덮어쓰면 브라우저가 예전 사진을 기억할 수 있어, 사진을 바꿀 때마다 v 값을 올립니다.
    // (index.html 의 preload 주소도 같은 값으로 맞춰 주세요.)
    src: '/images/hero.jpg?v=2',
    alt: '갯바위에 앉아 바다를 바라보는 사람들과 잔잔한 파도가 밀려오는 해변',
    // 가로 원본(6720×4480, 3:2)
    position: '50% 56%',       // 데스크톱·태블릿: 갯바위 위 사람들과 수평선, 파도가 함께 보이도록
    positionMobile: '18% 50%', // 모바일: 좌우를 많이 자르므로 갯바위와 사람들 쪽으로
    credit: null, // 확인 필요: 직접 제공하신 사진 — 촬영자 표기 여부를 알려 주세요
  },
}

export const inquiry = {
  // 기존 사이트 문구. 브리프에는 "몇 명이서"로 적혀 있어 확인 필요.
  question: '어디로, 며칠, 몇 분이서 가고 싶으세요?',
  help: '글로 쓰셔도 되고, 마이크를 눌러 말씀하셔도 됩니다. 일정과 금액을 바로 짜 드리고, 원하시면 담당자가 전화드립니다.',
  placeholder: '예) 11월 첫 주말, 부모님 두 분 모시고 강릉 바다를 보고 싶어요.',
  secondary: '일정부터 짜 보기',
  primary: '이대로 상담 받기',
  voice: '말씀으로 하기',
}

export const featured = {
  label: 'Selected Routes · Autumn',
  title: '이번 가을, 여정이 고른 길',
  intro: '시간까지 정해 둔 일정입니다. 마음에 드시면 그대로, 바꾸고 싶은 곳이 있으면 말씀만 하세요.',
}

/*
 * 코스 데이터
 * - descriptionIsSample: 기존 사이트에서 설명 앞에 [예시]가 붙어 있는 문구
 * - days: 상세 페이지의 전체 일정 (메인 페이지에서 일부 생략되던 2일차까지 포함)
 */
export const courses = {
  gangneung: {
    slug: 'gangneung',
    region: '강원',
    duration: '당일',
    type: '당일여행',
    title: '강릉 바다와 커피거리',
    description: '경포 바다를 걷고 안목해변에서 커피 한 잔, 점심은 초당 순두부.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '경포에서 안목까지',
        stops: [
          { time: '08:00', place: '서울 출발 (댁 앞 탑승)' },
          { time: '11:00', place: '경포대', stay: '60분' },
          { time: '12:30', place: '초당순두부마을', stay: '60분' },
          { time: '14:00', place: '오죽헌', stay: '50분' },
          { time: '15:30', place: '안목해변 커피거리', stay: '70분' },
        ],
      },
    ],
    price: { vehicle: '카니발 하이리무진', amount: '500,000원' },
    departure: '서울 출발',
    highlights: ['경포 호수 산책', '안목 커피거리', '초당 순두부'],
    includes: ['전용 차량과 기사', '유류비·통행료'],
    excludes: ['식사', '입장료'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 500000, staria: 530000, solati: 750000, sprinter: 800000 },
    dates: null, // 원하시는 날짜를 직접 고릅니다.
    image: { src: '/images/courses/gangneung.jpg', alt: '모래사장과 바위가 이어진 맑은 날의 강원 바다', credit: 'Christophe95 · CC BY-SA 4.0 · 위키미디어 공용' },
  },
  seorak: {
    slug: 'seorak',
    region: '강원',
    duration: '1박 2일',
    type: '코스 제안',
    title: '설악산 단풍길',
    description: '케이블카로 권금성에 오르고 속초 시장과 낙산사를 둘러보는 1박 2일.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '권금성과 속초',
        stops: [
          { time: '08:00', place: '서울 출발' },
          { time: '11:30', place: '설악산 소공원', stay: '40분' },
          { time: '12:30', place: '권금성 케이블카', stay: '90분' },
          { time: '16:00', place: '속초관광수산시장', stay: '60분' },
        ],
      },
      {
        day: '2일차',
        theme: '낙산사와 귀경',
        stops: [
          { time: '09:30', place: '낙산사', stay: '90분' },
          { time: '14:00', place: '서울 도착' },
        ],
      },
    ],
    price: { vehicle: '카니발 하이리무진', amount: '1,100,000원' },
    departure: '서울 출발',
    highlights: ['권금성 케이블카', '속초 중앙시장', '낙산사 일출'],
    includes: ['전용 차량과 기사', '유류비·통행료'],
    excludes: ['숙박', '식사', '케이블카 요금'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 1100000, staria: 1150000, solati: 1600000, sprinter: 1700000 },
    // 정해진 출발일 중에서 고릅니다.
    dates: [
      { value: '2026-10-24', label: '10월 24일 (토)', note: '단풍 절정 예상' },
      { value: '2026-10-31', label: '10월 31일 (토)', note: '단풍 끝물' },
    ],
    image: { src: '/images/courses/seorak.jpg', alt: '붉고 노랗게 물든 설악산 계곡과 바위 봉우리', credit: 'Christophe95 · CC BY-SA 4.0 · 위키미디어 공용 / gary4now · CC BY 3.0 · 위키미디어 공용' },
  },
  seoulPalace: {
    slug: 'seoul-palace',
    region: '서울 · 경기',
    duration: '당일',
    type: '당일여행',
    title: '고궁 산책과 한정식',
    description: '창덕궁 후원을 천천히 걷고 북촌과 삼청동을 지나 한정식으로 마무리.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '궁과 한옥 골목',
        stops: [
          { time: '10:00', place: '창덕궁 후원', stay: '100분' },
          { time: '12:00', place: '한정식 점심 (제휴 식당 예정)', stay: '80분' },
          { time: '14:00', place: '북촌한옥마을', stay: '60분' },
          { time: '15:30', place: '삼청동길', stay: '60분' },
        ],
      },
    ],
    price: { vehicle: '카니발 하이리무진', amount: '350,000원' },
    departure: '서울 출발',
    highlights: ['창덕궁 후원', '북촌 한옥', '삼청동'],
    includes: ['전용 차량과 기사'],
    excludes: ['식사', '입장료'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 350000, staria: 380000, solati: 550000 },
    dates: null, // 원하시는 날짜를 직접 고릅니다.
    image: { src: '/images/courses/seoul-palace.jpg', alt: '짙은 녹음 속 연못가의 정자', credit: 'travel oriented · CC BY-SA 2.0 · 위키미디어 공용 / Rachel.zrq · CC0 · 위키미디어 공용' },
  },
  pyeongchang: {
    slug: 'pyeongchang',
    region: '강원',
    duration: '당일',
    type: '당일여행',
    title: '평창·정선 산길과 오일장',
    price: { vehicle: '카니발 하이리무진', amount: '520,000원' },
    description: '월정사 전나무숲을 걷고 정선 아리랑시장 장날을 구경합니다.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '숲길과 장터',
        stops: [
          { time: '07:30', place: '서울 출발' },
          { time: '10:30', place: '월정사 전나무숲길', stay: '70분' },
          { time: '12:30', place: '정선아리랑시장', stay: '120분' },
          { time: '15:30', place: '대관령 양떼목장', stay: '60분' },
        ],
      },
    ],
    departure: '서울 출발',
    highlights: ['월정사 전나무숲', '정선 오일장', '대관령'],
    includes: ['전용 차량과 기사', '유류비·통행료'],
    excludes: ['식사', '입장료'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 520000, staria: 550000, solati: 780000, sprinter: 830000 },
    dates: null, // 원하시는 날짜를 직접 고릅니다.
    image: { src: '/images/courses/pyeongchang.jpg', alt: '평창·정선 코스 사진', credit: 'Olga Lipunova · CC BY-SA 3.0 · 위키미디어 공용' },
  },
  seoulNight: {
    slug: 'seoul-night',
    region: '서울 · 경기',
    duration: '당일',
    type: '당일여행',
    title: '서울 야경과 한강',
    price: { vehicle: '카니발 하이리무진', amount: '300,000원' },
    description: '해 질 무렵 남산에 오르고 한강 분수로 마무리하는 저녁 일정.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '남산에서 한강까지',
        stops: [
          { time: '16:00', place: '댁 앞 탑승' },
          { time: '17:00', place: '남산서울타워', stay: '90분' },
          { time: '19:00', place: '한옥 한정식 (제휴 예정)', stay: '80분' },
          { time: '20:40', place: '반포한강공원 달빛무지개분수', stay: '40분' },
        ],
      },
    ],
    departure: '서울 출발',
    highlights: ['남산 야경', '한강 분수', '차에서 편히 이동'],
    includes: ['전용 차량과 기사', '유류비·통행료'],
    excludes: ['식사', '입장료'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 300000, staria: 320000, solati: 480000 },
    dates: null, // 원하시는 날짜를 직접 고릅니다.
    image: { src: '/images/courses/seoul-night.jpg', alt: '서울 야경 코스 사진', credit: 'lumoplank · CC0 · 위키미디어 공용' },
  },
  chuncheon: {
    slug: 'chuncheon-food',
    region: '강원',
    duration: '당일',
    type: '맛기행',
    title: '춘천 남이섬과 닭갈비',
    price: { vehicle: '카니발 하이리무진', amount: '450,000원' },
    // 기존 사이트에서도 "사진 준비 중" — 사진 제공 필요
    description: '남이섬을 천천히 걷고 춘천 닭갈비로 점심, 소양강 스카이워크까지.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '섬과 강',
        stops: [
          { time: '08:00', place: '서울 출발' },
          { time: '09:30', place: '남이섬', stay: '150분' },
          { time: '12:30', place: '춘천 닭갈비골목', stay: '70분' },
          { time: '14:30', place: '소양강 스카이워크', stay: '50분' },
        ],
      },
    ],
    departure: '서울 출발',
    highlights: ['남이섬', '춘천 닭갈비', '소양강'],
    includes: ['전용 차량과 기사', '유류비·통행료'],
    excludes: ['식사', '남이섬 입장료·배편'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 450000, staria: 480000, solati: 700000, sprinter: 750000 },
    dates: null, // 원하시는 날짜를 직접 고릅니다.
    image: { src: null, alt: '춘천 남이섬 코스 사진 (준비 중)', credit: null },
  },
  gangwonCafe: {
    slug: 'gangwon-cafe',
    region: '강원',
    duration: '당일',
    type: '카페여행',
    title: '강원 바다 카페 길',
    price: { vehicle: '카니발 하이리무진', amount: '520,000원' },
    description: '주문진항 구경 뒤 하조대 바다를 보며 카페에서 쉬어 가는 일정.',
    descriptionIsSample: true,
    days: [
      {
        day: '1일차',
        theme: '항구와 바다 카페',
        stops: [
          { time: '07:30', place: '서울 출발' },
          { time: '10:30', place: '주문진항', stay: '60분' },
          { time: '12:00', place: '하조대', stay: '40분' },
          { time: '13:30', place: '바다 전망 카페 (제휴 예정)', stay: '90분' },
        ],
      },
    ],
    departure: '서울 출발',
    highlights: ['주문진항', '하조대', '바다 전망 카페'],
    includes: ['전용 차량과 기사', '유류비·통행료'],
    excludes: ['식사·음료'],
    // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
    fares: { kanival: 520000, staria: 550000, solati: 780000 },
    dates: null, // 원하시는 날짜를 직접 고릅니다.
    image: { src: '/images/courses/gangwon-cafe.jpg', alt: '강원 바다 카페 길 코스 사진', credit: 'EasyKL · CC BY-SA 3.0 · 위키미디어 공용' },
  },
}

export const featuredCourses = [courses.gangneung, courses.seorak, courses.seoulPalace]

export const otherCourses = {
  title: '다른 길도 있습니다',
  allLabel: '코스 전체 보기',
  allHref: pages.courses,
  items: [courses.pyeongchang, courses.seoulNight, courses.chuncheon, courses.gangwonCafe],
}

export const about = {
  label: 'How We Travel',
  title: '모시는 방법',
  paragraphs: [
    '처음 만나는 기사의 차에 부모님을 모시는 일이 쉽지 않다는 것을 압니다. 그래서 여정은 일행 외에는 아무도 태우지 않고, 본사 교육을 마친 기사만 보냅니다. 기사의 경력과 평점은 예약하실 때 직접 보고 고르실 수 있습니다.',
    '값은 사람 수가 아니라 차 한 대로 정합니다. 한 분이 타셔도, 여섯 분이 타셔도 같습니다. 정해진 시간을 넘기면 한 시간에 차량 값의 10%만, 다녀오신 뒤에 받습니다.',
    '휠체어나 보행 보조가 필요하시면 미리 말씀해 주세요. 오르내리실 때 곁을 지킬 사람을 함께 보냅니다. 기사가 찍어 드린 사진은 집에 계신 가족분들도 그날 바로 받아 보실 수 있습니다.',
  ],
  signature: '여정 드림',
  // 대표 사진 1장 — 전용 차량 이동, 차창 밖 풍경, 여유로운 소규모 여행 느낌의 사진
  image: {
    src: '/images/about/chauffeur-view.jpg', // 직접 제공하신 사진 (8192×5464, 3:2)
    alt: '달리는 차의 옆 창 너머로 보이는 넓은 초원과 소 떼, 흰 구름',
    hint: '차창 밖 풍경 · 전용 차량 이동',
    position: '50% 50%',
    filmTone: false, // 사진 본래의 색감을 그대로 살립니다 (CSS 필름 효과 제외)
  },
}

export const vehicles = {
  label: 'The Vehicles',
  title: '차를 고르실 수 있습니다',
  intro: '가격은 코스마다 차 한 대 기준으로 정해져 있습니다.',
  // 기존 사이트 표의 열: 차종 / 타실 수 있는 분 / 이런 여행에
  items: [
    {
      name: '카니발 하이리무진',
      seats: '최대 6명',
      features: ['리클라이너 4석', '넓은 짐칸', '소그룹 당일여행'],
      // 기아 카니발 하이리무진 4세대 부분변경(KA4 PE) — 출처·근거는 IMAGE_CREDITS.md
      image: {
        src: '/images/vehicles/carnival-hi-limousine.jpg',
        alt: '검은색 기아 카니발 하이리무진의 앞쪽 비스듬한 모습',
        position: '50% 62%',
        credit: 'Damian B Oh · CC BY-SA 4.0 · 위키미디어 공용',
      },
    },
    {
      name: '스타리아 라운지',
      seats: '최대 7명',
      features: ['라운지 좌석', '낮은 승하차 높이'],
      // 현대 스타리아 라운지(US4) — 출처·근거는 IMAGE_CREDITS.md
      image: {
        src: '/images/vehicles/staria-lounge.jpg',
        alt: '검은색 현대 스타리아 라운지의 앞쪽 비스듬한 옆모습',
        position: '50% 62%',
        credit: 'Damian B Oh · CC BY-SA 4.0 · 위키미디어 공용',
      },
    },
    // 쏠라티 리무진·스프린터 리무진: 리무진 사양임을 확인할 수 있는 이용 가능한 사진을 찾지 못해 자리표시 유지
    { name: '쏠라티 리무진', seats: '최대 12명', features: ['리무진 좌석', '단체 모임'], image: { src: null } },
    { name: '스프린터 리무진', seats: '최대 12명', features: ['프리미엄 리무진', '의전·행사'], image: { src: null } },
  ],
}

export const program = {
  label: 'A Journey With People',
  sectionTitle: '사람과 함께 떠나는 프로그램',
  slug: 'palace-music',
  region: '서울 · 경기',
  duration: '당일',
  type: '이벤트 프로그램',
  title: '은퇴 교수와 함께하는 고궁 음악 산책',
  description: '덕수궁 돌담길을 걸으며 듣는 음악 이야기와 작은 연주회. 회차별 모집.',
  descriptionIsSample: true,
  days: [
    {
      day: '1일차',
      theme: '돌담길 음악 산책',
      stops: [
        { time: '13:00', place: '댁 앞 탑승' },
        { time: '14:00', place: '덕수궁 돌담길', stay: '60분' },
        { time: '15:30', place: '정동 음악 홀 (예정)', stay: '70분' },
        { time: '17:00', place: '서촌 한옥 카페 (제휴 예정)', stay: '60분' },
      ],
    },
  ],
  price: { vehicle: '카니발 하이리무진', amount: '400,000원' },
  departure: '서울 출발',
  highlights: ['덕수궁 돌담길', '작은 연주회', '서촌 한옥 카페'],
  includes: ['전용 차량과 기사', '해설·연주회'],
  excludes: ['식사'],
  // 차량별 기본 이용요금 (차 한 대, 원). 이 코스에서 고를 수 있는 차량만 적습니다.
  fares: { kanival: 400000, staria: 420000, solati: 600000, sprinter: 650000 },
  // 정해진 출발일 중에서 고릅니다.
  dates: [
    { value: '2026-10-25', label: '10월 25일 (일)', note: '회차 모집 (예시)' },
    { value: '2026-11-08', label: '11월 8일 (일)', note: '회차 모집 (예시)' },
  ],
  image: { src: '/images/courses/palace-music.jpg', alt: '눈 덮인 고궁의 기와 담장과 작은 문', credit: '이창로 · CC BY-SA 4.0 · 위키미디어 공용' },
}

export const opening = {
  text: '2026년 11월 말 정식으로 문을 엽니다. 사전예약하시면 오픈 소식을 가장 먼저 알려 드립니다.',
  cta: '사전예약 하기',
  href: '/coming-soon/#reserve',
}

export const footer = {
  business: '사업자 정보와 여행업 등록번호는 정식 오픈 시 표기됩니다.',
  contact: '상담 전화와 카카오톡 채널은 오픈 전에 안내해 드립니다.',
  links: [
    { label: '여행 코스', href: pages.courses },
    { label: '담은 코스', href: pages.saved },
    { label: '상담 신청', href: `${LEGACY}/inquiry` },
    { label: '사전예약 하기', href: '/coming-soon/' },
  ],
  copyright: '© 2026 여정',
}

/*
 * 코스 상세 페이지 — 시안 안의 /courses/{slug}/ 로 연결합니다.
 */
export const courseHref = (slug) => `/courses/${slug}/`

/* ── 여행 코스 목록 페이지 ── */

export const coursesPage = {
  label: 'All Routes',
  title: '여행 코스',
  intro: '차 한 대 값으로 일행만 타고 떠납니다. 마음에 드는 코스를 고르시거나, 원하시는 대로 상담을 남겨 주세요.',
  empty: '고르신 조건에 맞는 코스가 아직 없습니다.',
  reset: '조건 지우기',
}

// 필터 — 기존 서비스의 쿼리 값(region=…, type=…)과 같게 둡니다.
export const courseFilters = {
  region: {
    label: '지역',
    hint: '어디로 떠나실지',
    options: [
      { value: 'seoul', label: '서울 · 경기' },
      { value: 'gangwon', label: '강원' },
    ],
  },
  type: {
    label: '여행 유형',
    hint: '어떤 여행을 원하시는지',
    options: [
      { value: 'day', label: '당일여행' },
      { value: 'course', label: '코스 제안' },
      { value: 'food', label: '맛기행' },
      { value: 'cafe', label: '카페여행' },
      { value: 'program', label: '이벤트 프로그램' },
    ],
  },
}

// 목록 페이지에 보이는 순서 (기존 서비스 순서와 같음)
export const courseList = [
  courses.gangneung,
  courses.seorak,
  courses.seoulPalace,
  courses.pyeongchang,
  courses.seoulNight,
  courses.chuncheon,
  courses.gangwonCafe,
  program,
]

/* ── 코스 상세 · 예약 옵션 ── */

export const coursePage = {
  back: '코스 목록',
  scheduleLabel: 'Itinerary',
  scheduleTitle: '일정',
  includesTitle: '포함',
  excludesTitle: '불포함',
}

// 차량 종류 — 메인 페이지 차량 안내와 같은 이름·정원
export const vehicleTypes = [
  { id: 'kanival', name: '카니발 하이리무진', capacity: 6 },
  { id: 'staria', name: '스타리아 라운지', capacity: 7 },
  { id: 'solati', name: '쏠라티 리무진', capacity: 12 },
  { id: 'sprinter', name: '스프린터 리무진', capacity: 12 },
]

/*
 * 예약 옵션 — 기존 서비스 상세 페이지에서 확인한 값과 규칙만 씁니다 (2026-10-13 확인).
 * 계산 규칙은 src/lib/pricing.js 에 정리되어 있습니다.
 */
export const booking = {
  title: '이 코스로 떠나기',
  dateLegend: '출발일',
  dateLabel: '원하시는 날짜',
  paxLabel: '인원',
  paxDefault: 2,
  paxMin: 1,
  vehicleLegend: '차량',
  tooMany: '인원이 많아 고를 수 없어요',
  guideLegend: '가이드',
  guide: { none: '동행 안 함', label: '가이드 동행', perDay: 150000 },
  care: { label: '동행 케어 (휠체어·보행 보조)', perDay: 120000 },
  totalLabel: '예상 금액',
  fareNote: '차 한 대 고정가입니다. 시간이 넘으면 1시간에 약 10%가 더해지며, 다녀오신 뒤 정산합니다.',
  splitNote: (name, count, amount) => `${name} ${count}대로 나눠 타시면 ${amount}입니다. 상담으로 맞춰 드릴게요.`,
  cta: '이 조건으로 상담 신청',
  ctaDemo: '디자인 시안 화면이라 상담 신청은 아직 연결되어 있지 않습니다. 고르신 조건은 아래와 같습니다.',
  save: '코스 담기',
  saved: '담았습니다',
  savedNote: '담은 코스는 이 기기(브라우저)에만 저장됩니다. 시안이라 서버에는 저장되지 않습니다.',
  savedLink: '담은 코스 보기',
}

export const savedPage = {
  label: 'Saved Routes',
  title: '담은 코스',
  intro: '마음에 드는 코스를 모아 두셨다가 한 번에 상담을 신청하실 수 있습니다. 이 기기에만 저장됩니다.',
  empty: '아직 담은 코스가 없습니다.',
  browse: '코스 둘러보기',
  remove: '빼기',
  cta: '이 코스들로 한 번에 상담 신청',
  ctaDemo: '디자인 시안 화면이라 상담 신청은 아직 연결되어 있지 않습니다.',
  memoryOnly: '이 브라우저에서는 저장 공간을 쓸 수 없어, 페이지를 닫으면 담은 코스가 사라집니다.',
}

export const findCourse = (slug) => courseList.find((c) => c.slug === slug)

// 찾을 수 없는 주소 안내
export const notFound = {
  course: {
    title: '여행 코스를 찾을 수 없습니다',
    body: '주소가 바뀌었거나 없는 코스입니다. 여행 코스 목록에서 다시 골라 주세요.',
  },
  page: {
    title: '페이지를 찾을 수 없습니다',
    body: '주소가 바뀌었거나 없는 페이지입니다. 여행 코스 목록이나 처음 화면에서 다시 둘러봐 주세요.',
  },
  toCourses: '여행 코스 목록으로 돌아가기',
  toHome: '처음으로',
}

/*
 * 사전예약 페이지 (/coming-soon/)
 * 문구·항목·오류 문구는 기존 서비스(https://vip-travel-mu.vercel.app/ko/coming-soon)에서 그대로 옮겼습니다 (2026-10-13 확인).
 */
export const reservePage = {
  hero: {
    eyebrow: '2026년 11월 말 오픈 · 사전예약 받는 중',
    titleLines: ['운전도, 계획도', '저희가 하겠습니다'],
    body: '부모님과, 오랜 친구들과. 교육받은 기사가 운전하는 차 한 대로 서울과 강원의 좋은 길만 골라 다녀옵니다.',
    cta: '사전예약 신청하기',
    note: '신청하신 분께 오픈 소식을 가장 먼저 알려 드립니다.',
  },
  intro: {
    eyebrow: '여정은 이렇게 다릅니다',
    title: '여행 상품이 아니라, 하루를 맡기는 일입니다',
    items: [
      { no: '01', title: '차 한 대, 정해진 가격', body: '한 분이 타셔도 여섯 분이 타셔도 같은 값입니다. 예를 들어 카니발로 강릉 당일 여행은 50만 원입니다.' },
      { no: '02', title: '직접 고르는 기사', body: '본사 교육을 마친 기사의 경력과 평점을 보시고 직접 고르실 수 있습니다.' },
      { no: '03', title: '몸이 불편하셔도 괜찮습니다', body: '휠체어나 보행 보조가 필요하시면 미리 말씀해 주세요. 동행 케어를 함께 준비합니다.' },
      { no: '04', title: '가족과 함께 보는 여행', body: '기사가 찍어 드린 여행 사진을 가족분들이 바로 받아 보실 수 있습니다.' },
    ],
  },
  courses: {
    eyebrow: '오픈과 함께 떠나는 길',
    title: '서울과 강원부터 시작합니다',
    // 기존 사전예약 페이지에 보이는 4개 코스와 표기 (지역 표기 '서울'도 기존 그대로)
    items: [
      { slug: 'gangneung', region: '강원', duration: '당일', line: '경포 · 안목해변 · 초당 순두부' },
      { slug: 'seorak', region: '강원', duration: '1박 2일', line: '권금성 케이블카 · 속초 중앙시장' },
      { slug: 'seoul-palace', region: '서울', duration: '당일', line: '창덕궁 후원 · 북촌 · 삼청동' },
      { slug: 'pyeongchang', region: '강원', duration: '당일', line: '월정사 전나무숲 · 정선 아리랑시장' },
    ],
  },
  form: {
    eyebrow: '사전예약',
    title: '오픈 소식을 가장 먼저 받아 보세요',
    body: '남겨 주신 연락처로 오픈 일정을 안내해 드립니다. 사전예약 혜택 소식은 아래 선택 동의를 해 주신 분께 보내 드립니다. 신청만으로 결제되지 않습니다.',
    name: '성함',
    namePlaceholder: '홍길동',
    phone: '휴대폰 번호',
    phonePlaceholder: '010-1234-5678',
    interests: '가 보고 싶은 코스',
    interestsHint: '여러 개 고르셔도 됩니다',
    partySize: '함께 가실 인원',
    partySizeUnit: '명',
    partySizeMax: 15, // 15 는 '15 명 +' 로 표시
    period: '희망 시기',
    periods: [
      { key: 'dec', label: '올해 12월' },
      { key: 'janfeb', label: '내년 1~2월' },
      { key: 'spring', label: '내년 봄' },
      { key: 'unsure', label: '아직 모르겠어요' },
    ],
    mobility: '휠체어나 보행 보조가 필요합니다',
    mobilityHint: '선택 사항입니다. 동행 케어를 준비하는 데에만 씁니다.',
    memo: '더 남기실 말씀',
    memoPlaceholder: '예) 어머니 팔순 기념 여행입니다',
    optional: '선택',
    privacy: '[필수] 개인정보 수집·이용에 동의합니다',
    privacyDetail: [
      ['수집 항목', '성함, 휴대폰 번호 (선택: 관심 코스, 인원, 희망 시기, 이동 보조 여부, 남기신 말씀)'],
      ['이용 목적', '사전예약 접수와 오픈 일정 안내 연락'],
      ['보유 기간', '서비스 오픈 후 6개월 또는 동의 철회 시까지'],
    ],
    privacyNote: '동의하지 않으실 수 있으나, 이 경우 사전예약 신청이 어렵습니다.',
    marketing: '[선택] 사전예약 혜택과 여행·이벤트 소식을 문자·카카오톡으로 받겠습니다',
    submit: '사전예약 신청하기',
    submitting: '보내는 중…',
    errors: {
      name: '성함을 입력해 주세요.',
      phone: '휴대폰 번호를 다시 확인해 주세요.',
      privacy: '개인정보 수집·이용에 동의해 주세요.',
      server: '잠시 문제가 생겼습니다. 다시 한 번 눌러 주시거나 전화로 문의해 주세요.',
    },
    // 기존 서비스의 접수 완료 문구 — 실제 접수를 연결했을 때만 씁니다.
    done: { title: '신청이 완료되었습니다', body: '{phone} 번호로 오픈 전에 연락드리겠습니다. 감사합니다.' },
    // 시안 안내 — 서버가 연결되지 않은 지금은 이 문구를 보여 줍니다.
    demo: '디자인 시안 화면이라 사전예약 접수는 아직 연결되어 있지 않습니다. 입력하신 내용은 저장되거나 전송되지 않았습니다.',
  },
}
