<?php

namespace CsrDelft\controller\api;

use CsrDelft\common\Annotation\Auth;
use CsrDelft\common\CsrToegangException;
use CsrDelft\repository\maalcie\MaaltijdAanmeldingenRepository;
use CsrDelft\repository\maalcie\MaaltijdenRepository;
use Exception;
use Symfony\Component\Routing\Annotation\Route;

class ApiMaaltijdenController {
	private $maaltijdenRepository;
	private $maaltijdAanmeldingenRepository;

	public function __construct(MaaltijdenRepository $maaltijdenRepository, MaaltijdAanmeldingenRepository $maaltijdAanmeldingenRepository) {
		$this->maaltijdenRepository = $maaltijdenRepository;
		$this->maaltijdAanmeldingenRepository = $maaltijdAanmeldingenRepository;
	}

	/**
	 * @Route("/API/2.0/maaltijden/{id}/aanmelden", methods={"POST"})
	 * @Auth(P_MAAL_IK)
	 */
	public function maaltijdAanmelden($id) {

		try {
			$maaltijd = $this->maaltijdenRepository->getMaaltijd($id);
			$aanmelding = $this->maaltijdAanmeldingenRepository->aanmeldenVoorMaaltijd($maaltijd, $_SESSION['_uid'], $_SESSION['_uid']);
			return array('data' => $aanmelding->maaltijd);
		} catch (Exception $e) {
			throw new CsrToegangException($e->getMessage());
		}
	}

	/**
	 * @Route("/API/2.0/maaltijden/{id}/afmelden", methods={"POST"})
	 * @Auth(P_MAAL_IK)
	 */
	public function maaltijdAfmelden($id) {

		try {
			$maaltijd = $this->maaltijdenRepository->getMaaltijd($id);
			$this->maaltijdAanmeldingenRepository->afmeldenDoorLid($maaltijd, $_SESSION['_uid']);
			return array('data' => $maaltijd);
		} catch (Exception $e) {
			throw new CsrToegangException($e->getMessage());
		}
	}

}
