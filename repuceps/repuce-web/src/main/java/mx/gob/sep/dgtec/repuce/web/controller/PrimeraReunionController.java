package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.conafe.vo.PrimeraReunionVO;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraReunionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/primeraReunion")
public class PrimeraReunionController {

	@Autowired
	private PrimeraReunionService primeraReunionService;

	@RequestMapping(value = "/select/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public PrimeraReunionVO selectprimeraReunion(@PathVariable Integer cApec)
			throws Exception {

		PrimeraReunionVO primeraReunionVO = new PrimeraReunionVO();

		primeraReunionVO = primeraReunionService.selectPrimeraReunion(cApec);

		return primeraReunionVO;
	}

	/**
	 * Guarda la informacion de la primera reunion para un APEC dado
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public int savePrimeraReunion(
			@RequestBody PrimeraReunionVO primeraReunionVO, Principal principal)
			throws Exception {
		int numRecords = 0;

		final String currentUser = principal.getName();
		String cadenaAutenticidad = "";

		cadenaAutenticidad = ReunionesUtil.generaCadenaConafeHash(
		primeraReunionVO, Constants.PRIMERA_REUNION, primeraReunionVO
						.getReunion().getFchReunion().toString());

		primeraReunionVO.getReunion().setUsrCaptura(currentUser);
		primeraReunionVO.getReunion().setCadena(cadenaAutenticidad);

		numRecords = primeraReunionService.savePrimeraReunion(primeraReunionVO);

		return numRecords;
	}

	/**
	 * Elimina la informaci[on de la acta constitutiva
	 * 
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
	@RequestMapping(value = "/delete/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public int delete(@PathVariable Integer cApec) throws Exception {
		int numRecords = -1;

		numRecords = primeraReunionService.deletePrimeraReunion(cApec);
		return numRecords;
	}

}
