package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;


import org.apache.ibatis.annotations.Param;

public interface ApecBullyingMapperCstm {

	List<ApecBullyingCstm> selectBullyingRegistradosPosterior(@Param("cApec") Integer cApec,@Param("cReunion") Short cReunion);
}

