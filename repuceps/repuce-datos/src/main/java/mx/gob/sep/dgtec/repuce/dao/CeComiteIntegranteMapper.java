package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeComiteIntegrante;
import mx.gob.sep.dgtec.repuce.model.CeComiteIntegranteExample;
import org.apache.ibatis.annotations.Param;

public interface CeComiteIntegranteMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int countByExample(CeComiteIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int deleteByExample(CeComiteIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int deleteByPrimaryKey(@Param("ceIntegranteComiteCCct") Integer ceIntegranteComiteCCct, @Param("ceIntegranteComiteCSesion") Short ceIntegranteComiteCSesion, @Param("ceIntegranteComiteCscIntegrante") Short ceIntegranteComiteCscIntegrante, @Param("ceComiteCCct") Integer ceComiteCCct, @Param("ceComiteCSesion") Short ceComiteCSesion, @Param("ceComiteCComite") Integer ceComiteCComite);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int insert(CeComiteIntegrante record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int insertSelective(CeComiteIntegrante record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    List<CeComiteIntegrante> selectByExample(CeComiteIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CeComiteIntegrante record, @Param("example") CeComiteIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    int updateByExample(@Param("record") CeComiteIntegrante record, @Param("example") CeComiteIntegranteExample example);
}