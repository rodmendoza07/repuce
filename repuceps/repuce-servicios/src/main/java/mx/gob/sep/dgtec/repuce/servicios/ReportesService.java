package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CCctCstm;

public interface ReportesService {
	
	/**
	 * Tiene consejo municipal
	 * @return Boolean
	 * @throws Exception
	 */
	public Boolean hasCm(Short idEnt,Integer idMun) throws Exception;
	
	//reporte 1 respuesta de la pregunta de conocimiento del municipio
	public Integer countCesPublicoPorMunicipio1415(Short idEntidad,Short idMunicipio,
			Boolean consejoMun, Boolean apoyo,Boolean enlace, Boolean joinSeguimiento,
			Boolean joinInfGral, Boolean statusCe)  throws Exception;

	// reporte 2 lista de cct con consejo
	public List<CCctCstm> searchCesPublicoPorMunicipio1415Consejo(Short idEntidad,Short idMunicipio,
			Boolean consejoMun, Boolean apoyo,Boolean enlace, Boolean joinSeguimiento,
			Boolean joinInfGral, Boolean statusCe)  throws Exception;
	
	
	// reporte 3 lista de cct con programas registrados
		public List<CCctCstm> searchCesPublicoPorMunicipio1415Programas(Short idEntidad,Short idMunicipio,
				Boolean consejoMun, Boolean apoyo,Boolean enlace, Boolean joinSeguimiento,
				Boolean joinInfGral, Boolean statusCe)  throws Exception;
	
	public Integer countCesPublicoPorMunicipioProgramas(Short idEntidad,Short idMunicipio,
			Boolean consejoMun, Boolean apoyo,Boolean enlace, Boolean joinSeguimiento,
			Boolean joinInfGral, Boolean statusCe)  throws Exception;

	
	/**
	 * Obtiene la cuenta de municipios en una entidad
	 * @return Integer
	 * @throws Exception
	 */
	public Integer getCountCm(Short idEnt) throws Exception;
	
	/**
	 * Obtiene la cuenta de consejos municipales en una entidad
	 * @return Boolean
	 * @throws Exception
	 */
	public Integer getCountMun(Short idEnt) throws Exception;
	
	/**
	 * Obtiene el listado de los Consejos Escolares de una localidad dada
	 * @return Listado de CCTs de una localidad
	 * @throws Exception
	 */
	public List<CCctCstm> searchCesPublicoPorMunicipio(Short idEntidad,Short idMunicipio,
			Boolean consejoMun, Boolean apoyo,Boolean enlace, Boolean joinSeguimiento,
			Boolean joinInfGral, Boolean statusCe)  throws Exception;
	
	
	
	
	public Integer countCesPublicoPorMunicipio(Short idEntidad,Short idMunicipio,
			Boolean consejoMun, Boolean apoyo,Boolean enlace, Boolean joinSeguimiento,
			Boolean joinInfGral, Boolean statusCe)  throws Exception;
}
