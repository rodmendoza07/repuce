package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;

public interface ApecReunionInstructorMapperCstm {

	List<ApecReunionInstructorCtsm> selectInstructoresRegistradosXReunion(@Param("cApec") Integer cApec,@Param("cReunion") Short cReunion);
	Integer selectIdInstructorMaximo(@Param("cApec") Integer cApec);
}
