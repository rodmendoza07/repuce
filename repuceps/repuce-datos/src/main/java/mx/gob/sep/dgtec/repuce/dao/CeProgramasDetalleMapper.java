package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalle;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleExample;
import org.apache.ibatis.annotations.Param;

public interface CeProgramasDetalleMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int countByExample(CeProgramasDetalleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int deleteByExample(CeProgramasDetalleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cPrograma") Short cPrograma, @Param("idDetalle") Integer idDetalle);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int insert(CeProgramasDetalle record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int insertSelective(CeProgramasDetalle record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    List<CeProgramasDetalle> selectByExample(CeProgramasDetalleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    CeProgramasDetalle selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("cSesion") Short cSesion, @Param("cPrograma") Short cPrograma, @Param("idDetalle") Integer idDetalle);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int updateByExampleSelective(@Param("record") CeProgramasDetalle record, @Param("example") CeProgramasDetalleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int updateByExample(@Param("record") CeProgramasDetalle record, @Param("example") CeProgramasDetalleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int updateByPrimaryKeySelective(CeProgramasDetalle record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_detalle
     *
     * @mbggenerated Mon Sep 01 14:58:35 CDT 2014
     */
    int updateByPrimaryKey(CeProgramasDetalle record);
}