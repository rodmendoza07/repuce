package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import java.util.Map;

import mx.gob.sep.dgtec.repuce.vo.CCctLight;

public interface CCctMapperCstm {

	/**
		 * Obtiene los cct CONAFE dada la clave de la entidad, municipio y localidad
		 * @param idEnt Entidad
		 * @param idMun Municipio
		 * @param idLoc Localidad
		 * @return
		 */
		List<CCctLight> selectCCtsPorLocalidad(Map<String,String> params);


}
