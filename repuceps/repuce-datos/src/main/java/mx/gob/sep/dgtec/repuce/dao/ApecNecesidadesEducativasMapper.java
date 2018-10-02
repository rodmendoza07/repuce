package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativas;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasExample;
import org.apache.ibatis.annotations.Param;

public interface ApecNecesidadesEducativasMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int countByExample(ApecNecesidadesEducativasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int deleteByExample(ApecNecesidadesEducativasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cApoyo") Integer cApoyo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int insert(ApecNecesidadesEducativas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int insertSelective(ApecNecesidadesEducativas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    List<ApecNecesidadesEducativas> selectByExample(ApecNecesidadesEducativasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    ApecNecesidadesEducativas selectByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cApoyo") Integer cApoyo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int updateByExampleSelective(@Param("record") ApecNecesidadesEducativas record, @Param("example") ApecNecesidadesEducativasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int updateByExample(@Param("record") ApecNecesidadesEducativas record, @Param("example") ApecNecesidadesEducativasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int updateByPrimaryKeySelective(ApecNecesidadesEducativas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_necesidades_educativas
     *
     * @mbggenerated Fri Jul 07 13:34:32 CDT 2017
     */
    int updateByPrimaryKey(ApecNecesidadesEducativas record);
}