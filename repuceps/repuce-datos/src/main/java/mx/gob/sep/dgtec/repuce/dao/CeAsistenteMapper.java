package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeAsistente;
import mx.gob.sep.dgtec.repuce.model.CeAsistenteExample;
import org.apache.ibatis.annotations.Param;

public interface CeAsistenteMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int countByExample(CeAsistenteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int deleteByExample(CeAsistenteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cscAsistente") Short cscAsistente);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int insert(CeAsistente record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int insertSelective(CeAsistente record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    List<CeAsistente> selectByExample(CeAsistenteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    CeAsistente selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cscAsistente") Short cscAsistente);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CeAsistente record, @Param("example") CeAsistenteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int updateByExample(@Param("record") CeAsistente record, @Param("example") CeAsistenteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int updateByPrimaryKeySelective(CeAsistente record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asistente
     *
     * @mbggenerated Mon Jul 15 13:47:43 CDT 2013
     */
    int updateByPrimaryKey(CeAsistente record);
}