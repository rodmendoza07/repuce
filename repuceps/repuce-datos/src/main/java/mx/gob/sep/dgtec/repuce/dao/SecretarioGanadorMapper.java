package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.SecretarioElectoVO;

import org.apache.ibatis.annotations.Param;

public interface SecretarioGanadorMapper {

	SecretarioElectoVO  selectSecre(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
	
}
