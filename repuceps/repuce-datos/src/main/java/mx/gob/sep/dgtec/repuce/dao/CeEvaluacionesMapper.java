package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeEvaluaciones;
import mx.gob.sep.dgtec.repuce.model.CeEvaluacionesExample;
import org.apache.ibatis.annotations.Param;

public interface CeEvaluacionesMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int countByExample(CeEvaluacionesExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int deleteByExample(CeEvaluacionesExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cGrado") Short cGrado);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int insert(CeEvaluaciones record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int insertSelective(CeEvaluaciones record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    List<CeEvaluaciones> selectByExample(CeEvaluacionesExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    CeEvaluaciones selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cGrado") Short cGrado);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int updateByExampleSelective(@Param("record") CeEvaluaciones record, @Param("example") CeEvaluacionesExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int updateByExample(@Param("record") CeEvaluaciones record, @Param("example") CeEvaluacionesExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int updateByPrimaryKeySelective(CeEvaluaciones record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evaluaciones
     *
     * @mbggenerated Wed Nov 12 17:06:51 CST 2014
     */
    int updateByPrimaryKey(CeEvaluaciones record);
}