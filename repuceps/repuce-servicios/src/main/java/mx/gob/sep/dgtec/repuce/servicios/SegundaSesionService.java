package mx.gob.sep.dgtec.repuce.servicios;


import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalle;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleCstm;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionC1415VO;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;

public interface SegundaSesionService {

	public int saveSegundaSesion(SegundaSesionVO segundaSesionVO);
	
	public int saveSegundaSesionC1415(SegundaSesionC1415VO segundaSesionVO);
	
	public int deleteSegundaSesion(Integer cCct);

	public SegundaSesionVO selectSegundaSesion(Integer cCct);
	
	public List<CctResultEnlace> selectResultadosEnlace(Integer cCct);
			
	//------------
	public SegundaSesionC1415VO selectSegundaSesionC1415(Integer cCct);
	
	
	public List<CeProgramasDetalle> selectDetalle(Integer idPrograma, Integer cCcct);
	
	public int deleteSegundaSesionC1415(Integer cCct);
}
