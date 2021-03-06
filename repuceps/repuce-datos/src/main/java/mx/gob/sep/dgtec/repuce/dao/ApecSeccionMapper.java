package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecSeccion;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionExample;
import org.apache.ibatis.annotations.Param;

public interface ApecSeccionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int countByExample(ApecSeccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int deleteByExample(ApecSeccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cSeccionRegistro") Integer cSeccionRegistro);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int insert(ApecSeccion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int insertSelective(ApecSeccion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    List<ApecSeccion> selectByExample(ApecSeccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int updateByExampleSelective(@Param("record") ApecSeccion record, @Param("example") ApecSeccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_seccion
     *
     * @mbggenerated Thu Oct 17 11:00:06 CDT 2013
     */
    int updateByExample(@Param("record") ApecSeccion record, @Param("example") ApecSeccionExample example);
}