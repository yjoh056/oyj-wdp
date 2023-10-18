$(() => {

//title effect
$(document).ready(function () {
  let mouseX, mouseY;
  const ww = $(window).width();
  const wh = $(window).height();
  let traX, traY;
  const i1InitialTop = parseFloat($(".i1").css("top"));
  const i1InitialLeft = parseFloat($(".i1").css("left"));
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
    const newTop = i1InitialTop - (-newY * 80);
    const newLeft = i1InitialLeft - (newX * 10);
    const newTop2 = i2InitialTop - (newY * 90);
    const newLeft2 = i2InitialLeft - (newX * 5);
    $(".i1").css({ "top": newTop + "px", "left": newLeft + "px" });
    $(".i2").css({ "top": newTop2 + "px", "left": -newLeft2 + "px" });
  });
});

//nav
const win = $(window);
const gnb = $('.gnb li');
const sections = $('section');
const sideNav = $('.sideNav>li');

function scrollToSection(index){
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

	sct > 400 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});



});//jQuery