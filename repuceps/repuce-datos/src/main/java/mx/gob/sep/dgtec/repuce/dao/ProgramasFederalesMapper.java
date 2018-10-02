package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.vo.ProgramasFederalesVO;

import org.apache.ibatis.annotations.Param;

public interface ProgramasFederalesMapper {
	
	ProgramasFederalesVO selectProgramasFederales(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
	ProgramasFederalesVO selectProgramasEstatales(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
	ProgramasFederalesVO selectProgramasMunicipales(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
	ProgramasFederalesVO selectProgramasOSC(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
	ProgramasFederalesVO selectProgramas(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion);
}
