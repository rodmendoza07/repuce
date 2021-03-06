package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejasExample;
import org.apache.ibatis.annotations.Param;

public interface ApecDenunciasQuejasMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int countByExample(ApecDenunciasQuejasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int deleteByExample(ApecDenunciasQuejasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cDenuncias") Short cDenuncias, @Param("denuncias") String denuncias);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int insert(ApecDenunciasQuejas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int insertSelective(ApecDenunciasQuejas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    List<ApecDenunciasQuejas> selectByExample(ApecDenunciasQuejasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int updateByExampleSelective(@Param("record") ApecDenunciasQuejas record, @Param("example") ApecDenunciasQuejasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_denuncias_quejas
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int updateByExample(@Param("record") ApecDenunciasQuejas record, @Param("example") ApecDenunciasQuejasExample example);
}