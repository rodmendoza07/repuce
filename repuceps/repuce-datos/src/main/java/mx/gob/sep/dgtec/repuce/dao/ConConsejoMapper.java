package mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.model.ConConsejoCstm;

import org.apache.ibatis.annotations.Param;

public interface ConConsejoMapper {

	ConConsejoCstm selectConConsejo(@Param("cCct") Integer cCct);
}
