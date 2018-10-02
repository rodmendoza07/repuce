package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CCompEnlace;
import mx.gob.sep.dgtec.repuce.model.CCompEnlaceExample;
import org.apache.ibatis.annotations.Param;

public interface CCompEnlaceMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int countByExample(CCompEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByExample(CCompEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByPrimaryKey(Short cCompEnlace);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insert(CCompEnlace record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insertSelective(CCompEnlace record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    List<CCompEnlace> selectByExample(CCompEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    CCompEnlace selectByPrimaryKey(Short cCompEnlace);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExampleSelective(@Param("record") CCompEnlace record, @Param("example") CCompEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExample(@Param("record") CCompEnlace record, @Param("example") CCompEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKeySelective(CCompEnlace record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comp_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKey(CCompEnlace record);
}