/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/
"use strict";

var iPhone = $('.iPhone-wrapper'),
    slideWrapper = $('.iPhone-slides'),
    themeWrapper = $('themes-wrapper'),
    winHeight,
    phoneHeight,
    themeIndex = 1,
    colors = ["7db3b8", "df6e51", "005670", "87cbd8", "b9ce6c", "cc545a"],
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


$(document).ready(function () {

    var calculate = function () {
        winHeight = $(window).height();
        phoneHeight = iPhone.height();
        console.log(winHeight + "__" + phoneHeight + "__" + retina);
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


            }

            if ((index === 2) && (direction === "down")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
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

            }

            if ((index === 3) && (direction === "up")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
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
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(3).addClass('active');
            }

            if ((index === 4) && (direction === "up")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(2).addClass('active');
            }

            if ((index === 4) && (direction === "down")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(4).addClass('active');
            }

            if ((index === 5) && (direction === "up")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(3).addClass('active');
            }

            if ((index === 5) && (direction === "down")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(5).addClass('active');
            }

            if ((index === 6) && (direction === "up")) {
                $('.arrow').animate({
                    "bottom": "20px",
                    opacity: 1
                }, 300);
                $('.bullets li.active').removeClass('active');
                $('.bullets li').eq(4).addClass('active');
            }

        }
    });

});
