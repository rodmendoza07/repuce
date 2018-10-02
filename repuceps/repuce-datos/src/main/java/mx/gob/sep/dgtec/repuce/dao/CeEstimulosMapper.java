package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeEstimulos;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosExample;
import org.apache.ibatis.annotations.Param;

public interface CeEstimulosMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int countByExample(CeEstimulosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int deleteByExample(CeEstimulosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("idConsecutivo") Short idConsecutivo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int insert(CeEstimulos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int insertSelective(CeEstimulos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    List<CeEstimulos> selectByExample(CeEstimulosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    CeEstimulos selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("idConsecutivo") Short idConsecutivo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int updateByExampleSelective(@Param("record") CeEstimulos record, @Param("example") CeEstimulosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int updateByExample(@Param("record") CeEstimulos record, @Param("example") CeEstimulosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int updateByPrimaryKeySelective(CeEstimulos record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_estimulos
     *
     * @mbggenerated Wed Nov 18 17:25:58 CST 2015
     */
    int updateByPrimaryKey(CeEstimulos record);
}