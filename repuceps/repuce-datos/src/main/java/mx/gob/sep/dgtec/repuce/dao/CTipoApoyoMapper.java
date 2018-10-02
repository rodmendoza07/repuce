package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CTipoApoyo;
import mx.gob.sep.dgtec.repuce.model.CTipoApoyoExample;
import org.apache.ibatis.annotations.Param;

public interface CTipoApoyoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int countByExample(CTipoApoyoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int deleteByExample(CTipoApoyoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int deleteByPrimaryKey(Short cTipoApoyo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int insert(CTipoApoyo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int insertSelective(CTipoApoyo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    List<CTipoApoyo> selectByExample(CTipoApoyoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    CTipoApoyo selectByPrimaryKey(Short cTipoApoyo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CTipoApoyo record, @Param("example") CTipoApoyoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int updateByExample(@Param("record") CTipoApoyo record, @Param("example") CTipoApoyoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int updateByPrimaryKeySelective(CTipoApoyo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    int updateByPrimaryKey(CTipoApoyo record);
}