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
//nav scroll
//
const win = $(window);
const gnb = $('.gnb li');
const sections = $('section');
const sideNav = $('.sideNav>li');
const topBtn = $('.sideNav-top');


function scrollToSection(index) {
  let section = sections.eq(index);
  console.log(section);
  let offset = section.offset().top;
  $('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
}

gnb.on({
  click: function (e) {
    e.preventDefault();
    let index = $(this).index();
    scrollToSection(index);
    progressAnimaition();
  },
});
sideNav.on({
  click: function (e) {
    e.preventDefault();
    let index = $(this).index();
    scrollToSection(index);
    progressAnimaition();
  },
});

topBtn.stop().fadeOut();
topBtn.on('click', function (e) {
  e.preventDefault();
  $('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeOutCubic', function() {
    topBtn.fadeOut(); 
  });
});


win.on('scroll', function () {
  let sct = win.scrollTop();

  sections.each(function (i) {
    if (sct >= sections.eq(i).offset().top - 300) {
      gnb.removeClass('on');
      gnb.eq(i).addClass('on').siblings().removeClass('on');
      sideNav.eq(i).addClass('on').siblings().removeClass('on');
      sections.eq(i).addClass('on').siblings().removeClass('on');
      if ( i >= 1 ) {
        topBtn.stop().fadeIn();
      } 
      if (i === 3) {
        progressAnimaition();
      }

    }

  });

  sct > 800 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');

});

// skill scroll
const pogressWrap = $('.skill-list-item');
const animationOST = $('.skill').offset().top - 600;
let isAnimation = false;

win.on("scroll", function () {
  let sct2 = win.scrollTop();

  if (sct2 >= animationOST && !isAnimation) {
    progressAnimaition();
    isAnimation = true;
  }
});


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

  listItem.toggleClass('active');
  table.toggle();
});


