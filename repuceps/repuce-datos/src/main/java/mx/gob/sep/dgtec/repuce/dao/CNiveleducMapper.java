package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CNiveleduc;
import mx.gob.sep.dgtec.repuce.model.CNiveleducExample;
import org.apache.ibatis.annotations.Param;

public interface CNiveleducMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int countByExample(CNiveleducExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByExample(CNiveleducExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByPrimaryKey(Integer cNiveleduc);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insert(CNiveleduc record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insertSelective(CNiveleduc record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    List<CNiveleduc> selectByExample(CNiveleducExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    CNiveleduc selectByPrimaryKey(Integer cNiveleduc);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExampleSelective(@Param("record") CNiveleduc record, @Param("example") CNiveleducExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExample(@Param("record") CNiveleduc record, @Param("example") CNiveleducExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKeySelective(CNiveleduc record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKey(CNiveleduc record);
}