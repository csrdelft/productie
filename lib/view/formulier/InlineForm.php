<?php
/**
 * InlineForm.php
 *
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @date 06/05/2017
 */

namespace CsrDelft\view\formulier;

use CsrDelft\view\formulier\invoervelden\InputField;
use CsrDelft\view\formulier\knoppen\FormDefaultKnoppen;
use CsrDelft\view\formulier\knoppen\FormKnoppen;

/**
 * InlineForm with single InputField and FormDefaultKnoppen.
 */
abstract class InlineForm extends Formulier implements FormElement {

	private $field;
	private $toggle;

	public function __construct($model, $action, InputField $field, $toggle = true, $buttons = false, $dataTableId = false) {
		parent::__construct($model, $action, null, $dataTableId);
		if (isset($_POST['InlineFormId'])) {
			$this->formId = filter_input(INPUT_POST, 'InlineFormId', FILTER_SANITIZE_STRING);
		}
		$this->css_classes[] = 'InlineForm';
		$this->css_classes[] = $this->getType();
		$this->field = $field;
		$this->toggle = $toggle;

		$fields = array();
		$fields[] = $this->field;

		if ($buttons instanceof FormKnoppen) {
			$fields[] = $buttons;
		} elseif ($buttons) {
			$fields[] = new FormDefaultKnoppen(null, false, true, false, true, false, $dataTableId);
		} else {
			$this->field->enter_submit = true;
			$this->field->escape_cancel = true;
		}
		if (!isset($this->field->title) AND property_exists($this->field, 'description')) {
			$this->field->title = $this->field->description;
		}

		$this->addFields($fields);
	}

	public function getHtml() {
		$html = '<div id="wrapper_' . $this->formId . '" class="InlineForm">';
		if ($this->toggle) {
			$html .= '<div id="toggle_' . $this->formId . '" class="InlineFormToggle">' . $this->field->getValue() . '</div>';
			$this->css_classes[] = 'ToggleForm';
		}
		$html .= $this->getFormTag();
		foreach ($this->getFields() as $field) {
			$html .= $field->getHtml();
		}
		$html .= $this->getScriptTag();
		return $html . '</form></div>';
	}

	/**
     * @param bool $showMelding ignored
     */
	public function view() {
		echo $this->getHtml();
	}

	public function getField() {
		return $this->field;
	}

	public function getType() {
		return classNameZonderNamespace(get_class($this));
	}

	/**
	 * Public for FormElement
	 * @return string
	 */
	public function getJavascript() {
		return parent::getJavascript();
	}

}
