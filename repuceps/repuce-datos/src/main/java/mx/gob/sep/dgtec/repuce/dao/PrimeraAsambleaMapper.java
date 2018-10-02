package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;

import org.apache.ibatis.annotations.Param;

public interface PrimeraAsambleaMapper {

	PrimeraAsambleaVO selectPrimeraAsamblea(Integer cCct);

	PrimeraAsambleaVO selectPrimeraAsambleaActa(Integer cCct);
	
	Short selectMaxCscIntBaja(Integer cCct);
	
	CeIntegranteCstm selectIntegrante(@Param("cCct") Integer cCct, 
			@Param("cscIntegrante") Short cscIntegrante);
	
	List<CeIntegranteCstm> selectCURPAValidar();	
}