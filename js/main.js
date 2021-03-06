/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/
"use strict";

var iPhone = $('.iPhone-wrapper'),
    slideWrapper = $('.iPhone-slides'),
    themesWrapper = $('.themes-wrapper'),
    lastTimeChecked = 0,
    winHeight,
    phoneHeight,
    themesHeight,
    themeIndex = 1,
    colors = ["#7db3b8", "#df6e51", "#005670", "#87cbd8", "#b9ce6c", "#cc545a"],
    scale = '',
    initialTopPos = 50,
    retina = window.devicePixelRatio > 1,
    resizing = false;
// #7db3b8 - cloudy skyblue
// #df6e51 - cloudy tomato
// #005670 - dark turquoise
// #87cbd8 - light skyblue
// #b9ce6c - light pickled
// #cc545a - cloudy crimson

$.fn.rotate = function (angle, duration, reverse) {
    var args = $.speed(duration),
        step = args.step;

    return this.each(function (i, e) {
        args.step = function (now) {
            if (reverse) {
                now = 90 - now;
            }
            $.style(e, 'transform', 'rotate(' + now + 'deg)' + scale);
            if (step) {
                return step.apply(this, arguments);
            }
        };
        $({deg: 0}).animate({deg: angle}, args);
    });
};

var resetTheme = function () {
    if (themeIndex === 0) {
        themesWrapper.find('.fifth').css("background-color", colors[4]);
        themesWrapper.find('.fourth').css("background-color", colors[3]);
        themesWrapper.find('.third').css("background-color", colors[2]);
        themesWrapper.find('.second').css("background-color", colors[1]);
        themesWrapper.find('.first').css("background-color", colors[0]);
    }
    if (themeIndex === 1) {
        themesWrapper.find('.fifth').css("background-color", colors[5]);
        themesWrapper.find('.fourth').css("background-color", colors[4]);
        themesWrapper.find('.third').css("background-color", colors[3]);
        themesWrapper.find('.second').css("background-color", colors[2]);
        themesWrapper.find('.first').css("background-color", colors[1]);
    }
    if (themeIndex === 2) {
        themesWrapper.find('.fifth').css("background-color", colors[0]);
        themesWrapper.find('.fourth').css("background-color", colors[5]);
        themesWrapper.find('.third').css("background-color", colors[4]);
        themesWrapper.find('.second').css("background-color", colors[3]);
        themesWrapper.find('.first').css("background-color", colors[2]);
    }
    if (themeIndex === 3) {
        themesWrapper.find('.fifth').css("background-color", colors[1]);
        themesWrapper.find('.fourth').css("background-color", colors[0]);
        themesWrapper.find('.third').css("background-color", colors[5]);
        themesWrapper.find('.second').css("background-color", colors[4]);
        themesWrapper.find('.first').css("background-color", colors[3]);
    }
    if (themeIndex === 4) {
        themesWrapper.find('.fifth').css("background-color", colors[2]);
        themesWrapper.find('.fourth').css("background-color", colors[1]);
        themesWrapper.find('.third').css("background-color", colors[0]);
        themesWrapper.find('.second').css("background-color", colors[5]);
        themesWrapper.find('.first').css("background-color", colors[4]);
    }
    if (themeIndex === 5) {
        themesWrapper.find('.fifth').css("background-color", colors[3]);
        themesWrapper.find('.fourth').css("background-color", colors[2]);
        themesWrapper.find('.third').css("background-color", colors[1]);
        themesWrapper.find('.second').css("background-color", colors[0]);
        themesWrapper.find('.first').css("background-color", colors[5]);
    }
    themeIndex += 1;
    if (themeIndex >= colors.length) {
        themeIndex = 0;
    }
};

var showNextTheme = function () {
    var now = new Date().getTime();
    if (now - lastTimeChecked > 2000) {
        lastTimeChecked = new Date().getTime();
        if (themesWrapper.is(":visible")) {
            slideWrapper.css("background-color", colors[themeIndex]);
            themesWrapper.find(".first").animate({
                "margin-left": "-160px"
            }, function () {
                $(this).css("margin-left", "30px");
                resetTheme();
            });
        }
    }
    setTimeout(showNextTheme, 2000);
};

resetTheme();

$(document).ready(function () {

    var calculate = function () {
        winHeight = $(window).height();
        phoneHeight = iPhone.height();
        themesHeight = themesWrapper.height();
        if (phoneHeight > winHeight) {
            scale = ' scale(0.8)';
            iPhone.css({
                "-webkit-transform": "scale(0.8)",
                "transform": "scale(0.8)"
            });
            phoneHeight = phoneHeight * 0.8;
            initialTopPos = winHeight / 2 - phoneHeight * 0.62;
        } else {
            initialTopPos = winHeight / 2 - phoneHeight / 2;
        }
        iPhone.css("margin-top", initialTopPos);

        $('.page4 .content').height(winHeight - 100);

        themesWrapper.css("margin-top", winHeight / 2 - 316 / 2);
        console.log(winHeight + "__" + phoneHeight + "__" + themesHeight + "__" + retina);
    };

    calculate();

    $('.fullpage').fullpage({
        verticalCentered: true,
        scrollingSpeed: 700,
        easing: 'easeInOutCubic',
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex === 0) {
                return false;
            }

            if ((index === 1) && (direction === "down")) {
                $("div.arrow").animate({
                    "bottom": "0px",
                    opacity: 0
                }, 300);
                $('.page1 .inner').fadeOut(700);
                $('.page2 .inner').show();
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(1).addClass('active');
                $('.iPhone-wrapper').animate({
                    "margin-left": "450px"
                }, 700);

                $('.fp-slides img.first').fadeOut(700, function () {
                    $(this).removeClass('active');
                });
                $('.fp-slides img.fifth').fadeIn(700, function () {
                    $(this).addClass('active');
                });

                themesWrapper.delay(500).fadeIn(300, function () {
                    showNextTheme();
                    setTimeout(showNextTheme, 500);
                });

            }

            if ((index === 2) && (direction === "up")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.page2 .inner').fadeOut(700);
                $('.page1 .inner').show();
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(0).addClass('active');
                $('.iPhone-wrapper').animate({
                    "margin-left": "50px"
                }, 700);

                $('.fp-slides img.fifth').fadeOut(700, function () {
                    $(this).removeClass('active');
                });
                $('.fp-slides img.first').fadeIn(700, function () {
                    $(this).addClass('active');
                });

                themesWrapper.fadeOut(300);
            }

            if ((index === 2) && (direction === "down")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(2).addClass('active');
                $('.page2 .inner').fadeOut(700);
                $('.page3 .inner').show();

                $('.iPhone-wrapper').rotate(90, 700);
                $('.iPhone-wrapper').animate({
                    "margin-left": "340px",
                    "margin-top": (initialTopPos - 100) + "px"
                }, 700);

                $('.fp-slides img.fifth').fadeOut(700, function () {
                    $(this).removeClass('active');
                });
                $('.fp-slides img.third').fadeIn(700, function () {
                    $(this).addClass('active');
                });

                themesWrapper.fadeOut(300);

            }

            if ((index === 3) && (direction === "up")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(1).addClass('active');
                $('.page3 .inner').fadeOut(700);
                $('.page2 .inner').show();

                $('.iPhone-wrapper').rotate(90, 700, true);
                $('.iPhone-wrapper').animate({
                    "margin-left": "450px",
                    "margin-top": (initialTopPos) + "px"
                }, 700);

                $('.fp-slides img.third').fadeOut(700, function () {
                    $(this).removeClass('active');
                });
                $('.fp-slides img.fifth').fadeIn(700, function () {
                    $(this).addClass('active');
                });

            }

            if ((index === 3) && (direction === "down")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(3).addClass('active');

                $('.iPhone-wrapper').animate({
                    "margin-top": (initialTopPos + 200) + "px"
                });

                $('.iPhone-wrapper img.third').fadeOut(700, function () {
                    $(this).removeClass('active');
                });
                $('.iPhone-wrapper img.second').fadeIn(700, function () {
                    $(this).addClass('active');
                });

                $('.iPhone-wrapper').rotate(90, 700, true);

                $('.page3 .content').fadeOut(700);
                $('.page4 .content').show();
            }

            if ((index === 4) && (direction === "up")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(2).addClass('active');

                $('.iPhone-wrapper').animate({
                    "margin-top": (initialTopPos - 100) + "px",
                    "margin-left": "340px"
                });

                $('.iPhone-wrapper img.second').fadeOut(700, function () {
                    $(this).removeClass('active');
                });
                $('.iPhone-wrapper img.third').fadeIn(700, function () {
                    $(this).addClass('active');
                });

                $('.iPhone-wrapper').rotate(90, 700);

                $('.page4 .content').fadeOut(700);
                $('.page3 .content').show();
            }

            if ((index === 4) && (direction === "down")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(4).addClass('active');

                $('.page4 .inner').fadeOut(700);
                $('.page5 .inner').show();

                $('.iPhone-wrapper').animate({
                    "margin-top": initialTopPos + "px",
                    "margin-left": "60px"
                }, 700);

                $('.iPhone-wrapper img.second').fadeOut(function () {
                    $(this).removeClass('active');
                });
                $('.iPhone-wrapper img.fourth').fadeIn(function () {
                    $(this).addClass('active');
                    $(this).delay(500).animate({
                        "margin-left": "-220px"
                    }, 400);
                });
            }

            if ((index === 5) && (direction === "up")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(3).addClass('active');

                $('.page5 .inner').fadeOut(700);
                $('.page4 .inner').show();

                $('.iPhone-wrapper').animate({
                    "margin-left": "340px",
                    "margin-top": (initialTopPos + 200) + "px"
                }, 700);

                $('.iPhone-wrapper img.fourth').animate({
                    "margin-left": "0px"
                }, 400, function () {
                    $('.iPhone-wrapper img.fourth').fadeOut(700, function () {
                        $(this).removeClass('active');
                    });
                    $('.iPhone-wrapper img.second').fadeIn(700, function () {
                        $(this).addClass('active');
                    });
                });

            }

            if ((index === 5) && (direction === "down")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(5).addClass('active');

                $('.page5 .inner').fadeOut(900);
                $('.page6 .inner').show();

                $('.iPhone-wrapper').animate({
                    "margin-top": "-800px"
                }, 700, function () {
                    $('.main-footer').animate({
                        "bottom": "0"
                    }, 300, "swing");
                });
            }

            if ((index === 6) && (direction === "up")) {
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(4).addClass('active');

                $('.page6 .inner').fadeOut(900);
                $('.page5 .inner').show();

                $('.main-footer').animate({
                    "bottom": "-220px"
                }, 300, "swing", function () {
                    $('.iPhone-wrapper').animate({
                        "margin-top": initialTopPos + "px"
                    }, 700);
                });

                $('.iPhone-wrapper img.second').fadeOut(function () {
                    $(this).removeClass('active');
                });
                $('.iPhone-wrapper img.fourth').fadeIn(function () {
                    $(this).addClass('active');
                    $(this).delay(500).animate({
                        "margin-left": "-220px"
                    }, 400);
                });


            }

        }
    });

});
