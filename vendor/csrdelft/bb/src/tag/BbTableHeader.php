<?php

namespace CsrDelft\bb\tag;

use CsrDelft\bb\BbTag;

/**
 * Table header cell
 *
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @since 27/03/2019
 * @example [th]...[/th]
 */
class BbTableHeader extends BbTag {
	public static function getTagName() {
		return 'th';
	}

	public function render($arguments = []) {
		return '<th class="bb-tag-th">' . $this->getContent() . '</th>';
	}

    public function parse($arguments = [])
    {
        $this->readContent();
    }
}
