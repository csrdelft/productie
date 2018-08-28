<?php

namespace CsrDelft\view\groepen\formulier;

use CsrDelft\model\entity\groepen\AbstractGroep;
use CsrDelft\view\formulier\knoppen\ModalCloseButtons;
use CsrDelft\view\formulier\ModalForm;
use CsrDelft\view\groepen\GroepLogboekTable;

class GroepLogboekForm extends ModalForm {

	public function __construct(AbstractGroep $groep) {
		parent::__construct($groep, null, $groep->naam . ' logboek', true);

		$fields = [];
		$fields[] = new GroepLogboekTable($groep);

		$this->addFields($fields);

		$this->formKnoppen = new ModalCloseButtons();
	}

}
