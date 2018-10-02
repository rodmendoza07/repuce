package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ConProgramasYComitesCstm;

import org.apache.ibatis.annotations.Param;

public interface ConProgramasYComitesMapper {
	
	List<ConProgramasYComitesCstm> selectConProgramasYComites(@Param("cCct") Integer cCct);

}
