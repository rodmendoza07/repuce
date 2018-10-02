package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;

public interface ActaConstitutivaMapper {

	ActaConstitutivaVO selectActaConstitutiva(Integer cCct);
	
	Short selectMaxCscIntBaja(Integer cCct);
	
	int generateCApec();
	
	List<ApecReunion> selectReunionesRealizadas(@Param("idEntidadfed") Short idEntidadfed, 
			@Param("idMunicipio") Integer idMunicipio,
			@Param("idLocalidad") Integer idLocalidad
			);
}