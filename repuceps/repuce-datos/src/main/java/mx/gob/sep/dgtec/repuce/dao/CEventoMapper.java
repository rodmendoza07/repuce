package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CEvento;
import mx.gob.sep.dgtec.repuce.model.CEventoExample;
import org.apache.ibatis.annotations.Param;

public interface CEventoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int countByExample(CEventoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByExample(CEventoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int deleteByPrimaryKey(Short cEvento);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insert(CEvento record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int insertSelective(CEvento record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    List<CEvento> selectByExample(CEventoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    CEvento selectByPrimaryKey(Short cEvento);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExampleSelective(@Param("record") CEvento record, @Param("example") CEventoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByExample(@Param("record") CEvento record, @Param("example") CEventoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKeySelective(CEvento record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_evento
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    int updateByPrimaryKey(CEvento record);
}