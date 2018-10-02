package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.Comites1SesionVO;

import org.apache.ibatis.annotations.Param;

public interface Comites1SesionMapper {
	
	Comites1SesionVO selectComites1SesionActa(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);

}
