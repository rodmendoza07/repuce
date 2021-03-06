package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacion;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionExample;
import org.apache.ibatis.annotations.Param;

public interface CeProgramasParticipacionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int countByExample(CeProgramasParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int deleteByExample(CeProgramasParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cParticipacion") Short cParticipacion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int insert(CeProgramasParticipacion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int insertSelective(CeProgramasParticipacion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    List<CeProgramasParticipacion> selectByExample(CeProgramasParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    CeProgramasParticipacion selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cParticipacion") Short cParticipacion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByExampleSelective(@Param("record") CeProgramasParticipacion record, @Param("example") CeProgramasParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByExample(@Param("record") CeProgramasParticipacion record, @Param("example") CeProgramasParticipacionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByPrimaryKeySelective(CeProgramasParticipacion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    int updateByPrimaryKey(CeProgramasParticipacion record);
}