/**
 * Created by Serhii on 30.03.2017.
 */
'use strict';

// =============================================================================
// 3
// =============================================================================
// Форма
// источник кодов рос операторов http://indexmain.ru/mobile/ru
//
// dependencies:
//  - jQuery (jquery.com)
// script(src="js/utils/app_send-ajax.js")
// script(src="js/modules/forms/app_ajax-submit-form.js")
// script(src="js/models/pages/app_login-ui.js")
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoLogin = function () {
    function FrondevoLogin() {
        _classCallCheck(this, FrondevoLogin);

        // Form Authorization ------------------------------------------------------------------------------
        this.formAuthorization = $('#form-authorization'); // селектор формы
        this.scriptUrlAuthorization = this.formAuthorization.attr('action'); // url формы
        this.formTypeAuthorization = this.formAuthorization.attr('method'); // метод формы
        this.dataTypeAuthorization = this.formAuthorization.attr('data-type'); // тип данных

        // Form Authorization ------------------------------------------------------------------------------
        this.formRegistaration = $('#form-registration'); // селектор формы
        this.scriptUrlRegistaration = this.formRegistaration.attr('action'); // url формы
        this.formTypeRegistaration = this.formRegistaration.attr('method'); // метод формы
        this.dataTypeRegistaration = this.formRegistaration.attr('data-type'); // тип данных

        // Form Forgot Password ------------------------------------------------------------------------------
        this.formForgotPassword = $('#form-forgot-password'); // селектор формы
        this.scriptUrlForgotPassword = this.formForgotPassword.attr('action'); // url формы
        this.formTypeForgotPassword = this.formForgotPassword.attr('method'); // метод формы
        this.dataTypeForgotPassword = this.formForgotPassword.attr('data-type'); // тип данных

        this.sendingData = '';
        this.selectorError = $('.pb-login__error'); // cселектор куда вставляется ошибка
        this.classForShowError = 'pb-login__error-show';
        this.classForHideError = 'pb-login__error-hide';

        // Buttons -------------------------------------
        this.selectorButtonRegistration = $(".pb-login__button-registration");
        this.selectorButtonSignIn = $(".pb-login__button-sign-in");
        this.selectorButtonForgotPassword = $(".pb-login__button-forgot-password");

        // Page block -----------------------------------
        this.selectorLoginBlock = $(".pb-login__block");
        this.selectorBlockAuthorization = $(".pb-login__authorization");
        this.selectorBlockRegistration = $(".pb-login__registration");
        this.selectorBlockForgotPassword = $(".pb-login__forgot-password");

        // error input
        this.selectorInput = $('.pb-login__field');
        this.classErrorForInput = 'pb-login__field-error';

        this._eventHandlersInit();
    }

    _createClass(FrondevoLogin, [{
        key: '_initModules',
        value: function _initModules() {}
    }, {
        key: '_sendData',
        value: function _sendData(scriptUrl, formType, dataTyp) {
            this.ajaxSendData = new FrondevoSendAJAX({
                serverScriptUrl: scriptUrl,
                sendMethod: formType,
                dataType: dataTyp

            });
        }

        // Authorization ---------------------------------------------------------------------------------------------------

    }, {
        key: '_sendDataFromFormAuthorizationToServer',
        value: function _sendDataFromFormAuthorizationToServer() {
            var _this = this;

            event.preventDefault();
            this._sendData(this.scriptUrlAuthorization, this.formTypeAuthorization, this.dataTypeAuthorization);
            this.sendingData = this.formAuthorization.serialize();

            this.ajaxSendData.sendData(this.sendingData).then(function (responseJSON) {

                if (responseJSON.status == "ok") {
                    console.log("status ok");
                }

                if (responseJSON.status == "error") {
                    console.log("status error");
                    _this.selectorError.removeClass(_this.classForHideError);
                    _this.selectorError.addClass(_this.classForShowError); // Показываем контейнер ошибки
                    _this.selectorError.text(responseJSON.message); // вставляем в контейнер сообщение об ошибке что пришло от сервера
                    _this.selectorInput.addClass(_this.classErrorForInput); // делаем рамки красными
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }

        // Registaration ---------------------------------------------------------------------------------------------------

    }, {
        key: '_sendDataFromFormRegistarationToServer',
        value: function _sendDataFromFormRegistarationToServer() {
            var _this2 = this;

            event.preventDefault();
            this._sendData(this.scriptUrlRegistaration, this.formTypeRegistaration, this.dataTypeRegistaration);
            this.sendingData = this.formRegistaration.serialize();

            this.ajaxSendData.sendData(this.sendingData).then(function (responseJSON) {

                if (responseJSON.status == "ok") {
                    console.log("status ok");
                }

                if (responseJSON.status == "error") {
                    console.log("status error");
                    _this2.selectorError.removeClass(_this2.classForHideError);
                    _this2.selectorError.addClass(_this2.classForShowError); // Показываем контейнер ошибки
                    _this2.selectorError.text(responseJSON.message); // вставляем в контейнер сообщение об ошибке что пришло от сервера
                    _this2.selectorInput.addClass(_this2.classErrorForInput); // делаем рамки красными
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }

        // Forgot Password  ------------------------------------------------------------------------------------------------

    }, {
        key: '_sendDataFromFormForgotPasswordToServer',
        value: function _sendDataFromFormForgotPasswordToServer() {
            var _this3 = this;

            event.preventDefault();
            this._sendData(this.scriptUrlForgotPassword, this.formTypeForgotPassword, this.dataTypeForgotPassword);
            this.sendingData = this.formForgotPassword.serialize();

            this.ajaxSendData.sendData(this.sendingData).then(function (responseJSON) {

                if (responseJSON.status == "ok") {
                    console.log("status ok");
                }

                if (responseJSON.status == "error") {
                    console.log("status error");
                    _this3.selectorError.removeClass(_this3.classForHideError);
                    _this3.selectorError.addClass(_this3.classForShowError); // Показываем контейнер ошибки
                    _this3.selectorError.text(responseJSON.message); // вставляем в контейнер сообщение об ошибке что пришло от сервера
                    _this3.selectorInput.addClass(_this3.classErrorForInput); // делаем рамки красными
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }
    }, {
        key: '_showBlockRegistration',
        value: function _showBlockRegistration() {
            this.selectorLoginBlock.hide();
            this.selectorBlockRegistration.show();
            this.selectorError.addClass(this.classForHideError);
        }
    }, {
        key: '_showBlockSignIn',
        value: function _showBlockSignIn() {
            this.selectorLoginBlock.hide();
            this.selectorBlockAuthorization.show();
            this.selectorError.addClass(this.classForHideError);
        }
    }, {
        key: '_showBlockForgotPassword',
        value: function _showBlockForgotPassword() {
            this.selectorLoginBlock.hide();
            this.selectorBlockForgotPassword.show();
            this.selectorError.addClass(this.classForHideError);
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this4 = this;

            $(document).on('ready', function () {
                return _this4._initModules();
            });

            // Authorization -------------------------------------
            this.formAuthorization.on('submit', function (event) {
                _this4._sendDataFromFormAuthorizationToServer();
            });

            // Registaration -------------------------------------
            this.formRegistaration.on('submit', function (event) {
                _this4._sendDataFromFormRegistarationToServer();
            });

            // Forgot Password -------------------------------------
            this.formForgotPassword.on('submit', function (event) {
                _this4._sendDataFromFormForgotPasswordToServer();
            });

            // Buttons ---------------------------------------------
            this.selectorButtonRegistration.on('click', function (event) {
                return _this4._showBlockRegistration();
            });
            this.selectorButtonSignIn.on('click', function (event) {
                return _this4._showBlockSignIn();
            });
            this.selectorButtonForgotPassword.on('click', function (event) {
                return _this4._showBlockForgotPassword();
            });
        }
    }]);

    return FrondevoLogin;
}();

var login = new FrondevoLogin();