package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeActividad;
import mx.gob.sep.dgtec.repuce.model.CeActividadExample;
import org.apache.ibatis.annotations.Param;

public interface CeActividadMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int countByExample(CeActividadExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int deleteByExample(CeActividadExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("ceActividad") Short ceActividad);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int insert(CeActividad record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int insertSelective(CeActividad record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    List<CeActividad> selectByExample(CeActividadExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    CeActividad selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("ceActividad") Short ceActividad);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByExampleSelective(@Param("record") CeActividad record, @Param("example") CeActividadExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByExample(@Param("record") CeActividad record, @Param("example") CeActividadExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByPrimaryKeySelective(CeActividad record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_actividad
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByPrimaryKey(CeActividad record);
}