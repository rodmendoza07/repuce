package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecInstructor;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorExample;
import org.apache.ibatis.annotations.Param;

public interface ApecInstructorMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int countByExample(ApecInstructorExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int deleteByExample(ApecInstructorExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cInstructor") Short cInstructor);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int insert(ApecInstructor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int insertSelective(ApecInstructor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    List<ApecInstructor> selectByExample(ApecInstructorExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    ApecInstructor selectByPrimaryKey(@Param("cApec") Integer cApec, @Param("cInstructor") Short cInstructor);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int updateByExampleSelective(@Param("record") ApecInstructor record, @Param("example") ApecInstructorExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int updateByExample(@Param("record") ApecInstructor record, @Param("example") ApecInstructorExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int updateByPrimaryKeySelective(ApecInstructor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_instructor
     *
     * @mbggenerated Mon Dec 07 16:31:32 CST 2015
     */
    int updateByPrimaryKey(ApecInstructor record);
}