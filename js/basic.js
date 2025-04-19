// 페이지 로딩 시 로딩 애니메이션 제거
$(window).on('load', function () {
  $('.loading-overlay').fadeOut('easein');
  $('.loading-spinner').fadeOut('easein');
});

// spinner 로티 애니메이션 로드
const loadaAni = bodymovin.loadAnimation({
  container: document.getElementById('spinner'),
  path: 'loding.json',
  renderer: 'svg',
  loop: true,
  autoplay: true
});

// 마우스 따라다니는 커스텀 커서
$(document).on('mousemove', function (e) {
  $('.custom-cursor').css({
    top: e.clientY,
    left: e.clientX
  });
});

// 메인 이미지 영역 클립패스 애니메이션 효과
function changeClipPath() {
  const frame = $('.main-photo-frame');
  frame.addClass('transition');
  setInterval(function () {
    setTimeout(function () {
      frame.css('clip-path', 'circle(50% at 50% 50%)');
    }, 1000);
  });
}
changeClipPath();

// 로고 영역 애니메이션 로드
const animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'),
  path: 'logo.json',
  renderer: 'svg',
  loop: true,
  autoplay: true
});

// 스크롤 유도 애니메이션 로드
const scrollAnimation = bodymovin.loadAnimation({
  container: document.getElementById('msc'),
  path: 'scroll.json',
  renderer: 'svg',
  loop: true,
  autoplay: true
});

// 마우스 움직임에 따라 배경 위치 및 이미지 위치 조정
$(document).ready(function () {
  const ww = $(window).width();
  const wh = $(window).height();

  $(document).mousemove(function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    const newX = (2 * mouseX / ww) - 1;
    const newY = (2 * mouseY / wh) - 1;

    // 배경 움직임
    const traX = (4 * mouseX / 570) + 30;
    const traY = (4 * mouseY / 570) + 40;
    $(".title").css({ "background-position": `${traX}% ${traY}%` });

    // 텍스트 움직임 + 크기 변경, 회전
    $(".i1").css({
      transform: `translate(${newX * 20}px, ${-newY * 40}px) scale(1.2) rotate(${newX * 10}deg)`
    });

    $(".i2").css({
      transform: `translate(${newX * -20}px, ${newY * 40}px) scale(1.2) rotate(${newY * 10}deg)`
    });
  });
});


// 메인 정보 호버 시 on 클래스 토글
const mainInf = $('.main-infor li');
mainInf.on('mouseenter', function () {
  mainInf.removeClass('on');
  $(this).addClass('on');
});

// 섹션 스크롤 이동 관련 변수 초기화
const win = $(window);
const speed = Math.floor(win.height() * 1);
const gnb = $('.gnb li');
const sections = $('section');
const sideNav = $('.sideNav>li');
const topBtn = $('.sideNav-top');
const pogressWrap = $('.skill-list-item');
let isAnimation = false;
let winSCT;
let topArr = [];

// 특정 섹션으로 부드럽게 스크롤
function scrollToSection(index) {
  let section = sections.eq(index);
  let offset = section.offset().top;
  $('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
}

// 각 섹션 위치 저장 및 배경 클래스 추가
sections.each(function (i, section) {
  setTimeout(() => {
    $(section).addClass(`bg${i + 1}`);
  }, i * 1000);
  const sectionTop = $(this).offset().top;
  topArr.push(sectionTop);
});

// GNB 클릭 시 해당 섹션 이동 및 애니메이션 실행
// 사이드 네비도 동일하게 처리

// GNB 메뉴 클릭
gnb.on('click', function (e) {
  e.preventDefault();
  let index = $(this).index();
  scrollToSection(index);
  gnb.removeClass('on');
  $(this).addClass('on');
  sideNav.removeClass('on');
  sideNav.eq(index).addClass('on');
  sections.removeClass('on');
  sections.eq(index).addClass('on');
  progressAnimaition();
  pipScroll();
});

// 사이드 네비 클릭
sideNav.on('click', function (e) {
  e.preventDefault();
  let index = $(this).index();
  scrollToSection(index);
  gnb.removeClass('on');
  gnb.eq(index).addClass('on');
  sideNav.removeClass('on');
  $(this).addClass('on');
  sections.removeClass('on');
  sections.eq(index).addClass('on');
  progressAnimaition();
  pipScroll();
});

// 상단 이동 버튼 클릭 시 최상단으로 부드럽게 이동
// 버튼은 조건부로 보였다가 사라짐

// 초기 상태에서는 숨김
topBtn.stop().fadeOut();
topBtn.on('click', function (e) {
  e.preventDefault();
  $('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeOutCubic', function () {
    topBtn.fadeOut();
    isAnimation = false;
  });
});

// 스크롤 이벤트 처리
win.on('scroll', function () {
  winSCT = win.scrollTop();
  const scrollMiddle = winSCT + win.height() / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  $('.section-title').each(function (i) {
    const titleTop = $(this).offset().top;
    const distance = Math.abs(scrollMiddle - titleTop);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });

  // 중복 적용 방지 (선택된 섹션이 이미 활성화된 경우 무시)
  if (!sections.eq(closestIndex).hasClass('on')) {
    gnb.removeClass('on').eq(closestIndex).addClass('on');
    sideNav.removeClass('on').eq(closestIndex).addClass('on');
    sections.removeClass('on').eq(closestIndex).addClass('on');

    // 상단 버튼 노출
    if (winSCT > topArr[1] - speed) {
      topBtn.stop().fadeIn();
    } else {
      topBtn.stop().fadeOut();
    }

    // 스킬 애니메이션
    if (closestIndex === 2 && !isAnimation) {
      progressAnimaition();
      pipScroll();
      isAnimation = true;
    }

    // 4번째 섹션 애니메이션
    if (closestIndex === 3 && !sections.eq(3).hasClass('is-animated')) {
      sections.eq(3).addClass('is-animated');
    }
  }

  // GNB 고정
  winSCT > 800 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});




// 스킬 리스트 애니메이션 실행 함수
function progressAnimaition() {
  pogressWrap.each(function () {
    const $this = $(this);
    const progressBar = $this.find('.bar');
    const progressText = $this.find('.rate');
    const progressRate = progressText.attr("data-rate");
    const progressDot = $this.find('.progress-dot');

    progressBar.stop().width(0);

    progressBar.stop().animate({ width: `${progressRate}%` }, 2000);

    $({ rate: 0, left: 0 }).stop().animate(
      { rate: progressRate, left: `${progressRate}%` },
      {
        duration: 2000,
        step: function () {
          var nowRate = this.rate;
          var nowLeft = this.left;
          progressText.text(Math.floor(nowRate) + '%');
          progressDot.css("left", Math.floor(nowLeft) + "%");
        },
        complete: function () {
          isAnimation = true;
        }
      }
    );
  });
}

// 프로젝트 mockup 영역 스크롤 애니메이션 설정
function pipScroll(param) {
  const boxes = $('.project-frame');
  boxes.each(function () {
    const box = $(this);
    const device = box.find('.mockup.pc');
    const screen = device.find('.screen');
    const mask = device.find('.mask');
    const hightDifference = screen.innerHeight() - mask.innerHeight();

    box.on({
      mouseenter: function () {
        screen.stop().animate({ top: -hightDifference }, 2000);
      },
      mouseleave: function () {
        screen.stop().animate({ top: 0 }, 1000);
      }
    });
  });
}

// 윈도우 리사이즈 시에도 pipScroll 적용
win.on('resize', function () {
  pipScroll();
});

// 포트폴리오 필터 버튼 클릭 시 active 클래스 설정
const pfBtns = $('.portfolio-box-filter-links').find('button');
pfBtns.on('click', function () {
  pfBtns.removeClass('active');
  $(this).addClass('active');
});

// 필터 기능 - 선택된 카테고리만 보이게
function filterImages(category) {
  const gridItems = document.querySelectorAll('.work-item');
  gridItems.forEach(function (item) {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || category === itemCategory) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 전체 이미지 다시 보이게
function showAllImages() {
  const gridItems = document.querySelectorAll('.work-item');
  gridItems.forEach(function (item) {
    item.style.display = 'block';
  });
}

// 이미지 클릭 시 라이트박스 열기
const pics = $(".pic");
const lightbox = $("#lightbox");
const lightImg = $("#lightImage");

pics.on('click', function () {
  const bigLocation = $(this).attr("data-src");
  lightImg.load(bigLocation);
  lightbox.css('display', 'block');
  $('html').addClass('all_scrollFixed');
});

// 라이트박스 닫기
lightbox.on('click', function () {
  lightbox.css('display', 'none');
  $('html').removeClass('all_scrollFixed');
});

// 이력서 영역 테이블 토글 및 스타일 적용
const resumeLis = $('.resume-list-item');
const resumeBtns = $('.resume-kind, .ex-list-table-btn');
const resumeTable = $('.resume-list-table');
let resumeBtn = [];
const exTable = $('.ex-list-table');
resumeTable.hide();
exTable.hide();

// 첫 번째 테이블은 열림 상태로 시작
const firstTable = resumeLis.first().find('.resume-list-table, .ex-list-table');
firstTable.show();

// 이력서 항목 클릭 시 테이블 토글 및 스타일 변경
resumeBtns.on('click', function () {
  const listItem = $(this).closest('.resume-list-item');
  const table = listItem.find('.resume-list-table, .ex-list-table');
  const resumeKind = listItem.find('.resume-kind');
  listItem.toggleClass('active');
  table.toggle();
  if (listItem.hasClass('active')) {
    resumeKind.css('font-weight', '700');
  } else {
    resumeKind.css('font-weight', '');
  }
});
