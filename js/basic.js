//title effect
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

//nav
const win = $(window);
const gnb = $('.gnb li');
const sections = $('section');
const sideNav = $('.sideNav>li');

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
  },
});
sideNav.on({
  click: function (e) {
    e.preventDefault();
    let index = $(this).index();
    scrollToSection(index);
  },
});
win.on('scroll', function () {
  let sct = win.scrollTop();
  sections.each(function (i) {
    if (sct >= sections.eq(i).offset().top - 300) {
      gnb.removeClass('on')
      gnb.eq(i).addClass('on').siblings().removeClass('on');
      sideNav.eq(i).addClass('on').siblings().removeClass('on');
      sections.eq(i).addClass('on').siblings().removeClass('on');

    }
  });

  sct > 800 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});


// resume
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

  if (!listItem.hasClass('active')) {
    listItem.addClass('active');
    const table = listItem.find('.resume-list-table, .ex-list-table');
    table.hide();
  } else {
    resumeLis.removeClass('active');
    const table = listItem.find('.resume-list-table, .ex-list-table');
    table.show();
  }
});


