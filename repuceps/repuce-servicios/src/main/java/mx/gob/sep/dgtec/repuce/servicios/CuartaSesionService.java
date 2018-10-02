package mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;

public interface CuartaSesionService {

	public int saveCuartaSesion(CuartaSesionVO cuartaSesionVO) throws Exception;
	
	public int deleteCuartaSesion(Integer cCct) throws Exception;

	public CuartaSesionVO selectCuartaSesion(Integer cCct) throws Exception;

	public boolean isInformeAccesible(Integer cCct) throws Exception;
}
