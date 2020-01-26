<?php

namespace CsrDelft\view\formulier\invoervelden;

use CsrDelft\common\ContainerFacade;
use CsrDelft\model\fiscaat\CiviSaldoModel;
use CsrDelft\model\security\AccountModel;
use CsrDelft\service\ProfielService;

/**
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @date 30/03/2017
 */
class CivisaldoField extends TextField {

	protected $fieldClassName = 'col-sm-5';

	private $zoekin;

	public function __construct($name, $value, $description) {
		parent::__construct($name, $value, $description);
		$this->zoekin = 'civisaldo';
		$this->suggestions[ucfirst($this->zoekin)] = '/fiscaat/saldo/zoek?q=';
	}

	public function getValue() {
		$this->value = parent::getValue();
		if ($this->empty_null AND empty($this->value)) {
			return null;
		}
		if (!AccountModel::isValidUid($this->value)) {
			$profielService = ContainerFacade::getContainer()->get(ProfielService::class);
			$profielen = $profielService->zoekLeden($this->value, 'naam', 'alle', 'achternaam', $this->zoekin);
			if (!empty($profielen)) {
				$this->value = $profielen[0]->uid;
			}
		}
		return $this->value;
	}

	public function validate() {
		if (!parent::validate()) {
			return false;
		}
		// parent checks not null
		if ($this->value == '') {
			return true;
		}
		$value = parent::getValue();
		// geldig uid?
		if (AccountModel::isValidUid($value) AND CiviSaldoModel::instance()->existsByUid($value)) {
			return true;
		}
		$this->error = 'Geen geldig lid';
		return $this->error === '';
	}

	public function getPreviewDiv() {
		return '<div class="col-md-4 col-form-label" id="lidPreview_' . $this->getId() . '"></div>';
	}

	public function getJavascript() {
		return /** @lang JavaScript */
			parent::getJavascript() . <<<JS
$('#{$this->getId()}').on('typeahead:select', function (event, suggestion) {
	$('#lidPreview_{$this->getId()}').html(suggestion.label);
})
JS;
	}

}
