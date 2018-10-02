package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;

import org.apache.ibatis.annotations.Param;

public interface ApecPlanTrabajoMapperCstm {

	List<ApecPlanTrabajoCstm> selectAccionesRegistradasPosterior(@Param("cApec") Integer cApec,@Param("cReunion") Short cReunion);
}
