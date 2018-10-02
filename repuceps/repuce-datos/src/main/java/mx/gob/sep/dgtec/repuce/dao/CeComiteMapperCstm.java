package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

public interface CeComiteMapperCstm {

	/**
	 * Obtiene los identificadores de los comites que no cuentan con un integrante
	 * @param cct Clave del Centro Escolar
	 * @param cSesion Clave del a Sesion
	 * @return
	 */
	List<Integer> selectComitesSinIntegrantes(Integer cCct);


}