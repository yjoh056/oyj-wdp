$(window).on('load', function () {
  $('.loading-overlay').fadeOut('easein');
  $('.loading-spinner').fadeOut('easein');
});
const loadaAni = bodymovin.loadAnimation({
  container: document.getElementById('spinner'),
  path: 'loding.json',
  renderer: 'svg',
  loop: true,
  autoplay: true
});

$(document).on('mousemove', function (e) {
  $('.custom-cursor').css({
    top: e.clientY,
    left: e.clientX
  });
});

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

const animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'),
  path: 'logo.json',
  renderer: 'svg',
  loop: true,
  autoplay: true
});

const scrollAnimation = bodymovin.loadAnimation({
  container: document.getElementById('msc'),
  path: 'scroll.json',
  renderer: 'svg',
  loop: true,
  autoplay: true
});

$(document).ready(function () {
  let mouseX, mouseY;
  const ww = $(window).width();
  const wh = $(window).height();
  let traX, traY;

  $(document).mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = ((4 * mouseX) / 570) + 30;
    traY = ((4 * mouseY) / 570) + 40;
    $(".title").css({ "background-position": traX + "%" + traY + "%" });
    newX = ((2 * mouseX) / ww) - 0.5;
    newY = ((2 * mouseY) / wh) - 0.5;
    $(".i1").css({ "top": i1InitialTop - (newY * 50) + "px", "right": i1InitialRight - (newX * 5) + "px" });
    $(".i2").css({ "top": i2InitialTop - (-newY * 50) + "px", "left": i2InitialLeft - (newX * 5) + "px" });
  });
});

const mainInf = $('.main-infor li');
mainInf.on('mouseenter', function () {
  mainInf.removeClass('on');
  $(this).addClass('on');
});

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

gnb.on('click', function (e) {
  e.preventDefault();
  let index = $(this).index();
  scrollToSection(index);
  progressAnimaition();
  pipScroll();
});

sideNav.on('click', function (e) {
  e.preventDefault();
  let index = $(this).index();
  scrollToSection(index);
  progressAnimaition();
  pipScroll();
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
    if (winSCT >= sections.eq(i).offset().top - speed) {
      gnb.removeClass('on');
      gnb.eq(i).addClass('on').siblings().removeClass('on');
      sideNav.eq(i).addClass('on').siblings().removeClass('on');
      sections.eq(i).addClass('on').siblings().removeClass('on');
      if (winSCT > topArr[1] - speed) {
        topBtn.stop().fadeIn();
      }
      if (winSCT > topArr[2] - (speed + 20) && !isAnimation) {
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

win.on('resize', function () {
  pipScroll();
});

const pfBtns = $('.portfolio-box-filter-links').find('button');
pfBtns.on('click', function () {
  pfBtns.removeClass('active');
  $(this).addClass('active');
});

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

function showAllImages() {
  const gridItems = document.querySelectorAll('.work-item');
  gridItems.forEach(function (item) {
    item.style.display = 'block';
  });
}

const pics = $(".pic");
const lightbox = $("#lightbox");
const lightImg = $("#lightImage");

pics.on('click', function () {
  const bigLocation = $(this).attr("data-src");
  lightImg.load(bigLocation);
  lightbox.css('display', 'block');
  $('html').addClass('all_scrollFixed');
});

lightbox.on('click', function () {
  lightbox.css('display', 'none');
  $('html').removeClass('all_scrollFixed');
});

const resumeLis = $('.resume-list-item');
const resumeBtns = $('.resume-kind, .ex-list-table-btn');
const resumeTable = $('.resume-list-table');
let resumeBtn = [];

const exTable = $('.ex-list-table');
resumeTable.hide();
exTable.hide();

const firstTable = resumeLis.first().find('.resume-list-table, .ex-list-table');
firstTable.show();

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
