package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentariosExample;
import org.apache.ibatis.annotations.Param;

public interface ApecOpinionesComentariosMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int countByExample(ApecOpinionesComentariosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int deleteByExample(ApecOpinionesComentariosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion, @Param("cOpiniones") Short cOpiniones, @Param("opiniones") String opiniones);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int insert(ApecOpinionesComentarios record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int insertSelective(ApecOpinionesComentarios record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    List<ApecOpinionesComentarios> selectByExample(ApecOpinionesComentariosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int updateByExampleSelective(@Param("record") ApecOpinionesComentarios record, @Param("example") ApecOpinionesComentariosExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_opiniones_comentarios
     *
     * @mbggenerated Wed May 17 13:09:36 CDT 2017
     */
    int updateByExample(@Param("record") ApecOpinionesComentarios record, @Param("example") ApecOpinionesComentariosExample example);
}