package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CTipoRespuesta;
import mx.gob.sep.dgtec.repuce.model.CTipoRespuestaExample;
import org.apache.ibatis.annotations.Param;

public interface CTipoRespuestaMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int countByExample(CTipoRespuestaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int deleteByExample(CTipoRespuestaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int deleteByPrimaryKey(Short cTipoRespuesta);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int insert(CTipoRespuesta record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int insertSelective(CTipoRespuesta record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    List<CTipoRespuesta> selectByExample(CTipoRespuestaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    CTipoRespuesta selectByPrimaryKey(Short cTipoRespuesta);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CTipoRespuesta record, @Param("example") CTipoRespuestaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByExample(@Param("record") CTipoRespuesta record, @Param("example") CTipoRespuestaExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByPrimaryKeySelective(CTipoRespuesta record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    int updateByPrimaryKey(CTipoRespuesta record);
}