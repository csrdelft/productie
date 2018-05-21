<?php

namespace CsrDelft\view\formulier\getalvelden;

use CsrDelft\common\CsrGebruikerException;
use CsrDelft\view\formulier\invoervelden\InputField;

/**
 * FloatField.class.php
 *
 * @author Jan Pieter Waagmeester <jieter@jpwaag.com>
 * @author P.W.G. Brussee <brussee@live.nl>
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @date 30/03/2017
 *
 * Invoeren van een decimaal getal. Eventueel met minima/maxima. Leeg evt. toegestaan.
 */
class FloatField extends InputField {

	public $precision;
	public $min = null;
	public $max = null;

	public function __construct($name, $value, $description, $precision, $min = null, $max = null, $step = null) {
		parent::__construct($name, $value, $description, $min, $max);
		if (!is_float($this->value) AND $this->value !== null) {
			throw new CsrGebruikerException('value geen float');
		}
		if (!is_float($this->origvalue) AND $this->origvalue !== null) {
			throw new CsrGebruikerException('origvalue geen float');
		}
		if (is_int($precision)) {
			$this->precision = $precision;
			$this->pattern = '[0-9]*([\.|,][0-9]{' . $this->precision . '})?';
		} else {
			$this->pattern = '[0-9]*([\.|,][0-9]*)?';
		}
		if ($min !== null) {
			$this->min = (float)$min;
		}
		if ($max !== null) {
			$this->max = (float)$max;
		}
		if (is_float($step)) {
			$this->step = $step;
		} else {
			$this->step = 1.0 / (float)pow(10, $this->precision);
		}
		$this->step = str_replace(',', '.', $this->step); // werkomheen
	}

	public function getValue() {
		if ($this->isPosted()) {
			$this->value = filter_input(INPUT_POST, $this->name, FILTER_SANITIZE_NUMBER_FLOAT);
			if ($this->value !== '') {
				$this->value = (float)$this->value;
			}
		}
		if ($this->empty_null AND $this->value == '' AND $this->value !== 0.) {
			$this->value = null;
		}
		return $this->value;
	}

	public function validate() {
		if ($this->value === 0.) {
			return true;
		}
		if (!parent::validate()) {
			return false;
		}
		// parent checks not null
		if ($this->value == '') {
			return true;
		} elseif (!preg_match('/^' . $this->pattern . '$/', $this->getValue())) {
			$this->error = 'Voer maximaal ' . $this->precision . ' decimalen in';
		} elseif ($this->max !== null AND $this->value > $this->max) {
			$this->error = 'Maximale waarde is ' . $this->max . ' ';
		} elseif ($this->min !== null AND $this->value < $this->min) {
			$this->error = 'Minimale waarde is ' . $this->min . ' ';
		}
		return $this->error === '';
	}

}
