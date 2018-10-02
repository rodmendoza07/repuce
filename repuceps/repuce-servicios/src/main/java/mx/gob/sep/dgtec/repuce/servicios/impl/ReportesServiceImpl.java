package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.CMunicipioMapper;
import mx.gob.sep.dgtec.repuce.dao.ConsejoMun1415Mapper;
import mx.gob.sep.dgtec.repuce.dao.ConsejoMunMapper;
import mx.gob.sep.dgtec.repuce.dao.ReportesMapper;
import mx.gob.sep.dgtec.repuce.model.CCctCstm;
import mx.gob.sep.dgtec.repuce.model.CMunicipioExample;
import mx.gob.sep.dgtec.repuce.model.ConsejoMun1415Example;
import mx.gob.sep.dgtec.repuce.model.ConsejoMunExample;
import mx.gob.sep.dgtec.repuce.servicios.ReportesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportesServiceImpl implements ReportesService {
	@Autowired
	private ConsejoMunMapper consejoMunDAO;
	@Autowired
	private CMunicipioMapper cMunicipioDAO;
	@Autowired
	private ReportesMapper reportesDAO;
	@Autowired
	private ConsejoMun1415Mapper consejoMun1415DAO;
	/**
	 * tiene acta de consejo municipal
	 * @return Boolean
	 * @throws Exception
	 */
	public Boolean hasCm(Short idEnt,Integer idMun) throws Exception{
		Boolean has = new Boolean(false);
			/*ConsejoMunExample criteria = new ConsejoMunExample();
			criteria.createCriteria().andIdEntidadfedEqualTo(idEnt).
			andIdMunicipioEqualTo(idMun);
			
			if(consejoMunDAO.countByExample(criteria) > 0)
				has = true;
			*/
		//estatus igual a 1 es acta correcta 11-02-2015
		ConsejoMun1415Example criteria = new ConsejoMun1415Example();
		criteria.createCriteria().andIdEntidadfedEqualTo(idEnt).
		andIdMunicipioEqualTo(idMun).andStatusEqualTo(1);
		
		if(consejoMun1415DAO.countByExample(criteria) > 0)
			has = true;
		
			return has;
	}
	
	
	// primer reporte  si hay alguno que tenga respuesta a la pregunta de concocimiento del municipio
		public Integer countCesPublicoPorMunicipio1415(Short idEntidad, Short idMunicipio, Boolean consejoMun, Boolean apoyo,
				Boolean enlace, Boolean joinSeguimiento,Boolean joinInfGral, Boolean statusCe)  throws Exception{
			
			Integer count= reportesDAO.countBy1415(idEntidad, idMunicipio, consejoMun, apoyo, 
					enlace, joinSeguimiento,joinInfGral,statusCe);
			
			return  count;
		}
		
		//reporte 2 lista de cct con consejo
		public List<CCctCstm> searchCesPublicoPorMunicipio1415Consejo(Short idEntidad, Short idMunicipio, Boolean consejoMun, Boolean apoyo,
				Boolean enlace, Boolean joinSeguimiento,Boolean joinInfGral, Boolean statusCe)  throws Exception{
			
			List<CCctCstm> cCcts= reportesDAO.selectReporteMunicipal1415Consejo(idEntidad, idMunicipio, consejoMun, apoyo, 
					enlace, joinSeguimiento, joinInfGral, statusCe);
			
			return  cCcts;
		}
	//sirve para sacar el numero de cct por municipio en el reporte 2 y 3
		public Integer countCesPublicoPorMunicipioProgramas(Short idEntidad, Short idMunicipio, Boolean consejoMun, Boolean apoyo,
				Boolean enlace, Boolean joinSeguimiento,Boolean joinInfGral, Boolean statusCe)  throws Exception{
			
			Integer count= reportesDAO.countByProgramas(idEntidad, idMunicipio, consejoMun, apoyo, 
					enlace, joinSeguimiento,joinInfGral,statusCe);
			
			return  count;
		}
	
		//reporte 3 lista de cct con programas ejercidos
		public List<CCctCstm> searchCesPublicoPorMunicipio1415Programas(Short idEntidad, Short idMunicipio, Boolean consejoMun, Boolean apoyo,
				Boolean enlace, Boolean joinSeguimiento,Boolean joinInfGral, Boolean statusCe)  throws Exception{
			
			List<CCctCstm> cCcts= reportesDAO.selectReporteMunicipal1415Programas(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento, joinInfGral, statusCe); 
					
			
			return  cCcts;
		}
		

		/**
		 * Obtiene la cuenta de municipios en una entidad
		 * @return Integer
		 * @throws Exception
		 */
		public Integer getCountCm(Short idEnt) throws Exception{
			/*ConsejoMunExample criteria = new ConsejoMunExample();
			criteria.createCriteria().andIdEntidadfedEqualTo(idEnt);
			
			Integer countCm = consejoMunDAO.countByExample(criteria);
			*/
			//cuenta municipios correctos 11-02-2015
			ConsejoMun1415Example criteria = new ConsejoMun1415Example();
			criteria.createCriteria().andIdEntidadfedEqualTo(idEnt).andStatusEqualTo(1);
			
			Integer countCm = consejoMun1415DAO.countByExample(criteria);
			
			return countCm;
		}
		
		/**
		 * Obtiene la cuenta de consejos municipales en una entidad
		 * @return Boolean
		 * @throws Exception
		 */
		public Integer getCountMun(Short idEnt) throws Exception{
			
			CMunicipioExample criteria = new CMunicipioExample();
			criteria.createCriteria().andIdEntidadfedEqualTo(idEnt);
			
			Integer countMun = cMunicipioDAO.countByExample(criteria);
			
			return countMun;
		}
		
		/**
		 * Obtiene el listado de los Consejos Escolares de una localidad dada
		 * @param cCct Clave interna del Centro Escolar
		 * @return Listado de CCTs de una localidad
		 * @throws Exception
		 */
		public List<CCctCstm> searchCesPublicoPorMunicipio(Short idEntidad, Short idMunicipio, Boolean consejoMun, Boolean apoyo,
				Boolean enlace, Boolean joinSeguimiento,Boolean joinInfGral, Boolean statusCe)  throws Exception{
			
			List<CCctCstm> cCcts= reportesDAO.selectReporteMunicipal(idEntidad, idMunicipio, consejoMun, apoyo, 
					enlace, joinSeguimiento, joinInfGral, statusCe);
			
			return  cCcts;
		}
		
		
		
		
		public Integer countCesPublicoPorMunicipio(Short idEntidad, Short idMunicipio, Boolean consejoMun, Boolean apoyo,
				Boolean enlace, Boolean joinSeguimiento,Boolean joinInfGral, Boolean statusCe)  throws Exception{
			
			Integer count= reportesDAO.countBy(idEntidad, idMunicipio, consejoMun, apoyo, 
					enlace, joinSeguimiento,joinInfGral,statusCe);
			
			return  count;
		}
		
		
}
