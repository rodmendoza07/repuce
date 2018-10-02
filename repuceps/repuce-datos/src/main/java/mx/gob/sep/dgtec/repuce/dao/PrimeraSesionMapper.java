package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;

public interface PrimeraSesionMapper {

	PrimeraSesionVO selectPrimeraSesion(Integer cCct);

	PrimeraSesionVO selectPrimeraSesionMinuta(Integer cCct);
	
	int insertCComite(CComite cComite);
	
}