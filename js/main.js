'use strict';

// =============================================================================
// получаем больше товаров и/или статей
// может запрашивать данные с учетом активных фильтров и выбранного типа сортировки
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoGetCatalogItems = function () {
    function FrondevoGetCatalogItems(urlGetMore) {
        _classCallCheck(this, FrondevoGetCatalogItems);

        this.urlGetMore = urlGetMore;
    }

    _createClass(FrondevoGetCatalogItems, [{
        key: 'checkIsAnyProductsCanBeLoaded',
        value: function checkIsAnyProductsCanBeLoaded(currentPageOfItemsList) {

            if (currentPageOfItemsList != 'none') {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'getItems',
        value: function getItems(sendingData) {

            var promise = $.Deferred();

            $.ajax({
                'type': 'get',
                'dataType': 'json',
                'url': this.urlGetMore,
                'data': sendingData
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }]);

    return FrondevoGetCatalogItems;
}();
"use strict";

// =============================================================================
// custom select plugin
// depends: jquery.js
// example init -  $(".select-custom").customSelect();
// =============================================================================

(function ($) {

    $.fn.customSelect = function (options) {

        this.each(function () {

            var sel = $(this);
            if (sel.attr('disabled')) sel.wrap("<div class='custom-select-wrap custom-select-wrap_disabled'></div>");else sel.wrap("<div class='custom-select-wrap'></div>");

            sel.before("<div class='custom-select-text'></div>");

            var o = sel.parent(".custom-select-wrap"),
                txt = o.find(".custom-select-text");

            txt.text(sel.find("option:selected").text());

            $(this).change(function () {
                txt.text(sel.find("option:selected").text());
            });

            $(this).focus(function () {
                o.addClass("focus");
            });

            $(this).blur(function () {
                o.removeClass("focus");
            });
        });

        return this;
    };
})($);
'use strict';

// =============================================================================
// behaviours for top navigation
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoTopNav = function () {
    function FrondevoTopNav(elTopNav) {
        _classCallCheck(this, FrondevoTopNav);

        this.topNav = elTopNav;
        this.topNavUl = this.topNav.find('ul').eq(0); // необходимо для избавления от мигания меню при переходе с пункта на пункт

        // при инициализации добавляем класс, чтобы при первом показе под меню, оно показалось с аниацией
        // после показа первого пункта класс, убираем, чтобы при переходе по смежным пунктам не было миганий
        this.arrTopNavSubMenu = this.topNavUl.find('.h-menu-dd__layout-sub-menu');
        this.elForShowMobMenu = $('#h-menu-dd__show-menu'); // чекбокс если включен - показывается меню

        this.classForAnimationSubMenu = 'h-menu-dd__layout-sub-menu_animation';
        this.globalNoScrollClass = 'noscroll';
        this.mobileSubMenuOpenClass = 'h-menu__item-open';
        this.firstLevelMenuItemClass = 'h-menu-dd__item';
        this.firstLevelLinkOnlyClass = 'h-menu__item-link'; // todo хорошо бы избавиться от этого доп класса (усложняет привязку)

        this.arrTopNavSubMenu.addClass(this.classForAnimationSubMenu);
        // элемент для отслеживания тапов для показа под меню на моб версии
        this.arrItemMenuFirstLevel = this.topNav.find('.h-menu-dd__item');

        this._eventHandlersInit();
    }

    _createClass(FrondevoTopNav, [{
        key: '_firedIfShowDropDownMenu',
        value: function _firedIfShowDropDownMenu() {

            var event = $.Event('topMenuDropDown:show');
            this.topNav.trigger(event);
            return this;
        }
    }, {
        key: '_firedIfHideDropDownMenu',
        value: function _firedIfHideDropDownMenu() {

            this._addAnimationForSubmenu();
            var event = $.Event('topMenuDropDown:hide');
            this.topNav.trigger(event);
            return this;
        }
    }, {
        key: '_removeAnimationForSubmenu',
        value: function _removeAnimationForSubmenu() {
            this.arrTopNavSubMenu.removeClass(this.classForAnimationSubMenu);
        }
    }, {
        key: '_addAnimationForSubmenu',
        value: function _addAnimationForSubmenu() {
            this.arrTopNavSubMenu.addClass(this.classForAnimationSubMenu);
        }
    }, {
        key: '_toogleSubMenuForMobile',
        value: function _toogleSubMenuForMobile(event) {

            if (window.innerWidth > 1000) return; // если десктоп, то должна просто отрабоатть ссылка

            event.preventDefault(); // без этого на мобилках при клике на ссылки прыгало меню


            var $elItemMenuFirstLevel = $(event.target).parent();

            // если элемент не содержит спец класс, обозначающий что это ссылка
            // делаем раскрытие под меню
            // иначе переходим по ссылке

            if ($elItemMenuFirstLevel.hasClass(this.firstLevelLinkOnlyClass)) {

                document.location.href = $(event.target).attr('href');
            }

            // если кликаем по первому уровню меню и меню не открыто
            if (!$elItemMenuFirstLevel.hasClass(this.mobileSubMenuOpenClass) && $elItemMenuFirstLevel.hasClass(this.firstLevelMenuItemClass)) {

                $elItemMenuFirstLevel.addClass(this.mobileSubMenuOpenClass);
            } else if ($elItemMenuFirstLevel.hasClass(this.firstLevelMenuItemClass)) {
                // если кликаем по первому уровню меню и меню открыто

                $elItemMenuFirstLevel.removeClass(this.mobileSubMenuOpenClass);
            }
        }
    }, {
        key: '_toggleGlobalScroll',
        value: function _toggleGlobalScroll() {
            console.log(1);
            if (this.elForShowMobMenu.is(':checked')) {
                $('html').addClass(this.globalNoScrollClass);

                // задержка в 800 милиСек для того чтобы крестик http://prntscr.com/eqpqf2 появлялся только после того как меню полностью выедет
                //$('.h-menu-dd__mob-btn').hide();
                // setTimeout( function() {
                //     $('.h-menu-dd__mob-btn').show();
                // }, 800);
            } else {
                $('html').removeClass(this.globalNoScrollClass);
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            this.topNavUl.on('mouseenter', function () {
                return _this._firedIfShowDropDownMenu();
            });
            this.topNavUl.on('mouseleave', function () {
                return _this._firedIfHideDropDownMenu();
            });
            this.arrTopNavSubMenu.on('transitionend', function () {
                return _this._removeAnimationForSubmenu();
            });
            this.arrItemMenuFirstLevel.on('click', function () {
                return _this._toogleSubMenuForMobile(event);
            });
            this.elForShowMobMenu.on('change', function () {
                return _this._toggleGlobalScroll();
            });
        }
    }]);

    return FrondevoTopNav;
}();
'use strict';

// =============================================================================
// scroll to top of the web application
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoScrollToTop = function () {
    function FrondevoScrollToTop() {
        var elWhereAppendScrollButton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

        var _this = this;

        var topOffsetWhenShowButtonPx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var scrollSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 800;

        _classCallCheck(this, FrondevoScrollToTop);

        // settings
        this.urlToHTMLTemplate = 'js-views/ui/_scroll-to-top.html';
        this.elWhereAppendScrollButton = elWhereAppendScrollButton;
        this.topOffsetWhenShowButton = topOffsetWhenShowButtonPx;
        this.scrollSpeed = scrollSpeed;

        // button init
        this._getHTMLTemplateButtonScrollToTop(this.urlToHTMLTemplate).then(function (responseHTMLTemplateString) {

            _this.buttonScrollToTop = _this._createButtonScrollToTop(responseHTMLTemplateString);
            _this._eventHandlersInit();
        }, function (error) {
            console.error('Не удалось загрузить шаблон!', error);
        });
    }

    _createClass(FrondevoScrollToTop, [{
        key: 'showButton',
        value: function showButton() {

            this.buttonScrollToTop.fadeIn();
        }
    }, {
        key: 'hideButton',
        value: function hideButton() {

            this.buttonScrollToTop.fadeOut();
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {

            $('html, body').animate({ scrollTop: 0 }, this.scrollSpeed);
        }
    }, {
        key: '_getHTMLTemplateButtonScrollToTop',
        value: function _getHTMLTemplateButtonScrollToTop(urlToHTMLTemplate) {

            var promise = $.Deferred();

            $.ajax({
                'type': 'get',
                'dataType': 'html',
                'url': urlToHTMLTemplate
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }, {
        key: '_createButtonScrollToTop',
        value: function _createButtonScrollToTop(htmlTemplateString) {

            return $(htmlTemplateString).appendTo(this.elWhereAppendScrollButton);
        }
    }, {
        key: '_checkOffsetFromTop',
        value: function _checkOffsetFromTop() {

            var offsetFromTopPx = $(window).scrollTop();

            if (offsetFromTopPx > this.topOffsetWhenShowButton) {
                this.showButton();
            } else {
                this.hideButton();
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            window.addEventListener('scroll', function () {
                return _this2._checkOffsetFromTop();
            });
            this.buttonScrollToTop.on('click', function () {
                return _this2.scrollToTop();
            });
        }
    }]);

    return FrondevoScrollToTop;
}();
'use strict';

// =============================================================================
// главное меню
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoGlobalUI = function () {
    function FrondevoGlobalUI() {
        _classCallCheck(this, FrondevoGlobalUI);

        // топ меню
        this.topNav = $('nav.h-menu-dd').eq(0);

        // выпадающий список ---------------------------------
        this.selectorButtonShowDropDownMenu = $('.menu__drop-down-menu-button');
        this.selectorDropDownMenu = $('.menu__drop-down-menu');
        this.classForShowShowDropDownMenu = 'menu__drop-down-menu-show';
        this.classForOpenButtonShowDropDownMenu = 'menu__drop-down-menu-button-open';
        this.selectorBody = $('body');

        this._eventHandlersInit();
    }

    _createClass(FrondevoGlobalUI, [{
        key: '_initModules',
        value: function _initModules() {
            var topNav = new FrondevoTopNav(this.topNav); // подключение top menu
            //let scrollToTop = new FrondevoScrollToTop(); // подкючение scroll to top
        }
    }, {
        key: '_showDropDownMenu',
        value: function _showDropDownMenu() {
            this.selectorDropDownMenu.toggleClass(this.classForShowShowDropDownMenu);
            this.selectorButtonShowDropDownMenu.toggleClass(this.classForOpenButtonShowDropDownMenu);
        }

        // скрываем выпадающий список при клике вне выпадающего списока -------------------------------------------------------------------------------

    }, {
        key: '_hideDropDownMenu',
        value: function _hideDropDownMenu(eventTarget) {
            if ($(eventTarget).closest(".menu__drop-down-menu-button").length == 0) {
                this.selectorDropDownMenu.removeClass(this.classForShowShowDropDownMenu);
                this.selectorButtonShowDropDownMenu.removeClass(this.classForOpenButtonShowDropDownMenu);
            }
        }
        // _hideMobMenu

    }, {
        key: '_hideMobMenu',
        value: function _hideMobMenu(eventTarget) {

            if (!$(eventTarget).hasClass('h-menu-dd__mob-btn')) {

                if ($(".h-menu-dd__mob-btn-check").is(':checked')) {

                    if ($(eventTarget).closest(".h-menu-dd__list").length == 0) {
                        $('.h-menu-dd__mob-btn').click();
                    }
                }
            }
        }
    }, {
        key: '_clickOnTheCheckboxInMenu',
        value: function _clickOnTheCheckboxInMenu() {
            $('.h-menu-dd__mob-btn').click();
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });

            // выпадающий список
            this.selectorButtonShowDropDownMenu.on('click', function () {
                return _this._showDropDownMenu();
            });
            this.selectorBody.on('click', function (event) {
                return _this._hideDropDownMenu(event.target);
            });
            this.selectorBody.on('touchstart', function (event) {
                return _this._hideDropDownMenu(event.target);
            });

            // клик по чекбоксу (для закрытия меню в моб виде)
            $('.h-menu-dd__item-button-close-menu').on('click', function (event) {
                return _this._clickOnTheCheckboxInMenu(event.target);
            });

            // закрываем моб меню при клике вне этого меню
            this.selectorBody.on('touchstart', function (event) {
                return _this._hideMobMenu(event.target);
            });
        }
    }]);

    return FrondevoGlobalUI;
}();

var globalUI = new FrondevoGlobalUI();

// Методы для отправки аякс запросов

// 1
// =============================================================================
// script(src="js/utils/app_send-ajax.js")
// =============================================================================
// ajax отправка данных
// реализация с использованием promise https://learn.javascript.ru/promise
// по дефолту:
//  - method = get
//  - dataType = json
// =============================================================================

var FrondevoSendAJAX = function () {
    function FrondevoSendAJAX(parameters) {
        _classCallCheck(this, FrondevoSendAJAX);

        this.serverScriptUrl = parameters.serverScriptUrl;
        this.sendMethod = parameters.sendMethod || 'get';
        this.dataType = parameters.dataType || 'json';
    }

    _createClass(FrondevoSendAJAX, [{
        key: 'sendData',
        value: function sendData(sendingData) {

            var promise = $.Deferred();

            $.ajax({
                'type': this.sendMethod,
                'dataType': this.dataType,
                'url': this.serverScriptUrl,
                'data': sendingData
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }]);

    return FrondevoSendAJAX;
}();

// =============================================================================
// 2
//script(src="js/modules/forms/app_ajax-submit-form.js")
// =============================================================================
// ajax submit for
// params:
// - formSelector - форма, с которой взаимодействуем
// - из нее читается куда (action) и как (method) отправлять запрос
// - formRowSelector - слектор строки поля. Ипользуется для показа/скрытия ошибок
// - invalid/valid RowClassName - подсветка строки с ошибкой/ с корректно заполненными данными
// - errorMessageSelector - где именно лежит текст с ошибкой
// - errorWrapSelector - контейнер с текстом ошибки (блок с текстом ошибки - его составляющая)
// - dataType - тип передачи данных (по умолчанию json)
//  - typeAJAXSuccess - тип дейсвтия если все ок: showMessage , goToUrl
//  - typeAJAXMessage - тип показа сообщения: popup, htmlTag  (актуально только для typeAJAXSuccess = showMessage)

// JSON ответы от сервера:
// - status - все ли ок (должно возвращаться всегда): ok, error
// - invalidInputName - имя поля с ошибкой, если поле не прошл серверную валидацию
// - message - текст сообщения (для ошибки иил успеха - неважно)
// - goToUrl - полный урл, для случаев если при успехе нужно куда-то перейти или обновить страницу

// dependencies:
//  - jQuery
//  - utils/app_send-ajax.js
// =============================================================================

var FrondevoAJAXSubmitForm = function () {
    function FrondevoAJAXSubmitForm(params) {
        _classCallCheck(this, FrondevoAJAXSubmitForm);

        this.formSelector = params.formSelector;
        this.formRowSelector = params.selectorFormRow;
        this.invalidRowClassName = params.invalidRowClassName;
        this.validRowClassName = params.validRowClassName;
        this.errorMessageSelector = params.errorMessageSelector;
        this.errorWrapSelector = params.errorWrapSelector;

        this.form = $(this.formSelector);
        this.formType = this.form.attr('method') || 'get';
        this.scriptUrl = this.form.attr('action');
        this.dataType = params.ajaxDataType || 'json';
        this.sendingData = '';
        this.serverAnswer = '';

        this.typeAJAXSucces = params.typeAJAXSucces || 'showMessage';
        this.typeAJAXMessage = params.typeAJAXMessage || 'popup';

        this._eventHandlersInit();
    }

    _createClass(FrondevoAJAXSubmitForm, [{
        key: '_sendData',
        value: function _sendData() {
            this.ajaxSendData = new FrondevoSendAJAX({
                serverScriptUrl: this.scriptUrl,
                sendMethod: this.formType,
                dataType: this.dataType

            });
        }
    }, {
        key: '_serverValidateForm',
        value: function _serverValidateForm(event) {
            var _this2 = this;

            event.preventDefault();
            this.sendingData = this.form.serialize();
            this._sendData();

            this.ajaxSendData.sendData(this.sendingData).then(function (responseJSON) {

                // if(responseJSON.status.toUpperCase() == 'ERROR') {
                //     this._showError( responseJSON.invalidInputName, responseJSON.message );
                // } else if ( responseJSON.status.toUpperCase() == 'OK' &&
                //     this.typeAJAXSucces == 'goToUrl'){
                //     this._goToUrlAfterSuccessSend( responseJSON.goToUrl );
                // } else {
                //     this.serverAnswer = responseJSON;
                //     this._firedSendSuccess();
                // }

                //Serhii  изменил условие, сделал так как на км
                if (responseJSON.status.toUpperCase() == 'ERROR') {
                    _this2._showError(responseJSON.invalidInputName, responseJSON.message);
                } else if (responseJSON.goToUrl) {
                    _this2._goToUrlAfterSuccessSend(responseJSON.goToUrl);
                } else {
                    _this2.serverAnswer = responseJSON.message;
                    _this2._firedSendSuccess();
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }
    }, {
        key: '_showError',
        value: function _showError(invalidInputName, message) {
            var invalidField = this.form.find('[name="' + invalidInputName + '"]'),
                invalidFormRow = invalidField.parents(this.formRowSelector).eq(0),
                errorMessageWrap = invalidFormRow.find(this.errorWrapSelector).eq(0),
                errorMessageTextEl = errorMessageWrap.find(this.errorMessageSelector).eq(0);

            errorMessageTextEl.text(message);

            // вручную изменяем классы для строки с ошибочным полем: не понял как через webshim сгенерировать ошибку в ручную
            invalidFormRow.removeClass(this.validRowClassName).addClass(this.invalidRowClassName);
            errorMessageWrap.show();
        }
    }, {
        key: '_goToUrlAfterSuccessSend',
        value: function _goToUrlAfterSuccessSend(url) {
            window.location = url;
        }
    }, {
        key: '_firedSendSuccess',
        value: function _firedSendSuccess() {
            var event = $.Event('ajax-submit:success');
            this.form.trigger(event);
        }

        // возвращает полный ответ от сервера

    }, {
        key: 'getJSONServerAsnswer',
        value: function getJSONServerAsnswer() {
            return this.serverAnswer;
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this3 = this;

            $(this.formSelector).on('submit', function (event) {
                return _this3._serverValidateForm(event.currentTarget);
            });
        }
    }]);

    return FrondevoAJAXSubmitForm;
}();