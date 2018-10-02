package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafeExample;
import org.apache.ibatis.annotations.Param;

public interface CLocalidadConafeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int countByExample(CLocalidadConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int deleteByExample(CLocalidadConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int deleteByPrimaryKey(@Param("idLocalidad") Integer idLocalidad, @Param("idMunicipio") Integer idMunicipio, @Param("idEntidadfed") Short idEntidadfed);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int insert(CLocalidadConafe record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int insertSelective(CLocalidadConafe record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    List<CLocalidadConafe> selectByExample(CLocalidadConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    CLocalidadConafe selectByPrimaryKey(@Param("idLocalidad") Integer idLocalidad, @Param("idMunicipio") Integer idMunicipio, @Param("idEntidadfed") Short idEntidadfed);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CLocalidadConafe record, @Param("example") CLocalidadConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByExample(@Param("record") CLocalidadConafe record, @Param("example") CLocalidadConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByPrimaryKeySelective(CLocalidadConafe record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_localidad_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByPrimaryKey(CLocalidadConafe record);
}