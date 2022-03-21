'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// =============================================================================
// 3
// =============================================================================
// Форма
//
// dependencies:
//  - jQuery (jquery.com)
// script(src="js/utils/app_send-ajax.js")
// script(src="js/modules/forms/app_ajax-submit-form.js")
// script(src="js/models/pages/app_try-ui.js")
// =============================================================================

var FrondevoTry = function () {
    function FrondevoTry() {
        _classCallCheck(this, FrondevoTry);

        // Form Authorization ------------------------------------------------------------------------------
        this.formAuthorization = $('#form-try'); // селектор формы
        this.scriptUrlAuthorization = this.formAuthorization.attr('action'); // url формы
        this.formTypeAuthorization = this.formAuthorization.attr('method'); // метод формы
        this.dataTypeAuthorization = this.formAuthorization.attr('data-type'); // тип данных

        this.sendingData = '';
        this.selectorError = $('.pb-login__error'); // cселектор куда вставляется ошибка
        this.classForShowError = 'pb-login__error-show';
        this.classForHideError = 'pb-login__error-hide';

        // error input
        this.selectorInput = $('.pb-login__field');
        this.classErrorForInput = 'pb-login__field-error';

        //ansver
        this.selectorAnsverBlock = $('.pb-try__answer-wrap');
        //form frap
        this.selectorWrapForm = $('.pb-try__form-wrap');

        this._eventHandlersInit();
    }

    _createClass(FrondevoTry, [{
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
                    _this.selectorAnsverBlock.show();
                    _this.selectorWrapForm.hide();
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
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            $(document).on('ready', function () {
                return _this2._initModules();
            });

            // Authorization -------------------------------------
            this.formAuthorization.on('submit', function (event) {
                _this2._sendDataFromFormAuthorizationToServer();
            });
        }
    }]);

    return FrondevoTry;
}();

var pagetry = new FrondevoTry();