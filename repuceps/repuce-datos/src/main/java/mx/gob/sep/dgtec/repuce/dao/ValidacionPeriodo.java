package mx.gob.sep.dgtec.repuce.dao;



import mx.gob.sep.dgtec.repuce.vo.ValidacionPeriodoVO;

import org.apache.ibatis.annotations.Param;

public interface ValidacionPeriodo {

	ValidacionPeriodoVO selectPeriodo(@Param("cCct") Integer cCct);
}
