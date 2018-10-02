package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.ValidacionSegundaSesionVO;

import org.apache.ibatis.annotations.Param;

public interface ValidaPaloma2Sesion {

	
	ValidacionSegundaSesionVO selectValidadPaloma(@Param("cCct") Integer cCct);
}
