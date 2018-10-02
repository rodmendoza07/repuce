package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.Categorias1SesionVO;

import org.apache.ibatis.annotations.Param;

public interface Categorias1SesionMapper {
	
	Categorias1SesionVO selectCategoria1SesionActa(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);

}
