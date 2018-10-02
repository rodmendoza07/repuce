package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionExample;
import org.apache.ibatis.annotations.Param;

public interface ApecReunionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int countByExample(ApecReunionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int deleteByExample(ApecReunionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int insert(ApecReunion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int insertSelective(ApecReunion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    List<ApecReunion> selectByExample(ApecReunionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    ApecReunion selectByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int updateByExampleSelective(@Param("record") ApecReunion record, @Param("example") ApecReunionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int updateByExample(@Param("record") ApecReunion record, @Param("example") ApecReunionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int updateByPrimaryKeySelective(ApecReunion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion
     *
     * @mbggenerated Thu Sep 19 10:19:54 CDT 2013
     */
    int updateByPrimaryKey(ApecReunion record);
}