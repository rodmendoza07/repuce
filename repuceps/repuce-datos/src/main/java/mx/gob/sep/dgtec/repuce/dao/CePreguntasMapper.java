package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CePreguntasExample;
import org.apache.ibatis.annotations.Param;

public interface CePreguntasMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int countByExample(CePreguntasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int deleteByExample(CePreguntasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int deleteByPrimaryKey(Integer cctId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int insert(CePreguntas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int insertSelective(CePreguntas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    List<CePreguntas> selectByExample(CePreguntasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    CePreguntas selectByPrimaryKey(Integer cctId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int updateByExampleSelective(@Param("record") CePreguntas record, @Param("example") CePreguntasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int updateByExample(@Param("record") CePreguntas record, @Param("example") CePreguntasExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int updateByPrimaryKeySelective(CePreguntas record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas
     *
     * @mbggenerated Thu Aug 14 14:58:51 CDT 2014
     */
    int updateByPrimaryKey(CePreguntas record);
}