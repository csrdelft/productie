<?php

namespace CsrDelft\service\corvee;

use CsrDelft\common\ContainerFacade;
use CsrDelft\common\CsrGebruikerException;
use CsrDelft\entity\corvee\CorveeFunctie;
use CsrDelft\entity\corvee\CorveePuntenOverzichtDTO;
use CsrDelft\entity\corvee\CorveeTaak;
use CsrDelft\entity\corvee\CorveeVrijstelling;
use CsrDelft\entity\profiel\Profiel;
use CsrDelft\Orm\Persistence\Database;
use CsrDelft\repository\corvee\CorveeTakenRepository;
use CsrDelft\repository\corvee\CorveeVrijstellingenRepository;
use CsrDelft\repository\ProfielRepository;

/**
 * CorveePuntenService  |  P.W.G. Brussee (brussee@live.nl)
 */
class CorveePuntenService {
	/**
	 * @var CorveeVrijstellingenRepository
	 */
	private $corveeVrijstellingenRepository;
	/**
	 * @var CorveeTakenRepository
	 */
	private $corveeTakenRepository;

	public function __construct(CorveeVrijstellingenRepository $corveeVrijstellingenRepository, CorveeTakenRepository $corveeTakenRepository) {
		$this->corveeVrijstellingenRepository = $corveeVrijstellingenRepository;
		$this->corveeTakenRepository = $corveeTakenRepository;
	}

	public function resetCorveejaar() {
		return Database::transaction(function () {
			$aantal = 0;
			$errors = array();
			/** @var CorveeVrijstelling[] $vrijstellingen */
			$vrijstellingen = $this->corveeVrijstellingenRepository->getAlleVrijstellingen(true); // grouped by uid
			$matrix = $this->loadPuntenTotaalVoorAlleLeden();
			foreach ($matrix as $uid => $totalen) {
				try {
					$profiel = ProfielRepository::get($uid); // false if lid does not exist
					if (!$profiel) {
						throw new CsrGebruikerException(sprintf('Lid met uid "%s" bestaat niet.', $uid));
					}
					$punten = $totalen['puntenTotaal'];
					$punten += $totalen['bonusTotaal'];
					$vrijstelling = null;
					if (array_key_exists($uid, $vrijstellingen) && time() > $vrijstellingen[$uid]->begin_datum->getTimestamp()) {
						$vrijstelling = $vrijstellingen[$uid];
						$punten += $vrijstelling->getPunten();
						if (date_create_immutable() > $vrijstelling->eind_datum) {
							$this->corveeVrijstellingenRepository->verwijderVrijstelling($vrijstelling->uid);
							$aantal++;
						} else { // niet dubbel toekennen
							$vrijstelling->percentage = 0;
							$this->corveeVrijstellingenRepository->saveVrijstelling($vrijstelling->uid, $vrijstelling->begin_datum, $vrijstelling->eind_datum, $vrijstelling->percentage);
						}
					}
					$punten -= intval(instelling('corvee', 'punten_per_jaar'));
					$this->savePuntenVoorLid($profiel, $punten, 0);
				} catch (CsrGebruikerException $e) {
					$errors[] = $e;
				}
			}
			$taken = $this->corveeTakenRepository->verwijderOudeTaken();
			return array($aantal, $taken, $errors);
		});
	}

	public function puntenToekennen($uid, $punten, $bonus_malus) {
		if (!is_int($punten) || !is_int($bonus_malus)) {
			throw new CsrGebruikerException('Punten toekennen faalt: geen integer');
		}
		$profiel = ProfielRepository::get($uid); // false if lid does not exist
		if (!$profiel) {
			throw new CsrGebruikerException(sprintf('Lid met uid "%s" bestaat niet.', $uid));
		}
		if ($punten !== 0 OR $bonus_malus !== 0) {
			$this->savePuntenVoorLid($profiel, (int)$profiel->corvee_punten + $punten, (int)$profiel->corvee_punten_bonus + $bonus_malus);
		}
	}

	public function puntenIntrekken($uid, $punten, $bonus_malus) {
		if (!is_int($punten) || !is_int($bonus_malus)) {
			throw new CsrGebruikerException('Punten intrekken faalt: geen integer');
		}
		$this->puntenToekennen($uid, -$punten, -$bonus_malus);
	}

	public function savePuntenVoorLid(Profiel $profiel, $punten = null, $bonus_malus = null) {
		if (!is_int($punten) && !is_int($bonus_malus)) {
			throw new CsrGebruikerException('Save punten voor lid ' . $profiel->uid . ' faalt: geen integer');
		}
		if (is_int($punten)) {
			$profiel->corvee_punten = $punten;
		}
		if (is_int($bonus_malus)) {
			$profiel->corvee_punten_bonus = $bonus_malus;
		}
		ContainerFacade::getContainer()->get(ProfielRepository::class)->update($profiel);
	}

	public function loadPuntenTotaalVoorAlleLeden() {
		return $this->loadPuntenTotaal('status IN("S_LID", "S_GASTLID", "S_NOVIET")');
	}

	private function loadPuntenTotaal($where = null, $values = array(), $limit = null) {
		$sql = 'SELECT uid, corvee_punten, corvee_punten_bonus';
		$sql .= ' FROM profielen';
		if ($where !== null) {
			$sql .= ' WHERE ' . $where;
		}
		$sql .= ' ORDER BY achternaam, voornaam ASC';
		if (is_int($limit) && $limit > 0) {
			$sql .= ' LIMIT ' . $limit;
		}
		$db = Database::instance();
		$query = $db->getDatabase()->prepare($sql);
		$query->execute($values);
		$result = $query->fetchAll();
		$totalen = array();
		foreach ($result as $row) {
			$totalen[$row['uid']] = array(
				'puntenTotaal' => (int)$row['corvee_punten'],
				'bonusTotaal' => (int)$row['corvee_punten_bonus']
			);
		}
		return $totalen;
	}

	/**
	 * @param null $functies
	 * @return CorveePuntenOverzichtDTO[]
	 */
	public function loadPuntenVoorAlleLeden($functies = null) {
		$taken = $this->corveeTakenRepository->getAlleTaken(true); // grouped by uid
		$vrijstellingen = $this->corveeVrijstellingenRepository->getAlleVrijstellingen(true); // grouped by uid
		$matrix = $this->loadPuntenTotaalVoorAlleLeden();
		foreach ($matrix as $uid => $totalen) {
			$profiel = ProfielRepository::get($uid); // false if lid does not exist
			if (!$profiel) {
				throw new CsrGebruikerException(sprintf('Lid met uid "%s" bestaat niet.', $uid));
			}
			$lidtaken = array();
			if (array_key_exists($uid, $taken)) {
				$lidtaken = $taken[$uid];
			}
			$vrijstelling = false;
			if (array_key_exists($uid, $vrijstellingen)) {
				$vrijstelling = $vrijstellingen[$uid];
			}
			$matrix[$uid] = $this->loadPuntenVoorLid($profiel, $functies, $lidtaken, $vrijstelling);
		}
		return $matrix;
	}

	/**
	 * @param Profiel $profiel
	 * @param null $functies
	 * @param null $lidtaken
	 * @param bool $vrijstelling
	 * @return CorveePuntenOverzichtDTO
	 */
	public function loadPuntenVoorLid(Profiel $profiel, $functies = null, $lidtaken = null, $vrijstelling = null) {
		if ($lidtaken === null) {
			$lidtaken = $this->corveeTakenRepository->getTakenVoorLid($profiel->uid);
			$vrijstelling = $this->corveeVrijstellingenRepository->getVrijstelling($profiel->uid);
		}
		if ($functies === null) { // niet per functie sommeren
			$suggestie = new CorveePuntenOverzichtDTO();
			$suggestie->prognose = 0;
			foreach ($lidtaken as $taak) {
				$suggestie->prognose += $taak->getPuntenPrognose();
			}
		} else {
			$suggestie = $this->sumPuntenPerFunctie($functies, $lidtaken);
		}
		if ($vrijstelling == null) {
			$suggestie->vrijstelling = null;
		} else { // bij suggestielijst wordt de prognose gecorrigeerd voor beginDatum van vrijstelling
			$suggestie->vrijstelling = $vrijstelling;
			$suggestie->prognose += $vrijstelling->getPunten();
		}

		$suggestie->lid = $profiel;
		$suggestie->puntenTotaal = $profiel->corvee_punten;
		$suggestie->bonusTotaal = $profiel->corvee_punten_bonus;
		$suggestie->prognose += $suggestie->puntenTotaal + $suggestie->bonusTotaal;
		$suggestie->prognoseColor = $this->rgbCalculate($suggestie->prognose);
		if ($profiel->isLid()) {
			$suggestie->tekort = instelling('corvee', 'punten_per_jaar') - $suggestie->prognose;
		} else {
			$suggestie->tekort = 0 - $suggestie->prognose;
		}
		if ($suggestie->tekort < 0) {
			$suggestie->tekort = 0;
		}
		$suggestie->tekortColor = $this->rgbCalculate($suggestie->tekort, true);
		return $suggestie;
	}

	/**
	 * @param CorveeFunctie[] $functies
	 * @param CorveeTaak[] $taken
	 * @return CorveePuntenOverzichtDTO
	 */
	private function sumPuntenPerFunctie($functies, $taken) {
		$sumAantal = [];
		$sumPunten = [];
		$sumBonus = [];
		$sumPrognose = 0;
		foreach ($functies as $fid => $functie) {
			$sumAantal[$fid] = 0;
			$sumPunten[$fid] = 0;
			$sumBonus[$fid] = 0;
		}
		foreach ($taken as $taak) {
			$fid = $taak->functie_id;
			if (array_key_exists($fid, $functies)) {
				$sumAantal[$fid] += 1;
				$sumPunten[$fid] += $taak->punten_toegekend;
				$sumBonus[$fid] += $taak->bonus_toegekend;
			}
			$sumPrognose += $taak->getPuntenPrognose();
		}
		$suggestie = new CorveePuntenOverzichtDTO();
		$suggestie->aantal = $sumAantal;
		$suggestie->punten = $sumPunten;
		$suggestie->bonus = $sumBonus;
		$suggestie->prognose = $sumPrognose;
		$suggestie->prognoseColor = $this->rgbCalculate($sumPrognose);

		return $suggestie;
	}

	/**
	 * RGB kleurovergang berekenen
	 * @param $punten
	 * @param bool $tekort
	 * @return string
	 */
	private function rgbCalculate($punten, $tekort = false) {
		$perjaar = intval(instelling('corvee', 'punten_per_jaar'));
		if (!$tekort) {
			$punten = $perjaar - $punten;
		}
		$verhouding = $punten / $perjaar;

		$r = 2 * $verhouding;
		$g = 2 * (1 - $verhouding);

		if ($r < 0)
			$r = 0;
		if ($r > 1)
			$r = 1;
		if ($g < 0)
			$g = 0;
		if ($g > 1)
			$g = 1;

		return dechex(8 + round($r * 6)) . dechex(8 + round($g * 6)) . dechex(8);
	}
}