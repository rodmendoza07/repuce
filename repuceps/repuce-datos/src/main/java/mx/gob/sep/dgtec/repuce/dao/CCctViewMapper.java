package mx.gob.sep.dgtec.repuce.dao;

import org.apache.ibatis.annotations.Param;

import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;

public interface CCctViewMapper {

	CCctViewVO selectCCctView(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);

}