package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.HijoPresidenteElectoVO;

import org.apache.ibatis.annotations.Param;

public interface HijoPresidenteMapper {
	
	 HijoPresidenteElectoVO selectHijo(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);

}
