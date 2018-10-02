package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CTipoDiagnosticoCom;
import mx.gob.sep.dgtec.repuce.model.CTipoDiagnosticoComExample;
import org.apache.ibatis.annotations.Param;

public interface CTipoDiagnosticoComMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int countByExample(CTipoDiagnosticoComExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int deleteByExample(CTipoDiagnosticoComExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int deleteByPrimaryKey(Short cTipoDiagnosticoCom);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int insert(CTipoDiagnosticoCom record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int insertSelective(CTipoDiagnosticoCom record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    List<CTipoDiagnosticoCom> selectByExample(CTipoDiagnosticoComExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    CTipoDiagnosticoCom selectByPrimaryKey(Short cTipoDiagnosticoCom);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CTipoDiagnosticoCom record, @Param("example") CTipoDiagnosticoComExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByExample(@Param("record") CTipoDiagnosticoCom record, @Param("example") CTipoDiagnosticoComExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByPrimaryKeySelective(CTipoDiagnosticoCom record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_diagnostico_com
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByPrimaryKey(CTipoDiagnosticoCom record);
}