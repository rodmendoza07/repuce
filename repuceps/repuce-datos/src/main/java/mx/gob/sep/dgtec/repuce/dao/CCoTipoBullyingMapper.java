package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CCoTipoBullying;
import mx.gob.sep.dgtec.repuce.model.CCoTipoBullyingExample;
import org.apache.ibatis.annotations.Param;

public interface CCoTipoBullyingMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int countByExample(CCoTipoBullyingExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int deleteByExample(CCoTipoBullyingExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int deleteByPrimaryKey(Short cCoTipoBullying);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int insert(CCoTipoBullying record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int insertSelective(CCoTipoBullying record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    List<CCoTipoBullying> selectByExample(CCoTipoBullyingExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    CCoTipoBullying selectByPrimaryKey(Short cCoTipoBullying);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByExampleSelective(@Param("record") CCoTipoBullying record, @Param("example") CCoTipoBullyingExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByExample(@Param("record") CCoTipoBullying record, @Param("example") CCoTipoBullyingExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByPrimaryKeySelective(CCoTipoBullying record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_co_tipo_bullying
     *
     * @mbggenerated Wed Apr 15 17:44:37 CDT 2015
     */
    int updateByPrimaryKey(CCoTipoBullying record);
}