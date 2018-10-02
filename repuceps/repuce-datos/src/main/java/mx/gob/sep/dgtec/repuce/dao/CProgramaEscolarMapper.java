package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CProgramaEscolar;
import mx.gob.sep.dgtec.repuce.model.CProgramaEscolarExample;
import org.apache.ibatis.annotations.Param;

public interface CProgramaEscolarMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int countByExample(CProgramaEscolarExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByExample(CProgramaEscolarExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByPrimaryKey(Short modalidad);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insert(CProgramaEscolar record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insertSelective(CProgramaEscolar record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    List<CProgramaEscolar> selectByExample(CProgramaEscolarExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    CProgramaEscolar selectByPrimaryKey(Short modalidad);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExampleSelective(@Param("record") CProgramaEscolar record, @Param("example") CProgramaEscolarExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExample(@Param("record") CProgramaEscolar record, @Param("example") CProgramaEscolarExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKeySelective(CProgramaEscolar record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKey(CProgramaEscolar record);
}