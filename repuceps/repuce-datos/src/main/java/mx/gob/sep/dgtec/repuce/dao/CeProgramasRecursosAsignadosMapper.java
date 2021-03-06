package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeProgramasRecursosAsignados;
import mx.gob.sep.dgtec.repuce.model.CeProgramasRecursosAsignadosExample;
import org.apache.ibatis.annotations.Param;

public interface CeProgramasRecursosAsignadosMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int countByExample(CeProgramasRecursosAsignadosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int deleteByExample(CeProgramasRecursosAsignadosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cPrograma") Short cPrograma, @Param("idRecurso") Short idRecurso);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int insert(CeProgramasRecursosAsignados record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int insertSelective(CeProgramasRecursosAsignados record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    List<CeProgramasRecursosAsignados> selectByExample(CeProgramasRecursosAsignadosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    CeProgramasRecursosAsignados selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cPrograma") Short cPrograma, @Param("idRecurso") Short idRecurso);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int updateByExampleSelective(@Param("record") CeProgramasRecursosAsignados record, @Param("example") CeProgramasRecursosAsignadosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int updateByExample(@Param("record") CeProgramasRecursosAsignados record, @Param("example") CeProgramasRecursosAsignadosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int updateByPrimaryKeySelective(CeProgramasRecursosAsignados record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_recursos_asignados
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    int updateByPrimaryKey(CeProgramasRecursosAsignados record);
}