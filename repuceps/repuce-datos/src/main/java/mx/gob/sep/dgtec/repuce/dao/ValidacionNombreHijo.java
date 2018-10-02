package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.ValidacionNombreHijoVO;
import org.apache.ibatis.annotations.Param;

public interface ValidacionNombreHijo {
	
	ValidacionNombreHijoVO selectNombreHijo(@Param("cCct") Integer cCct);
	
	

}
