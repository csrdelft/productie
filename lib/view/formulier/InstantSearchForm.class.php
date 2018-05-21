<?php

namespace CsrDelft\view\formulier;

use CsrDelft\view\formulier\invoervelden\ZoekField;

/**
 * InstantSearchForm.class.php
 *
 * @author P.W.G. Brussee <brussee@live.nl>
 */
class InstantSearchForm extends Formulier {

	public function __construct() {
		parent::__construct(null, '/ledenlijst?status=ALL');
		$this->post = false;
		$fields[] = new ZoekField('q');
		$this->addFields($fields);
	}
}
