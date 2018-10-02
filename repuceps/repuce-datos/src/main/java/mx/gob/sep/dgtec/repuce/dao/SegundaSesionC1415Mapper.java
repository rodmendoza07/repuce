package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionC1415VO;

public interface SegundaSesionC1415Mapper {


	SegundaSesionC1415VO selectSegundaSesionC1415(Integer cCct);
						 
	//SegundaSesionC1415VO selectSegundaSesionMinuta(Integer cCct);
	
	int insertCComite(CComite cComite);
	
}