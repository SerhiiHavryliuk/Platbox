'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Serhii on 25.03.2017.
 */

// =============================================================================
// Index Page (Slider), Animation Banner
// источники
// http://www.cyberforum.ru/javascript/thread1469237.html
// http://jsfiddle.net/amadey18/umnct7mo/5/
// http://ru.stackoverflow.com/questions/596246/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%B2%D0%BF%D1%80%D0%B0%D0%B2%D0%BE-%D0%B2%D0%BB%D0%B5%D0%B2%D0%BE-%D0%BA%D1%83%D1%80%D1%81%D0%BE%D1%80%D0%BE%D0%BC-%D0%BC%D1%8B%D1%88%D0%B8
// http://fot-tof.ru/Funkcional_nyj_slajder_bxSlider.htm
//
// animation circle
// https://jsfiddle.net/codeandcloud/3znuxaxs/
// http://progressbarjs.readthedocs.io/en/latest/api/shape/
// https://github.com/kimmobrunfeldt/progressbar.js?utm_source=recordnotfound.com
// dependencies:
//  - jQuery (jquery.com)
// =============================================================================

var FrondevoIndex = function () {
    function FrondevoIndex() {
        _classCallCheck(this, FrondevoIndex);

        this.methodsSlider = $('.pt__index-slider-methods');
        this.partnerslSlider = $('.pt__index-partners-slider');

        this.selectorPartnerslSliderLeft = $('.pb__index-slider-left');
        this.selectorPartnerslSliderRight = $('.pb__index-slider-right');

        this.x = 0;
        this.y = 0;
        this.timerId;

        // Animation ------------------------------------
        this.selectorImgPhone = $('.pt-index-img-phone');
        this.selectorImgMacbook = $('.pt-index-img-macbook');
        this.classForAnimationImgPhone = 'pt__index-animate-phone';
        this.classForAnimationImgMacbook = 'pt__index-animate-macbook';

        // Animation Circle------------------------------------
        this.coloranimationCircle = '#21b6f0';
        this.circle_1 = '';
        this.circle_2 = '';
        this.circle_3 = '';

        this._eventHandlersInit();
    }

    // Methods Slider -------------------------------------


    _createClass(FrondevoIndex, [{
        key: '_initModules',
        value: function _initModules() {

            $(this.methodsSlider).slick({
                slidesToShow: 9,
                slidesToScroll: 1,
                //cssEase: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
                //easing: 'ease-out',
                //cssEase: 'easeOutElastic',
                responsive: [{
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 6
                    }
                }, {
                    breakpoint: 750,
                    settings: "unslick"
                }]
            });

            // крайним картинкам делаем серый цвет
            var totai_active_slides = $('.slick-active').length - 1;
            var left_img = $('.slick-active').eq(0).find('img');
            var right_img = $('.slick-active').eq(totai_active_slides).find('img');

            $(left_img).css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
            $(right_img).css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });

            // Partnersl Slider -------------------------------------
            this.slider = this.partnerslSlider.bxSlider({
                pager: true,
                controls: false,
                mode: 'horizontal',
                useCSS: false,
                infiniteLoop: false,
                hideControlOnEnd: true,
                easing: 'easeInOutCirc',
                speed: 800
            });

            // AnimateCircle -----------------------------------------
            this._animateCircle_1("animate-circle-1");
            this._animateCircle_2("animate-circle-2");
            this._animateCircle_3("animate-circle-3");
        }
    }, {
        key: '_animateCircle_1',
        value: function _animateCircle_1(container_id) {

            var element = document.getElementById('animate-circle-1');
            this.circle_1 = new ProgressBar.Circle(element, {
                color: this.coloranimationCircle,
                trailColor: '#bcbcbc',
                trailWidth: 3,
                duration: 3000,
                easing: 'easeInOutCirc',
                strokeWidth: 3
            });

            //circle.animate(animatePercentage);
        }
    }, {
        key: '_animateCircle_2',
        value: function _animateCircle_2(container_id) {

            var element = document.getElementById('animate-circle-2');
            this.circle_2 = new ProgressBar.Circle(element, {
                color: this.coloranimationCircle,
                trailColor: '#bcbcbc',
                trailWidth: 3,
                duration: 3000,
                easing: 'easeInOutCirc',
                strokeWidth: 3
            });

            //circle.animate(animatePercentage);
        }
    }, {
        key: '_animateCircle_3',
        value: function _animateCircle_3(container_id) {

            var element = document.getElementById('animate-circle-3');
            this.circle_3 = new ProgressBar.Circle(element, {
                color: this.coloranimationCircle,
                trailColor: '#bcbcbc',
                trailWidth: 3,
                duration: 3000,
                easing: 'easeInOutCirc',
                strokeWidth: 3
            });

            //circle.animate(animatePercentage);
        }
    }, {
        key: '_moveImgSliderLeft',
        value: function _moveImgSliderLeft() {
            //каждые 900мс делаем клик вызывая события показ предыдущего слайда
            this.timerId = setInterval(function () {
                $('.slick-prev').click();
                //this._setGrayFilterOnTheSliderImg()
                //reset all filtres
                $('.slick-active img').css({ '-webkit-filter': 'grayscale(0%)', 'filter': 'grayscale(0%)' });

                // крайним картинкам делаем серый цвет
                var totai_active_slides = $('.slick-active').length - 1;
                var left_img = $('.slick-active').eq(0).find('img');
                var right_img = $('.slick-active').eq(totai_active_slides).find('img');

                $(left_img).css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
                $(right_img).css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
            }, 900);
        }
    }, {
        key: '_moveImgSliderRight',
        value: function _moveImgSliderRight() {
            this.timerId = setInterval(function () {
                $('.slick-next').click();
                //this._setGrayFilterOnTheSliderImg()
                //reset all filtres
                $('.slick-active img').css({ '-webkit-filter': 'grayscale(0%)', 'filter': 'grayscale(0%)' });

                // крайним картинкам делаем серый цвет
                var totai_active_slides = $('.slick-active').length - 1;
                var left_img = $('.slick-active').eq(0).find('img');
                var right_img = $('.slick-active').eq(totai_active_slides).find('img');

                $(left_img).css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
                $(right_img).css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
            }, 900);
        }
    }, {
        key: '_stopMoveImgSliderLeft',
        value: function _stopMoveImgSliderLeft() {
            clearInterval(this.timerId);
            //console.log('STOP move');
        }
    }, {
        key: '_showAnimation',
        value: function _showAnimation() {
            this.selectorImgPhone.addClass(this.classForAnimationImgPhone);
            this.selectorImgMacbook.addClass(this.classForAnimationImgMacbook);
        }

        // _setGrayFilterOnTheSliderImg() {
        //
        //     //reset all filtres
        //     $('.slick-active img').css({'-webkit-filter':'grayscale(0%)', 'filter': 'grayscale(0%)'});
        //
        //     // крайним картинкам делаем серый цвет
        //     let totai_active_slides = $('.slick-active').length - 1;
        //     let left_img =  $('.slick-active').eq(0).find('img');
        //     let right_img =  $('.slick-active').eq(totai_active_slides).find('img');
        //
        //     $(left_img).css({'-webkit-filter':'grayscale(100%)', 'filter': 'grayscale(100%)'});
        //     $(right_img).css({'-webkit-filter':'grayscale(100%)', 'filter': 'grayscale(100%)'});
        // }

    }, {
        key: '_scrolling',
        value: function _scrolling() {
            //console.log("_scrolling")
            var pageY = window.pageYOffset || document.documentElement.scrollTop,
                connectUpTop = $('.pt__index-connect-wrap').offset().top - 300;

            if (pageY > connectUpTop) {
                this._showAnimationConnectUp();
            }
            // если нужно обнулить анимацию
            // if (pageY < (connectUpTop - 300)) {
            //     this._resetAnimationConnectUp();
            // }
        }
    }, {
        key: '_showAnimationConnectUp',
        value: function _showAnimationConnectUp() {
            console.log("_showAnimationConnectUp");
            $('.pt__index-connect-img-iphone').addClass('pt__index-connect-iphone-animation');
            $('.pt__index-connect-img-card').addClass('pt__index-connect-iphone-card');
            //$(".pt__index-step-wrap").addClass('pt__index-step-wrap-animate');
            this.circle_1.animate(0.25);
            this.circle_2.animate(0.6);
            this.circle_3.animate(1);
        }

        // рабочий метод (если нужно обнулить анимацию) пока не используется
        // _resetAnimationConnectUp() {
        //     console.log("_resetAnimationConnectUp");
        //     $('.pt__index-connect-img-iphone').removeClass('pt__index-connect-iphone-animation');
        //     $('.pt__index-connect-img-card').removeClass('pt__index-connect-iphone-card');
        //     $(".pt__index-step-wrap").removeClass('pt__index-step-wrap-animate');
        // }


    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });

            // отслеживаем движение курсора мыши при наведение на крайние картинки
            this.selectorPartnerslSliderLeft.on('mouseenter', function (event) {
                return _this._moveImgSliderLeft(event);
            });
            this.selectorPartnerslSliderLeft.on('mouseout', function (event) {
                return _this._stopMoveImgSliderLeft(event);
            });

            this.selectorPartnerslSliderRight.on('mouseenter', function (event) {
                return _this._moveImgSliderRight(event);
            });
            this.selectorPartnerslSliderRight.on('mouseout', function (event) {
                return _this._stopMoveImgSliderLeft(event);
            });

            // Animation banner img after loading page
            $(window).on('load', function () {
                return _this._showAnimation();
            });

            $(window).on('scroll', function () {
                _this._scrolling();
            });

            //this.methodsSlider.on('beforeChange', (event) => this._setGrayFilterOnTheSliderImg(event));

        }
    }]);

    return FrondevoIndex;
}();

var index = new FrondevoIndex();