package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CApoyo2;
import mx.gob.sep.dgtec.repuce.model.CApoyo2Example;
import org.apache.ibatis.annotations.Param;

public interface CApoyo2Mapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int countByExample(CApoyo2Example example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int deleteByExample(CApoyo2Example example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int deleteByPrimaryKey(Integer cApoyo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int insert(CApoyo2 record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int insertSelective(CApoyo2 record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    List<CApoyo2> selectByExample(CApoyo2Example example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    CApoyo2 selectByPrimaryKey(Integer cApoyo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int updateByExampleSelective(@Param("record") CApoyo2 record, @Param("example") CApoyo2Example example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int updateByExample(@Param("record") CApoyo2 record, @Param("example") CApoyo2Example example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int updateByPrimaryKeySelective(CApoyo2 record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    int updateByPrimaryKey(CApoyo2 record);
}