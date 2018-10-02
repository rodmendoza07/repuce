package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CCctCstm;

import org.apache.ibatis.annotations.Param;

public interface ReportesMapper {
	
	int countBy(@Param("idEntidad") Short idEntidad, @Param("idMunicipio") Short idMunicipio,@Param("consejoMun") Boolean consejoMun,
			@Param("apoyo") Boolean apoyo,@Param("enlace") Boolean enlace, @Param("joinSeguimiento") Boolean joinSeguimiento,
			@Param("joinInfGral") Boolean joinInfGral,@Param("statusCe") Boolean statusCe);
	
	int countBy1415(@Param("idEntidad") Short idEntidad, @Param("idMunicipio") Short idMunicipio,@Param("consejoMun") Boolean consejoMun,
			@Param("apoyo") Boolean apoyo,@Param("enlace") Boolean enlace, @Param("joinSeguimiento") Boolean joinSeguimiento,
			@Param("joinInfGral") Boolean joinInfGral,@Param("statusCe") Boolean statusCe);
	
	int countByProgramas(@Param("idEntidad") Short idEntidad, @Param("idMunicipio") Short idMunicipio,@Param("consejoMun") Boolean consejoMun,
			@Param("apoyo") Boolean apoyo,@Param("enlace") Boolean enlace, @Param("joinSeguimiento") Boolean joinSeguimiento,
			@Param("joinInfGral") Boolean joinInfGral,@Param("statusCe") Boolean statusCe);
	
	List<CCctCstm> selectReporteMunicipal(@Param("idEntidad") Short idEntidad, @Param("idMunicipio") Short idMunicipio,@Param("consejoMun") Boolean consejoMun,
			@Param("apoyo") Boolean apoyo,@Param("enlace") Boolean enlace, @Param("joinSeguimiento") Boolean joinSeguimiento,
			@Param("joinInfGral") Boolean joinInfGral,@Param("statusCe") Boolean statusCe);
	
	List<CCctCstm> selectReporteMunicipal1415Consejo(@Param("idEntidad") Short idEntidad, @Param("idMunicipio") Short idMunicipio,@Param("consejoMun") Boolean consejoMun,
			@Param("apoyo") Boolean apoyo,@Param("enlace") Boolean enlace, @Param("joinSeguimiento") Boolean joinSeguimiento,
			@Param("joinInfGral") Boolean joinInfGral,@Param("statusCe") Boolean statusCe);
	
	List<CCctCstm> selectReporteMunicipal1415Programas(@Param("idEntidad") Short idEntidad, @Param("idMunicipio") Short idMunicipio,@Param("consejoMun") Boolean consejoMun,
			@Param("apoyo") Boolean apoyo,@Param("enlace") Boolean enlace, @Param("joinSeguimiento") Boolean joinSeguimiento,
			@Param("joinInfGral") Boolean joinInfGral,@Param("statusCe") Boolean statusCe);

}
