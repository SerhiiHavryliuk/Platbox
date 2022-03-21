/**
 * Created by Serhii on 04.04.2017.
 */
/**
 * Created by Serhii on 28.03.2017.
 */

'use strict';

// =============================================================================
// Tabs for page docs
//
// dependencies:
//  - jQuery (jquery.com)
//  - script(src="js/models/ui/app_docs-ui.js")
// =============================================================================


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlatBoxTabsDocs = function () {
    function PlatBoxTabsDocs() {
        _classCallCheck(this, PlatBoxTabsDocs);

        this.selectorProductTabsElement = $('.pt-docs__tab');
        this.selectorProductTabsContainer = $('.pt-docs__tabs-block');

        this.classProductTabsLinkActive = 'pt-docs__tabs-active';
        this.classProductTabsContainerActive = 'pt-docs__tabs-block_active ';

        this.tabsContainer = $('.pt-docs__tabs');

        this._eventHandlersInit();
    }

    _createClass(PlatBoxTabsDocs, [{
        key: '_initModules',
        value: function _initModules() {}
    }, {
        key: '_showCurrentTab',
        value: function _showCurrentTab(clicedLink) {
            var tabsName = $(clicedLink).attr('data-tabs-name');

            // Links menu
            this.selectorProductTabsElement.removeClass(this.classProductTabsLinkActive);
            $(clicedLink).addClass(this.classProductTabsLinkActive);

            // Container
            this.selectorProductTabsContainer.removeClass(this.classProductTabsContainerActive);

            switch (tabsName) {
                case 'CURL':
                    this.tabsContainer.find("[data-tabs-name='CURL']").addClass(this.classProductTabsContainerActive);
                    break;
                case 'HTTP':
                    this.tabsContainer.find("[data-tabs-name='HTTP']").addClass(this.classProductTabsContainerActive);
                    break;
                case 'PHP':
                    this.tabsContainer.find("[data-tabs-name='PHP']").addClass(this.classProductTabsContainerActive);
                    break;
                case 'JS':
                    this.tabsContainer.find("[data-tabs-name='JS']").addClass(this.classProductTabsContainerActive);
                    break;
                default:
                    console.log('Таких имен табов нет');
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
        }
    }]);

    return PlatBoxTabsDocs;
}();

var platboxtabsdocs = new PlatBoxTabsDocs();