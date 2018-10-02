package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.conafe.vo.SegundaReunionVO;
import mx.gob.sep.dgtec.repuce.servicios.SegundaReunionService;
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
@RequestMapping("/segundaReunion")
public class SegundaReunionController {

	@Autowired
	private SegundaReunionService segundaReunionService;

	@RequestMapping(value = "/select/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public SegundaReunionVO selectsegundaReunion(@PathVariable Integer cApec)
			throws Exception {

		SegundaReunionVO segundaReunionVO = new SegundaReunionVO();

		segundaReunionVO = segundaReunionService.selectSegundaReunion(cApec);

		return segundaReunionVO;
	}

	/**
	 * Guarda la informacion de la segunda reunion para un APEC dado
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public int saveSegundaReunion(
			@RequestBody SegundaReunionVO segundaReunionVO, Principal principal)
			throws Exception {
		int numRecords = 0;

		final String currentUser = principal.getName();
		String cadenaAutenticidad = "";

		cadenaAutenticidad = ReunionesUtil.generaCadenaConafeHash(
				segundaReunionVO, Constants.SEGUNDA_REUNION, segundaReunionVO
						.getReunion().getFchReunion().toString());

		segundaReunionVO.getReunion().setUsrCaptura(currentUser);
		segundaReunionVO.getReunion().setCadena(cadenaAutenticidad);

		numRecords = segundaReunionService.saveSegundaReunion(segundaReunionVO);

		return numRecords;
	}

	/**
	 * Elimina la informaci[on de la segunda reunion y tercera si existe
	 * 
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
	@RequestMapping(value = "/delete/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public int delete(@PathVariable Integer cApec) throws Exception {
		int numRecords = -1;

		numRecords = segundaReunionService.deleteSegundaReunion(cApec);
		return numRecords;
	}

}
