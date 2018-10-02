package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;

public interface CuartaSesionMapper {

	CuartaSesionVO selectCuartaSesion(Integer cCct);

	boolean isInformeAccesible(Integer cCct);
}