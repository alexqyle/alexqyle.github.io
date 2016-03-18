var colorID = Math.floor(Math.random() * 5); 
var color_header 	= ['#4acd1c', '#ff0f0f', '#2000e5', '#ba02e2', '#ffa800'];
var color_nav 		= ['#9fff72', '#ffc8c8', '#b5e0fb', '#ffbbff', '#fff6b7'];
var color_link 		= ['#34bb00', '#ff6b47', '#3a99f9', '#ff7bff', '#ffa53c'];
var color_cur 		= ['#008d00', '#ff2f1e', '#0075d0', '#e74cff', '#ff7a03'];
var color_title		= ['#358d19', '#c02317', '#0060aa', '#8b26b2', '#ce5100'];
var color_subtitle	= ['#58a93e', '#c04940', '#0076d1', '#bd58e3', '#e96800'];

var contentMinHeight = 0;
var imgSrc;

jQuery(document).ready(function() {
	randomColor();
	
	$('#nav').css('margin-left', $('#content').outerWidth() - 20);
	$('#content').css('margin-left', $('#content').outerWidth() - 20);
	
	stickHeader ();
	toggleContext ();
	contentMinHeight = $('#content').height();
	formatPage();
	
	if (parseInt($('#content').css('marginLeft'),10) > 0) {
		toggleContentSlide("#");
	}
	
	$(window).resize(function() {
		formatPage();
	});
	
	$('#nav').find('a').click(function(event) {
		event.preventDefault();
		var href = $(this).attr('href');
		if (href != "#") {
			toggleContentSlide(href);
		}
	});
	
	$('.img_gallery').find('img').click(function() {
		var isPoped = $('#img_popup').length > 0;
		if (isPoped) {
			$('#img_popup').remove();
		}
		else {
			imgSrc = $(this).attr('src');
			popupImg();
		}
	});

});

function stickHeader () {
	$('#header').waypoint({
		handler: function(direction) {
			if (direction == 'down') {
				$(this).css('position', 'fixed')
					   .css('top', '-110px');
				$('#nav').css('position', 'fixed')
						 .css('top', '90px');
				$('#content').css('margin-top', '200px');
			}
			else {
				$(this).css('position', 'absolute')
					   .css('top', '0px');
				$('#nav').css('position', 'absolute')
						 .css('top', '200px');
				$('#content').css('padding-top', '15px');
			}
		},
		offset: -110
	});
}

function toggleContext () {
	$('.withDetail').find('.contextBody').hide().end().find('.contextHeader').click(function() {
		var parent = $(this).parent();
		parent.find('.contextIntro').slideToggle(300, function() {
			contentMinHeight = $('#content').height();
		});
		parent.find('.contextBody').slideToggle(300, function() {
			$('#content').css("height", "auto")
			contentMinHeight = $('#content').height();
			formatPage();
		});
	});
	$('.withDetail').find('.contextBody').hide().end().find('.contextIntro').click(function() {
		var parent = $(this).parent();
		parent.find('.contextIntro').slideToggle(300, function() {
			contentMinHeight = $('#content').height();
		});
		parent.find('.contextBody').slideToggle(300, function() {
			$('#content').css("height", "auto")
			contentMinHeight = $('#content').height();
			formatPage();
		});
	});
}

function toggleContentSlide(href) {
	$('#content').animate({
		marginLeft: parseInt($('#content').css('marginLeft'),10) == 0 ? $('#content').outerWidth() - 20 : 0
	});
	$('#nav').animate({
		marginLeft: parseInt($('#content').css('marginLeft'),10) == 0 ? $('#content').outerWidth() - 20 : 0
	}, {complete: function() {
		if (href != "#") {
			window.location = href;
		}
	}});
}

function formatPage() {
	var windowHeight = $(window).height();
	//console.log("contentMinHeight: " + contentMinHeight);
	var newHeight = contentMinHeight < windowHeight - 215 ? windowHeight - 215 : contentMinHeight;
	$('#nav').css('height', newHeight);
	$('#content').css('height', newHeight);
	
	var scrollWidth = scrollbarWidth();	
	//console.log("scrollWidth: " + scrollWidth);
	var windowWidth = $(window).width() + scrollWidth;
	//console.log("windowWidth: " + $(window).width());
	
	var margin = (windowWidth - $('#page').width()) / 2;
	margin = margin > 0 ? margin : 0;
	$('#page').css('marginLeft', margin);
	
	var isPoped = $('#img_popup').length > 0;
	if (isPoped) {
		$('#img_popup').css('height', $(window).height())
					   .css('width', $(window).width());
		resizePopupImg();
	}
}

function randomColor() {
	var newColor;
	switch (colorID) {
		case 0: newColor = "green"; break;
		case 1: newColor = "red"; break;
		case 2: newColor = "blue"; break;
	}
	$('.random_color').each(function() {
		$(this).addClass(newColor);
	});
	//colorID = 1;
	updateColor();
}

function updateColor() {
	$('#header').css('background-color', color_header[colorID]);
	$('#nav').css('background-color', color_nav[colorID]);
	$('.contextHeader').css('color', color_title[colorID]);
	$('.contextIntro').css('color', color_subtitle[colorID]);
	$('.contextBody').find('.def').css('color', color_subtitle[colorID]);
	$('td.subtitle').css('color', color_subtitle[colorID]);
	drawNavBG();
	drawNavShade();
}

function drawNavBG() {
	var canvas = $('.nav_bg');
	for (var i = 0; i < canvas.length; i++) {
		var c = canvas[i].getContext("2d");
		var isCurrent = canvas[i].className == "nav_bg current";
		if (isCurrent) {
			c.fillStyle = color_cur[colorID];
			c.lineWidth = 2;
			c.strokeStyle= "white";
		}
		else {
			c.fillStyle = color_link[colorID];		
		}
		c.beginPath();
		c.moveTo(0, 0);
		c.lineTo(190, 0);
		c.lineTo(210, 30);
		c.lineTo(20, 30);
		c.closePath();
		c.fill();
		if (isCurrent) {
			c.stroke(); 
			c.fillStyle = "white";
			c.beginPath();
			c.moveTo(160, 0);
			c.lineTo(190, 0);
			c.lineTo(210, 30);
			c.lineTo(180, 30);
			c.closePath();
			c.fill();
		}
	}
}

function drawNavShade() {
	var canvas = $('.nav_sd');
	for (var i = 0; i < canvas.length; i++) {
		var c = canvas[i].getContext("2d");
		c.fillStyle = "rgba(0, 0, 0, 0.2)";
		c.beginPath();
		c.moveTo(5, 4);
		c.lineTo(195, 4);
		c.lineTo(215, 34);
		c.lineTo(25, 34);
		c.closePath();
		c.shadowColor = '#222222';
		c.shadowBlur = 2;
		c.shadowOffsetX = 2;
		c.shadowOffsetY = 1;
		c.fill();
	}
}

function popupImg() {
	//console.log(imgSrc);
	var newPopup = '<div id="img_popup"></div>';
	$('#page').after(newPopup);
	var popup = $('#img_popup');
	popup.css('display', 'none')
		 .css('height', $(window).height())
		 .css('width', $(window).width())
		 .css('background-image', ('url(' + imgSrc + ')'));
	resizePopupImg();
	popup.fadeIn(300);
	popup.click(function() {
		$(this).fadeOut(500, function() {
			$(this).remove();
		});
	});
}

function resizePopupImg() {
	var bgImg = $('<img />');
	bgImg.hide();
	bgImg.bind('load', function()
	{
		var imgHeight = $(this).height();
		var imgWidth = $(this).width();
		var divHeight = $('#img_popup').height();
		var divWidth = $('#img_popup').width();
		var imgRatio = imgWidth / imgHeight;
		if (imgHeight > divHeight * 0.8) {
			imgHeight = divHeight * 0.8;
			imgWidth = imgHeight * imgRatio;
		}
		if (imgWidth > divWidth * 0.8) {
			imgWidth = divWidth * 0.8;
			imgHeight = imgWidth / imgRatio;
		}
		var newValue = imgWidth + 'px ' + imgHeight + 'px';
		//console.log(newValue);
		$('#img_popup').css('background-size', newValue);
		$(this).remove();
	});
	bgImg.attr('src', imgSrc);
	$('#img_popup').append(bgImg);
}

function scrollbarWidth() {
	//console.log("bodyHeight: " + $('body').height());
	//console.log("windowHeight: " + $(window).height());
	if( $('body').height() > $(window).height()) {
		//console.log("See scrollbar!!");
		var div = '<div id="s_outter" style="width:50px;height:50px;overflow:scroll;position:absolute;top:-200px;left:-200px;"><div id="s_inner" style="height:100px;width:100%;"></div></div>';
		$('body').prepend(div);
		var w1 = $('#s_outter').width();
		var w2 = $('#s_inner').innerWidth();
		$('#s_outter').remove();
		return (w1 - w2);
	}
	return 0;
}
