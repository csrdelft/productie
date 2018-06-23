<?php

namespace CsrDelft\view\fiscaat\saldo;

use CsrDelft\model\entity\fiscaat\CiviSaldo;
use CsrDelft\model\ProfielModel;
use CsrDelft\view\formulier\getalvelden\BedragField;
use CsrDelft\view\formulier\knoppen\FormDefaultKnoppen;
use CsrDelft\view\formulier\ModalForm;

/**
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @date 07/05/2017
 */
class InleggenForm extends ModalForm {
	public function __construct(Civisaldo $model) {
		parent::__construct($model, '/fiscaat/saldo/inleggen', "Inleggen: " . ProfielModel::getNaam($model->uid, 'volledig'), true);

		$fields['saldo'] = new BedragField('saldo', $model->saldo, 'Huidig saldo');
		$fields['saldo']->readonly = true;
		$fields[] = new BedragField('inleg', 0, 'Inleg', '€', 0.01);

		$this->addFields($fields);

		$this->formKnoppen = new FormDefaultKnoppen();
	}
}
