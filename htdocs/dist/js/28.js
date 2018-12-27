(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Documentenketzerjavascriptcode.
 */
(0, _jquery2.default)(function () {
	var $documenten = (0, _jquery2.default)('#documenten');

	//tabellen naar zebra converteren.
	$documenten.find('tr:odd').addClass('odd');
	// render de filesize cellen
	$documenten.find('.size').each(function (i, el) {
		return el.innerText = _jquery2.default.fn.dataTable.render.filesize(el.innerText, 'display');
	});

	(0, _jquery2.default)('#documentencategorie').dataTable({
		language: {
			zeroRecords: 'Geen documenten gevonden',
			infoEmtpy: 'Geen documenten gevonden',
			search: 'Zoeken:'
		},
		displayLength: 20,
		info: false,
		lengthChange: false,
		sorting: [[3, 'desc']], // moment toegevoegd
		columns: [{ type: 'html' }, // documentnaam
		{ type: 'num', render: _jquery2.default.fn.dataTable.render.filesize }, // Bestandsgrootte
		{ type: 'string' }, // mime-type, forceer string anders werkt sorteren uberhaupt niet
		{ render: _jquery2.default.fn.dataTable.render.timeago }, //moment toegevoegd
		null]
	});
});

/***/ })

}]);
//# sourceMappingURL=28.js.map