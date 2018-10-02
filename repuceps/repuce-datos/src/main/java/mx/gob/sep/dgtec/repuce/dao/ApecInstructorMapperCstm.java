package mx.gob.sep.dgtec.repuce.dao;

import org.apache.ibatis.annotations.Param;

public interface ApecInstructorMapperCstm {

	int borrarInstructoresXReunion(@Param("cApec") Integer cApec,@Param("cReunion") Short cReunion);
	int borrarCctsInstructoresXReunion(@Param("cApec") Integer cApec,@Param("cReunion") Short cReunion);
}
