package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnos;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnosExample;
import org.apache.ibatis.annotations.Param;

public interface ApecNumeroAlumnosMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int countByExample(ApecNumeroAlumnosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int deleteByExample(ApecNumeroAlumnosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cNumalum") Short cNumalum);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int insert(ApecNumeroAlumnos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int insertSelective(ApecNumeroAlumnos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    List<ApecNumeroAlumnos> selectByExample(ApecNumeroAlumnosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    ApecNumeroAlumnos selectByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cNumalum") Short cNumalum);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int updateByExampleSelective(@Param("record") ApecNumeroAlumnos record, @Param("example") ApecNumeroAlumnosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int updateByExample(@Param("record") ApecNumeroAlumnos record, @Param("example") ApecNumeroAlumnosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int updateByPrimaryKeySelective(ApecNumeroAlumnos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    int updateByPrimaryKey(ApecNumeroAlumnos record);
}