<?php

namespace CsrDelft\view\cms;

use CsrDelft\common\ContainerFacade;
use CsrDelft\entity\CmsPagina;
use CsrDelft\view\ToHtmlResponse;
use CsrDelft\view\ToResponse;
use CsrDelft\view\View;
use Twig\Environment;

/**
 * CmsPaginaView.php
 *
 * @author C.S.R. Delft <pubcie@csrdelft.nl>
 * @author P.W.G. Brussee <brussee@live.nl>
 *
 * Bekijken van een CmsPagina.
 */
class CmsPaginaView implements View, ToResponse
{
	use ToHtmlResponse;

	public function __construct(private CmsPagina $pagina)
	{
	}

	public function getModel()
	{
		return $this->pagina;
	}

	public function getBreadcrumbs()
	{
		return null;
	}

	public function getTitel()
	{
		return $this->pagina->titel;
	}

	public function __toString(): string
	{
		return (string) ContainerFacade::getContainer()
			->get('csr.hack.twig')
			->render('cms/pagina-inhoud.html.twig', [
				'pagina' => $this->pagina,
			]);
	}
}
