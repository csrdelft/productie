(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ----------------------------------------------------------------------------
// markItUp! Universal MarkUp Engine, JQuery plugin
// v 1.1.x
// Dual licensed under the MIT and GPL licenses.
// ----------------------------------------------------------------------------
// Copyright (C) 2007-2012 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------
(function ($) {
	$.fn.markItUp = function (settings, extraSettings) {
		var method, params, options, selection, ctrlKey, shiftKey, altKey;ctrlKey = shiftKey = altKey = false;

		if (typeof settings == 'string') {
			method = settings;
			params = extraSettings;
		}

		options = { id: '',
			nameSpace: '',
			root: '',
			previewHandler: false,
			previewInWindow: '', // 'width=800, height=600, resizable=yes, scrollbars=yes'
			previewInElement: '',
			previewAutoRefresh: true,
			previewPosition: 'after',
			previewTemplatePath: '~/templates/preview.html',
			previewParser: false,
			previewParserPath: '',
			previewParserVar: 'data',
			resizeHandle: true,
			beforeInsert: '',
			afterInsert: '',
			onEnter: {},
			onShiftEnter: {},
			onCtrlEnter: {},
			onTab: {},
			markupSet: [{/* set */}]
		};
		$.extend(options, settings, extraSettings);

		// compute markItUp! path
		if (!options.root) {
			$('script').each(function (a, tag) {
				var miuScript;
				miuScript = $(tag).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/);
				if (miuScript !== null) {
					options.root = miuScript[1];
				}
			});
		}

		// Quick patch to keep compatibility with jQuery 1.9
		var uaMatch = function uaMatch(ua) {
			ua = ua.toLowerCase();

			var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

			return {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		};
		var matched = uaMatch(navigator.userAgent);
		var browser = {};

		if (matched.browser) {
			browser[matched.browser] = true;
			browser.version = matched.version;
		}
		if (browser.chrome) {
			browser.webkit = true;
		} else if (browser.webkit) {
			browser.safari = true;
		}

		return this.each(function () {
			var $$, textarea, levels, scrollPosition, caretPosition, caretOffset, clicked, hash, header, footer, previewWindow, template, iFrame, abort;
			$$ = $(this);
			textarea = this;
			levels = [];
			abort = false;
			scrollPosition = caretPosition = 0;
			caretOffset = -1;

			options.previewParserPath = localize(options.previewParserPath);
			options.previewTemplatePath = localize(options.previewTemplatePath);

			if (method) {
				switch (method) {
					case 'remove':
						remove();
						break;
					case 'insert':
						markup(params);
						break;
					default:
						$.error('Method ' + method + ' does not exist on jQuery.markItUp');
				}
				return;
			}

			// apply the computed path to ~/
			function localize(data, inText) {
				if (inText) {
					return data.replace(/("|')~\//g, "$1" + options.root);
				}
				return data.replace(/^~\//, options.root);
			}

			// init and build editor
			function init() {
				var id = '',
				    nameSpace = '',
				    resizeHandle;
				if (options.id) {
					id = 'id="' + options.id + '"';
				} else if ($$.attr("id")) {
					id = 'id="markItUp' + $$.attr("id").substr(0, 1).toUpperCase() + $$.attr("id").substr(1) + '"';
				}
				if (options.nameSpace) {
					nameSpace = 'class="' + options.nameSpace + '"';
				}
				$$.wrap('<div ' + nameSpace + '></div>');
				$$.wrap('<div ' + id + ' class="markItUp"></div>');
				$$.wrap('<div class="markItUpContainer"></div>');
				$$.addClass("markItUpEditor");

				// add the header before the textarea
				header = $('<div class="markItUpHeader"></div>').insertBefore($$);
				$(dropMenus(options.markupSet)).appendTo(header);

				// add the footer after the textarea
				footer = $('<div class="markItUpFooter"></div>').insertAfter($$);

				// add the resize handle after textarea
				if (options.resizeHandle === true && browser.safari !== true) {
					resizeHandle = $('<div class="markItUpResizeHandle"></div>').insertAfter($$).bind("mousedown.markItUp", function (e) {
						var h = $$.height(),
						    y = e.clientY,
						    mouseMove,
						    _mouseUp;
						mouseMove = function mouseMove(e) {
							$$.css("height", Math.max(20, e.clientY + h - y) + "px");
							return false;
						};
						_mouseUp = function mouseUp(e) {
							$("html").unbind("mousemove.markItUp", mouseMove).unbind("mouseup.markItUp", _mouseUp);
							return false;
						};
						$("html").bind("mousemove.markItUp", mouseMove).bind("mouseup.markItUp", _mouseUp);
					});
					footer.append(resizeHandle);
				}

				// listen key events
				$$.bind('keydown.markItUp', keyPressed).bind('keyup', keyPressed);

				// bind an event to catch external calls
				$$.bind("insertion.markItUp", function (e, settings) {
					if (settings.target !== false) {
						get();
					}
					if (textarea === $.markItUp.focused) {
						markup(settings);
					}
				});

				// remember the last focus
				$$.bind('focus.markItUp', function () {
					$.markItUp.focused = this;
				});

				if (options.previewInElement) {
					refreshPreview();
				}
			}

			// recursively build header with dropMenus from markupset
			function dropMenus(markupSet) {
				var ul = $('<ul></ul>'),
				    i = 0,
				    li;
				$('li:hover > ul', ul).css('display', 'block');
				$.each(markupSet, function () {
					var button = this,
					    t = '',
					    title,
					    li,
					    j;
					title = button.key ? (button.name || '') + ' [Ctrl+' + button.key + ']' : button.name || '';
					var key = button.key ? 'accesskey="' + button.key + '"' : '';
					if (button.separator) {
						li = $('<li class="markItUpSeparator">' + (button.separator || '') + '</li>').appendTo(ul);
					} else {
						i++;
						for (j = levels.length - 1; j >= 0; j--) {
							t += levels[j] + "-";
						}
						li = $('<li class="markItUpButton markItUpButton' + t + i + ' ' + (button.className || '') + '"><a href="" ' + key + ' title="' + title + '">' + (button.name || '') + '</a></li>').bind("contextmenu.markItUp", function () {
							// prevent contextmenu on mac and allow ctrl+click
							return false;
						}).bind('click.markItUp', function (e) {
							e.preventDefault();
						}).bind("focusin.markItUp", function () {
							$$.focus();
						}).bind('mouseup', function () {
							if (button.call) {
								eval(button.call)();
							}
							setTimeout(function () {
								markup(button);
							}, 1);
							return false;
						}).bind('mouseenter.markItUp', function () {
							$('> ul', this).show();
							$(document).one('click', function () {
								// close dropmenu if click outside
								$('ul ul', header).hide();
							});
						}).bind('mouseleave.markItUp', function () {
							$('> ul', this).hide();
						}).appendTo(ul);
						if (button.dropMenu) {
							levels.push(i);
							$(li).addClass('markItUpDropMenu').append(dropMenus(button.dropMenu));
						}
					}
				});
				levels.pop();
				return ul;
			}

			// markItUp! markups
			function magicMarkups(string) {
				if (string) {
					string = string.toString();
					string = string.replace(/\(\!\(([\s\S]*?)\)\!\)/g, function (x, a) {
						var b = a.split('|!|');
						if (altKey === true) {
							return b[1] !== undefined ? b[1] : b[0];
						} else {
							return b[1] === undefined ? "" : b[0];
						}
					});
					// [![prompt]!], [![prompt:!:value]!]
					string = string.replace(/\[\!\[([\s\S]*?)\]\!\]/g, function (x, a) {
						var b = a.split(':!:');
						if (abort === true) {
							return false;
						}
						var value = prompt(b[0], b[1] ? b[1] : '');
						if (value === null) {
							abort = true;
						}
						return value;
					});
					return string;
				}
				return "";
			}

			// prepare action
			function prepare(action) {
				if ($.isFunction(action)) {
					action = action(hash);
				}
				return magicMarkups(action);
			}

			// build block to insert
			function build(string) {
				var openWith = prepare(clicked.openWith);
				var placeHolder = prepare(clicked.placeHolder);
				var replaceWith = prepare(clicked.replaceWith);
				var closeWith = prepare(clicked.closeWith);
				var openBlockWith = prepare(clicked.openBlockWith);
				var closeBlockWith = prepare(clicked.closeBlockWith);
				var multiline = clicked.multiline;
				var block;

				if (replaceWith !== "") {
					block = openWith + replaceWith + closeWith;
				} else if (selection === '' && placeHolder !== '') {
					block = openWith + placeHolder + closeWith;
				} else {
					string = string || selection;

					var lines = [string],
					    blocks = [];

					if (multiline === true) {
						lines = string.split(/\r?\n/);
					}

					for (var l = 0; l < lines.length; l++) {
						var line = lines[l];
						var trailingSpaces;
						if (trailingSpaces = line.match(/ *$/)) {
							blocks.push(openWith + line.replace(/ *$/g, '') + closeWith + trailingSpaces);
						} else {
							blocks.push(openWith + line + closeWith);
						}
					}

					block = blocks.join("\n");
				}

				block = openBlockWith + block + closeBlockWith;

				return { block: block,
					openBlockWith: openBlockWith,
					openWith: openWith,
					replaceWith: replaceWith,
					placeHolder: placeHolder,
					closeWith: closeWith,
					closeBlockWith: closeBlockWith
				};
			}

			// define markup to insert
			function markup(button) {
				var len, j, n, i, lines, string, start;
				hash = clicked = button;
				get();
				$.extend(hash, { line: "",
					root: options.root,
					textarea: textarea,
					selection: selection || '',
					caretPosition: caretPosition,
					ctrlKey: ctrlKey,
					shiftKey: shiftKey,
					altKey: altKey
				});
				// callbacks before insertion
				prepare(options.beforeInsert);
				prepare(clicked.beforeInsert);
				if (ctrlKey === true && shiftKey === true || button.multiline === true) {
					prepare(clicked.beforeMultiInsert);
				}
				$.extend(hash, { line: 1 });

				if (ctrlKey === true && shiftKey === true) {
					lines = selection.split(/\r?\n/);
					for (j = 0, n = lines.length, i = 0; i < n; i++) {
						if ($.trim(lines[i]) !== '') {
							$.extend(hash, { line: ++j, selection: lines[i] });
							lines[i] = build(lines[i]).block;
						} else {
							lines[i] = "";
						}
					}

					string = { block: lines.join('\n') };
					start = caretPosition;
					len = string.block.length + (browser.opera ? n - 1 : 0);
				} else if (ctrlKey === true) {
					string = build(selection);
					start = caretPosition + string.openWith.length;
					len = string.block.length - string.openWith.length - string.closeWith.length;
					len = len - (string.block.match(/ $/) ? 1 : 0);
					len -= fixIeBug(string.block);
				} else if (shiftKey === true) {
					string = build(selection);
					start = caretPosition;
					len = string.block.length;
					len -= fixIeBug(string.block);
				} else {
					string = build(selection);
					start = caretPosition + string.block.length;
					len = 0;
					start -= fixIeBug(string.block);
				}
				if (selection === '' && string.replaceWith === '') {
					caretOffset += fixOperaBug(string.block);

					start = caretPosition + string.openBlockWith.length + string.openWith.length;
					len = string.block.length - string.openBlockWith.length - string.openWith.length - string.closeWith.length - string.closeBlockWith.length;

					caretOffset = $$.val().substring(caretPosition, $$.val().length).length;
					caretOffset -= fixOperaBug($$.val().substring(0, caretPosition));
				}
				$.extend(hash, { caretPosition: caretPosition, scrollPosition: scrollPosition });

				if (string.block !== selection && abort === false) {
					insert(string.block);
					set(start, len);
				} else {
					caretOffset = -1;
				}
				get();

				$.extend(hash, { line: '', selection: selection });

				// callbacks after insertion
				if (ctrlKey === true && shiftKey === true || button.multiline === true) {
					prepare(clicked.afterMultiInsert);
				}
				prepare(clicked.afterInsert);
				prepare(options.afterInsert);

				// refresh preview if opened
				if (previewWindow && options.previewAutoRefresh) {
					refreshPreview();
				}

				// reinit keyevent
				shiftKey = altKey = ctrlKey = abort = false;
			}

			// Substract linefeed in Opera
			function fixOperaBug(string) {
				if (browser.opera) {
					return string.length - string.replace(/\n*/g, '').length;
				}
				return 0;
			}
			// Substract linefeed in IE
			function fixIeBug(string) {
				if (browser.msie) {
					return string.length - string.replace(/\r*/g, '').length;
				}
				return 0;
			}

			// add markup
			function insert(block) {
				if (document.selection) {
					var newSelection = document.selection.createRange();
					newSelection.text = block;
				} else {
					textarea.value = textarea.value.substring(0, caretPosition) + block + textarea.value.substring(caretPosition + selection.length, textarea.value.length);
				}
			}

			// set a selection
			function set(start, len) {
				if (textarea.createTextRange) {
					// quick fix to make it work on Opera 9.5
					if (browser.opera && browser.version >= 9.5 && len == 0) {
						return false;
					}
					range = textarea.createTextRange();
					range.collapse(true);
					range.moveStart('character', start);
					range.moveEnd('character', len);
					range.select();
				} else if (textarea.setSelectionRange) {
					textarea.setSelectionRange(start, start + len);
				}
				textarea.scrollTop = scrollPosition;
				textarea.focus();
			}

			// get the selection
			function get() {
				textarea.focus();

				scrollPosition = textarea.scrollTop;
				if (document.selection) {
					selection = document.selection.createRange().text;
					if (browser.msie) {
						// ie
						var range = document.selection.createRange(),
						    rangeCopy = range.duplicate();
						rangeCopy.moveToElementText(textarea);
						caretPosition = -1;
						while (rangeCopy.inRange(range)) {
							rangeCopy.moveStart('character');
							caretPosition++;
						}
					} else {
						// opera
						caretPosition = textarea.selectionStart;
					}
				} else {
					// gecko & webkit
					caretPosition = textarea.selectionStart;

					selection = textarea.value.substring(caretPosition, textarea.selectionEnd);
				}
				return selection;
			}

			// open preview window
			function preview() {
				if (typeof options.previewHandler === 'function') {
					previewWindow = true;
				} else if (options.previewInElement) {
					previewWindow = $(options.previewInElement);
				} else if (!previewWindow || previewWindow.closed) {
					if (options.previewInWindow) {
						previewWindow = window.open('', 'preview', options.previewInWindow);
						$(window).unload(function () {
							previewWindow.close();
						});
					} else {
						iFrame = $('<iframe class="markItUpPreviewFrame"></iframe>');
						if (options.previewPosition == 'after') {
							iFrame.insertAfter(footer);
						} else {
							iFrame.insertBefore(header);
						}
						previewWindow = iFrame[iFrame.length - 1].contentWindow || frame[iFrame.length - 1];
					}
				} else if (altKey === true) {
					if (iFrame) {
						iFrame.remove();
					} else {
						previewWindow.close();
					}
					previewWindow = iFrame = false;
				}
				if (!options.previewAutoRefresh) {
					refreshPreview();
				}
				if (options.previewInWindow) {
					previewWindow.focus();
				}
			}

			// refresh Preview window
			function refreshPreview() {
				renderPreview();
			}

			function renderPreview() {
				var phtml;
				if (options.previewHandler && typeof options.previewHandler === 'function') {
					options.previewHandler($$.val());
				} else if (options.previewParser && typeof options.previewParser === 'function') {
					var data = options.previewParser($$.val());
					writeInPreview(localize(data, 1));
				} else if (options.previewParserPath !== '') {
					$.ajax({
						type: 'POST',
						dataType: 'text',
						global: false,
						url: options.previewParserPath,
						data: options.previewParserVar + '=' + encodeURIComponent($$.val()),
						success: function success(data) {
							writeInPreview(localize(data, 1));
						}
					});
				} else {
					if (!template) {
						$.ajax({
							url: options.previewTemplatePath,
							dataType: 'text',
							global: false,
							success: function success(data) {
								writeInPreview(localize(data, 1).replace(/<!-- content -->/g, $$.val()));
							}
						});
					}
				}
				return false;
			}

			function writeInPreview(data) {
				if (options.previewInElement) {
					$(options.previewInElement).html(data);
				} else if (previewWindow && previewWindow.document) {
					try {
						sp = previewWindow.document.documentElement.scrollTop;
					} catch (e) {
						sp = 0;
					}
					previewWindow.document.open();
					previewWindow.document.write(data);
					previewWindow.document.close();
					previewWindow.document.documentElement.scrollTop = sp;
				}
			}

			// set keys pressed
			function keyPressed(e) {
				shiftKey = e.shiftKey;
				altKey = e.altKey;
				ctrlKey = !(e.altKey && e.ctrlKey) ? e.ctrlKey || e.metaKey : false;

				if (e.type === 'keydown') {
					if (ctrlKey === true) {
						li = $('a[accesskey="' + (e.keyCode == 13 ? '\\n' : String.fromCharCode(e.keyCode)) + '"]', header).parent('li');
						if (li.length !== 0) {
							ctrlKey = false;
							setTimeout(function () {
								li.triggerHandler('mouseup');
							}, 1);
							return false;
						}
					}
					if (e.keyCode === 13 || e.keyCode === 10) {
						// Enter key
						if (ctrlKey === true) {
							// Enter + Ctrl
							ctrlKey = false;
							markup(options.onCtrlEnter);
							return options.onCtrlEnter.keepDefault;
						} else if (shiftKey === true) {
							// Enter + Shift
							shiftKey = false;
							markup(options.onShiftEnter);
							return options.onShiftEnter.keepDefault;
						} else {
							// only Enter
							markup(options.onEnter);
							return options.onEnter.keepDefault;
						}
					}
					if (e.keyCode === 9) {
						// Tab key
						if (shiftKey == true || ctrlKey == true || altKey == true) {
							return false;
						}
						if (caretOffset !== -1) {
							get();
							caretOffset = $$.val().length - caretOffset;
							set(caretOffset, 0);
							caretOffset = -1;
							return false;
						} else {
							markup(options.onTab);
							return options.onTab.keepDefault;
						}
					}
				}
			}

			function remove() {
				$$.unbind(".markItUp").removeClass('markItUpEditor');
				$$.parent('div').parent('div.markItUp').parent('div').replaceWith($$);
				$$.data('markItUp', null);
			}

			init();
		});
	};

	$.fn.markItUpRemove = function () {
		return this.each(function () {
			$(this).markItUp('remove');
		});
	};

	$.markItUp = function (settings) {
		var options = { target: false };
		$.extend(options, settings);
		if (options.target) {
			return $(options.target).each(function () {
				$(this).focus();
				$(this).trigger('insertion', [options]);
			});
		} else {
			$('textarea').trigger('insertion', [options]);
		}
	};
})(jQuery);

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modalOpen = modalOpen;
exports.modalClose = modalClose;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} htmlString
 * @returns {boolean}
 */
function modalOpen() {
    var htmlString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if ((0, _jquery2.default)(this).hasClass('confirm') && !confirm((0, _jquery2.default)(this).attr('title') + '.\n\nWeet u het zeker?')) {
        return false;
    }

    var modal = (0, _jquery2.default)('#modal'),
        modalBackdrop = (0, _jquery2.default)('.modal-backdrop');

    if (modal.html() === '' && htmlString === '') {
        return false;
    }

    if (modalBackdrop.length) {
        modalBackdrop.remove();
    }

    modal.modal('show');
    (0, _jquery2.default)(document.body).trigger('modalOpen');

    if (typeof htmlString === 'string' && htmlString !== '') {
        modal.html(htmlString);
        modal.find('input:visible:first').trigger('focus');
    }

    return true;
}

function modalClose() {
    (0, _jquery2.default)('#modal').modal('hide');
    (0, _jquery2.default)(document.body).trigger('modalClose');
}

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ajaxRequest = ajaxRequest;
exports.ketzerAjax = ketzerAjax;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _modal = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @see maalcie.js
 * @param {string} type
 * @param {string} url
 * @param {string} data
 * @param {jQuery} source
 * @param {function} onsuccess
 * @param {function|null} onerror
 * @param {function|null} onfinish
 */
function ajaxRequest(type, url, data, source, onsuccess, onerror) {
	var onfinish = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

	if (source) {
		if (!source.hasClass('noanim')) {
			(0, _jquery2.default)(source).replaceWith('<img id="' + source.attr('id') + '" title="' + url + '" src="/images/loading-arrows.gif" />');
			source = (0, _jquery2.default)('img[title="' + url + '"]');
		} else if (source.hasClass('InlineForm')) {
			(0, _jquery2.default)(source).find('.FormElement:first').css({
				'background-image': 'url("/images/loading-fb.gif")',
				'background-repeat': 'no-repeat',
				'background-position': 'center right'
			});
		} else {
			source.addClass('loading');
		}
	}
	var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
	var processData = true;
	if (data instanceof FormData) {
		contentType = false;
		processData = false;
	}
	_jquery2.default.ajax({
		type: type,
		cache: false,
		contentType: contentType,
		processData: processData,
		url: url,
		data: data
	}).done(function (data) {
		if (source) {
			if (!(0, _jquery2.default)(source).hasClass('noanim')) {
				(0, _jquery2.default)(source).hide();
			} else if ((0, _jquery2.default)(source).hasClass('InlineForm')) {
				(0, _jquery2.default)(source).find('.FormElement:first').css({
					'background-image': '',
					'background-repeat': '',
					'background-position': ''
				});
			}
			source.removeClass('loading');
		}
		onsuccess(data);
	}).fail(function (data, textStatus, errorThrown) {
		if (errorThrown === '') {
			errorThrown = 'Nog bezig met laden!';
		}
		if (source) {
			(0, _jquery2.default)(source).replaceWith('<img title="' + errorThrown + '" src="/plaetjes/famfamfam/cancel.png" />');
		} else {
			(0, _modal.modalClose)();
		}
		if (onerror) {
			onerror(data.responseText);
		}
	}).always(function () {
		if (onfinish) {
			onfinish();
		}
	});
}

/**
 * @param url
 * @param ketzer
 * @returns {boolean}
 */
function ketzerAjax(url, ketzer) {
	(0, _jquery2.default)(ketzer + ' .aanmelddata').html('Aangemeld:<br /><img src="/images/loading-arrows.gif" />');
	_jquery2.default.ajax({
		type: 'GET',
		cache: false,
		url: url,
		data: ''
	}).done(function (data) {
		(0, _jquery2.default)(ketzer).replaceWith(data);
	}).fail(function (jqXHR, textStatus, errorThrown) {
		(0, _jquery2.default)(ketzer + ' .aanmelddata').html('<span class="error">Error: </span>' + errorThrown);
		alert(jqXHR.responseText);
	});
	return true;
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomIntFromInterval = randomIntFromInterval;
exports.selectText = selectText;
exports.dirname = dirname;
exports.basename = basename;
exports.reload = reload;
exports.redirect = redirect;
exports.route = route;

var _context = __webpack_require__(6);

/**
 * @source http://stackoverflow.com/a/7228322
 * @see templates/fotoalbum/slider.tpl
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Selecteer de tekst van een DOM-element.
 * @source http://stackoverflow.com/questions/985272/jquery-selecting-text-in-an-element-akin-to-highlighting-with-your-mouse/987376#987376
 *
 * @see templates/fotoalbum/album.tpl
 * @param {Node} elmnt DOM-object
 */
function selectText(elmnt) {
    var range = void 0,
        selection = void 0;
    if (document.body.createTextRange) {
        //ms
        range = document.body.createTextRange();
        range.moveToElementText(elmnt);
        range.select();
    } else if (window.getSelection) {
        //all others
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(elmnt);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

/**
 //  discuss at: http://phpjs.org/functions/dirname/
 // original by: Ozh
 // improved by: XoraX (http://www.xorax.info)
 //   example 1: dirname('/etc/passwd');
 //   returns 1: '/etc'
 //   example 2: dirname('c:/Temp/x');
 //   returns 2: 'c:/Temp'
 //   example 3: dirname('/dir/test/');
 //   returns 3: '/dir'
 * @see templates/fotoalbum/album.tpl
 * @param {string} path
 * @returns {string}
 */
function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^/]*\/?$/, '');
}

/**
 * @see templates/fotoalbum/album.tpl
 * @param {string} path
 * @param {string} suffix
 * @returns {string}
 */
function basename(path, suffix) {
    //  discuss at: http://phpjs.org/functions/basename/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Ash Searle (http://hexmen.com/blog/)
    // improved by: Lincoln Ramsay
    // improved by: djmix
    // improved by: Dmitry Gorelenkov
    //   example 1: basename('/www/site/home.htm', '.htm');
    //   returns 1: 'home'
    //   example 2: basename('ecra.php?p=1');
    //   returns 2: 'ecra.php?p=1'
    //   example 3: basename('/some/path/');
    //   returns 3: 'path'
    //   example 4: basename('/some/path_ext.ext/','.ext');
    //   returns 4: 'path_ext'

    var base = path;
    var lastChar = base.charAt(base.length - 1);

    if (lastChar === '/' || lastChar === '\\') {
        base = base.slice(0, -1);
    }

    base = base.replace(/^.*[/\\]/g, '');

    if (typeof suffix === 'string' && base.substr(base.length - suffix.length) === suffix) {
        base = base.substr(0, base.length - suffix.length);
    }

    return base;
}

/**
 * @param {string} htmlString
 */
function reload(htmlString) {
    // prevent hidden errors
    if (typeof htmlString === 'string' && htmlString.substring(0, 16) === '<div id="modal" ') {
        (0, _context.domUpdate)(htmlString);
        return;
    }
    location.reload();
}

/**
 * @param {string} htmlString
 */
function redirect(htmlString) {
    // prevent hidden errors
    if (typeof htmlString === 'string' && htmlString.substring(0, 16) === '<div id="modal" ') {
        (0, _context.domUpdate)(htmlString);
        return;
    }
    window.location.href = htmlString;
}

function route(path, cb) {
    if (window.location.pathname.startsWith(path)) {
        cb();
    }
}

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _context = __webpack_require__(6);

var _context2 = _interopRequireDefault(_context);

var _bbcode = __webpack_require__(83);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(431); /**
                       * Wordt geladen als de pagina geladen is.
                       */

__webpack_require__(128);
__webpack_require__(127);
__webpack_require__(126);
__webpack_require__(125);

_jquery2.default.widget.bridge('uitooltip', _jquery2.default.ui.tooltip);

__webpack_require__(129);

window.bbcode = {
	CsrBBPreview: _bbcode.CsrBBPreview,
	bbvideoDisplay: _bbcode.bbvideoDisplay
};

var $window = (0, _jquery2.default)(window),
    $body = (0, _jquery2.default)('body'),
    $header = (0, _jquery2.default)('#header'),
    $banner = (0, _jquery2.default)('#banner');

if (typeof $banner[0] === 'undefined') {
	$banner = (0, _jquery2.default)('#banner-small');
}

$window.on('load', function () {
	// Lazy load cms pages, these should be loaded always, not on scroll
	setTimeout(function () {
		(0, _jquery2.default)('div.bb-img-loading').each(function () {
			var content = (0, _jquery2.default)(document.createElement('img'));
			content.on('error', function () {
				(0, _jquery2.default)(this).attr('title', 'Afbeelding bestaat niet of is niet toegankelijk!');
				(0, _jquery2.default)(this).attr('src', '/plaetjes/famfamfam/picture_error.png');
				(0, _jquery2.default)(this).css('width', '16px');
				(0, _jquery2.default)(this).css('height', '16px');
				(0, _jquery2.default)(this).removeClass('bb-img-loading').addClass('bb-img');
			});
			content.addClass('bb-img');
			content.attr('alt', (0, _jquery2.default)(this).attr('title'));
			content.attr('style', (0, _jquery2.default)(this).attr('style'));
			content.attr('src', (0, _jquery2.default)(this).attr('src'));
			(0, _jquery2.default)(this).html(content);
			content.on('load', function () {
				var foto = content.attr('src').indexOf('/plaetjes/fotoalbum/') >= 0;
				var video = (0, _jquery2.default)(this).parent().parent().hasClass('bb-video-preview');
				var hasAnchor = (0, _jquery2.default)(this).closest('a').length !== 0;
				(0, _jquery2.default)(this).parent().replaceWith((0, _jquery2.default)(this));
				if (!foto && !video && !hasAnchor) {
					(0, _jquery2.default)(this).wrap('<a class="lightbox-link" href="' + (0, _jquery2.default)(this).attr('src') + '" data-lightbox="page-lightbox"></a>');
				}
			});
		});
	});
});

var lazyLoad = function () {
	var hasLoaded = false;

	return function () {
		if (hasLoaded) {
			return;
		}

		hasLoaded = true;

		// Lazy load frontpage
		setTimeout(function () {
			(0, _jquery2.default)('.lazy-load').each(function () {
				(0, _jquery2.default)(this).replaceWith(this.textContent);
			});
		});
	};
}();

// Lazy load after animations have finished and user has scrolled
$window.on('scroll', function () {
	if ((0, _jquery2.default)(window).scrollTop() > 0) {
		lazyLoad();
	}

	if (window.pageYOffset > $banner.outerHeight()) {
		$header.removeClass('alt');
	} else {
		$header.addClass('alt');
	}
});

$window.on('resize', function () {
	return $window.trigger('scroll');
});
$window.trigger('scroll');

(0, _context2.default)($body);

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fnUpdateDataTable = fnUpdateDataTable;
exports.fnGetSelection = fnGetSelection;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _context = __webpack_require__(6);

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/****************************
 * Een paar functies om met datatables te
 * praten, laadt datatables zelf niet in.
 */

/**
 * @see datatable.js
 * @see view/formulier/datatable/DataTable.php
 * @param tableId
 * @param response
 */
function fnUpdateDataTable(tableId, response) {
    var $table = (0, _jquery2.default)(tableId);
    var table = $table.DataTable();
    // update or remove existing rows or add new rows
    response.data.forEach(function (row) {
        var $tr = (0, _jquery2.default)('tr[data-uuid="' + row.UUID + '"]');
        if ($tr.length === 1) {
            if ('remove' in row) {
                table.row($tr).remove();
            } else {
                table.row($tr).data(row);
                (0, _context2.default)($tr);
            }
        } else if ($tr.length === 0) {
            table.row.add(row);
        } else {
            alert($tr.length);
        }
    });
    table.draw(false);
}

/**
 * @see csrdelft.js
 * @param tableId
 * @returns {Array}
 */
function fnGetSelection(tableId) {
    var selection = [];
    (0, _jquery2.default)(tableId + ' tbody tr.selected').each(function () {
        selection.push((0, _jquery2.default)(this).attr('data-uuid'));
    });
    return selection;
}

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.takenToggleDatum = takenToggleDatum;
exports.takenShowOld = takenShowOld;
exports.takenColorSuggesties = takenColorSuggesties;
exports.takenToggleSuggestie = takenToggleSuggestie;
exports.takenSelectRange = takenSelectRange;
exports.takenSubmitRange = takenSubmitRange;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _ajax = __webpack_require__(28);

var _context = __webpack_require__(6);

var _dragobject = __webpack_require__(81);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} datum
 * @param {number} index
 */
/**
 * maalcie.js	|	P.W.G. Brussee (brussee@live.nl)
 *
 * requires jQuery & dragobject.js
 */
function takenToggleDatumFirst(datum, index) {
	if ('taak-datum-head-' + datum === (0, _jquery2.default)('#maalcie-tabel tr:visible').eq(index).attr('id')) {
		(0, _jquery2.default)('#taak-datum-head-first').toggle();
	}
}

function takenColorDatum() {
	(0, _jquery2.default)('tr.taak-datum-summary:visible:odd th').css('background-color', '#FAFAFA');
	(0, _jquery2.default)('tr.taak-datum-summary:visible:even th').css('background-color', '#f5f5f5');
}

/**
 * @param {string} datum
 */
function takenToggleDatum(datum) {
	takenToggleDatumFirst(datum, 0);
	(0, _jquery2.default)('.taak-datum-' + datum).toggle();
	takenToggleDatumFirst(datum, 1);
	takenColorDatum();
}

function takenShowOld() {
	(0, _jquery2.default)('#taak-datum-head-first').show();
	(0, _jquery2.default)('tr.taak-datum-oud').show();
	takenColorDatum();
}

function takenColorSuggesties() {
	var $suggestiesTabel = (0, _jquery2.default)('#suggesties-tabel');
	$suggestiesTabel.find('tr:visible:odd').css('background-color', '#FAFAFA');
	$suggestiesTabel.find('tr:visible:even').css('background-color', '#EBEBEB');
}

/**
 * @param {string} soort
 * @param {boolean} show
 */
function takenToggleSuggestie(soort, show) {
	(0, _jquery2.default)('#suggesties-tabel .' + soort).each(function () {
		var verborgen = 0;
		if (typeof show !== 'undefined') {
			if (show) {
				(0, _jquery2.default)(this).removeClass(soort + 'verborgen');
			} else {
				(0, _jquery2.default)(this).addClass(soort + 'verborgen');
			}
		} else {
			(0, _jquery2.default)(this).toggleClass(soort + 'verborgen');
		}
		if ((0, _jquery2.default)(this).hasClass('geenvoorkeurverborgen')) {
			verborgen++;
		}
		if ((0, _jquery2.default)(this).hasClass('recentverborgen')) {
			verborgen++;
		}
		if ((0, _jquery2.default)(this).hasClass('jongsteverborgen')) {
			verborgen++;
		}
		if ((0, _jquery2.default)(this).hasClass('oudereverborgen')) {
			verborgen++;
		}
		if (verborgen > 0) {
			(0, _jquery2.default)(this).hide();
		} else {
			(0, _jquery2.default)(this).show();
		}
	});
	takenColorSuggesties();
}

var lastSelectedId = void 0;
/**
 * @param {KeyboardEvent} e
 */
function takenSelectRange(e) {
	var withinRange = false;
	(0, _jquery2.default)('#maalcie-tabel').find('tbody tr td a input[name="' + (0, _jquery2.default)(e.target).attr('name') + '"]:visible').each(function () {
		var thisId = (0, _jquery2.default)(this).attr('id');
		if (thisId === lastSelectedId) {
			withinRange = !withinRange;
		}
		if (thisId === e.target.id) {
			withinRange = !withinRange;
			var check = (0, _jquery2.default)(this).prop('checked');
			setTimeout(function () {
				// workaround e.preventDefault()
				(0, _jquery2.default)('#' + thisId).prop('checked', check);
			}, 50);
		} else if (e.shiftKey && withinRange) {
			(0, _jquery2.default)(this).prop('checked', true);
		}
	});
	lastSelectedId = e.target.id;
}

/**
 * @param {Event} e
 * @returns {boolean}
 */
function takenSubmitRange(e) {
	if (e.target.tagName.toUpperCase() === 'IMG') {
		// over an image inside of anchor
		e.target = (0, _jquery2.default)(e.target).parent();
	}
	(0, _jquery2.default)(e.target).find('input').prop('checked', true);
	if ((0, _jquery2.default)(e.target).hasClass('confirm') && !confirm((0, _jquery2.default)(e.target).attr('title') + '.\n\nWeet u het zeker?')) {
		return false;
	}
	(0, _jquery2.default)('input[name="' + (0, _jquery2.default)(e.target).find('input:first').attr('name') + '"]:visible').each(function () {
		if ((0, _jquery2.default)(this).prop('checked')) {
			(0, _ajax.ajaxRequest)('POST', (0, _jquery2.default)(this).parent().attr('href'), (0, _jquery2.default)(this).parent().attr('post'), (0, _jquery2.default)(this).parent(), _context.domUpdate, alert);
		}
	});
}

/* Ruilen van CorveeTaak */

/**
 * @param {Event} e
 */
function takenMagRuilen(e) {
	if (e.target.tagName.toUpperCase() === 'IMG') {
		// over an image inside of anchor
		e.target = (0, _jquery2.default)(e.target).parent();
	}

	var source = _dragobject.dragObject.el;
	if ((0, _jquery2.default)(source).attr('id') !== (0, _jquery2.default)(e.target).attr('id')) {
		e.preventDefault();
	}
}

/**
 * @param {Event} e
 */
function takenRuilen(e) {
	e.preventDefault();
	var elmnt = e.target;
	if (elmnt.tagName.toUpperCase() === 'IMG') {
		// dropped on image inside of anchor
		elmnt = (0, _jquery2.default)(elmnt).parent();
	}
	var source = _dragobject.dragObject.el;
	if (!confirm('Toegekende corveepunten worden meegeruild!\n\nDoorgaan met ruilen?')) {
		return;
	}
	var attr = (0, _jquery2.default)(source).attr('uid');
	if (typeof attr === 'undefined' || attr === false) {
		attr = '';
	}
	(0, _ajax.ajaxRequest)('POST', (0, _jquery2.default)(elmnt).attr('href'), 'uid=' + attr, elmnt, _context.domUpdate, alert);
	attr = (0, _jquery2.default)(elmnt).attr('uid');
	if (typeof attr === 'undefined' || attr === false) {
		attr = '';
	}
	(0, _ajax.ajaxRequest)('POST', (0, _jquery2.default)(source).attr('href'), 'uid=' + attr, source, _context.domUpdate, alert);
}

(0, _jquery2.default)(function () {
	(0, _jquery2.default)('a.ruilen').each(function () {
		(0, _jquery2.default)(this).removeClass('ruilen');
		(0, _jquery2.default)(this).on('dragover', takenMagRuilen);
		(0, _jquery2.default)(this).on('drop', takenRuilen);
	});
});

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.formIsChanged = formIsChanged;
exports.formInlineToggle = formInlineToggle;
exports.formToggle = formToggle;
exports.formReset = formReset;
exports.formSubmit = formSubmit;
exports.formCancel = formCancel;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _modal = __webpack_require__(27);

var _ajax = __webpack_require__(28);

var _context = __webpack_require__(6);

var _context2 = _interopRequireDefault(_context);

var _datatableApi = __webpack_require__(53);

var _util = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formIsChanged(form) {
    var changed = false;
    (0, _jquery2.default)(form).find('.FormElement').not('.tt-hint').each(function () {
        var elmnt = (0, _jquery2.default)(this);
        if (elmnt.is('input:radio')) {
            if (elmnt.is(':checked') && elmnt.attr('origvalue') !== elmnt.val()) {
                changed = true;
                return false; // break each
            }
        } else if (elmnt.is('input:checkbox')) {
            if (elmnt.is(':checked') !== (elmnt.attr('origvalue') === '1')) {
                changed = true;
                return false; // break each
            }
        } else if (elmnt.val() !== elmnt.attr('origvalue')) {
            changed = true;
            return false; // break each
        }
    });
    return changed;
}

/**
 * @see templates/instellingen/beheer/instelling_row.tpl
 * @param form
 */
function formInlineToggle(form) {
    form.prev('.InlineFormToggle').toggle();
    form.toggle();
    form.children(':first').focus();
}

function formToggle(event) {
    event.preventDefault();
    var form = (0, _jquery2.default)(this).next('form');
    formInlineToggle(form);
    return false;
}

function formReset(event, form) {
    if (!form) {
        form = (0, _jquery2.default)(this).closest('form');
        event.preventDefault();
    }
    if ((0, _jquery2.default)(this).hasClass('confirm') && !confirm((0, _jquery2.default)(this).attr('title') + '.\n\nWeet u het zeker?')) {
        return false;
    }
    form.find('.FormElement').each(function () {
        var orig = (0, _jquery2.default)(this).attr('origvalue');
        if (typeof orig === 'string') {
            (0, _jquery2.default)(this).val(orig);
        }
    });
    return false;
}

/**
 * @see view/formulier/invoervelden/InputField.abstract.php
 * @see view/formulier/invoervelden/ZoekField.php
 * @param event
 * @returns {boolean}
 */
function formSubmit(event) {
    if ((0, _jquery2.default)(this).hasClass('confirm')) {
        var q = (0, _jquery2.default)(this).attr('title');
        if (q) {
            q += '.\n\n';
        } else {
            q = 'Weet u het zeker?';
        }
        if (!confirm(q)) {
            event.preventDefault();
            return false;
        }
    }

    var form = (0, _jquery2.default)(this).closest('form');
    if (!form.hasClass('Formulier')) {
        if (event) {
            form = (0, _jquery2.default)(event.target.form);
        } else {
            return false;
        }
    }

    if (form.hasClass('PreventUnchanged') && !formIsChanged(form)) {
        event.preventDefault();
        alert('Geen wijzigingen');
        return false;
    }

    if ((0, _jquery2.default)(this).attr('href')) {
        form.attr('action', (0, _jquery2.default)(this).attr('href'));
    }

    if (form.hasClass('ModalForm') || form.hasClass('InlineForm')) {
        event.preventDefault();
        var formData = new FormData(form.get(0)),
            done = _context.domUpdate,
            source = false;

        if (form.hasClass('InlineForm')) {
            source = form;
            formData.append('InlineFormId', form.attr('id'));
            if (form.data('submitCallback')) {
                done = form.data('submitCallback');
            }
        }

        if (form.hasClass('DataTableResponse')) {

            var tableId = form.attr('data-tableid');
            if (!document.getElementById(tableId)) {
                alert('DataTable not found');
            }

            formData.append('DataTableId', tableId);
            var selection = (0, _datatableApi.fnGetSelection)('#' + tableId);
            _jquery2.default.each(selection, function (key, value) {
                formData.append('DataTableSelection[]', value);
            });

            done = function done(response) {
                if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object') {
                    // JSON
                    (0, _datatableApi.fnUpdateDataTable)('#' + tableId, response);
                    if (response.modal) {
                        (0, _modal.modalOpen)(response.modal);
                        (0, _context2.default)((0, _jquery2.default)('#modal'));
                    } else {
                        (0, _modal.modalClose)();
                    }
                } else {
                    // HTML
                    (0, _context.domUpdate)(response);
                }
            };

            if (!form.hasClass('noanim')) {
                source = false;
            }
        }

        if (form.hasClass('ReloadPage')) {
            done = _util.reload;
        } else if (form.hasClass('redirect')) {
            done = _util.redirect;
        }

        (0, _ajax.ajaxRequest)('POST', form.attr('action'), formData, source, done, alert, function () {
            if (form.hasClass('SubmitReset')) {
                formReset(event, form);
            }
        });

        return false;
    }
    form.off('submit');
    form.trigger('submit');
    return true;
}

/**
 * @see view/formulier/invoervelden/InputField.abstract.php
 * @param event
 * @returns {boolean}
 */
function formCancel(event) {
    var source = (0, _jquery2.default)(event.target);
    if (source.length === 0) {
        source = (0, _jquery2.default)(this);
    }
    if (source.hasClass('confirm') && !confirm(source.attr('title') + '.\n\nWeet u het zeker?')) {
        event.preventDefault();
        return false;
    }
    var form = source.closest('form');
    if (form.hasClass('InlineForm')) {
        event.preventDefault();
        formInlineToggle(form);
        return false;
    }
    if (form.hasClass('ModalForm')) {
        event.preventDefault();
        if (!formIsChanged(form) || confirm('Sluiten zonder wijzigingen op te slaan?')) {
            (0, _modal.modalClose)();
        }
        return false;
    }
    return true;
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initHoverIntents = initHoverIntents;
exports.default = initContext;
exports.domUpdate = domUpdate;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _vue = __webpack_require__(79);

var _vue2 = _interopRequireDefault(_vue);

var _knop = __webpack_require__(80);

var _modal = __webpack_require__(27);

var _formulier = __webpack_require__(56);

var _bbcodeSet = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initButtons(parent) {
    (0, _jquery2.default)(parent).find('.spoiler').bind('click.spoiler', function (event) {
        event.preventDefault();
        var button = (0, _jquery2.default)(this);
        var content = button.next('div.spoiler-content');
        if (button.html() === 'Toon verklapper') {
            button.html('Verberg verklapper');
        } else {
            button.html('Toon verklapper');
        }
        content.toggle(800, 'easeInOutCubic');
    });
    (0, _jquery2.default)(parent).find('.post').bind('click.post', _knop.knopPost);
    (0, _jquery2.default)(parent).find('.get').bind('click.get', _knop.knopGet);
    (0, _jquery2.default)(parent).find('.vergroot').bind('click.vergroot', _knop.knopVergroot);
}

function initForms(parent) {
    (0, _jquery2.default)(parent).find('form').submit(_formulier.formSubmit);
    (0, _jquery2.default)(parent).find('.submit').bind('click.submit', _formulier.formSubmit);
    (0, _jquery2.default)(parent).find('.reset').bind('click.reset', _formulier.formReset);
    (0, _jquery2.default)(parent).find('.cancel').bind('click.cancel', _formulier.formCancel);
    (0, _jquery2.default)(parent).find('.InlineFormToggle').bind('click.toggle', _formulier.formToggle);
    (0, _jquery2.default)(parent).find('.SubmitChange').bind('change.change', _formulier.formSubmit);
}

function initTimeago(parent) {
    _jquery2.default.timeago.settings.strings = {
        prefiprefixAgo: '',
        prefixFromNow: 'sinds',
        suffixAgo: 'geleden',
        suffixFromNow: '',
        seconds: 'nog geen minuut',
        minute: '1 minuut',
        minutes: '%d minuten',
        hour: '1 uur',
        hours: '%d uur',
        day: '1 dag',
        days: '%d dagen',
        month: '1 maand',
        months: '%d maanden',
        year: '1 jaar',
        years: '%d jaar',
        wordSeparator: ' ',
        numbers: []
    };
    (0, _jquery2.default)(parent).find('time.timeago').timeago();
}

function initMarkitup(parent) {
    (0, _jquery2.default)(parent).find('textarea.BBCodeField').markItUp(_bbcodeSet.bbCodeSet);
}

function initTooltips(parent) {
    (0, _jquery2.default)(parent).uitooltip({ track: true });
}

function initHoverIntents(parent) {
    (0, _jquery2.default)(parent).find('.hoverIntent').hoverIntent({
        over: function over() {
            (0, _jquery2.default)(this).find('.hoverIntentContent').fadeIn();
        },
        out: function out() {
            (0, _jquery2.default)(this).find('.hoverIntentContent').fadeOut();
        },

        timeout: 250
    });
}

function initLazyImages(parent) {
    (0, _jquery2.default)(parent).find('div.bb-img-loading').each(function () {
        var content = (0, _jquery2.default)(document.createElement('IMG'));
        content.on('error', function () {
            (0, _jquery2.default)(this).attr('title', 'Afbeelding bestaat niet of is niet toegankelijk!');
            (0, _jquery2.default)(this).attr('src', '/plaetjes/famfamfam/picture_error.png');
            (0, _jquery2.default)(this).css('width', '16px');
            (0, _jquery2.default)(this).css('height', '16px');
            (0, _jquery2.default)(this).removeClass('bb-img-loading').addClass('bb-img');
        });
        content.addClass('bb-img');
        content.attr('alt', (0, _jquery2.default)(this).attr('title'));
        content.attr('style', (0, _jquery2.default)(this).attr('style'));
        content.attr('src', (0, _jquery2.default)(this).attr('src'));
        (0, _jquery2.default)(this).html(content);
        content.on('load', function () {
            var foto = content.attr('src').indexOf('/plaetjes/fotoalbum/') >= 0;
            var video = (0, _jquery2.default)(this).parent().parent().hasClass('bb-video-preview');
            var hasAnchor = (0, _jquery2.default)(this).closest('a').length !== 0;
            (0, _jquery2.default)(this).parent().replaceWith((0, _jquery2.default)(this));
            if (!foto && !video && !hasAnchor) {
                (0, _jquery2.default)(this).wrap('<a class="lightbox-link" href="' + (0, _jquery2.default)(this).attr('src') + '" data-lightbox="page-lightbox"></a>');
            }
        });
    });
}

function initVue(parent) {
    (0, _jquery2.default)(parent).find('.vue-context').each(function () {
        new _vue2.default({ el: this });
    });
}

function initContext(parent) {
    initButtons(parent);
    initForms(parent);
    initTimeago(parent);
    initMarkitup(parent);
    initTooltips(parent);
    initHoverIntents(parent);
    initLazyImages(parent);
    (0, _knop.radioButtonGroep)(parent);
    initVue(parent);
}

function domUpdate(htmlString) {
    htmlString = _jquery2.default.trim(htmlString);
    if (htmlString.substring(0, 9) === '<!DOCTYPE') {
        alert('response error');
        document.write(htmlString);
    }
    var html = _jquery2.default.parseHTML(htmlString, document, true);
    (0, _jquery2.default)(html).each(function () {
        var id = (0, _jquery2.default)(this).attr('id');

        var elmnt = (0, _jquery2.default)('#' + id);
        if (elmnt.length === 1) {
            if ((0, _jquery2.default)(this).hasClass('remove')) {
                elmnt.effect('fade', {}, 400, function () {
                    (0, _jquery2.default)(this).remove();
                });
            } else {
                elmnt.replaceWith((0, _jquery2.default)(this).show()).effect('highlight');
            }
        } else {
            var parentid = (0, _jquery2.default)(this).attr('parentid');
            if (parentid) {
                (0, _jquery2.default)(this).prependTo('#' + parentid).show().effect('highlight');
            } else {
                (0, _jquery2.default)(this).prependTo('#maalcie-tabel tbody:visible:first').show().effect('highlight'); //FIXME: make generic
            }
        }
        initContext((0, _jquery2.default)(this));

        if (id === 'modal') {
            (0, _modal.modalOpen)();
        } else {
            (0, _modal.modalClose)();
        }
    });
}

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.radioButtonGroep = radioButtonGroep;
exports.knopAjax = knopAjax;
exports.knopPost = knopPost;
exports.knopGet = knopGet;
exports.knopVergroot = knopVergroot;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _modal = __webpack_require__(27);

var _ajax = __webpack_require__(28);

var _context = __webpack_require__(6);

var _context2 = _interopRequireDefault(_context);

var _maalcie = __webpack_require__(55);

var _datatableApi = __webpack_require__(53);

var _util = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function radioButtonGroep(parent) {
    (0, _jquery2.default)(parent).find('[data-buttons=radio]').each(function () {
        var container = (0, _jquery2.default)(this);

        container.find('a.btn').on('click', function (event) {
            container.find('.active').removeClass('active');

            (0, _jquery2.default)(event.target).addClass('active');
        });
    });
}

function knopAjax(knop, type) {
    if (knop.hasClass('confirm') && !confirm(knop.attr('title') + '.\n\nWeet u het zeker?')) {
        (0, _modal.modalClose)();
        return false;
    }
    var source = knop,
        done = _context.domUpdate,
        data = knop.data();

    if (knop.hasClass('popup')) {
        source = false;
    }
    if (knop.hasClass('prompt')) {
        data = data.split('=');
        var val = prompt(data[0], data[1]);
        if (!val) {
            return false;
        }
        data = encodeURIComponent(data[0]) + '=' + encodeURIComponent(val);
    }
    if (knop.hasClass('addfav')) {
        data = {
            'tekst': document.title.replace('C.S.R. Delft - ', ''),
            'link': window.location.href
        };
    }
    if (knop.hasClass('DataTableResponse')) {

        var tableId = knop.attr('data-tableid');
        if (!document.getElementById(tableId)) {
            tableId = knop.closest('form').attr('data-tableid');
            if (!document.getElementById(tableId)) {
                alert('DataTable not found');
            }
        }

        var selection = (0, _datatableApi.fnGetSelection)('#' + tableId);
        data = {
            'DataTableId': tableId,
            'DataTableSelection[]': selection
        };

        done = function done(response) {
            if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object') {
                // JSON
                (0, _datatableApi.fnUpdateDataTable)('#' + tableId, response);
                if (response.modal) {
                    (0, _modal.modalOpen)(response.modal);
                    (0, _context2.default)((0, _jquery2.default)('#modal'));
                } else {
                    (0, _modal.modalClose)();
                }
            } else {
                // HTML
                (0, _context.domUpdate)(response);
            }
        };

        if (!knop.hasClass('SingleRow')) {
            source = false;
        }
    }
    if (knop.hasClass('ReloadPage')) {
        done = _util.reload;
    } else if (knop.hasClass('redirect')) {
        done = _util.redirect;
    }

    (0, _ajax.ajaxRequest)(type, knop.attr('href'), data, source, done, alert);
}

/**
 * @see datatable.js
 * @param event
 * @returns {boolean}
 */
function knopPost(event) {
    event.preventDefault();
    if ((0, _jquery2.default)(this).hasClass('range')) {
        if (event.target.tagName.toUpperCase() === 'INPUT') {
            (0, _maalcie.takenSelectRange)(event);
        } else {
            (0, _maalcie.takenSubmitRange)(event);
        }
        return false;
    }
    knopAjax((0, _jquery2.default)(this), 'POST');
    return false;
}

function knopGet(event) {
    event.preventDefault();
    knopAjax((0, _jquery2.default)(this), 'GET');
    return false;
}

function knopVergroot() {
    var knop = (0, _jquery2.default)(this),
        id = knop.attr('data-vergroot'),
        oud = knop.attr('data-vergroot-oud');

    if (oud) {
        (0, _jquery2.default)(id).animate({ 'height': oud }, 600);
        knop.removeAttr('data-vergroot-oud');
        knop.find('span.fa').removeClass('fa-compress').addClass('fa-expand');
        knop.attr('title', 'Uitklappen');
    } else {
        knop.attr('title', 'Inklappen');
        knop.find('span.fa').removeClass('fa-expand').addClass('fa-compress');
        knop.attr('data-vergroot-oud', (0, _jquery2.default)(id).height());
        (0, _jquery2.default)(id).animate({
            'height': (0, _jquery2.default)(id).prop('scrollHeight') + 1
        }, 600);
    }
}

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragObject", function() { return dragObject; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

var dragObject = {
    el: undefined
};
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
    var dragged, oldX, oldY;
    function docScrollLeft() {
        return (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    }
    function docScrollTop() {
        return (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }
    function mouseX(e) {
        if (e.pageX) {
            return e.pageX;
        }
        if (e.clientX) {
            return e.clientX + docScrollLeft();
        }
        return 0;
    }
    function mouseY(e) {
        if (e.pageY) {
            return e.pageY;
        }
        if (e.clientY) {
            return e.clientY + docScrollTop();
        }
        return 0;
    }
    function mouseMoveHandler(e) {
        if (!dragObject.el) {
            return;
        }
        var instance = dragObject.el;
        e = e || window.event;
        var newX = mouseX(e);
        var newY = mouseY(e);
        dragged = instance.hasClass('savepos');
        var scrollTop = instance.scrollTop() || 0, scrollLeft = instance.scrollLeft() || 0;
        if (instance.hasClass('dragvertical')) {
            instance.scrollTop(scrollTop + oldY - newY);
        }
        else if (instance.hasClass('draghorizontal')) {
            instance.scrollLeft(scrollLeft + oldX - newX);
        }
        else {
            var offset = instance.offset() || { left: 0, top: 0 };
            instance.css({
                'top': (offset.top - docScrollTop() + newY - oldY) + 'px',
                'left': (offset.left - docScrollLeft() + newX - oldX) + 'px'
            });
        }
        oldX = newX;
        oldY = newY;
    }
    function startDrag(e) {
        e = e || window.event;
        var target = e.target;
        if (target instanceof Element) {
            var tag = target.tagName.toUpperCase();
            var overflow = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).css('overflow');
            if ((tag !== 'DIV' && tag !== 'H1') || overflow === 'auto' || overflow === 'scroll') {
                return;
            }
            dragObject.el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target);
            if (typeof dragObject.el === 'undefined' || !dragObject.el.hasClass('dragobject')) {
                dragObject.el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).closest('.dragobject');
            }
            if (typeof dragObject.el !== 'undefined') {
                oldX = mouseX(e);
                oldY = mouseY(e);
                window.addEventListener('mousemove', mouseMoveHandler, true);
            }
            else {
                dragObject.el = undefined;
            }
        }
        dragged = false;
    }
    function stopDrag() {
        if (!dragObject.el) {
            return;
        }
        window.removeEventListener('mousemove', mouseMoveHandler, true);
        if (dragged) {
            var instance = dragObject.el;
            var top = void 0, left = void 0;
            if (instance.hasClass('dragvertical') || instance.hasClass('draghorizontal')) {
                top = instance.scrollTop();
                left = instance.scrollLeft();
            }
            else {
                var offset = instance.offset() || { top: 0, left: 0 };
                top = offset.top - docScrollTop();
                left = offset.left - docScrollLeft();
            }
            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.post('/tools/dragobject.php', {
                id: instance.attr('id'),
                coords: {
                    top: top,
                    left: left
                }
            });
            dragged = false;
        }
        dragObject.el = undefined;
    }
    window.addEventListener('mousedown', startDrag, false);
    window.addEventListener('mouseup', stopDrag, false);
});


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// BBCode tags example
// http://en.wikipedia.org/wiki/Bbcode
// ----------------------------------------------------------------------------
// Feel free to add more tags
// ----------------------------------------------------------------------------
var bbCodeSet = exports.bbCodeSet = {
    nameSpace: 'CsrBB',
    previewParserPath: '/tools/bbcode.php', // path to your BBCode parser
    markupSet: [{ className: 'ico text_bold', name: 'Dikgedrukt', key: 'B', openWith: '[b]', closeWith: '[/b]' }, { className: 'ico text_italic', name: 'Cursief', key: 'I', openWith: '[i]', closeWith: '[/i]' }, { className: 'ico text_underline', name: 'Onderstreept', key: 'U', openWith: '[u]', closeWith: '[/u]' }, { className: 'ico text_strikethrough', name: 'Doorgestreept', key: 'S', openWith: '[s]', closeWith: '[/s]' }, { separator: '|' }, { className: 'ico text_smallcaps', name: 'Offtopic', key: 'O', openWith: '[offtopic]', closeWith: '[/offtopic]' }, { className: 'ico comments', name: 'Citaat', key: 'Q', openWith: '[citaat=Naam_of_lidnummer]', closeWith: '[/citaat]' }, { separator: '|' }, { className: 'ico link', name: 'Link', key: 'L', openWith: '[url=[![Url]!]]', closeWith: '[/url]', placeHolder: 'Link tekst' }, { className: 'ico email_link', name: 'Email', key: 'E', openWith: '[email=[![Email adres]!]]', closeWith: '[/email]', placeHolder: 'Link tekst' }, { separator: '|' }, { className: 'ico photos', name: 'Fotoalbum', replaceWith: function replaceWith(markitup) {
            var url = decodeURIComponent(window.prompt('Url', '').trim());
            var pos = url.indexOf('/fotoalbum/');
            if (pos > 0) {
                url = url.substring(pos + 10);
                return '[fotoalbum]' + url + '[/fotoalbum]';
            }
            alert('Ongeldige url!');
            return markitup.selection;
        } }, { className: 'ico photo', name: 'Poster of foto uit album', replaceWith: function replaceWith(markitup) {
            var url = decodeURIComponent(window.prompt('Url', '').trim());
            var pos = url.indexOf('/fotoalbum/');
            if (pos > 0) {
                url = url.substring(pos + 10).replace('_resized/', '').replace('_thumbs/', '').replace('#', '');
                return '[foto]' + url + '[/foto]';
            }
            alert('Ongeldige url!');
            return markitup.selection;
        } }, { className: 'ico picture', name: 'Afbeelding', replaceWith: '[img][![Url]!][/img]' }, { className: 'ico film', name: 'Video', replaceWith: '[video][![Url]!][/video]' }, { separator: '|' }, { className: 'ico map', name: 'Kaart', openWith: '[locatie]', closeWith: '[/locatie]', placeHolder: 'C.S.R. Delft' }, { className: 'ico sound_mute', name: 'Verklapper', openWith: '[verklapper]', closeWith: '[/verklapper]' }, { className: 'ico shield', name: 'Privé', openWith: '[prive]', closeWith: '[/prive]', placeHolder: 'Afgeschermde gegevens' },
    //{className: 'btn-kop', name: 'Kop',
    //	dropMenu: [
    //		{className: 'btn-h1', name: 'H1', openWith: '[h=1]', closeWith: '[/h]'},
    //		{className: 'btn-h2', name: 'H2', openWith: '[h=2]', closeWith: '[/h]'},
    //		{className: 'btn-h3', name: 'H3', openWith: '[h=3]', closeWith: '[/h]'},
    //		{className: 'btn-h4', name: 'H4', openWith: '[h=4]', closeWith: '[/h]'},
    //		{className: 'btn-h5', name: 'H5', openWith: '[h=5]', closeWith: '[/h]'},
    //		{className: 'btn-h6', name: 'H6', openWith: '[h=6]', closeWith: '[/h]'}
    //	]},
    //{separator: '|'},
    //{className: 'btn-lijst-1', name: 'Genummerde lijst', openWith: '[list=[![Starting number]!]]\n', closeWith: '\n[/list]'},
    //{className: 'btn-lijst-a', name: 'Ongenummerde lijst', openWith: '[list]\n', closeWith: '\n[/list]'},
    //{className: 'btn-lijst-punt', name: 'Lijstpunt', openWith: '[*] '},
    { separator: '|' }, { className: 'ico script_code_red', name: 'Code', openWith: '[code]', closeWith: '[/code]' }, { className: 'ico tag', name: 'Opmaakcode tonen', openWith: '[tekst]', closeWith: '[/tekst]' }]
};

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bbvideoDisplay = exports.CsrBBPreview = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _context = __webpack_require__(6);

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @see templates/courant/courantbeheer.tpl
 * @see blade_templates/forum/partial/post_forum.blade.php
 * @see templates/mededelingen/mededeling.tpl
 * @see templates/roodschopper/roodschopper.tpl
 * @see forum.js
 * @see view/formulier/invoervelden/BBCodeField.class.php
 * @param sourceId
 * @param targetId
 * @constructor
 */
var CsrBBPreview = exports.CsrBBPreview = function CsrBBPreview(sourceId, targetId) {
    if (sourceId.charAt(0) !== '#') {
        sourceId = '#' + sourceId;
    }
    if (targetId.charAt(0) !== '#') {
        targetId = '#' + targetId;
    }
    var bbcode = (0, _jquery2.default)(sourceId).val();
    if (typeof bbcode !== 'string' || bbcode.trim() === '') {
        (0, _jquery2.default)(targetId).html('').hide();
        return;
    }
    _jquery2.default.post('/tools/bbcode.php', {
        data: encodeURIComponent(bbcode)
    }).done(function (data) {
        (0, _jquery2.default)(targetId).html(data);
        (0, _context2.default)((0, _jquery2.default)(targetId));
        (0, _jquery2.default)(targetId).show();
    }).fail(function (error) {
        alert(error);
    });
};

/**
 * @see view/bbcode/CsrBB.class.php
 * @param elem
 * @returns {boolean}
 */
var bbvideoDisplay = exports.bbvideoDisplay = function bbvideoDisplay(elem) {
    var $previewdiv = (0, _jquery2.default)(elem);
    var params = $previewdiv.data('params');
    if (params.iframe) {
        //vervang de thumb door een iframe
        $previewdiv.parent().html('<iframe frameborder="0" width="' + params.width + '" height="' + params.height + '" src="' + params.src + '" allowfullscreen></iframe>');
    } else {
        //godtube is nog flash (of alternatief iets met javascript, maar geen iframe versie beschikbaar)
        $previewdiv.parent().html('<object type="application/x-shockwave-flash" data="http://www.godtube.com/resource/mediaplayer/5.3/player.swf"  width="' + params.width + '" height="' + params.height + '">' + '<param name="allowfullscreen" value="true" />' + '<param name="allowscriptaccess" value="always" />' + '<param name="wmode" value="opaque" />' + '<param name="movie" value="http://www.godtube.com/resource/mediaplayer/5.3/player.swf" />' + '<param name="autostart" value="true" />' + '<param name="flashvars" value="file=http://www.godtube.com/resource/mediaplayer/' + params.id + '.file' + '&image=http://www.godtube.com/resource/mediaplayer/' + params.id + '.jpg' + '&screencolor=000000' + '&type=video' + '&autostart=true' + '&playonce=true' + '&skin=http://www.godtube.com//resource/mediaplayer/skin/carbon/carbon.zip' + '&logo.file=http://media.salemwebnetwork.com/godtube/theme/default/media/embed-logo.png' + '&logo.link=http://www.godtube.com/watch/?v=' + params.id + '&logo.position=top-left' + '&logo.hide=false' + '&controlbar.position=over">' + '</object>');
    }

    return false;
};

/***/ })

}]);
//# sourceMappingURL=42.js.map