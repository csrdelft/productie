(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Code voor de /instellingen pagina
 */

function instellingVeranderd() {
	(0, _jquery2.default)('.instellingen-bericht').removeClass('d-none');
}

function instellingOpslaan() {
	if (this.checkValidity()) {
		var input = (0, _jquery2.default)(this);

		var href = input.data('href');

		input.addClass('loading');

		_jquery2.default.ajax({
			url: href,
			method: 'POST',
			data: {
				waarde: input.val()
			}
		}).then(function () {
			instellingVeranderd();
			input.removeClass('loading');
		});
	}
}

(0, _jquery2.default)(function () {
	(0, _jquery2.default)('.instellingKnop').on('click', instellingVeranderd);
	(0, _jquery2.default)('.change-opslaan').on('change', instellingOpslaan);
});

/***/ })

}]);
//# sourceMappingURL=43.js.map