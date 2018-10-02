package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CCoNee;
import mx.gob.sep.dgtec.repuce.model.CCoNeeExample;
import org.apache.ibatis.annotations.Param;

public interface CCoNeeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int countByExample(CCoNeeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int deleteByExample(CCoNeeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int deleteByPrimaryKey(Integer cNee);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int insert(CCoNee record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int insertSelective(CCoNee record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    List<CCoNee> selectByExample(CCoNeeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    CCoNee selectByPrimaryKey(Integer cNee);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByExampleSelective(@Param("record") CCoNee record, @Param("example") CCoNeeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByExample(@Param("record") CCoNee record, @Param("example") CCoNeeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByPrimaryKeySelective(CCoNee record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_nee
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByPrimaryKey(CCoNee record);
}