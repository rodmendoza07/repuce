package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionC1415VO;

public interface PrimeraSesionC1415Mapper {


	PrimeraSesionC1415VO selectPrimeraSesionC1415(Integer cCct);
	
	PrimeraSesionC1415VO selectPrimeraSesion(Integer cCct);

	PrimeraSesionC1415VO selectPrimeraSesionMinuta(Integer cCct);
	
	int insertCComite(CComite cComite);
	
}