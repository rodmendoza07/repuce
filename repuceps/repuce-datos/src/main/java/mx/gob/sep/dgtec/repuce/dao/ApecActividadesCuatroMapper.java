package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.ApecActividadesCuatro;
import mx.gob.sep.dgtec.repuce.model.ApecActividadesCuatroExample;
import org.apache.ibatis.annotations.Param;

public interface ApecActividadesCuatroMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int countByExample(ApecActividadesCuatroExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int deleteByExample(ApecActividadesCuatroExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int deleteByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int insert(ApecActividadesCuatro record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int insertSelective(ApecActividadesCuatro record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    List<ApecActividadesCuatro> selectByExample(ApecActividadesCuatroExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    ApecActividadesCuatro selectByPrimaryKey(@Param("cApec") Integer cApec, @Param("cReunion") Short cReunion);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int updateByExampleSelective(@Param("record") ApecActividadesCuatro record, @Param("example") ApecActividadesCuatroExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int updateByExample(@Param("record") ApecActividadesCuatro record, @Param("example") ApecActividadesCuatroExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int updateByPrimaryKeySelective(ApecActividadesCuatro record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_actividades_cuatro
     *
     * @mbggenerated Mon Sep 03 16:33:32 CDT 2018
     */
    int updateByPrimaryKey(ApecActividadesCuatro record);
}