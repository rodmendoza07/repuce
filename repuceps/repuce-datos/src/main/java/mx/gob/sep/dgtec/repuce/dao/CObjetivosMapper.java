package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CObjetivos;
import mx.gob.sep.dgtec.repuce.model.CObjetivosExample;
import org.apache.ibatis.annotations.Param;

public interface CObjetivosMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int countByExample(CObjetivosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int deleteByExample(CObjetivosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int deleteByPrimaryKey(Integer cObjetivo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int insert(CObjetivos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int insertSelective(CObjetivos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    List<CObjetivos> selectByExample(CObjetivosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    CObjetivos selectByPrimaryKey(Integer cObjetivo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int updateByExampleSelective(@Param("record") CObjetivos record, @Param("example") CObjetivosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int updateByExample(@Param("record") CObjetivos record, @Param("example") CObjetivosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int updateByPrimaryKeySelective(CObjetivos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_objetivos
     *
     * @mbggenerated Mon Aug 11 14:49:59 CDT 2014
     */
    int updateByPrimaryKey(CObjetivos record);
}