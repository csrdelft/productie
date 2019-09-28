<?php

namespace CsrDelft\view\bbcode\tag;

use CsrDelft\bb\BbException;
use CsrDelft\bb\BbTag;

/**
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @since 27/03/2019
 */
class BbOfftopic extends BbTag {

	public static function getTagName() {
		return ['ot', 'offtopic', 'vanonderwerp'];
	}

	public function render() {
		return '<span class="offtopic bb-tag-offtopic">' . $this->content . '</span>';
	}

	/**
	 * @param array $arguments
	 * @return mixed
	 * @throws BbException
	 */
	public function parse($arguments = [])
	{
		$this->readContent();
	}
}
