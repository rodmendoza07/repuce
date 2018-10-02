package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.conafe.vo.TerceraReunionVO;
import mx.gob.sep.dgtec.repuce.servicios.TerceraReunionService;
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
@RequestMapping("/terceraReunion")
public class TerceraReunionController {

	@Autowired
	private TerceraReunionService terceraReunionService;

	@RequestMapping(value = "/select/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public TerceraReunionVO selectTerceraReunion(@PathVariable Integer cApec)
			throws Exception {

		TerceraReunionVO terceraReunionVO = new TerceraReunionVO();

		terceraReunionVO = terceraReunionService.selectTerceraReunion(cApec);

		return terceraReunionVO;
	}

	/**
	 * Guarda la informacion de la tercera reunion para un APEC dado
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	
	
	
	public int saveTerceraReunion(
			@RequestBody TerceraReunionVO terceraReunionVO, Principal principal)
			throws Exception {
		int numRecords = 0;

		final String currentUser = principal.getName();
		String cadenaAutenticidad = "";

		cadenaAutenticidad = ReunionesUtil.generaCadenaConafeHash(
				terceraReunionVO, Constants.TERCERA_REUNION, terceraReunionVO
						.getReunion().getFchReunion().toString());

		terceraReunionVO.getReunion().setUsrCaptura(currentUser);
		terceraReunionVO.getReunion().setCadena(cadenaAutenticidad);

		numRecords = terceraReunionService.saveTerceraReunion(terceraReunionVO);
		
		System.out.println("llego al controlador Tercera Reunión Controler");
		
		return numRecords;
	}

	/**
	 * Elimina la informaci[on de la tercera reunion
	 * 
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
	@RequestMapping(value = "/delete/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public int delete(@PathVariable Integer cApec) throws Exception {
		int numRecords = -1;

		numRecords = terceraReunionService.deleteTerceraReunion(cApec);
		return numRecords;
	}

}
