<?php

namespace CsrDelft\entity\fiscaat;

use CsrDelft\model\entity\fiscaat\CiviProductTypeEnum;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation as Serializer;

/**
 * Class CiviBestelling
 *
 * Heeft een of meer @see CiviBestellingInhoud
 *
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 *
 * @ORM\Entity(repositoryClass="CsrDelft\repository\fiscaat\CiviBestellingRepository")
 * @ORM\Table("CiviBestelling")
 */
class CiviBestelling {
	/**
	 * @var integer
	 * @ORM\Column(type="integer")
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @Serializer\Groups("datatable")
	 */
	public $id;
	/**
	 * @var string
	 * @ORM\Column(type="uid")
	 * @Serializer\Groups("datatable")
	 */
	public $uid;
	/**
	 * @var int
	 * @ORM\Column(type="integer")
	 * @Serializer\Groups("datatable")
	 */
	public $totaal = 0;
	/**
	 * @var boolean
	 * @ORM\Column(type="boolean")
	 * @Serializer\Groups("datatable")
	 */
	public $deleted;
	/**
	 * @var \DateTimeImmutable
	 * @ORM\Column(type="datetime")
	 * @Serializer\Groups("datatable")
	 */
	public $moment;
	/**
	 * @var string
	 * @ORM\Column(type="string", nullable=true)
	 * @Serializer\Groups("datatable")
	 */
	public $comment;
	/**
	 * @var string
	 * @ORM\Column(type="string")
	 * TODO dit is een CiviSaldoCommissieEnum
	 * @Serializer\Groups("datatable")
	 */
	public $cie;
	/**
	 * @var CiviBestellingInhoud[]|ArrayCollection
	 * @ORM\OneToMany(targetEntity="CiviBestellingInhoud", mappedBy="bestelling")
	 */
	public $inhoud;

	public function __construct() {
		$this->inhoud = new ArrayCollection();
	}

	/**
	 * @return string
	 * @Serializer\Groups("datatable")
	 * @Serializer\SerializedName("inhoud")
	 */
	public function getInhoudTekst() {
		$bestellingenInhoud = [];
		foreach ($this->inhoud as $item) {
			$bestellingenInhoud[] = $item->getBeschrijving();
		}
		return implode(", ", $bestellingenInhoud);
	}

	/**
	 * @return string
	 */
	public function getPinBeschrijving() {
		$pinProduct = $this->getProduct(CiviProductTypeEnum::PINTRANSACTIE);

		if ($pinProduct === false) {
			return "";
		}

		$beschrijving = sprintf('€%.2f PIN', $pinProduct->aantal / 100);

		$aantalInhoud = count($this->inhoud);

		if ($aantalInhoud == 2) {
			$beschrijving .= sprintf(' en 1 ander product');
		} elseif ($aantalInhoud > 2) {
			$beschrijving .= sprintf(' en %d andere producten', $aantalInhoud - 1);
		}

		return $beschrijving;
	}

	/**
	 * @param $product_id
	 * @return CiviBestellingInhoud|null
	 */
	public function getProduct($product_id) {
		$product = $this->inhoud->matching(Criteria::create()->where(Criteria::expr()->eq('product_id', $product_id))->setMaxResults(1));

		if (count($product) !== 1) {
			return null;
		}

		return $product->first();
	}
}