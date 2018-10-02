package mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;

public interface TerceraSesionService {

	public int saveTerceraSesion(TerceraSesionVO terceraSesionVO) throws Exception;
	
	public int deleteTerceraSesion(Integer cCct) throws Exception;

	public TerceraSesionVO selectTerceraSesion(Integer cCct) throws Exception;
}
