package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.model.PresidenteElecto;

import org.apache.ibatis.annotations.Param;


public interface PresidenteGanadorMapper {

	PresidenteElecto  selectPreGan(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
	
}
