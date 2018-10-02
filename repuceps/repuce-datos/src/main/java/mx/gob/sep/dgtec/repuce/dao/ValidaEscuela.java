package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaPorLocyMunVO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaVO;

import org.apache.ibatis.annotations.Param;

public interface ValidaEscuela {

	
	List<DatosEscuelaVO> selectEscuelas(@Param("idEnt") Integer idEnt,@Param("idMun") Integer idMun);
	List<DatosEscuelaPorLocyMunVO> selectTipoEscuelas(@Param("idEnt") Integer idEnt,@Param("idMun") Integer idMun);
	List<DatosEscuelaVO> selectEscuelas2(@Param("idEnt") Integer idEnt,@Param("idMun") Integer idMun,@Param("cNivel") Integer cNivel);
}
