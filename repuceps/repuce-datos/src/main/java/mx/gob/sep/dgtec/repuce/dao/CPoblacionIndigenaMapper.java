package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CPoblacionIndigena;
import mx.gob.sep.dgtec.repuce.model.CPoblacionIndigenaExample;
import org.apache.ibatis.annotations.Param;

public interface CPoblacionIndigenaMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int countByExample(CPoblacionIndigenaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int deleteByExample(CPoblacionIndigenaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int deleteByPrimaryKey(Short cPoblacionIndigena);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int insert(CPoblacionIndigena record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int insertSelective(CPoblacionIndigena record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    List<CPoblacionIndigena> selectByExample(CPoblacionIndigenaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    CPoblacionIndigena selectByPrimaryKey(Short cPoblacionIndigena);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CPoblacionIndigena record, @Param("example") CPoblacionIndigenaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByExample(@Param("record") CPoblacionIndigena record, @Param("example") CPoblacionIndigenaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByPrimaryKeySelective(CPoblacionIndigena record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByPrimaryKey(CPoblacionIndigena record);
}