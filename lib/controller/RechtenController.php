<?php

namespace CsrDelft\controller;

use CsrDelft\common\Annotation\Auth;
use CsrDelft\Component\DataTable\RemoveDataTableEntry;
use CsrDelft\entity\security\AccessControl;
use CsrDelft\repository\security\AccessRepository;
use CsrDelft\view\datatable\GenericDataTableResponse;
use CsrDelft\view\RechtenForm;
use CsrDelft\view\RechtenTable;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * RechtenController.class.php
 *
 * @author P.W.G. Brussee <brussee@live.nl>
 *
 * Controller van de ACL.
 */
class RechtenController extends AbstractController
{
	public function __construct(
		private readonly AccessRepository $accessRepository
	) {
	}

	/**
	 * @param null $environment
	 * @param null $resource
	 * @return Response
	 * @Auth(P_LOGGED_IN)
	 */
	#[
		Route(
			path: '/rechten/bekijken/{environment}/{resource}',
			methods: ['GET'],
			defaults: ['environment' => null, 'resource' => null]
		)
	]
	public function bekijken($environment = null, $resource = null)
	{
		return $this->render('default.html.twig', [
			'content' => new RechtenTable(
				$this->accessRepository,
				$environment,
				$resource
			),
		]);
	}

	/**
	 * @param null $environment
	 * @param null $resource
	 * @return GenericDataTableResponse
	 * @Auth(P_LOGGED_IN)
	 */
	#[
		Route(
			path: '/rechten/bekijken/{environment}/{resource}',
			methods: ['POST'],
			defaults: ['environment' => null, 'resource' => null]
		)
	]
	public function data($environment = null, $resource = null)
	{
		return $this->tableData(
			$this->accessRepository->getTree($environment, $resource)
		);
	}

	/**
	 * @param null $environment
	 * @param null $resource
	 * @return GenericDataTableResponse|RechtenForm
	 * @throws ORMException
	 * @throws OptimisticLockException
	 * @Auth(P_LOGGED_IN)
	 */
	#[
		Route(
			path: '/rechten/aanmaken/{environment}/{resource}',
			methods: ['POST'],
			defaults: ['environment' => null, 'resource' => null]
		)
	]
	public function aanmaken($environment = null, $resource = null)
	{
		$ac = $this->accessRepository->nieuw($environment, $resource);
		$form = new RechtenForm($ac, 'aanmaken');
		if ($form->validate()) {
			$this->accessRepository->setAcl($ac->environment, $ac->resource, [
				$ac->action => $ac->subject,
			]);
			return $this->tableData([$ac]);
		} else {
			return $form;
		}
	}

	/**
	 * @return GenericDataTableResponse|RechtenForm
	 * @throws ORMException
	 * @throws OptimisticLockException
	 * @Auth(P_LOGGED_IN)
	 */
	#[Route(path: '/rechten/wijzigen', methods: ['POST'])]
	public function wijzigen()
	{
		$selection = $this->getDataTableSelection();

		if (!isset($selection[0])) {
			throw $this->createAccessDeniedException();
		}

		/** @var AccessControl $ac */
		$ac = $this->accessRepository->retrieveByUUID($selection[0]);
		$form = new RechtenForm($ac, 'wijzigen');

		if ($form->validate()) {
			$this->accessRepository->setAcl($ac->environment, $ac->resource, [
				$ac->action => $ac->subject,
			]);
			return $this->tableData([$ac]);
		} else {
			return $form;
		}
	}

	/**
	 * @return GenericDataTableResponse
	 * @throws ORMException
	 * @throws OptimisticLockException
	 * @Auth(P_LOGGED_IN)
	 */
	#[Route(path: '/rechten/verwijderen', methods: ['POST'])]
	public function verwijderen()
	{
		$selection = $this->getDataTableSelection();
		$response = [];

		foreach ($selection as $UUID) {
			/** @var AccessControl $ac */
			$ac = $this->accessRepository->retrieveByUUID($UUID);
			$response[] = new RemoveDataTableEntry(
				explode('@', $UUID)[0],
				AccessControl::class
			);
			$this->accessRepository->setAcl($ac->environment, $ac->resource, [
				$ac->action => null,
			]);
		}

		return $this->tableData($response);
	}
}
