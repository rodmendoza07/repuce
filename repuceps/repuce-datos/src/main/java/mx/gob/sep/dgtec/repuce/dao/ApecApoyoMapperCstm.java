package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;


import org.apache.ibatis.annotations.Param;

public interface ApecApoyoMapperCstm {

	List<ApecApoyoCstm> selectApoyosRegistradosPosterior(@Param("cApec") Integer cApec,@Param("cReunion") Short cReunion,@Param("cApoyos") String cApoyos);
}
