package mx.gob.sep.dgtec.repuce.servicios;

import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionC1415VO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;

public interface PrimeraSesionService {

	public int savePrimeraSesionC1415(PrimeraSesionC1415VO primeraSesionVO);
	
	//public int savePrimeraSesion(PrimeraSesionVO primeraSesionVO);
	
	public int deletePrimeraSesion(Integer cCct);

	//public PrimeraSesionVO selectPrimeraSesion(Integer cCct);
	
	public PrimeraSesionC1415VO selectPrimeraSesionC1415(Integer cCct);
	
	
}
