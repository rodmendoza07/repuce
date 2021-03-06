package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CParticipacion;
import mx.gob.sep.dgtec.repuce.model.CParticipacionExample;
import org.apache.ibatis.annotations.Param;

public interface CParticipacionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int countByExample(CParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int deleteByExample(CParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int deleteByPrimaryKey(Integer cParticipacion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int insert(CParticipacion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int insertSelective(CParticipacion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    List<CParticipacion> selectByExample(CParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    CParticipacion selectByPrimaryKey(Integer cParticipacion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByExampleSelective(@Param("record") CParticipacion record, @Param("example") CParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByExample(@Param("record") CParticipacion record, @Param("example") CParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByPrimaryKeySelective(CParticipacion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByPrimaryKey(CParticipacion record);
}