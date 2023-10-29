$(document).on('mousemove', function (e) {
  $('.custom-cursor').css({
    top: e.clientY,
    left: e.clientX
  });
});


const animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: 'logo.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
})
const scrollAnimation = bodymovin.loadAnimation({
  container: document.getElementById('msc'), // Required
  path: 'scroll.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
})



//
//title effect
//
$(document).ready(function () {
  let mouseX, mouseY;
  const ww = $(window).width();
  const wh = $(window).height();
  let traX, traY;
  const i1InitialTop = parseFloat($(".i1").css("top"));
  const i1InitialRight = parseFloat($(".i1").css("right"));
  const i2InitialTop = parseFloat($(".i2").css("top"));
  const i2InitialLeft = parseFloat($(".i2").css("left"));




  //photo icon
  $(document).mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = ((4 * mouseX) / 570) + 30;
    traY = ((4 * mouseY) / 570) + 40;
    // console.log(traX);
    $(".title").css({ "background-position": traX + "%" + traY + "%" });
    newX = ((2 * mouseX) / ww) - 0.5;
    newY = ((2 * mouseY) / wh) - 0.5;
    const newTop = i1InitialTop - (newY * 50);
    const newRight = i1InitialRight - (newX * 5);
    const newTop2 = i2InitialTop - (-newY * 50);
    const newLeft = i2InitialLeft - (newX * 5);
    $(".i1").css({ "top": newTop + "px", "right": newRight + "px" });
    $(".i2").css({ "top": newTop2 + "px", "left": newLeft + "px" });
  });
});
const mainInf = $('.main-infor li');
mainInf.on('mouseenter', function () {
  mainInf.removeClass('on');
  $(this).addClass('on');
})

//
//scroll section(nev/gnb)
//
const win = $(window);
const speed = Math.floor(win.height() * 0.9);
const gnb = $('.gnb li');
const sections = $('section');
const sideNav = $('.sideNav>li');
const topBtn = $('.sideNav-top');
const pogressWrap = $('.skill-list-item');
let isAnimation = false;
let winSCT;
let topArr = [];


function scrollToSection(index) {
  let section = sections.eq(index);
  let offset = section.offset().top;
  $('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
}
sections.each(function (i, section) {
  setTimeout(() => {
      $(section).addClass(`bg${i + 1}`);
  }, i * 1000);
  const sectionTop = $(this).offset().top;
  topArr.push(sectionTop);
});

gnb.on({
  click: function (e) {
    e.preventDefault();
    let index = $(this).index();
    scrollToSection(index);
    progressAnimaition();
    pipScroll();
  },
});
sideNav.on({
  click: function (e) {
    e.preventDefault();
    let index = $(this).index();
    scrollToSection(index);
    progressAnimaition();
    pipScroll();
  },
});

topBtn.stop().fadeOut();
topBtn.on('click', function (e) {
  e.preventDefault();
  $('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeOutCubic', function () {
    topBtn.fadeOut();
    isAnimation = false;
  });
});


win.on('scroll', function () {
  winSCT = win.scrollTop();
  sections.each(function (i) {
    if (winSCT >= sections.eq(i).offset().top - 300) {
      gnb.removeClass('on');
      gnb.eq(i).addClass('on').siblings().removeClass('on');
      sideNav.eq(i).addClass('on').siblings().removeClass('on');
      sections.eq(i).addClass('on').siblings().removeClass('on');
      if (winSCT > topArr[1] - speed) {
        topBtn.stop().fadeIn();
      }
      if (winSCT > topArr[2] - speed && !isAnimation) {
        progressAnimaition();
        isAnimation = true;
        pipScroll();
      }
      if (winSCT > topArr[3] - speed && !isAnimation) {
        if (!sections.eq(3).hasClass('is-animated')) {
          sections.eq(3).addClass('is-animated');
        }
        
      }

    }

  });

  winSCT > 800 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');

});


// skill scroll
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





//
// resume
//
const resumeLis = $('.resume-list-item');
const resumeBtns = $('.resume-kind, .ex-list-table-btn'); // .
const resumeTable = $('.resume-list-table');
let resumeBtn = [];

const exTable = $('.ex-list-table');
resumeTable.hide();
exTable.hide();

// 첫 번째 테이블을 열린 상태로 초기화
const firstTable = resumeLis.first().find('.resume-list-table, .ex-list-table');
firstTable.show();

// 클릭 이벤트 핸들러
resumeBtns.on('click', function () {
  const listItem = $(this).closest('.resume-list-item');
  const table = listItem.find('.resume-list-table, .ex-list-table');
  const resumeKind = listItem.find('.resume-kind');
  listItem.toggleClass('active');
  table.toggle();
  if (listItem.hasClass('active')) {
    resumeKind.css('font-weight', '700'); // 활성화된 상태에서는 글꼴 두께를 700으로 설정
  } else {
    resumeKind.css('font-weight', ''); // 비활성화된 상태에서는 글꼴 두께를 초기화
  }
});


//
//project
//
function pipScroll(param) {
  const boxes = $('.project-frame');
  boxes.each(function () {
    const box = $(this);
    const device = box.find('.mockup.pc');
    const screen = device.find('.screen');
    const mask = device.find('.mask');
    const hightDifference = screen.innerHeight() - mask.innerHeight();
// console.log(screen.innerHeight);
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

win.on('resize', function () {
  pipScroll();
});

//
//portfolio
//

const pfBtns = $('.portfolio-box-filter-links').find('button');
pfBtns.on('click', function () {
  pfBtns.removeClass('active');
  $(this).addClass('active');
});



function filterImages(category) {
  const grid = document.querySelector('.portfolio-box-work');
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

function showAllImages() {
  const gridItems = document.querySelectorAll('.work-item');

  gridItems.forEach(function (item) {
    item.style.display = 'block';
  });
}

const pics=$(".pic");
const lightbox=$("#lightbox");
const lightImg=$("#lightImage");

pics.on('click',function(){
    const bigLocation=$(this).attr("data-src");
    lightImg.load(bigLocation);
    lightbox.css('display', 'block');
    $('html').addClass('all_scrollFixed');
})

lightbox.on('click',function(){
    lightbox.css('display', 'none');
    $('html').removeClass('all_scrollFixed');
})