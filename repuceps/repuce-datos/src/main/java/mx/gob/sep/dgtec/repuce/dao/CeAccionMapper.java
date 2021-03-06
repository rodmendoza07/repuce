package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeAccion;
import mx.gob.sep.dgtec.repuce.model.CeAccionExample;
import org.apache.ibatis.annotations.Param;

public interface CeAccionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int countByExample(CeAccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int deleteByExample(CeAccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("idAccion") Short idAccion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int insert(CeAccion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int insertSelective(CeAccion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    List<CeAccion> selectByExample(CeAccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    CeAccion selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("idAccion") Short idAccion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int updateByExampleSelective(@Param("record") CeAccion record, @Param("example") CeAccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int updateByExample(@Param("record") CeAccion record, @Param("example") CeAccionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int updateByPrimaryKeySelective(CeAccion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    int updateByPrimaryKey(CeAccion record);
}