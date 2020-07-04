<?php

namespace CsrDelft\entity\fiscaat;

use CsrDelft\common\datatable\DataTableEntry;
use CsrDelft\repository\ProfielRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation as Serializer;

/**
 * CiviSaldo.class.php
 *
 * Bewaart het saldo van een lid, uid is een verwijzing naar account.
 *
 * Uid kan ook een niet bestaande uid bevatten voor profielen die niet kunnen inloggen en alleen via SocCie kunnen
 * afrekenen.
 *
 * @author G.J.W. Oolbekkink <g.j.w.oolbekkink@gmail.com>
 * @since 07/04/2017
 *
 * @ORM\Entity(repositoryClass="CsrDelft\repository\fiscaat\CiviSaldoRepository"))
 * @ORM\Table("CiviSaldo")
 */
class CiviSaldo implements DataTableEntry {
	/**
	 * Let op, dit is geen fk naar Profiel. Er zijn CiviSaldo's die geen profiel zijn en vice versa.
	 *
	 * @var string
	 * @ORM\Column(type="uid", unique=true)
	 * @ORM\Id()
	 * @Serializer\Groups({"log", "datatable"})
	 */
	public $uid;
	/**
	 * @var string
	 * @ORM\Column(type="text")
	 * @Serializer\Groups({"log", "datatable"})
	 */
	public $naam;
	/**
	 * @var integer
	 * @ORM\Column(type="integer")
	 * @Serializer\Groups({"log", "datatable"})
	 */
	public $saldo;
	/**
	 * @var \DateTimeImmutable
	 * @ORM\Column(type="datetime", options={"default"="CURRENT_TIMESTAMP"})
	 * @Serializer\Groups({"log", "datatable"})
	 */
	public $laatst_veranderd;
	/**
	 * @var bool
	 * @ORM\Column(type="boolean", options={"default"=false})
	 * @Serializer\Groups({"log", "datatable"})
	 */
	public $deleted = false;

	/**
	 * @return string
	 * @Serializer\Groups("datatable")
	 * @Serializer\SerializedName("lichting")
	 */
	public function getDataTableLichting() {
		return substr($this->uid, 0, 2);
	}

	/**
	 * @return string
	 * @Serializer\Groups("datatable")
	 * @Serializer\SerializedName("naam")
	 */
	public function getDataTableNaam() {
		return ProfielRepository::existsUid($this->uid) ? ProfielRepository::getNaam($this->uid, 'volledig') : $this->naam;
	}
}
