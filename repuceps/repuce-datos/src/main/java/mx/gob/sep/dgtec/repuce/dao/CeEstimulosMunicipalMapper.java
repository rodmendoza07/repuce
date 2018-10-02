package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosMunicipal;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosMunicipalExample;
import org.apache.ibatis.annotations.Param;

public interface CeEstimulosMunicipalMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int countByExample(CeEstimulosMunicipalExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int deleteByExample(CeEstimulosMunicipalExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("idConsecutivoMunicipal") Short idConsecutivoMunicipal);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int insert(CeEstimulosMunicipal record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int insertSelective(CeEstimulosMunicipal record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    List<CeEstimulosMunicipal> selectByExample(CeEstimulosMunicipalExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    CeEstimulosMunicipal selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("idConsecutivoMunicipal") Short idConsecutivoMunicipal);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByExampleSelective(@Param("record") CeEstimulosMunicipal record, @Param("example") CeEstimulosMunicipalExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByExample(@Param("record") CeEstimulosMunicipal record, @Param("example") CeEstimulosMunicipalExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByPrimaryKeySelective(CeEstimulosMunicipal record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos_municipal
     *
     * @mbggenerated Thu Jun 04 14:27:33 CDT 2015
     */
    int updateByPrimaryKey(CeEstimulosMunicipal record);
}