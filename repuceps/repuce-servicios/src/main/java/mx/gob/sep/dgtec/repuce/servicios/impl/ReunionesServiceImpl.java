package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.UbicacionCctMapperCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.CeProgramasExample;
import mx.gob.sep.dgtec.repuce.model.CeSesionExample;
import mx.gob.sep.dgtec.repuce.servicios.ReunionesService;
import mx.gob.sep.dgtec.repuce.vo.ProgramaTiempoCompletoVO;
import mx.gob.sep.dgtec.repuce.vo.ReunionesRealizadasVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Este a interfase expone los servicios que se usan en el 
 * REPUCE de forma generica.
 * @Descripcion: Servicio generico
 */
@Service
public class ReunionesServiceImpl implements ReunionesService{

	@Autowired
	private CCctMapper cCctMapper;
	@Autowired
	private UbicacionCctMapperCstm ubicacionCctMapper;
	@Autowired
	private CeInfGralMapper ceInfGralMapper; 
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private ApecReunionMapper apecReunionMapper;
	@Autowired
	private ActaConstitutivaMapper actaConstitutivaMapper;
	@Autowired
	private CeProgramasMapper ceProgramasMapper; 
	
	/**
	 * Obtiene la información de las sesiones y asambleas
	 * para un CCT dado.
	 * @return Información de Sesiones y Asambleas de un CCT
	 * @throws Exception
	 */
	public ReunionesRealizadasVO searchReunionesRegistradas(
			Integer cCct){
		
		ReunionesRealizadasVO reuniones = new ReunionesRealizadasVO();
		
		reuniones.setCct(cCctMapper.selectByPrimaryKey(cCct));
		
		reuniones.setUbicacionCct(ubicacionCctMapper.selectByPrimaryKeyCstm(cCct));
		
		reuniones.setCeInfGral(ceInfGralMapper.selectByPrimaryKey(cCct));
				
		CeSesionExample sesionExample = new CeSesionExample();
		sesionExample.createCriteria().andCCctEqualTo(cCct);
		reuniones.setReuniones(ceSesionMapper.selectByExample(sesionExample));
		
	    ProgramaTiempoCompletoVO tienePrograma = new ProgramaTiempoCompletoVO();
		
		Short cProgramaTiempoCompleto = 1;
		CeProgramasExample programasExample = new CeProgramasExample();
		programasExample.createCriteria().andCCctEqualTo(cCct).andCProgramaEqualTo(cProgramaTiempoCompleto);
		
		
		tienePrograma.setcCct(cCct);
		tienePrograma.setProgramaTiempoCompleto(ceProgramasMapper.countByExample(programasExample));
		
		reuniones.setTiempoCompleto(tienePrograma);
		
		return reuniones;
	}	

	/**
	 * Obtiene la información de las reuniones registradas por una APEC dada.
	 * @return Lista de las reuniones registradas por la APEC
	 * @throws Exception
	 */
	public List<ApecReunion> searchReunionesApec(Short idEntidadfed,
			Integer idMunicipio, Integer idLocalidad){
		
		List<ApecReunion> reuniones = actaConstitutivaMapper
				.selectReunionesRealizadas(idEntidadfed, idMunicipio, 
						idLocalidad);
		
		return reuniones;
	}	
}
