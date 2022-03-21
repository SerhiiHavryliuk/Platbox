/**
 * Created by Serhii on 28.03.2017.
 */

'use strict';

// =============================================================================
// Tabs for page product
//
// Анимация при скролле
// http://html5.by/blog/scroll-effects/
// demo http://html5.by/blogdemo/jQuery.Scroolly/demo/abstract.html
// https://github.com/chayka/jQuery.Scroolly
//
// dependencies:
//  - jQuery (jquery.com)
//  - script(src="js/models/ui/app_product-ui.js")
// =============================================================================


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlatBoxProduct = function () {
    function PlatBoxProduct() {
        _classCallCheck(this, PlatBoxProduct);

        this.selectorProductTabsElement = $('.pb-product__tab');
        this.selectorProductTabsContainer = $('.pb-product__tab-img');

        this.selectorProductTabsLink = $('.pb-product__tab .pb-product__tab-link');

        this.classProductTabsLinkActive = 'pb-product__tab-link_active';
        this.classProductTabsContainerActive = 'pb-product__solution-img_active';

        this.tabsContainer = $('.pb-product__solution-img');

        // Animation ------------------------------------
        this.selectorImgPhone = $('.pb-product__img-phone');
        this.selectorImgMacbook = $('.pb-product__img-ipad');
        this.classForAnimationImgPhone = 'pb-product__animate-phone';
        this.classForAnimationImgMacbook = 'pb-product__animate-ipad';

        // Animation ---------------------------------
        this.selectorImgCms = $('.pb-product__cms-img');

        this.pageY = '';
        this.connectUpTop = '';

        this._eventHandlersInit();
    }

    _createClass(PlatBoxProduct, [{
        key: '_initModules',
        value: function _initModules() {}
    }, {
        key: '_showCurrentTab',
        value: function _showCurrentTab(clicedLink) {
            var tabsName = $(clicedLink).attr('data-tabs-name');

            // Links menu
            this.selectorProductTabsLink.removeClass(this.classProductTabsLinkActive);
            $(clicedLink).find('.pb-product__tab-link').addClass(this.classProductTabsLinkActive);

            // Container
            this.selectorProductTabsContainer.removeClass(this.classProductTabsContainerActive);

            switch (tabsName) {
                case 'desctop':
                    this.tabsContainer.find("[data-tabs-name='desctop']").addClass(this.classProductTabsContainerActive);
                    break;
                case 'mobile':
                    this.tabsContainer.find("[data-tabs-name='mobile']").addClass(this.classProductTabsContainerActive);
                    break;
                case 'tv':
                    this.tabsContainer.find("[data-tabs-name='tv']").addClass(this.classProductTabsContainerActive);
                    break;
                default:
                    console.log('Таких имен табов нет');
            }
        }

        // Animation banner

    }, {
        key: '_showAnimation',
        value: function _showAnimation() {
            this.selectorImgPhone.addClass(this.classForAnimationImgPhone);
            this.selectorImgMacbook.addClass(this.classForAnimationImgMacbook);
        }
    }, {
        key: '_scrolling',
        value: function _scrolling() {
            //console.log("_scrolling");

            if (document.documentElement.clientWidth > 1366) {
                this.pageY = window.pageYOffset || document.documentElement.scrollTop;
                this.connectUpTop = $('.pb-product__integration').offset().top - 850;
            }

            if (document.documentElement.clientWidth > 1000 && document.documentElement.clientWidth < 1366) {
                this.pageY = window.pageYOffset || document.documentElement.scrollTop;
                this.connectUpTop = $('.pb-product__integration').offset().top - 600;
            }

            if (document.documentElement.clientWidth > 500 && document.documentElement.clientWidth < 1000) {
                this.pageY = window.pageYOffset || document.documentElement.scrollTop;
                this.connectUpTop = $('.pb-product__integration').offset().top - 700;
            }

            if (this.pageY > this.connectUpTop) {
                this._showAnimationIntegration();
            }
        }

        // Animation for block "Integration in one touch"

    }, {
        key: '_showAnimationIntegration',
        value: function _showAnimationIntegration() {
            var min_time = 200;
            var max_time = 4000;

            // рандомно показываем картинки

            var _loop = function _loop(i) {
                setInterval(function () {
                    $('.pb-product__cms-img').eq(i).addClass('pb-product__integration-img-animation');
                }, getRandomInt(min_time, max_time));
            };

            for (var i = 0; i < this.selectorImgCms.length; i++) {
                _loop(i);
            }

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });
            this.selectorProductTabsElement.on('click', function (event) {
                return _this._showCurrentTab(event.currentTarget);
            });
            this.selectorProductTabsElement.on('touchstart', function (event) {
                return _this._showCurrentTab(event.currentTarget);
            }); // for IOS скрываем выпадающий список при клике вне выпадающего списока

            // Animation banner img after loading page
            $(window).on('load', function () {
                return _this._showAnimation();
            });
            $(window).on('scroll', function () {
                return _this._scrolling();
            });
        }
    }]);

    return PlatBoxProduct;
}();

var platboxproduct = new PlatBoxProduct();