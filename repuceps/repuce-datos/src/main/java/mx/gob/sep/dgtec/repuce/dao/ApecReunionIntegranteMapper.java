package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegrante;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteExample;
import org.apache.ibatis.annotations.Param;

public interface ApecReunionIntegranteMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int countByExample(ApecReunionIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int deleteByExample(ApecReunionIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cApecIntegrante") Integer cApecIntegrante, @Param("cIntegrante") Short cIntegrante);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int insert(ApecReunionIntegrante record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int insertSelective(ApecReunionIntegrante record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    List<ApecReunionIntegrante> selectByExample(ApecReunionIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int updateByExampleSelective(@Param("record") ApecReunionIntegrante record, @Param("example") ApecReunionIntegranteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    int updateByExample(@Param("record") ApecReunionIntegrante record, @Param("example") ApecReunionIntegranteExample example);
}