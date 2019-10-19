<?php

namespace CsrDelft\model\entity;

use CsrDelft\common\CsrGebruikerException;

/**
 * Afbeelding.class.php
 *
 * @author P.W.G. Brussee <brussee@live.nl>
 */
class Afbeelding extends Bestand {

	/**
	 * Geaccepteerde afbeelding types
	 * @var array
	 */
	public static $mimeTypes = array('image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/x-ms-bmp');
	/**
	 * Breedte in pixels
	 * @var int
	 */
	public $width;
	/**
	 * Hoogte in pixels
	 * @var int
	 */
	public $height;

	/**
	 * @return string
	 */
	public function getFullPath() {
		return join_paths($this->directory, $this->filename);
	}

	/**
	 * Constructor is called late (after attributes are set)
	 * by PDO::FETCH_CLASS with $cast = true
	 *
	 * @param string $path
	 * @param bool $parse
	 *
	 * @throws CsrGebruikerException
	 */
	public function __construct($path, $parse = true) {
		parent::__construct();
		if ($path !== null) {
			$this->directory = dirname($path) . '/';
			$this->filename = basename($path);
		}
		if ($parse) {
			$this->filesize = @filesize($this->getFullPath());
			if (!$this->filesize) {
				throw new CsrGebruikerException('Afbeelding is leeg of bestaat niet: ' . $this->filename);
			}
			$image = @getimagesize($this->getFullPath());
			if (!$image) {
				throw new CsrGebruikerException('Afbeelding is geen afbeelding: ' . $this->filename);
			}
			$this->width = $image[0];
			$this->height = $image[1];
			$this->mimetype = $image['mime'];

			if (!in_array($this->mimetype, static::$mimeTypes)) {
				throw new CsrGebruikerException('Geen afbeelding: [' . $this->mimetype . '] ' . $this->filename);
			}
		}
	}
}
