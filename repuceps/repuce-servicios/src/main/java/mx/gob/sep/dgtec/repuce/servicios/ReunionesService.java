package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.vo.ReunionesRealizadasVO;


/**
 * Este a interfase expone los servicios que se usan en el 
 * REPUCE de forma generica.
 * @Descripcion: Refactor al nombre de interfaz
 */
public interface ReunionesService {

	/**
	 * Trae los programas Educativos para Centros CONAFE
	 * @return Catalogo de Programas Escolares para CONAFE
	 * @throws Exception
	 */
	ReunionesRealizadasVO searchReunionesRegistradas(Integer cCct) throws Exception;
	
	/**
	 * Obtiene la información de las reuniones registradas por una APEC dada.
	 * @return Lista de las reuniones registradas por la APEC
	 * @throws Exception
	 */
	public List<ApecReunion> searchReunionesApec(Short idEntidadfed,
			Integer idMunicipio, Integer idLocalidad);
		
}
